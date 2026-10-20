---
name: ship
description: Commit, push, merge and deploy the finished work in one step with the owner's `ship` CLI. Use when the owner types /ship or says ship / ship it / done, ship, or at the end of a finished, verified task.
argument-hint: "[type] [summary] [flags]"
allowed-tools: Bash(ship:*), Bash(git status:*), Bash(git diff:*), Bash(git log:*)
---

# ship

Run the owner's `ship` CLI to commit, push, merge and deploy the finished work.

1. If arguments were given (`$ARGUMENTS`), use them: the first word is the type, the rest is the summary plus any flags.
2. Otherwise, work out the type and a one-sentence plain summary from the work done in this session, plus `git status` and `git diff --stat`. Pick the type:
   - `feat`: new capability
   - `fix`: bug fix
   - `perf`: speed
   - `refactor`: no behaviour change
   - `revamp`: large redesign or overhaul
   - `chore`: tooling, deps or config
   - `docs`: documentation
   - `task`: anything else small
3. Add `--full` when runtime code changed and tests exist. Add `--no-deploy` when the owner said not to deploy, or when the repo must not deploy.
4. Run `ship <type> "<summary>" [flags]` from the repo root. Ask no questions.
5. Report the summary line `ship` prints. If it fails, show the one-line reason and the failing check or hook output, then stop. Never retry with flags that skip checks (`--no-checks`) unless the owner asks.
6. Never run it for half-done or experimental work unless the owner explicitly typed /ship.

## Workflows

`ship` runs named workflows (ordered steps). `ship -w <name>`, `ship -t <alias>`, `ship <alias>` or a workflow flag selects one; ordinary types (feat, fix, ...) run `default`. `ship --list` shows every workflow, `--dry-run` works for all. Repo workflows (`.ship.json`) beat global ones (`bin/ship.workflows.json`), which beat built-ins.

When I say `ship claude.md`, `ship agents.md`, `ship --agents` or update my Claude/agent files everywhere, run `ship --agents`. It needs no type and takes an optional summary. After editing any instruction file, finish with `ship --agents`.
