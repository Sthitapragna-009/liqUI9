---
name: hig-foundations
description: Apple Human Interface Guidelines foundations for UI and UX designers — the eight design principles, platform characteristics (iOS, iPadOS, iPhone Duo, macOS, tvOS, visionOS, watchOS, games), color and system colors, Dark Mode, materials and Liquid Glass color rules, typography and Dynamic Type sizes, SF Pro tracking, SF Symbols, icons, app icons and Icon Composer, images, layout and size classes, motion, spatial layout, immersion, accessibility, inclusion, privacy, writing, branding and right-to-left. Use when designing, specifying or critiquing any screen meant to feel at home on Apple platforms, when choosing colors, type scales, spacing or touch-target sizes, when writing UI copy or permission prompts, or when someone asks "what does the HIG say about…".
---

# HIG foundations

Paraphrased, link-backed digests of every page in Apple's *Getting started* and *Foundations* sections (27 pages), synced 2026-11-17. Apple's text is not copied; every section links to the source page. Read the source before relying on a rule for shipping work.

## How to use this skill

1. Identify the platform(s) and the question. Load **only** the reference file that covers it (table below) — they are long.
2. Answer with the rule, the reason, and the concrete value (sizes, ratios, colours) when one exists. Cite the Apple page link from the reference.
3. When a rule depends on platform, say which platform. Never generalise an iOS value to macOS or watchOS.
4. If the question is about components (buttons, tab bars, sheets…), patterns (onboarding, loading…), inputs or Apple technologies (Apple Pay, Live Activities…), switch to the **hig-components** skill. For building glass on the web, in Figma or in SwiftUI, use **liquid-glass-web**. For auditing a design, use **hig-review**.

| Question about | Read |
|---|---|
| Principles; what makes iOS / iPadOS / Mac / TV / Vision Pro / Watch / iPhone Duo different; games | `references/getting-started.md` |
| Colour, system colour values, semantic colours, Dark Mode, materials, Liquid Glass variants and tint | `references/color-dark-mode-materials.md` |
| Typography, Dynamic Type tables, tracking, SF Symbols, interface icons, standard action symbols, app icons, image formats | `references/type-symbols-icons-images.md` |
| Layout, size classes, safe areas, tvOS grids, motion, spatial layout, immersion | `references/layout-motion-spatial.md` |
| Accessibility, inclusion, privacy and permissions, UX writing, branding, right-to-left | `references/accessibility-inclusion-writing.md` |

## The numbers designers ask for most

| | iOS / iPadOS | macOS | tvOS | visionOS | watchOS |
|---|---|---|---|---|---|
| Default / minimum text | 17 / 11 pt | 13 / 10 pt | 29 / 23 pt | 17 / 12 pt | 16 / 12 pt |
| Default / minimum target | 44×44 / 28×28 pt | 28×28 / 20×20 pt | 66×66 / 56×56 pt | 60×60 / 28×28 pt | 44×44 / 28×28 pt |

- Contrast: 4.5:1 for text up to 17 pt; 3:1 for 18 pt+ or bold. Aim for 7:1 on custom colours in Dark Mode.
- Spacing around controls: ~12 pt for bezeled, ~24 pt for borderless.
- Text scaling: support at least 200% (watchOS 140%).
- iOS Large (default) body: 17/22 pt Regular; Large Title 34/41.

## Rules that are easy to get wrong

- **Liquid Glass is for the functional layer** (bars, controls, navigation) — never for content cards, lists or backgrounds. Content uses standard materials or solid fills.
- **Glass has no colour of its own.** Tint only the one primary action, on its background not its label. Over colourful content keep bar labels monochrome.
- **Clear glass** only over rich media, with a ~35% dark dim layer when the content is bright.
- **Separate controls from content with glass and scroll edge effects**, not with solid or semi-opaque bars.
- **Never colour-only meaning.** Pair colour with shape, text or symbol.
- **Don't ship an in-app light/dark switch**; follow the system.
- **Simplicity is not minimalism.** Keep what matters close; don't bury everything to look clean.
- **Purpose strings** are one active, specific sentence ("The app records during the night to detect snoring sounds.").
- **Buttons are verbs** ("Send", not "Let's do it!"); never "Click here"; no "we" in errors.

## Licensing reminders

SF Pro, SF Compact, New York and SF Symbols are licensed for Apple-platform design only. For web prototypes use the visitor's system font stack (`-apple-system, BlinkMacSystemFont, "SF Pro Text", system-ui, sans-serif`), which renders San Francisco on Apple devices without bundling it. Never redraw Apple marks (Apple logo, Apple Pay, Sign in with Apple, Activity rings).
