# SwiftUI handoff map

For designers writing specs that engineers will build natively. Liquid Glass APIs require iOS 26 / iPadOS 26 / macOS 26 (Tahoe) / watchOS 26 / tvOS 26 or later; below that, use the classic `Material` blurs as a fallback. Verify names against Apple's current developer documentation (the articles *Adopting Liquid Glass* and *Applying Liquid Glass to custom views*, linked from the HIG [Materials](https://developer.apple.com/design/human-interface-guidelines/materials) page) before relying on them; a dedicated Claude skill for native glass code is a good companion for engineering detail.

## What engineers get for free

Standard components adopt Liquid Glass automatically when built with the current SDK: navigation and toolbars, tab bars (including minimise-on-scroll), sidebars, sheets, popovers, menus, alerts, search, and system button styles. **Spec the standard component first**; custom glass is for genuinely distinctive elements.

## Design intent → SwiftUI

| Design intent | SwiftUI |
|---|---|
| Regular glass on a custom view | `.glassEffect()` (regular is the default) — or `.glassEffect(.regular, in: .capsule)` for a shape |
| Clear glass over media | `.glassEffect(.clear)` + your own dimming layer behind it when the media is bright |
| Tinted primary | `.glassEffect(.regular.tint(.accentColor))`, or for buttons `.buttonStyle(.glassProminent)` |
| Secondary glass button | `.buttonStyle(.glass)` |
| Press squish and light | `.interactive()` on the glass (buttons already have it) |
| Several glass elements near each other (so they blend and morph) | wrap in `GlassEffectContainer(spacing:)` |
| One shape morphing into another (button → menu) | `.glassEffectID(_:in:)` with a shared `@Namespace`, inside the same container, changed within `withAnimation` |
| Merge separate items into one glass capsule | `.glassEffectUnion(id:namespace:)` |
| Content extending under a sidebar/inspector | `.backgroundExtensionEffect()` |
| Soft separation where content meets bars | `.scrollEdgeEffectStyle(_:for:)` (automatic / soft / hard) |
| Tab bar shrinks on scroll | `.tabBarMinimizeBehavior(_:)` |
| Grouping toolbar items with space between groups | `ToolbarSpacer` |

## Rules to put in the spec

- Glass only on controls/navigation; content uses solid fills or `Material`.
- Never set `opacity` below 1 on a glass view or its ancestors (refraction collapses); never stack glass on glass.
- Glass needs varied content behind it; over flat colour it reads as a tinted rectangle.
- Respect Reduce Transparency, Increase Contrast and Reduce Motion — the system adapts glass; custom animations must check `accessibilityReduceMotion`.
- Screenshots of glass vary by device and OS build; review on hardware, not just the simulator.
