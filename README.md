# LiqUI

**Liquid Glass and Apple's Human Interface Guidelines, as Claude skills for designers.**

**[See the live demo →](https://sthitapragna-009.github.io/liqui-hig/demo/)** (real refraction in Chrome, Edge and Arc; Safari and Firefox show a frosted fallback)

LiqUI is a Claude Code plugin that gives Claude a working knowledge of every page of Apple's Human Interface Guidelines (158 pages, paraphrased and linked), plus a real web implementation of Liquid Glass — refraction, specular rim, liquid motion — that holds up next to the system, not the usual frosted rectangle with a border.

Use it to design screens, spec components, build web or Remotion prototypes, set up Figma glass layers, hand off to SwiftUI, and audit work against the HIG.

## What's inside

| Skill | Use it for |
|---|---|
| `hig-foundations` | Principles, platforms (incl. iPhone Duo), colour and system colour values, Dark Mode, materials, typography and Dynamic Type tables, SF Symbols, icons, layout, motion, spatial design, accessibility, inclusion, privacy, writing, branding, right-to-left |
| `hig-components` | All 64 components, 25 patterns, 13 inputs and 29 technologies: tab bars to Live Activities and the Dynamic Island, onboarding to charting data, gestures to Apple Pencil, Apple Pay to Generative AI |
| `liquid-glass-web` | When glass is allowed, Regular/Clear/Tinted, the refraction recipe for HTML/CSS/React/Remotion, liquid motion (materialize, stretch, squish, morph), Figma recipes, SwiftUI handoff map |
| `hig-review` | Structured audits with prioritised, link-backed findings and a glass triage table |

Plus a small framework-free kit:

- `kit/liqui-glass.js` — the glass engine (SVG displacement lens with chromatic dispersion, automatic frosted fallback, press squish, spring and liquid-stretch helpers)
- `kit/liqui.css` — HIG system-colour tokens (light, dark), type scale, the glass layer stack, accessibility fallbacks, buttons, segmented control, slider, toggle, tab bar, toolbar, scroll edge effect
- `kit/react/LiquidGlass.tsx` — React/Remotion wrapper
- `demo/index.html` — a live gallery of everything

## Install

### Claude Code

```bash
/plugin marketplace add Sthitapragna-009/liqui-hig
```

```bash
/plugin install liqui-hig@liqui
```

Then just ask: *"Design a settings screen for iPhone that follows the HIG"*, *"Build a Liquid Glass tab bar in React"*, *"Review this Figma frame against the HIG"*.

### Claude.ai or the desktop app

Zip any folder under `skills/` (for example `skills/liquid-glass-web`) and upload it in **Settings → Capabilities → Skills**.

## Run the demo

```bash
node scripts/serve.mjs
```

Open <http://localhost:4321/demo/>, or use the hosted copy at <https://sthitapragna-009.github.io/liqui-hig/demo/>. Real refraction renders in Chromium-based browsers (Chrome, Edge, Arc); Safari and Firefox show the frosted fallback. The page says which one you're seeing.

## Use the kit

```html
<link rel="stylesheet" href="kit/liqui.css">
<button class="btn btn--tinted btn--lg" data-glass="tinted" data-interactive>Continue</button>
<nav class="tabbar" data-glass="regular">…</nav>
<script type="module">
  import { autoGlass } from "./kit/liqui-glass.js";
  autoGlass();
</script>
```

```tsx
import { LiquidGlass } from "./kit/react/LiquidGlass";
<LiquidGlass as="button" variant="tinted" interactive className="btn btn--tinted">Pay ₹2,348</LiquidGlass>
```

## The rules LiqUI enforces

1. Glass is for the functional layer — bars, controls, navigation. Content stays solid.
2. Glass needs something behind it to bend.
3. One tinted element per view: the primary action.
4. Monochrome labels; contrast checked against the worst frame passing beneath.
5. Reduce Transparency, Increase Contrast and Reduce Motion are first-class.
6. No SF fonts bundled, no Apple marks redrawn.

## Keeping it current

Apple updates the HIG without notice. Maintainers run:

```bash
node scripts/hig-sync.mjs
```

It downloads the guidelines into a git-ignored `.hig-cache/` and lists which pages were added, removed or changed since `scripts/hig-manifest.json`. Update the matching digest, then run with `--update`. See [CONTRIBUTING.md](CONTRIBUTING.md).

## Credits and licence

Created by **[KSP](https://kspportfolio-one.vercel.app)**. The glass engine grew out of a Liquid Glass motion piece KSP built for a portfolio showreel.

- Code (`kit/`, `demo/`, `scripts/`, code samples): [MIT](LICENSE)
- Written guidance (skills, references, docs): [CC BY 4.0](LICENSE-docs)

LiqUI is an independent community project, not made or endorsed by Apple. Guidance paraphrases and links to [Apple's Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/); read Apple's pages for authoritative wording. See [NOTICE.md](NOTICE.md) for trademarks and fonts.
