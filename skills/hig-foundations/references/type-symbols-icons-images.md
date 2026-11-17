# Typography, SF Symbols, icons and images

Paraphrased from Apple's HIG Foundations. Synced 2026-11-17. Specification numbers are Apple's published values; full tables (every Dynamic Type size, every tracking step) are on Apple's pages.

## Typography — [HIG](https://developer.apple.com/design/human-interface-guidelines/typography)

**Legibility**
- Default and minimum sizes: iOS/iPadOS 17/11 pt, macOS 13/10, tvOS 29/23, visionOS 17/12, watchOS 16/12. Thin custom fonts need to go larger than these.
- Avoid Ultralight, Thin and Light weights for UI text; use Regular, Medium, Semibold, Bold.

**Hierarchy**
- Build hierarchy with weight, size and colour together, and keep it intact when text size changes.
- Use as few typefaces as possible, even in heavily branded UI.
- When people enlarge text, enlarge what they came to read (body, dialogue), not chrome (tab titles, transient numbers).

**System fonts**
- **San Francisco**: SF Pro (iOS, iPadOS, macOS, tvOS, visionOS), SF Compact (watchOS), SF Mono, plus Arabic, Armenian, Georgian and Hebrew; most have Rounded versions. **New York** is the companion serif.
- Variable fonts with *dynamic optical sizes*: the system interpolates letterforms per point size, so you no longer pick Text vs Display — except in design tools that can't use the variable features.
- Widths include Condensed and Expanded. SF Symbols share the nine weights so icons match text.
- Don't embed the system fonts in an app; call them by design (default, serif, rounded, monospaced). Fonts are free to download for Apple-platform design but not licensed for other uses.
- In mockups, the running system adjusts tracking at every size automatically; mockups may need tracking set by hand (table below).

**Text styles** bundle weight + size + leading and scale with Dynamic Type. Modify with symbolic traits (bold, loose/tight leading). Avoid tight leading for three or more lines.

iOS/iPadOS at the default (Large) size:

| Style | Weight | Size / leading (pt) | Emphasised |
|---|---|---|---|
| Large Title | Regular | 34 / 41 | Bold |
| Title 1 | Regular | 28 / 34 | Bold |
| Title 2 | Regular | 22 / 28 | Bold |
| Title 3 | Regular | 20 / 25 | Semibold |
| Headline | Semibold | 17 / 22 | Semibold |
| Body | Regular | 17 / 22 | Semibold |
| Callout | Regular | 16 / 21 | Semibold |
| Subhead | Regular | 15 / 20 | Semibold |
| Footnote | Regular | 13 / 18 | Semibold |
| Caption 1 | Regular | 12 / 16 | Semibold |
| Caption 2 | Regular | 11 / 13 | Semibold |

Body scales from 14 pt (xSmall) to 23 pt (xxxLarge), and up to 53 pt at accessibility size AX5.

macOS built-in styles (no Dynamic Type on Mac): Large Title 26/32, Title 1 22/26, Title 2 17/22, Title 3 15/20, Headline Bold 13/16, Body 13/16, Callout 12/15, Subheadline 11/14, Footnote 10/13, Caption 1 10/13, Caption 2 Medium 10/13.

tvOS: Title 1 Medium 76/96, Title 2 57/66, Title 3 48/56, Headline 38/46, Callout 31/38, Body Medium 29/36, Captions 25 and 23.

watchOS (Large, the 40–42 mm default): Large Title 36, Title 1 34, Title 2 28, Title 3 19, Headline Semibold 16, Body 16, Caption 1 15, Caption 2 14, Footnote 1 13, Footnote 2 12. Complications use SF Compact Rounded.

**Tracking (SF Pro, iOS/macOS/tvOS/visionOS), in 1/1000 em** — useful for web `letter-spacing`:

| Size | 10 | 11 | 12 | 13 | 15 | 17 | 20 | 22 | 24 | 28 | 34 | 40 | 48 | 60 | 80+ |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| em/1000 | +12 | +6 | 0 | −6 | −16 | −26 | −23 | −12 | +3 | +14 | +12 | +10 | +8 | +4 | 0 |

