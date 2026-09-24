# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Jordy's personal portfolio: a single-page, **zero-build** site. No `package.json`, no npm, no bundler, no test suite, and not a git repository.

Everything lives in four files at the repo root:

- `index.html` — all markup for every "page"
- `styles.css` — all styling (~2000 lines, sectioned by `/* --- NAME --- */` comments)
- `script.js` — all behavior, wrapped in one `DOMContentLoaded` handler, sectioned by numbered `// === N. NAME ===` banners
- `assets/CV Modern English.pdf` — CV document file

## Running

Open `index.html` directly in a browser, or serve the folder statically. There is no
Python on this machine, so use Node:

```bash
npx --yes serve -l 3000 .
```

`.claude/launch.json` holds the same command for the IDE preview runner.

There is nothing to build, lint, or test. Verification is manual: load the page and exercise the intro overlay, theme toggle, language toggle, SPA nav, projects filter, and contact form.

## Project rules (`agy.md`)

`agy.md` is the owner's playbook and is binding:

- Vanilla HTML5 / CSS3 / ES6+ only. No React, Next.js, or TypeScript. No npm packages.
- Keep the separation: structure in `index.html`, styling in `styles.css`, logic in `script.js`.
- Do not create new folders unless explicitly asked.
- Must stay fully responsive across mobile / tablet / desktop.
- Always include structured console logging for API operations (`[API REQ]`, `[API RES]`, `[API ERR]`).

`SKILL.md` is a general frontend-aesthetics skill definition, not code that runs here.

## Architecture

### Connected single-page scrolling & ScrollSpy — `script.js` §6b

All four sections (`#home`, `#about`, `#projects`, `#contact`) are `.page-section` elements in `index.html` laid out continuously on a single scrollable page. Users can scroll freely up and down from Home through About, Projects, and Contact.

Key navigation behaviors:
- **Smooth scrolling**: Header has a fixed height (`85px` desktop, `70px` mobile). Header offset is managed via `scroll-padding-top: 85px;` (mobile `70px`) and `.page-section { scroll-margin-top: 85px; contain: layout style; }`. Smooth scrolling is executed programmatically via `scrollIntoView({ behavior: 'smooth' })`, ensuring instant 1:1 hardware responsiveness for manual mouse wheel and touch scrolling without the artificial friction of CSS root `scroll-behavior: smooth`.
- **GPU layer isolation**: The page background glow is placed on an isolated `body::before` pseudo-element with `transform: translateZ(0); will-change: transform;` instead of `background-attachment: fixed`, preventing full-page CPU repaints on scroll.
- **Intro-exclusive particles**: Particle effects are scoped exclusively to `#intro-canvas` on the intro splash screen. Once dismissed, the particle system is fully stopped, eliminating all background canvas overhead and GPU compositing during scroll.
- **ScrollSpy (`IntersectionObserver`)**: Tracks the currently visible section in the viewport (`rootMargin: '-25% 0px -55% 0px'`) and updates `.active` and `aria-current="page"` on `.nav-links a`. URL hashes update gracefully with debounced `history.replaceState` to eliminate IPC hitching. Top (`scrollY < 80`) and bottom edges have dedicated boundary detectors throttled with `requestAnimationFrame`.
- **Anchor links**: All internal links (`a[href^="#"]`) smoothly scroll to their target via `scrollToSection(targetId)`. Mobile drawer closes automatically upon click (`toggleMenu(false)`).
- **Reload & deep links**: A page reload always resets to `#home` and top (`window.scrollTo(0, 0)`), while arriving from an external deep link (or back/forward `popstate`) smoothly scrolls to the target section after intro dismissal.
- **Scroll lock during splash**: `body:not(.intro-dismissed) { overflow: hidden; }` prevents scrolling behind the intro overlay until the visitor deliberately enters.

### Theming — `script.js` §9 + inline head script

Dark mode is the class `dark-theme` on `<html>` (`document.documentElement`), which swaps a block of CSS custom properties defined under `.dark-theme` in `styles.css`. Resolution order: an explicit choice in `localStorage['user_theme']` wins; otherwise the OS `prefers-color-scheme` decides. Live OS theme changes automatically update the theme and clear any manual override so the site keeps tracking the user's system options seamlessly.

The theme is resolved once, by a **blocking inline script in `<head>`** (prevents a flash of the wrong theme). §9 does *not* re-apply it on initial load — it only handles the toggle and live OS changes. If the resolution rule changes, change it in the head script and keep §9's comment in sync.

**Both palettes are Steam-inspired** — one blue hue family, inverted, so the themes read as one design in two temperatures.

- **Dark** — blue-grey ground, not black: `#171a21` chrome, `#1b2838` body, `#16202d` panels, `#2a475e` raised, `#66c0f4` signature blue, `#c7d5e0` text, `#8f98a0` muted, `#a4d007` green.
- **Light** — cool blue-grey paper with white panels: `#dfe7ee` ground, `rgba(255,255,255,.86)` panels, `#10263a` ink, `#3c5a73` / `#4a6680` secondary and muted, `#15639e` primary accent, `#1a44c2` second accent. Steam's `#66c0f4` is too light to carry text on a light ground, hence the darkened blues.

Every token in both themes clears WCAG AA 4.5:1 against its own ground (the worst case — panels only improve it), and white text clears it on both ends of the button gradient. Keep it that way when adjusting. Note that `--accent-purple` is a **structural** name (the second accent), not a literal one — it is blue in both themes now.

