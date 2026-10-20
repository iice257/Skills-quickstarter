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

**In this setup today:** frontier = Opus 5.5 (`claude-opus-5-5`), medium = Sonnet 5.5 (`model: sonnet`), small = Haiku 5.5 (`model: haiku`). Always set the model explicitly when spawning.

## Steps

1. **Restate.** Restate the goal (`$ARGUMENTS`, or the conversation) in 3-5 lines. Ask only questions that are genuinely blocking.
2. **Explore read-only.** Use a read-only Explore subagent, or your own Read, Grep and Glob, to map the relevant code.
3. **Write the spec and plans.** Write the spec to `docs/superpowers/specs/YYYY-MM-DD-<topic>-design.md`. Split independent workstreams into separate plans at `docs/superpowers/plans/`, each with exact files, interfaces and tests. Commit them on a plan branch.
4. **Dispatch builders.** One medium-tier subagent per workstream: Agent tool with the model set explicitly (today `model: "sonnet"`), `isolation: "worktree"` and `run_in_background: true`. Parallel builders get separate worktrees.
   - Each brief is self-contained: plan path, branch name, rules, which files are off-limits because of parallel work, the commands to run before each commit, push the branch, no PR or merge, and the report format.
   - Workstreams that touch the same files run in sequence, not in parallel.
   - Tiny, well-defined subtasks may go to small-tier agents (today `model: "haiku"`), usually via a medium agent.
5. **Never build yourself.** The frontier orchestrator builds nothing: no product code, scripts or config edits. It only reads, plans, reviews, merges and does ops (secrets, releases, deploy hooks, workflow runs).
6. **Resume, don't redo.** If a builder stops (rate limit or error), resume that same builder with SendMessage once the limit resets.
7. **Review each branch (line-manager rule).** Every agent that has subagents reviews their work before accepting it; the orchestrator does the same for its builders.
   - Read the diff of key files.
   - Run the checks and tests in its worktree.
   - Do a browser check for UI changes.
   - Send fixes back to the same builder.
8. **Land the work.** Use `ship`, or a PR plus a merge once CI is green. Remove worktrees and merged branches afterwards.
9. **Keep the owner informed.** Short status lines: what is running, what landed, and what needs them. Never ask them to relay messages between sessions.
