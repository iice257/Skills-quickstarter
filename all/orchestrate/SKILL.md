---
name: orchestrate
description: Run this session as the orchestrator: the frontier-tier model plans, reviews and merges, medium-tier agents do the building, small-tier agents take tiny well-defined tasks, and every agent with subagents reviews their work. Use when the owner types /orchestrate or says we're orchestrating.
argument-hint: "[goal]"
---

# orchestrate

Work in model tiers, not fixed model names, so this stays accurate as new models ship.

- **Frontier tier (the boss):** the biggest, most capable model available. It is the brains: it researches, plans, writes specs, orchestrates, reviews, merges and handles ops. It does not build.
- **Medium tier (the executors):** relentless, non-stop execution of the build work. They grind until it is perfect and handle everything in between. A medium model is the better subagent for a frontier model, so hand work to medium agents by default.
- **Small tier:** only for absolutely small, well-defined tasks. The frontier model can hand those to small agents, but should usually hand work to medium agents. A medium agent hands its own small, well-defined subtasks to small agents.
- **Line-manager rule:** any agent that has subagents is a line manager. It must inspect the work it receives and confirm it meets the standards before accepting it as complete and moving on. Inspect thoroughly but efficiently: the goal is the best output from the agents with the most efficient use of tokens.

## Two accounts, two quota pools

The owner runs Claude Pro and ChatGPT Plus side by side. Claude Pro is the scarcer pool, so the boss stays lean and the build work runs on the ChatGPT plan through Codex. A different model family building and reviewing also catches more mistakes than one model checking itself.

| Tier | Today | Account | How to call it |
|---|---|---|---|
| Frontier (boss) | Opus 5.5 (`claude-opus-5-5`) | Claude Pro | this session |
| Medium (default builder) | GPT-6.1 Sol in Codex | ChatGPT Plus | `codex-worker run ... --effort medium` |
| Medium (fallback) | Sonnet 5.5 (`model: "sonnet"`) | Claude Pro | Agent tool, `isolation: "worktree"` |
| Small | Codex `--effort low`, or Haiku 5.5 (`model: "haiku"`) for quick read-only lookups | either | `codex-worker` / Agent tool |

- Effort on Codex: `low` for mechanical edits, `medium` by default, `high` for hard features, `xhigh` only for a stubborn bug. Higher effort burns the Plus window fast.
- Fall back to Sonnet only when Codex is rate-limited (`codex-worker` exits 3, `status: "rate_limited"`), or the task needs Claude-only tools (claude.ai artifacts, Claude Docs, the browser pane, MCP connectors only Claude has).
- At most 2-3 Codex builders at once on Plus. Batch tiny tasks into one brief: each model call in a run resends about 19k tokens of base context (with the lean `worker` profile, which `codex-worker` uses automatically), and most of a run's input is cached.

## codex-worker

`codex-worker` (bundled in this skill's `bin/`; copy it onto your PATH, and `worker.config.toml` into `~/.codex/` as the lean `worker` profile) runs one Codex builder in its own git worktree and branch, and prints one JSON line plus Codex's final report.

```bash
codex-worker run --title "<slug>" --brief <plan.md|-> [--effort medium] [--base main] [--timeout 30]
codex-worker resume <name> --brief "<review fixes>"   # same Codex thread, same worktree
codex-worker list
codex-worker clean <name>                            # after merging: worktree, merged branch, run folder
```

- Start every run with the Bash tool and `run_in_background: true`. The harness wakes you when it exits, so never poll.
- A run counts as done only when exit code 0, a `turn.completed` event and the report file all agree (`status: "done"`).
- Worktrees live in `~/.codex-worktrees/<name>`, and logs in `~/.codex-worktrees/_runs/<name>/` (`brief.md`, `events.jsonl`, `last.md`, `meta.json`).
- Runs cap at 30 minutes. Split bigger work into chunks and resume with a digest rather than one long run.

## Briefs: don't pay twice

A brief that already contains the finished code makes the builder re-type it, re-run it and re-explain it, which costs the tokens twice and adds retyping mistakes.

- **A brief states** the goal, the files and area, the constraints and rules, the design decisions the boss made (as decisions, with the why), exact values only where precision matters (copy, colours, API shapes, one-line regexes), the commands to verify, and what done looks like.
- **A brief never contains** a full function, component, stylesheet or test body that the builder is expected to copy in. If you catch yourself writing that, stop: either you are building (not allowed), or the work is deterministic and should be handled as below.
- **Deterministic work** (a codemod, rename, regeneration, format pass, dependency bump) is a script or patch file saved to the scratchpad. The brief tells the builder to run it, check the result and fix what fails. The boss writes the tool, not prose around it, and tests it once.
- **Cost test before dispatch:** if the brief would be about as long as the change, the brief is the wrong tool. Use the deterministic route above, or shrink the brief to goal, constraints and checks and let the builder write the code.
- **Small, fully specified edits** (a few lines, exact text known) go to a small-tier agent at `--effort low` or Haiku with the exact edit, not to a medium builder with a long brief.
- **Reuse, don't restate.** Point at the file, spec or existing code to follow instead of pasting it. Keep the brief under about a page; a longer one usually means the design is not finished.

## Steps

1. **Restate.** Restate the goal (`$ARGUMENTS`, or the conversation) in 3-5 lines. Ask only questions that are genuinely blocking.
2. **Explore read-only.** Use a read-only Explore subagent, or your own Read, Grep and Glob, to map the relevant code.
3. **Write the spec and plans.** Write the spec to `docs/superpowers/specs/YYYY-MM-DD-<topic>-design.md`. Split independent workstreams into separate plans at `docs/superpowers/plans/`, each with exact files, interfaces and tests. Commit them on a plan branch.
4. **Dispatch builders.** One builder per workstream, on Codex by default: `codex-worker run --title <slug> --brief <plan path> --base <plan branch>` in the background. Parallel builders each get their own worktree automatically.
   - Each brief is self-contained (and follows "Briefs: don't pay twice" above): the plan path, the rules, which files are off-limits because of parallel work, the commands to run before each commit, "commit on your branch, no push, PR or merge", and the report format (what changed, test results, open issues).
   - Workstreams that touch the same files run in sequence, not in parallel.
   - Sonnet fallback: Agent tool with `model: "sonnet"`, `isolation: "worktree"` and `run_in_background: true`, with the same brief.
5. **Never build yourself.** The frontier orchestrator builds nothing: no product code, scripts or config edits. It only reads, plans, reviews, merges and does ops (secrets, releases, deploy hooks, workflow runs).
6. **Resume, don't redo.** If a builder stops (rate limit or error), resume that same builder: `codex-worker resume <name>` for Codex, SendMessage for a Sonnet agent. If Codex stays limited, hand the remaining plan and the branch to a Sonnet builder.
7. **Review each branch (line-manager rule).** Every agent that has subagents reviews their work before accepting it; the orchestrator does the same for its builders.
   - Read the diff of key files (`git -C <worktree> diff <base>...HEAD`).
   - Run the checks and tests in its worktree.
   - Do a browser check for UI changes.
   - Send fixes back to the same builder (`codex-worker resume`).
   - Cross-family review: Claude reviews Codex's work; for work Sonnet built, also get a Codex review (`codex exec review` in the worktree, or `/codex:review` if the Codex plugin is installed).
8. **Land the work.** Merge the branch and use `ship`, or a PR plus a merge once CI is green. Then `codex-worker clean <name>` (or remove the Sonnet worktree) and delete merged branches.
9. **Keep the owner informed.** Short status lines: what is running, what landed, and what needs them. Never ask them to relay messages between sessions.
