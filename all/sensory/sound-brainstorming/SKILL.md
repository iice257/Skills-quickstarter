---
name: sound-brainstorming
description: Audition sounds before shipping one. Synthesises 3-5 candidate sounds (UI clicks, hovers, transitions, scroll-linked swells, ambient beds, notifications) as Web Audio code on one local page with play buttons, built on the project's own sound engine, helpers and scale when it has one, so the user picks by ear before any code is touched. Use when the user says "brainstorm a sound", "what should X sound like", "give me sound options", "add sound to", "let me pick the sound", "sound design", or when adding any sound where one guess would likely miss. Do NOT use for wiring up an already chosen sound file or for volume and mute fixes.
---

# Sound Brainstorming

Let the user listen, not read. Before any sound ships, put 3-5 candidates on one page they can play, compare and remix. Then output paste-ready code for the pick.

## 1. Ground in the real thing (read, don't ask)

Find the project's audio before writing a note:
- **Engine:** an existing Web Audio context, master bus, helpers (oscillator, noise, envelope, sweep), scale or tuning, and the voice and ID registry.
- **Palette:** the sounds already shipped (their pitch, length, loudness, timbre), so new candidates sit in the same family.
- **Context:** what triggers the sound (click, hover, scroll progress, theme change), how often, and what plays underneath (an ambient bed).

Port the project's own helpers into the page so the candidates sound like they belong and the pick drops straight back in. With no engine (new project), build from scratch on `assets/audition.html`'s built-in helpers and say so in one line.

## 2. Interview (only what the repo can't tell you)

One sharp question at a time, at most three. Usually: the feeling (soft, glassy, punchy, cinematic), how often it fires, and any reference ("like a camera shutter", "like the hero swell"). Skip it if the request is already clear.

## 3. Make the candidates

Copy `assets/audition.html` into the session scratchpad (never into the user's repo) and fill the `CANDIDATES` array:
- **3-5 candidates**, each with a name, a one-line character ("airy, rising, 1.2 s") and a `play(ctx, out, t)` function.
- **Real alternatives:** vary timbre, envelope, pitch motion and length. Not just volume.
- **Unlock and safety:** audio unlocks on the first click and never autoplays. Keep everything under the page limiter, with peaks around -6 dBFS.
- **Play in context** when it matters: turn on the looping bed for sounds that sit over ambience, or the progress slider for scroll- and motion-linked sounds, so the user hears it as it will actually fire.

Open the page for the user and list the candidates in one line each.

## 4. Iterate to a pick

Expect remixes: "B but shorter", "C's attack with A's tail". Update the same page (bump the round number) and keep the earlier candidates in a collapsed "previous round" group. Repeat until the user picks.

## 5. Hand off

Output the pick as code in the project's own voice format: the same helper calls, scale and registry entry, plus any debounce or trigger rule. Then wire it in. The audition page is a reference, not code to ship. Delete the scratch files when done.

## Rules

- Nothing ships before a pick, unless the user says to skip.
- Synthesise by default. Use sample files only if the project already does.
- Short and quiet beats long and loud: UI sounds are usually 40-400 ms, and transitions under 1.5 s.
