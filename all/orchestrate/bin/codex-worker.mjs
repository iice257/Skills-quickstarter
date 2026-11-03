#!/usr/bin/env node
// codex-worker: run a Codex (ChatGPT plan) builder for the Claude orchestrator.
// Each run gets its own git worktree and branch, a run folder with the brief,
// the JSONL event log and Codex's final report, and a one-line JSON summary on stdout.
// Node ESM, no dependencies. Uses git and the codex CLI through child_process.
import { spawn, spawnSync } from 'node:child_process'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

/* ------------------------------------------------------------------ */
/* Pure helpers (unit-tested)                                          */
/* ------------------------------------------------------------------ */

export const DEFAULTS = {
  effort: 'medium',
  timeoutMin: 30,
  root: path.join(os.homedir(), '.codex-worktrees'),
}

export const EFFORTS = new Set(['minimal', 'low', 'medium', 'high', 'xhigh'])

const LIMIT_PATTERNS = [/usage limit/i, /rate limit/i, /too many requests/i, /\b429\b/, /quota/i]

export function slugify(text) {
  return String(text)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 40)
}

export function parseArgs(argv) {
  const [cmd = 'help', ...rest] = argv
  const opts = { _: [] }
  for (let i = 0; i < rest.length; i++) {
    const a = rest[i]
    if (!a.startsWith('--')) {
      opts._.push(a)
      continue
    }
    const key = a.slice(2)
    if (['no-worktree', 'json'].includes(key)) opts[key] = true
    else opts[key] = rest[++i]
  }
  return { cmd, opts }
}

// Reads a codex --json event stream and pulls out what the orchestrator needs.
export function summarizeEvents(text) {
  const out = { threadId: null, completed: false, failed: null, usage: null, limited: false }
  for (const line of text.split(/\r?\n/)) {
    if (!line.trim().startsWith('{')) continue
    let ev
    try {
      ev = JSON.parse(line)
    } catch {
      continue
    }
    if (ev.type === 'thread.started' && ev.thread_id) out.threadId = ev.thread_id
    if (ev.type === 'turn.completed') {
      out.completed = true
      if (ev.usage) out.usage = ev.usage
    }
    if (ev.type === 'turn.failed' || ev.type === 'error') {
      const msg = ev.error?.message || ev.message || JSON.stringify(ev)
      out.failed = msg
      if (LIMIT_PATTERNS.some((p) => p.test(msg))) out.limited = true
    }
  }
  return out
}

export function decideStatus({ exitCode, events, lastExists, timedOut }) {
  if (timedOut) return 'timeout'
  if (events.limited) return 'rate_limited'
  if (exitCode === 0 && events.completed && lastExists) return 'done'
  return 'failed'
}

/* ------------------------------------------------------------------ */
/* Side-effecting helpers                                              */
/* ------------------------------------------------------------------ */

function git(cwd, args, { check = true } = {}) {
  const r = spawnSync('git', args, { cwd, encoding: 'utf8' })
  if (check && r.status !== 0) throw new Error(`git ${args.join(' ')}: ${(r.stderr || r.stdout).trim()}`)
  return (r.stdout || '').trim()
}

function readBrief(opts) {
  if (opts.brief === '-' || (!opts.brief && !process.stdin.isTTY)) return fs.readFileSync(0, 'utf8')
  if (opts.brief && fs.existsSync(opts.brief)) return fs.readFileSync(opts.brief, 'utf8')
  if (opts.brief) return opts.brief
  throw new Error('No brief. Pass --brief <file|text|->.')
}

function runDirFor(root, name) {
  return path.join(root, '_runs', name)
}

// The lean `worker` profile (~/.codex/worker.config.toml, from claude-config home/codex/) switches off
// the desktop app's plugins and MCP servers, so every model call in a run carries less context.
export function profileFor(opts, exists = fs.existsSync, codexHome = path.join(os.homedir(), '.codex')) {
  if (opts.profile === 'none') return null
  if (opts.profile) return opts.profile
  return exists(path.join(codexHome, 'worker.config.toml')) ? 'worker' : null
}

export function codexArgs({ model, effort, cwd, lastPath, resumeId, profile }) {
  const args = ['exec']
  if (profile) args.push('-p', profile)
  if (resumeId) args.push('resume', resumeId)
  args.push('--json', '--skip-git-repo-check', '-o', lastPath)
  if (!resumeId) args.push('-C', cwd)
  if (model) args.push('-m', model)
  if (effort) args.push('-c', `model_reasoning_effort=${effort}`)
  args.push('-') // brief on stdin
  return args
}