Theme-variant images are swapped in CSS by opacity, not in JS — e.g. `.vibe-img-light` / `.vibe-img-dark` with `.dark-theme` overrides. Add both variants as sibling `<img>` tags rather than mutating `src`.

### i18n (EN / ID) — `script.js` §1

One `translations` object with `en` and `id` maps drives everything. `applyLanguage()` rewrites:

- `textContent` of every `[data-translate]` element
- `placeholder` of every `[data-translate-placeholder]` element
- `<html lang>`, `document.title`, and the meta description (hardcoded per-language strings inside `applyLanguage`)

Adding user-visible copy means adding the key to **both** `en` and `id`, plus the `data-translate` attribute in the markup. The typewriter has its own separate `typewriterDict`, and switching language calls `resetTypewriter()`.

### Bento grid — `styles.css`

Layout is a 12-column CSS grid (`.bento-grid`) with `.col-3` … `.col-12` span utilities on `.bento-card`. Card entrance animation is gated on `body.intro-dismissed`: `.bento-fade-in` starts transparent and only reveals once the intro overlay is clicked away. New animated cards need both `bento-card` and `bento-fade-in`.

For smooth 60fps/120fps scrolling performance, `.bento-card` and `.project-card` use `contain: layout style;` and crisp high-contrast background tokens (`--card-bg`) without generic `backdrop-filter: blur()`.

In the About section, the college showcase (`.college-bento-card`, `col-7`) pairs with the academic thesis publication card (`.thesis-bento-card`, `col-5`), which features an authentic Universitas Brawijaya skripsi cover front page backdrop (`assets/thesis_cover.jpg`) under a theme-adaptive gradient scrim (`.thesis-bg-overlay`).

### Projects grid, search & filtering — `script.js` §7

The projects section uses a responsive `.bento-grid.projects-grid` with `.project-card.col-4` displaying all projects simultaneously in a 3-column desktop layout (2 columns on tablet, single column on mobile). Above the grid, `.projects-controls-header` houses category filter pills and a live search input (`#project-search-input`) with a clear button.

Each card's accent bar is a `.project-glow-gradient` with a `.glow-1` … `.glow-6` modifier; the six gradients are defined per theme in `styles.css` (both sets are Steam-family — darkened blues and green for light, brighter for dark).

Filtering and live search run through `updateProjectVisibility()`, checking both the selected category (`data-category`) and search term (matching against title, description, category, and tech tags). Non-matching cards receive `.hidden-by-filter` and delayed `display: none` (300ms). When zero cards match, `#projects-no-results` displays an interactive empty state with a "Reset Filters" action.

### Particle canvas — `script.js` §3

`setupParticleCanvas(canvasId)` powers the constellation particles exclusively on the introduction splash overlay (`#intro-canvas`). It returns a `{ stop() }` handle that cancels the rAF loop and removes all listeners; the intro instance is permanently stopped and cleared 1s after the splash overlay is dismissed. The main site uses no persistent canvas, keeping DOM scrolling 100% native and lightweight. Particle count is 45 on desktop and 25 below 768px.

Draw calls are batched into a single `ctx.stroke()` pass per frame, and rAF pauses when the browser tab is hidden via `visibilitychange`.

### Intro overlay — `script.js` §10

`#intro-overlay` is a deliberate gate — the visitor enters by clicking, tapping, or pressing a key (`enterEvents`). This is an intentional design choice by the owner: **it must not auto-dismiss on a timer.** `dismissIntro()` is idempotent and unbinds its own listeners. It must not switch the active section, or deep links break — a visitor landing on `/#projects` clicks through the splash and arrives at projects, not home. Dismissal adds `.fade-out`, restarts the typewriter only if `#home` is the active section, adds `body.intro-dismissed` after 500ms (which triggers the bento reveal), and hides the overlay + stops its particle system at 1000ms. Blob parallax follows the cursor at ±30% / -25% offsets.

### Contact form — `script.js` §8

Two modes, chosen by the `CONTACT_ENDPOINT` constant at the top of the section:

- **Endpoint set** (Formspree/Getform/Basin/a serverless function): the payload is POSTed as JSON; `response.ok` drives success vs. error state.
- **Endpoint empty** (current state): falls back to composing a `mailto:` to `CONTACT_EMAIL` and handing off to the visitor's mail client.

The invariant: **never report success for a message that was not delivered.** The form previously faked a 2s delay and always claimed success while sending nothing — do not reintroduce that. Status states are `success` / `error` / `info`, each with its own style and its own translated message key.

## Conventions

- Motion: a `prefers-reduced-motion: reduce` block at the end of `styles.css` collapses animation/transition durations and hides the particle canvases and intro blobs. New animated features should already be covered by the blanket rule, but anything driven from JS (rAF loops) needs its own check. The intro gate still stands under reduced motion; only its fade collapses.
- CSS breakpoints: 1024px, 768px, 480px. Keep new responsive rules inside the existing `@media` blocks in the `RESPONSIVE MEDIA QUERIES` section rather than scattering new ones.
- Colors, fonts, shadows, and timing all come from custom properties in `:root` / `.dark-theme`. Never hardcode a color in a new rule — add or reuse a variable so both themes stay correct.
- Fonts: `Space Grotesk` (display), `Plus Jakarta Sans` (body), `Fira Code` (mono), loaded via `@import` at the top of `styles.css`.
- New JS belongs in a numbered section inside the existing `DOMContentLoaded` block, following the same banner-comment style.
- `assets/hero_avatar.png`, `assets/robot_typing_dark.jpg`, and `assets/robot_typing_light.jpg` are currently unreferenced.
