---
name: liquid-glass-web
description: Design and build Apple-style Liquid Glass outside Xcode — real refraction (SVG displacement lens with chromatic dispersion, specular rim, caustics) for web prototypes in HTML, CSS, React or Remotion; Figma glass layers; and the SwiftUI glassEffect mapping for handoff. Covers when glass is allowed (functional layer only), Regular vs Clear vs Tinted, legibility and dimming, glass buttons, segmented controls, sliders, tab bars and toolbars, liquid motion (materialize, stretch, squish, morph), reduced transparency/motion/contrast, browser support and performance. Use whenever someone asks for "liquid glass", "glassmorphism", "iOS 26 glass", "Apple glass UI", frosted or refractive UI, or glass that "doesn't look like glass" (flat, tinted rectangle, border-only), in web, Figma, motion graphics or SwiftUI.
---

# Liquid Glass for the web, Figma and SwiftUI

Liquid Glass is Apple's material for the **functional layer** — controls and navigation that float above content. It bends (refracts) what's behind it, catches light on its rim, and moves like a liquid. Most "glassmorphism" on the web is only `backdrop-filter: blur()` plus a white border; that reads as a frosted page, not glass. This skill builds the real thing and keeps it within Apple's rules.

## Before building, decide whether it should be glass

Read `references/material-model.md` when unsure. The short version:

1. **Is it a control or navigation element floating over content?** (tab bar, toolbar, button, segmented control's thumb, slider thumb while dragged, floating label on a map, page-control bead.) → glass is allowed.
2. **Is it content?** (cards, list rows, charts, backgrounds, text blocks.) → **not glass.** Use a solid or standard-material surface. If the person insists on "slightly glass cards", say plainly that HIG reserves glass for controls, then offer a *frosted standard material* card (blur + low-opacity fill, no refraction, no specular rim) so the real glass controls still stand out.
3. **Is there something behind it to refract?** Glass over a flat colour looks like a tinted rectangle. Put moving or detailed content beneath (a chart line, imagery, gradients with structure, text).
4. **One tinted glass element per view** (the primary action). Everything else regular or clear.

## Variants

| Variant | Look | Use | Legibility rule |
|---|---|---|---|
| **Regular** | Refracts, blurs and adjusts luminosity behind it | Default for bars, buttons, menus, anything with text | Monochrome labels: dark over light content, light over dark |
| **Clear** | Highly translucent, refraction with almost no frost | Controls over photos and video | Add a ~35% black dim layer under it when the content is bright |
| **Tinted** | Regular glass with colour in the body | The single primary action (Done, Pay, Continue) | Colour the glass, not the label; white label on tinted body |

## Workflows

- **Web prototype (HTML/CSS/JS, React, Remotion)** → `references/web-recipe.md`, then copy from the kit in this repo (`kit/liqui.css`, `kit/liqui-glass.js`, or `kit/react/LiquidGlass.tsx`). The demo in `demo/index.html` shows every component.
- **Motion** (materialize, stretching bead, squish on press, morphing between shapes) → `references/motion.md`.
- **Figma** → `references/figma.md`.
- **SwiftUI handoff** → `references/swiftui.md`.
- **Review an existing "glass" design** → use the **hig-review** skill; its glass section lists the common failures.

## Non-negotiables

1. Glass only on the functional layer; never glass on glass (two refracting layers stacked).
2. Respect `prefers-reduced-transparency` (go solid), `prefers-contrast: more` (opaque + visible border) and `prefers-reduced-motion` (no stretch/squish/morph; cross-fade instead).
3. Labels on glass meet contrast (4.5:1 for text ≤17 pt) against the *worst* frame of the content passing beneath; test the brightest and darkest moments.
4. Don't fade glass with `opacity` — it should *materialize* (refraction and blur ramp up together with scale), and refraction collapses when an ancestor has opacity < 1.
5. Keep the number of live refracting lenses small (each is a full backdrop filter); cache displacement maps by size.
6. Never bundle SF Pro or redraw Apple marks. Use the system font stack.
7. Real SVG refraction inside `backdrop-filter` renders in Chromium-based browsers. Safari and Firefox get the frosted fallback automatically from the kit — say so in deliverables, and never present a Chromium screenshot as how it looks everywhere.