// Finds a codex binary that can be spawned without a shell (no cmd.exe quoting).
// Order: $CODEX_BIN, the Codex desktop app's bundled exe (kept updated and signed in by the app),
// the npm global package, plain `codex`.
export function resolveCodex(env = process.env, exists = fs.existsSync) {
  if (env.CODEX_BIN) return { cmd: env.CODEX_BIN, pre: [] }
  if (process.platform === 'win32') {
    const desktop = path.join(env.LOCALAPPDATA || '', 'OpenAI', 'Codex', 'bin')
    if (exists(desktop)) {
      const builds = fs
        .readdirSync(desktop)
        .map((d) => path.join(desktop, d, 'codex.exe'))
        .filter((p) => exists(p))
        .sort((a, b) => fs.statSync(b).mtimeMs - fs.statSync(a).mtimeMs)
      if (builds.length) return { cmd: builds[0], pre: [] }
    }
    const npmJs = path.join(env.APPDATA || '', 'npm', 'node_modules', '@openai', 'codex', 'bin', 'codex.js')
    if (exists(npmJs)) return { cmd: process.execPath, pre: [npmJs] }
  }
  return { cmd: 'codex', pre: [] }
}

function runCodex({ args, cwd, brief, eventsPath, timeoutMin }) {
  return new Promise((resolve) => {
    const log = fs.createWriteStream(eventsPath, { flags: 'a' })
    const { cmd, pre } = resolveCodex()
    const child = spawn(cmd, [...pre, ...args], { cwd, stdio: ['pipe', 'pipe', 'pipe'] })
    child.on('error', (err) => log.write(JSON.stringify({ type: 'error', message: `spawn ${cmd}: ${err.message}` }) + '\n'))
    let timedOut = false
    const timer = setTimeout(() => {
      timedOut = true
      child.kill()
    }, timeoutMin * 60_000)
    child.stdout.pipe(log, { end: false })
    child.stderr.pipe(log, { end: false })
    child.stdin.on('error', () => {})
    child.stdin.end(brief)
    child.on('close', (code) => {
      clearTimeout(timer)
      log.end(() => resolve({ exitCode: code ?? 1, timedOut }))
    })
  })
}

async function finish({ meta, runDir, exitCode, timedOut }) {
  const eventsText = fs.readFileSync(path.join(runDir, 'events.jsonl'), 'utf8')
  const events = summarizeEvents(eventsText)
  const lastPath = path.join(runDir, 'last.md')
  const lastExists = fs.existsSync(lastPath) && fs.statSync(lastPath).size > 0
  const status = decideStatus({ exitCode, events, lastExists, timedOut })
  if (events.threadId) meta.threadId = events.threadId
  const wt = meta.worktree
  const commits = wt ? git(wt, ['log', '--oneline', `${meta.baseSha}..HEAD`], { check: false }) : ''
  const dirty = wt ? git(wt, ['status', '--porcelain'], { check: false }) : ''
  const summary = {
    status,
    name: meta.name,
    branch: meta.branch,
    worktree: wt,
    threadId: meta.threadId,
    commits: commits ? commits.split('\n').length : 0,
    uncommitted: dirty ? dirty.split('\n').length : 0,
    report: lastExists ? lastPath : null,
    events: path.join(runDir, 'events.jsonl'),
    usage: events.usage,
    error: events.failed,
  }
  meta.runs.push({ at: new Date().toISOString(), status, exitCode })
  fs.writeFileSync(path.join(runDir, 'meta.json'), JSON.stringify(meta, null, 2))
  console.log(JSON.stringify(summary))
  if (lastExists) console.log(`\n--- codex report (${lastPath}) ---\n${fs.readFileSync(lastPath, 'utf8')}`)
  return status === 'done' ? 0 : status === 'rate_limited' ? 3 : 1
}

/* ------------------------------------------------------------------ */
/* Commands                                                            */
/* ------------------------------------------------------------------ */

async function cmdRun(opts) {
  const repo = git(path.resolve(opts.repo || '.'), ['rev-parse', '--show-toplevel'])
  const repoName = path.basename(repo)
  const name = opts.name || `${repoName}-${slugify(opts.branch || opts.title || 'task')}-${Date.now().toString(36)}`
  const root = opts.root || DEFAULTS.root
  const runDir = runDirFor(root, name)
  fs.mkdirSync(runDir, { recursive: true })
  const brief = readBrief(opts)
  fs.writeFileSync(path.join(runDir, 'brief.md'), brief)

  const base = opts.base || 'HEAD'
  const baseSha = git(repo, ['rev-parse', base])
  let worktree = repo
  let branch = git(repo, ['rev-parse', '--abbrev-ref', 'HEAD'])
  if (!opts['no-worktree']) {
    branch = opts.branch || `codex/${slugify(opts.title || name)}`
    worktree = path.join(root, name)
    git(repo, ['worktree', 'add', '-b', branch, worktree, baseSha])
  }

  const effort = opts.effort || DEFAULTS.effort
  if (!EFFORTS.has(effort)) throw new Error(`Unknown effort "${effort}". Use one of: ${[...EFFORTS].join(', ')}`)
  const meta = { name, repo, branch, worktree, baseSha, model: opts.model || null, effort, threadId: null, runs: [] }
  fs.writeFileSync(path.join(runDir, 'meta.json'), JSON.stringify(meta, null, 2))

  const args = codexArgs({ model: opts.model, effort, cwd: worktree, lastPath: path.join(runDir, 'last.md'), profile: profileFor(opts) })
  const timeoutMin = Number(opts.timeout || DEFAULTS.timeoutMin)
  const res = await runCodex({ args, cwd: worktree, brief, eventsPath: path.join(runDir, 'events.jsonl'), timeoutMin })
  return finish({ meta, runDir, ...res })
}

