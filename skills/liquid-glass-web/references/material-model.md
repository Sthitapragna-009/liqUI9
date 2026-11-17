# The Liquid Glass material model

Synthesised from Apple's HIG pages on [Materials](https://developer.apple.com/design/human-interface-guidelines/materials), [Color](https://developer.apple.com/design/human-interface-guidelines/color), [Layout](https://developer.apple.com/design/human-interface-guidelines/layout), [Motion](https://developer.apple.com/design/human-interface-guidelines/motion), [Toolbars](https://developer.apple.com/design/human-interface-guidelines/toolbars), [Tab bars](https://developer.apple.com/design/human-interface-guidelines/tab-bars), [Scroll views](https://developer.apple.com/design/human-interface-guidelines/scroll-views), [Pointing devices](https://developer.apple.com/design/human-interface-guidelines/pointing-devices) and [App icons](https://developer.apple.com/design/human-interface-guidelines/app-icons), plus observation of the system. Paraphrased; follow the links for Apple's wording.

## Two layers

Every screen has a **content layer** (what people came for) and a **functional layer** (how they act on it). Liquid Glass *is* the functional layer. It floats, lets content scroll underneath and peek through, and stays legible.

| Layer | Surfaces | Material |
|---|---|---|
| Functional | Tab bars, toolbars, sidebars, navigation bars, buttons, menus, popovers, alerts, sheets' chrome, page-control indicator, a slider or toggle thumb *while being touched* | Liquid Glass (regular, clear, tinted) |
| Content | Cards, rows, charts, media, backgrounds, text | Solid fills or *standard materials* (ultra-thin → thick blur), never Liquid Glass |

Apple's examples of content-layer controls that briefly become glass: a slider's thumb and a toggle's knob while a finger is on them. That's the pattern for "glass inside a card": the control part, transiently.

## What makes it read as glass (and not as frosted plastic)

1. **Refraction / lensing**: content behind is displaced, strongest toward the rim (a convex bevel), slightly magnified in the middle. This is the single biggest cue; blur alone doesn't do it.
2. **Specular rim**: a thin bright edge, brightest on the corner facing the light and faintly on the opposite corner (light passing through the body). Not a uniform 1 px white border.
3. **Edge thickness**: a slightly darker, compressed band just inside the rim.
4. **Caustic**: soft light focused on the far inner edge, opposite the light source.
5. **Adaptive luminosity**: small glass flips light/dark with what's underneath; labels go monochrome to match.
6. **Shadow**: soft float shadow plus a tight contact shadow; deeper when the element lifts.
7. **Something to bend**: structured content beneath (lines, text, imagery, shapes). Over flat colour, glass collapses into a tinted rectangle.

## Size behaves like thickness

Bigger glass reads as thicker: more refraction, stronger frost, deeper shadow, and — for large surfaces like sidebars — more opacity so text stays legible over busy content. Small glass (buttons, beads) can be clearer.

## Colour

- No intrinsic colour; it takes on what's beneath.
- Tint sparingly: the primary action's *background*, or a status. Never tint several controls in one view.
- Over colourful content keep bar labels monochrome; in mostly monochrome apps the brand accent works as the tint.
- Brand colour belongs in the content layer, where it scrolls under the glass and tints it naturally.
- Define light and dark values for everything (glass adapts between them), plus increased-contrast variants.

## Variants

- **Regular**: default; frost + luminosity adjustment; use wherever there's text (alerts, sidebars, popovers) or legibility risk.
- **Clear**: very translucent; only over rich media; add a ~35% dark dim layer beneath when content is bright (skip over dark content or when the video player already dims).
- **Tinted**: regular glass with a colour body for the one prominent action.

People can also pick a preferred glass look in Settings, and Reduce Transparency / Increase Contrast frost or solidify it — designs must survive all of these.

## Layout rules that come with glass

- Separate controls from content with glass and **scroll edge effects** (a soft blur/fade where content meets floating chrome), not solid bars or divider lines. Only where content actually scrolls under floating UI; one per view or pane.
- Extend full-bleed backgrounds under sidebars, toolbars and tab bars; use a background extension (mirrored, blurred continuation) where a panel would cover important imagery.
- **Concentric corners**: controls inside a bar use radii concentric with the bar's corners (inner radius = outer radius − inset).
- Toolbars: ≤3 groups, borderless system symbols, one prominent (tinted) trailing action.
- iOS tab bars float at the bottom on glass and may minimise into a smaller pill on scroll.

## Motion

- Glass **materializes**: refraction strength, frost and scale ramp in together. It doesn't simply fade.
- Glass is **liquid**: an indicator travelling between positions stretches along its path and thins across it, then settles with a spring; touching glass makes it squish and flare; adjacent glass elements can merge and split as they approach.
- Direct touch gets more emphatic motion than trackpad hover (iPadOS pointer *highlight* materialises a glass shape under the pointer; *lift* scales and adds a specular highlight).
- With Reduce Motion: no stretch, squish, morph or z-depth animation; cross-fade.

## App icons are glass too

On iOS, iPadOS, macOS and watchOS the system adds Liquid Glass (highlights, refraction, translucency) to layered icons built in Icon Composer. Designers supply flat, crisp layers and **never paint their own highlights, bevels, glows or shadows**.
