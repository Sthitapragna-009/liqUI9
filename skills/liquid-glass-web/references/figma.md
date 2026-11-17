# Liquid Glass in Figma

## Start from Apple's kit

Apple publishes official iOS, iPadOS, macOS, watchOS and visionOS design kits (Figma and Sketch) in [Apple Design Resources](https://developer.apple.com/design/resources/). Use their tab bars, toolbars, buttons, sheets and alerts as components rather than redrawing them; they carry correct sizes, corner radii and glass treatments. Check the kit's licence terms before redistributing any part of it.

## Build order for a screen

1. **Content layer first**: imagery, cards (solid or standard material), lists, charts. Glass needs this to look right.
2. **Functional layer** on top: tab bar, toolbar groups, floating buttons, segmented thumbs, floating labels.
3. **Scroll edge**: a soft progressive blur/fade where content meets top or bottom chrome (not a divider line).

## Glass layer recipe (when the file's Figma version has a native glass effect)

Recent versions of Figma include a **Glass** effect with controls along the lines of light angle and intensity, refraction, depth, dispersion and frost. Names and ranges can change between Figma releases — check yours. Starting points that match LiqUI's web kit:

| Variant | Refraction | Depth | Dispersion | Frost | Light | Fill on top |
|---|---|---|---|---|---|---|
| Regular | medium | medium | low | ~4–8 | 135°, ~70% | Dark: #16161A @ 34%; Light: #FAFAFC @ 50% |
| Clear | medium-high | medium | low | 0 | 135°, ~80% | none; put a #000 @ 35% rectangle *under* it over bright media |
| Tinted | medium | medium | low | ~4–8 | 135°, ~60% | accent @ 68% |

Then: monochrome label (white on dark content, black on light content), text style SF Pro (from Apple's fonts, for Apple-platform design only).

## Glass layer recipe (no native effect)

Stack inside a frame with the control's shape and clip content:

1. Drop shadow: y 8, blur 22, spread −6, #000 50%; second shadow y 1, blur 2, #000 35%.
2. Background blur: 12–16 (frosted base; Figma can't displace, so refraction is faked by steps 3–6).
3. Fill: Regular/Tinted tint as above.
4. Inner shadows: #000 20% blur 10; #FFF 5% blur 28.
5. Caustic: an ellipse at the bottom-right inner edge, radial #FFF 16% → 0, blend Screen.
6. Sheen: a wide ellipse at the top, radial #FFF 20% → 0, blend Screen.
7. Rim: a 1.4 px **inside** stroke with an angular/linear gradient: #FFF 95% at the light corner → 18% → 4% → 14% → 70% at the opposite corner.
8. Optional fake lensing for hero shots: duplicate the content beneath, mask to the glass shape, scale 104–110% around the centre and nudge edges outward — enough for a static mock; prototype the real thing in code.

## Components and variants

- Model glass controls as variants: `Style = Glass | Tinted | Gray | Plain`, `Size = Small | Medium | Large`, `Role = Normal | Destructive`, `State = Rest | Pressed | Disabled`. Pressed = scale 106% × 95%, brighter sheen.
- Segmented control: track is a fill (content layer); the **thumb** is the glass component, placed above the labels.
- Slider: thumb variant `Rest` (solid white) and `Dragging` (glass, larger).
- Use variables for the tint, label colours and dim so light/dark/increased-contrast modes switch together.
- Prototype motion with Smart Animate and spring curves (e.g. stiffness/damping presets close to damping 0.85–1.0); for liquid stretch, add an intermediate frame where the thumb is ~120% wide and ~92% tall.

## Handing off

- Annotate which surfaces are glass (functional layer) vs material/solid (content layer), the variant, tint colour and label colour.
- Note Reduce Transparency (solid fill) and Increase Contrast (opaque + rim) versions.
- If you use the Figma MCP from Claude, pair this with the `hig-components` skill for component specs and `hig-review` to audit frames.