Note the shape: tightest around 17–20 pt (body), then *positive* through display sizes, because SF Pro's variable optical sizing already tightens large text. New York tracks steadily negative as it grows (−16 at 72 pt). SF Pro Rounded tracks positive throughout. SF Compact tracks increasingly negative above 20 pt.

**Custom fonts**: must be legible at the minimum sizes and must support Dynamic Type and Bold Text themselves. A common pattern: custom font for headlines, system font for body and captions.

**Dynamic Type**
- Layout must work at every size, including AX sizes: turn horizontal rows into stacks, let rows grow, let labels wrap.
- Scale meaningful icons with text (SF Symbols do).
- Show about as much text at the largest accessibility size as at the largest standard size; truncate in scroll views only if a detail view shows the rest.
- Reduce column counts at large sizes. Keep primary elements at the top.

**Platform notes**: macOS offers dynamic system font variants matching controls, menus, tooltips etc. visionOS uses bolder body/title styles, adds Extra Large Title 1/2, prefers flat (2D) text, white text on glass, bold for text without a background (no shadows), and *billboarding* (labels turn to face the viewer).

## SF Symbols — [HIG](https://developer.apple.com/design/human-interface-guidelines/sf-symbols)

Thousands of symbols that align with San Francisco at every weight and size. Licensed for Apple-platform apps; never in app icons, logos or trademarks, and Apple-product symbols can't be customised.

- **Rendering modes**: Monochrome (one colour), Hierarchical (one colour, varying opacity by layer), Palette (one colour per layer), Multicolor (intrinsic meaning colours: green leaf, red trash.slash). Check each in context; automatic picks the preferred one.
- **Gradients** (SF Symbols 7+): smooth linear gradient from one colour; best at large sizes.
- **Variable colour**: fills layers by threshold (0–100%) to show change over time — volume, signal, capacity. Not for depth (use Hierarchical for that).
- **Weights and scales**: nine weights matching SF; three scales (small, medium, large) relative to cap height, to change emphasis without breaking weight matching.
- **Variants**: outline (default; good beside text, in toolbars and lists), fill (emphasis, selection, iOS tab bars, swipe actions), slash (unavailable), enclosed (circle/square; legible at small sizes). Many script-specific variants switch with the device language. Containers often pick the variant for you.
- **Animations**: Appear, Disappear, Bounce (one-off "this happened"), Scale (persistent emphasis), Pulse (opacity, ongoing activity), Variable Color (cumulative or iterative; open-loop vs closed-loop symbols), Replace (down-up = state change, up-up = forward progress, off-up = next action), Magic Replace (default; morphs related shapes such as adding a slash), Wiggle (call attention), Breathe (opacity + size, e.g. recording), Rotate (whole or by layer), Draw On / Draw Off (SF Symbols 7+, along guide paths). Use them sparingly, each with a clear meaning, matched to the app's tone.
- **Custom symbols**: start from an exported template; match detail, weight, alignment and perspective; simple, recognisable, inclusive, literal. Negative side margins for badged symbols. Annotate layers for animation; draw whole shapes with erase layers rather than cut-outs. Use the component library for badges and enclosures. Always give alt text.

## Icons (interface icons / glyphs) — [HIG](https://developer.apple.com/design/human-interface-guidelines/icons)

- Highly simplified, familiar metaphors directly tied to the action or content.
- One consistent size, detail level, stroke weight and perspective across every icon, custom and system. Match icon weight to adjacent text.
- Centre optically, not geometrically (bake small padding into the asset).
- Standard components draw selected states for you; don't supply one unless needed.
- Inclusive, gender-neutral figures. Text inside icons only when it *is* the meaning (bold, font size), and localise it; provide RTL versions of text-like icons.
- Vector (PDF/SVG). Alt text for every custom icon. No replicas of Apple hardware.
- **Standard symbols for common actions**: cut `scissors`, copy `document.on.document`, paste `document.on.clipboard`, done `checkmark`, cancel/close `xmark`, delete `trash`, undo `arrow.uturn.backward`, redo `arrow.uturn.forward`, compose `square.and.pencil`, duplicate `plus.square.on.square`, rename `pencil`, move `folder`, attach `paperclip`, add `plus`, more `ellipsis`, select `checkmark.circle`, search `magnifyingglass`, find `text.page.badge.magnifyingglass`, filter `line.3.horizontal.decrease`, share/export `square.and.arrow.up`, print `printer`, account `person.crop.circle`, like/dislike `hand.thumbsup`/`hand.thumbsdown`, bring to front `square.3.layers.3d.top.filled`, archive `archivebox`, calendar `calendar`, alarm `alarm`, text formatting (`bold`, `italic`, `underline`, `text.alignleft` …).
- **macOS document icons**: background fill and/or centre image (half the canvas, ~10% margin, ~80% fill) plus a short term instead of an obscure extension; keep the top-right (folded corner) clear; simplify the 16 px size.

