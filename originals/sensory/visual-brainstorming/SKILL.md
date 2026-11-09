---
name: visual-brainstorming
description: Mock it up before building it. Produces 3-5 side-by-side visual prototypes (layouts, components, screens, motion) as one local HTML page built from the project's real fonts, colours, images and components, so the user picks a direction before any code is touched. Use when the user says "mock it up first", "show me options", "prototype before building", "what could this look like", "give me a few directions", "visual brainstorm", or when a UI request is open-ended enough that one guess would likely miss. Do NOT use for small, fully specified UI edits or bug fixes.
---

# Visual Brainstorming

Show, don't guess. Before writing production code for anything visual, put 3-5 real-looking options in front of the user, let them pick or remix, and only then build.

## 1. Ground in the real thing (read, don't ask)

Read the project before drawing anything. Collect:
- **Tokens:** colour variables, type scale, spacing, radii, shadows (CSS/SCSS vars, Tailwind config, theme files).
- **Fonts:** the actual font files or Google Fonts links the site loads.
- **Assets:** logos, images, icons, posters, illustrations in `public/` or `assets/`.
- **Neighbours:** the components that sit next to the thing being designed, and their markup and CSS.

Reuse these directly (absolute `file:///` paths or copied into the scratch folder) so every option looks like it already belongs. If the project has none (new project, empty repo), build from scratch and say so in one line.

## 2. Interview (only what the repo can't tell you)

One sharp question at a time, at most three in total. Usually: what it must do, what it must not look like, and any reference. Skip it entirely if the request is already clear.

## 3. Make the options

Copy `assets/picker.html` into the session scratchpad (never into the user's repo) and fill one `<section class="option">` per direction:
- **3-5 options, labelled A-E**, each with a one-line take ("A: editorial, type-led, no chrome").
- **Real directions, not variations of one idea:** change composition, hierarchy or motion, not just colour.
- **Real content:** the project's real copy, names and images. No lorem ipsum.
- **Responsive:** each option works at phone width, and the picker's desktop/mobile toggle shows both.
- **Motion:** include it when it matters. Keep it CSS or a few lines of JS so the page stays self-contained.

Open the page for the user (in-app browser, an Artifact, or the file path) and give a one-line summary per option.

## 4. Iterate to a pick

Expect remixes: "B but tighter", "A's layout with C's type". Update the same page (bump the round number) and keep earlier rounds collapsed at the bottom for comparison. Repeat until the user says which one.

## 5. Hand off

Write down the approved option as a short build spec: structure, tokens used, assets, motion and responsive behaviour. Then build it in the real codebase with the project's own components. The mockup is the reference, not code to paste. Delete the scratch files when done.

## Rules

- No production code before a pick, unless the user says to skip.
- Use the project's look unless asked to explore beyond it. Then label which options break from it.
- Fewer, better options. Three strong ones beat five weak ones.
