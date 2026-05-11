# Scale Starter Pack

An agent quick skills starter pack for Codex and other agentic IDEs.

This repo gives your agent installable skill paths, scenario bundles, and MCP config examples so a fresh setup can become useful quickly. It does not run anything by itself; your agent reads the links and installs the skills you choose.

## Quick Start

Paste one of these into your AI agent:

For a lightweight quickstart:
```text
$skill-installer install the skills listed at https://github.com/iice257/Skills/tree/main/categories/lightweight-quickstart
```

For the web design/development pack:
```text
$skill-installer install the skills listed at https://github.com/iice257/Skills/tree/main/categories/web-development-setup
```

After installing skills in Codex, restart Codex so the new skills are picked up.

## Repo Structure

| Folder | Purpose |
| --- | --- |
| [`favourites/`](https://github.com/iice257/Skills/tree/main/favourites) | Max 5 high-value skills for quick installs. Current set is a working shortlist until the final favourites are chosen. |
| [`originals/`](https://github.com/iice257/Skills/tree/main/originals) | Skills authored/customized by me and other non-stock additions. |
| [`all/`](https://github.com/iice257/Skills/tree/main/all) | Canonical installable copy of every skill in this repo. Folder names match `SKILL.md` `name:` values. |
| [`categories/`](https://github.com/iice257/Skills/tree/main/categories) | Scenario bundles for different agent setups. |
| [`mcps/`](https://github.com/iice257/Skills/tree/main/mcps) | MCP config examples. |

## Favourites

Favourites are capped at 5 skills. The current list is a working starter shortlist; swap it once the final five are chosen.

| Skill | Use it when | Install |
| --- | --- | --- |
| `frontend-skill` | You want strong frontend UI defaults. | [Install](https://github.com/iice257/Skills/tree/main/favourites/frontend-skill) |
| `design-taste-frontend` | You want stricter product design judgment. | [Install](https://github.com/iice257/Skills/tree/main/favourites/design-taste-frontend) |
| `redesign-existing-projects` | You are improving an existing UI. | [Install](https://github.com/iice257/Skills/tree/main/favourites/redesign-existing-projects) |
| `image-taste-frontend` | You need high-end image-led frontend direction. | [Install](https://github.com/iice257/Skills/tree/main/favourites/image-taste-frontend) |
| `full-output-enforcement` | You need complete, non-placeholder output. | [Install](https://github.com/iice257/Skills/tree/main/favourites/full-output-enforcement) |

## Scenario Bundles

| Scenario | Best for | Link |
| --- | --- | --- |
| Lightweight quickstart | Small, useful starter setup without installing everything. | [Open](https://github.com/iice257/Skills/tree/main/categories/lightweight-quickstart) |
| Full startup | Install the full skill catalog. | [Open](https://github.com/iice257/Skills/tree/main/categories/full-startup) |
| Web development setup | Frontend, design, browser testing, CI, and deployment. | [Open](https://github.com/iice257/Skills/tree/main/categories/web-development-setup) |
| Design UI | Premium interface design and redesign work. | [Open](https://github.com/iice257/Skills/tree/main/categories/design-ui) |
| Frontend visuals | Image-led landing pages, heroes, and visual direction. | [Open](https://github.com/iice257/Skills/tree/main/categories/frontend-visuals) |
| Browser testing | Browser automation, screenshots, and visual verification. | [Open](https://github.com/iice257/Skills/tree/main/categories/browser-testing) |
| Debugging | Browser, screenshot, PR checks, and review-comment workflows. | [Open](https://github.com/iice257/Skills/tree/main/categories/debugging) |
| GitHub CI | GitHub Actions and PR review workflow. | [Open](https://github.com/iice257/Skills/tree/main/categories/github-ci) |
| Deployment | Vercel, Netlify, and deploy-readiness workflows. | [Open](https://github.com/iice257/Skills/tree/main/categories/deployment) |
| Cybersec | Security review, ownership mapping, CI, and browser verification. | [Open](https://github.com/iice257/Skills/tree/main/categories/cybersec) |
| Content media | Images, speech, transcription, screenshots, and publishing. | [Open](https://github.com/iice257/Skills/tree/main/categories/content-media) |
| Documents office | Documents, PDFs, and transcription-heavy work. | [Open](https://github.com/iice257/Skills/tree/main/categories/documents-office) |
| AI API | Gemini, image generation, speech, and transcription APIs. | [Open](https://github.com/iice257/Skills/tree/main/categories/ai-api) |
| Mobile desktop | WinUI, iOS-adjacent MCP references, screenshots, and app workflows. | [Open](https://github.com/iice257/Skills/tree/main/categories/mobile-desktop) |
| Planning productivity | Idea shaping, skill discovery, handoff, and complete output. | [Open](https://github.com/iice257/Skills/tree/main/categories/planning-productivity) |

## Originals

These are skills authored/customized by me or non-stock additions. They are referenced from `originals/` and also included canonically in `all/`.

<details open>
<summary><strong>Original skills catalog</strong></summary>

| Skill | Use it when | Link |
| --- | --- | --- |
| `design-taste-frontend` | Premium frontend/product UI judgment. | [View](https://github.com/iice257/Skills/tree/main/originals/design-taste-frontend) |
| `redesign-existing-projects` | Upgrading existing UI without losing product direction. | [View](https://github.com/iice257/Skills/tree/main/originals/redesign-existing-projects) |
| `image-taste-frontend` | Image-first visual direction for frontend work. | [View](https://github.com/iice257/Skills/tree/main/originals/image-taste-frontend) |
| `gpt-taste` | High-end UX/UI and motion-heavy design direction. | [View](https://github.com/iice257/Skills/tree/main/originals/gpt-taste) |
| `industrial-brutalist-ui` | Brutalist, mechanical, high-contrast interface direction. | [View](https://github.com/iice257/Skills/tree/main/originals/industrial-brutalist-ui) |
| `minimalist-ui` | Clean editorial-style UI. | [View](https://github.com/iice257/Skills/tree/main/originals/minimalist-ui) |
| `high-end-visual-design` | Agency-grade polish, spacing, and visual quality. | [View](https://github.com/iice257/Skills/tree/main/originals/high-end-visual-design) |
| `stitch-design-taste` | Agent-friendly design systems for Google Stitch. | [View](https://github.com/iice257/Skills/tree/main/originals/stitch-design-taste) |
| `full-output-enforcement` | Complete output with no placeholders. | [View](https://github.com/iice257/Skills/tree/main/originals/full-output-enforcement) |
| `idea-launcher` | Turning rough ideas into buildable plans and starter projects. | [View](https://github.com/iice257/Skills/tree/main/originals/idea-launcher) |
| `imessage-handoff` | iMessage handoff for Codex threads. | [View](https://github.com/iice257/Skills/tree/main/originals/imessage-handoff) |
| `x-publisher` | Drafting, validating, and preparing X/Twitter posts. | [View](https://github.com/iice257/Skills/tree/main/originals/x-publisher) |
| `find-skills` | Finding useful agent skills for a task. | [View](https://github.com/iice257/Skills/tree/main/originals/find-skills) |
| `gemini-api-dev` | Gemini model and API development. | [View](https://github.com/iice257/Skills/tree/main/originals/gemini-api-dev) |

</details>

## All Skills

`all/` is the canonical install source. Skill folder names match the skill metadata names, so install paths and invocation names do not fight each other.

<details>
<summary><strong>Open full catalog</strong></summary>

| Skill | Link |
| --- | --- |
| `design-taste-frontend` | [View](https://github.com/iice257/Skills/tree/main/all/design-taste-frontend) |
| `doc` | [View](https://github.com/iice257/Skills/tree/main/all/doc) |
| `find-skills` | [View](https://github.com/iice257/Skills/tree/main/all/find-skills) |
| `frontend-skill` | [View](https://github.com/iice257/Skills/tree/main/all/frontend-skill) |
| `full-output-enforcement` | [View](https://github.com/iice257/Skills/tree/main/all/full-output-enforcement) |
| `gemini-api-dev` | [View](https://github.com/iice257/Skills/tree/main/all/gemini-api-dev) |
| `gh-address-comments` | [View](https://github.com/iice257/Skills/tree/main/all/gh-address-comments) |
| `gh-fix-ci` | [View](https://github.com/iice257/Skills/tree/main/all/gh-fix-ci) |
| `gpt-taste` | [View](https://github.com/iice257/Skills/tree/main/all/gpt-taste) |
| `hatch-pet` | [View](https://github.com/iice257/Skills/tree/main/all/hatch-pet) |
| `high-end-visual-design` | [View](https://github.com/iice257/Skills/tree/main/all/high-end-visual-design) |
| `idea-launcher` | [View](https://github.com/iice257/Skills/tree/main/all/idea-launcher) |
| `imagegen` | [View](https://github.com/iice257/Skills/tree/main/all/imagegen) |
| `image-taste-frontend` | [View](https://github.com/iice257/Skills/tree/main/all/image-taste-frontend) |
| `imessage-handoff` | [View](https://github.com/iice257/Skills/tree/main/all/imessage-handoff) |
| `industrial-brutalist-ui` | [View](https://github.com/iice257/Skills/tree/main/all/industrial-brutalist-ui) |
| `minimalist-ui` | [View](https://github.com/iice257/Skills/tree/main/all/minimalist-ui) |
| `netlify-deploy` | [View](https://github.com/iice257/Skills/tree/main/all/netlify-deploy) |
| `pdf` | [View](https://github.com/iice257/Skills/tree/main/all/pdf) |
| `playwright` | [View](https://github.com/iice257/Skills/tree/main/all/playwright) |
| `playwright-interactive` | [View](https://github.com/iice257/Skills/tree/main/all/playwright-interactive) |
| `redesign-existing-projects` | [View](https://github.com/iice257/Skills/tree/main/all/redesign-existing-projects) |
| `screenshot` | [View](https://github.com/iice257/Skills/tree/main/all/screenshot) |
| `security-best-practices` | [View](https://github.com/iice257/Skills/tree/main/all/security-best-practices) |
| `security-ownership-map` | [View](https://github.com/iice257/Skills/tree/main/all/security-ownership-map) |
| `speech` | [View](https://github.com/iice257/Skills/tree/main/all/speech) |
| `stitch-design-taste` | [View](https://github.com/iice257/Skills/tree/main/all/stitch-design-taste) |
| `transcribe` | [View](https://github.com/iice257/Skills/tree/main/all/transcribe) |
| `vercel-deploy` | [View](https://github.com/iice257/Skills/tree/main/all/vercel-deploy) |
| `winui-app` | [View](https://github.com/iice257/Skills/tree/main/all/winui-app) |
| `x-publisher` | [View](https://github.com/iice257/Skills/tree/main/all/x-publisher) |

</details>

## MCPs

These are MCP config references, not Codex skills.

| MCP | What it is for | Config |
| --- | --- | --- |
| `xcodebuildmcp` | iOS simulator build, run, test, logging, UI automation, and debugging workflows. | [mcps/xcodebuildmcp.json](https://github.com/iice257/Skills/blob/main/mcps/xcodebuildmcp.json) |
| `cloudflare-api` | Cloudflare API access through the official Cloudflare MCP server. | [mcps/cloudflare-api.json](https://github.com/iice257/Skills/blob/main/mcps/cloudflare-api.json) |

## Notes

- This is a curated collection. Some skills are originals; some include third-party or open-source provenance in their own license files.
- Use `favourites/` or `categories/lightweight-quickstart/` for fast setup.
- Use `categories/full-startup/` only when you want the whole catalog.