async function cmdResume(opts) {
  const name = opts._[0]
  if (!name) throw new Error('Usage: codex-worker resume <name> --brief <file|text|->')
  const root = opts.root || DEFAULTS.root
  const runDir = runDirFor(root, name)
  const meta = JSON.parse(fs.readFileSync(path.join(runDir, 'meta.json'), 'utf8'))
  if (!meta.threadId) throw new Error(`Run ${name} has no Codex thread id to resume.`)
  const brief = readBrief(opts)
  fs.appendFileSync(path.join(runDir, 'brief.md'), `\n\n--- follow-up ${new Date().toISOString()} ---\n${brief}`)
  const lastPath = path.join(runDir, 'last.md')
  fs.rmSync(lastPath, { force: true })
  const args = codexArgs({ model: opts.model || meta.model, effort: opts.effort || meta.effort, lastPath, resumeId: meta.threadId, profile: profileFor(opts) })
  const timeoutMin = Number(opts.timeout || DEFAULTS.timeoutMin)
  const res = await runCodex({ args, cwd: meta.worktree, brief, eventsPath: path.join(runDir, 'events.jsonl'), timeoutMin })
  return finish({ meta, runDir, ...res })
}

function cmdList(opts) {
  const dir = path.join(opts.root || DEFAULTS.root, '_runs')
  if (!fs.existsSync(dir)) return console.log('No runs.'), 0
  for (const name of fs.readdirSync(dir)) {
    const metaPath = path.join(dir, name, 'meta.json')
    if (!fs.existsSync(metaPath)) continue
    const m = JSON.parse(fs.readFileSync(metaPath, 'utf8'))
    const last = m.runs.at(-1)
    console.log(`${name}  ${m.branch}  ${last ? last.status : 'running'}  ${m.worktree}`)
  }
  return 0
}

function cmdClean(opts) {
  const name = opts._[0]
  if (!name) throw new Error('Usage: codex-worker clean <name>')
  const root = opts.root || DEFAULTS.root
  const runDir = runDirFor(root, name)
  const meta = JSON.parse(fs.readFileSync(path.join(runDir, 'meta.json'), 'utf8'))
  if (meta.worktree !== meta.repo) {
    git(meta.repo, ['worktree', 'remove', '--force', meta.worktree], { check: false })
    git(meta.repo, ['worktree', 'prune'], { check: false })
    // -d only deletes a branch that is already merged; unmerged work is kept.
    const del = spawnSync('git', ['branch', '-d', meta.branch], { cwd: meta.repo, encoding: 'utf8' })
    if (del.status !== 0) console.log(`Branch ${meta.branch} kept (not merged).`)
  }
  fs.rmSync(runDir, { recursive: true, force: true })
  console.log(`Cleaned ${name}`)
  return 0
}

const HELP = `codex-worker: Codex builders for the Claude orchestrator

  codex-worker run --brief <file|text|-> [--title t] [--repo .] [--branch codex/x]
                   [--base HEAD] [--effort medium] [--model m] [--timeout 30] [--no-worktree]
                   [--profile worker|none]   default: worker when ~/.codex/worker.config.toml exists
  codex-worker resume <name> --brief <file|text|->   follow-up to the same Codex thread
  codex-worker list
  codex-worker clean <name>                          remove worktree, merged branch and run folder

Prints one JSON line {status, name, branch, worktree, threadId, commits, report, ...}
then Codex's final report. Exit 0 done, 3 rate-limited (fall back to Sonnet), 1 otherwise.
Runs live in ${DEFAULTS.root}.`

async function main() {
  const { cmd, opts } = parseArgs(process.argv.slice(2))
  switch (cmd) {
    case 'run':
      return cmdRun(opts)
    case 'resume':
      return cmdResume(opts)
    case 'list':
      return cmdList(opts)
    case 'clean':
      return cmdClean(opts)
    default:
      console.log(HELP)
      return 0
  }
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main()
    .then((code) => process.exit(code))
    .catch((err) => {
      console.error(`codex-worker: ${err.message}`)
      process.exit(1)
    })
}