When building for the web, LiqUI's kit uses Lucide-style outline icons as a stand-in, because SF Symbols are licensed only for Apple platforms.

## App icons — [HIG](https://developer.apple.com/design/human-interface-guidelines/app-icons)

- **Layers**: iOS, iPadOS, macOS and watchOS icons are a background plus one or more foreground layers that receive Liquid Glass (specular highlights, refraction, translucency) from the system. tvOS uses 2–5 parallax layers; visionOS 1 background + 1–2 layers with system shadows and embossing.
- Build in **Icon Composer** (ships with Xcode): define background, place layers, set glass per layer or group, annotate default/dark/mono, preview across OS versions. A flat bitmap is allowed; the system then tries to segment it into two layers and only glasses large simple shapes.
- Crisp edges on foreground shapes (no feathering); vary layer opacity for depth; solid or gradient backgrounds (full-bleed and opaque if imported); vector where possible (PNG for mesh gradients).
- Supply square, *unmasked* layers; the system masks to a rounded rectangle (iOS/iPadOS/macOS), rounded landscape rectangle (tvOS) or circle (visionOS, watchOS). Keep the subject centred.
- **Design**: one simple idea in few shapes; consistent across platforms; overlapping filled shapes for depth; text only when essential (no "Play", "New"); illustrations over photos; no screenshots or UI replicas; no Apple hardware.
- **Don't paint effects** — no baked highlights, bevels, shadows, blurs or glows; the system's are dynamic.
- **Appearances** (iOS/iPadOS/macOS): default, dark, clear (light/dark), tinted (light/dark). Keep the same core features in each; base dark on light; coloured backgrounds give the best contrast in dark. Alternate icons need their own variants and pass App Review.
- Platform: tvOS safe zone for parallax cropping; visionOS no fake holes in the background; watchOS no black background.
- **Sizes**: 1024×1024 px (iOS/iPadOS/macOS, visionOS), 800×480 px (tvOS), 1088×1088 px (watchOS). Colour spaces: sRGB, Gray Gamma 2.2, Display P3 (not visionOS).

## Images — [HIG](https://developer.apple.com/design/human-interface-guidelines/images)

- A *point* is resolution-independent (an angle in visionOS). Scale factors: iOS @2x and @3x; iPadOS and watchOS @2x; macOS and tvOS @1x and @2x; visionOS @2x or higher.
- Design at @1x and scale up; put vector control points on whole values.
- Formats: de-interlaced PNG for bitmaps (8-bit palette when full colour isn't needed), JPEG or HEIC for photos, stereo HEIC for spatial photos, PDF or SVG for flat art and icons. Embed colour profiles; test on real devices.
- **tvOS layered images**: 2–5 layers (foreground: characters and text; middle: secondary and shadows; background: opaque). Required for app icons; strongly encouraged for any focusable image. Keep parallax subtle and leave a safe zone.
- **visionOS**: vector for 2D; raster above @2x costs memory (watch above @6x); spatial photos in stereo HEIC, shown in their own sheet or window, not inline; text over spatial photos uses the feathered glass background; spatial scenes take seconds to generate, so trigger them deliberately; minimal UI when immersive; show them large and centred.
- **watchOS**: avoid transparency except for template images; autoscaling PDFs designed at 40/42 mm @2x scale from 90% (38 mm) to 119% (45/49 mm).
