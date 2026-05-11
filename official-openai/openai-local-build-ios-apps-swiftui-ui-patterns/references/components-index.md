# Components Index

Use this file to find component and cross-cutting guidance. Each entry lists when to use it.

## Available components

- TabView: `references/tabview.md` â€” Use when building a tab-based app or any tabbed feature set.
- NavigationStack: `references/navigationstack.md` â€” Use when you need push navigation and programmatic routing, especially per-tab history.
- Sheets and presentation: `references/sheets.md` â€” Use for local item-driven sheets, centralized modal routing, and sheet-specific action patterns.
- Form and Settings: `references/form.md` â€” Use for settings, grouped inputs, and structured data entry.
- macOS Settings: `references/macos-settings.md` â€” Use when building a macOS Settings window with SwiftUI's Settings scene.
- Split views and columns: `references/split-views.md` â€” Use for iPad/macOS multi-column layouts or custom secondary columns.
- List and Section: `references/list.md` â€” Use for feed-style content and settings rows.
- ScrollView and Lazy stacks: `references/scrollview.md` â€” Use for custom layouts, horizontal scrollers, or grids.
- Scroll-reveal detail surfaces: `references/scroll-reveal.md` â€” Use when a detail screen reveals secondary content or actions as the user scrolls or swipes between full-screen sections.
- Grids: `references/grids.md` â€” Use for icon pickers, media galleries, and tiled layouts.
- Theming and dynamic type: `references/theming.md` â€” Use for app-wide theme tokens, colors, and type scaling.
- Controls (toggles, pickers, sliders): `references/controls.md` â€” Use for settings controls and input selection.
- Input toolbar (bottom anchored): `references/input-toolbar.md` â€” Use for chat/composer screens with a sticky input bar.
- Top bar overlays (iOS 26+ and fallback): `references/top-bar.md` â€” Use for pinned selectors or pills above scroll content.
- Overlay and toasts: `references/overlay.md` â€” Use for transient UI like banners or toasts.
- Focus handling: `references/focus.md` â€” Use for chaining fields and keyboard focus management.
- Searchable: `references/searchable.md` â€” Use for native search UI with scopes and async results.
- Async images and media: `references/media.md` â€” Use for remote media, previews, and media viewers.
- Haptics: `references/haptics.md` â€” Use for tactile feedback tied to key actions.
- Matched transitions: `references/matched-transitions.md` â€” Use for smooth source-to-destination animations.
- Deep links and URL routing: `references/deeplinks.md` â€” Use for in-app navigation from URLs.
- Title menus: `references/title-menus.md` â€” Use for filter or context menus in the navigation title.
- Menu bar commands: `references/menu-bar.md` â€” Use when adding or customizing macOS/iPadOS menu bar commands.
- Loading & placeholders: `references/loading-placeholders.md` â€” Use for redacted skeletons, empty states, and loading UX.
- Lightweight clients: `references/lightweight-clients.md` â€” Use for small, closure-based API clients injected into stores.

## Cross-cutting references

- App wiring and dependency graph: `references/app-wiring.md` â€” Use to wire the app shell, install shared dependencies, and decide what belongs in the environment.
- Async state and task lifecycle: `references/async-state.md` â€” Use when a view loads data, reacts to changing input, or needs cancellation/debouncing guidance.
- Previews: `references/previews.md` â€” Use when adding `#Preview`, fixtures, mock environments, or isolated preview setup.
- Performance guardrails: `references/performance.md` â€” Use when a screen is large, scroll-heavy, frequently updated, or showing signs of avoidable re-renders.

## Planned components (create files as needed)

- Web content: create `references/webview.md` â€” Use for embedded web content or in-app browsing.
- Status composer patterns: create `references/composer.md` â€” Use for composition or editor workflows.
- Text input and validation: create `references/text-input.md` â€” Use for forms, validation, and text-heavy input.
- Design system usage: create `references/design-system.md` â€” Use when applying shared styling rules.

## Adding entries

- Add the component file and link it here with a short â€œwhen to useâ€ description.
- Keep each component reference short and actionable.
