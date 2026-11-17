# Color, Dark Mode and Materials

Paraphrased from Apple's HIG Foundations. Links go to Apple's pages. Synced 2026-11-17. RGB values are Apple's published reference values; Apple says not to hard-code them in apps (they shift between releases) — they're here so web and Figma work can match.

## Color — [HIG](https://developer.apple.com/design/human-interface-guidelines/color)

**Rules**
- One meaning per colour. If the brand colour marks interactive text, don't also use it for static text.
- Every custom colour needs four values: light, dark, light + Increase Contrast, dark + Increase Contrast. Even single-appearance apps should define light and dark, because Liquid Glass adapts between them.
- Test in sun and dim rooms (bright light mutes colour; darkness saturates it), on True Tone screens, in P3 and sRGB, and on several TV brands.
- Artwork and translucency change how nearby colours read (Maps switches to a dark scheme over satellite imagery). Colour behind a toolbar looks different from colour in the open.
- Use the system colour picker when people choose colours.
- Never use colour alone for state, interactivity or essential information; add a label, shape or glyph. Watch red/green and blue/orange pairs. Check cultural meaning (red is danger in some places, luck in others; white is mourning in some).
- Use dynamic (semantic) system colours for their intended role only: separator colour is not a text colour; secondary label colour is not a background.

**Liquid Glass and colour** (the part most web "glassmorphism" gets wrong)
- Glass has no colour of its own; it takes colour from what's behind it.
- Small glass (toolbars, tab bars) flips between light and dark appearance based on the content underneath; its symbols and text go monochrome — dark over light content, light over dark.
- Large glass (sidebars) becomes more opaque to stay legible over complex content.
- Tint glass rarely: only for real emphasis (a status, the one primary action). To emphasise a primary action, tint the glass *background* (as the system does for prominent buttons like Done), not the label. Never tint the backgrounds of several controls at once.
- Over colourful content, keep bar controls monochrome or pick an accent clearly distinct from the content. In mostly monochrome apps, the brand colour as accent works well.
- Plan where colour sits in the content layer: colourful content may pass under controls while scrolling, but the resting state (top of the screen) must be legible.

**Colour management**: embed colour profiles; sRGB is the safe default. Use Display P3 (16 bits per channel, PNG) for richer photos and data colours on wide-gamut screens. Provide sRGB fallbacks where two P3 colours collapse together or P3 gradients clip.

### System colours (sRGB, 0–255)

| Name | Light | Dark | Light, high contrast | Dark, high contrast |
|---|---|---|---|---|
| Red | 255 56 60 | 255 66 69 | 233 21 45 | 255 97 101 |
| Orange | 255 141 40 | 255 146 48 | 197 83 0 | 255 160 86 |
| Yellow | 255 204 0 | 255 214 0 | 161 106 0 | 254 223 67 |
| Green | 52 199 89 | 48 209 88 | 0 137 50 | 74 217 104 |
| Mint | 0 200 179 | 0 218 195 | 0 133 117 | 84 223 203 |
| Teal | 0 195 208 | 0 210 224 | 0 129 152 | 59 221 236 |
| Cyan | 0 192 232 | 60 211 254 | 0 126 174 | 109 217 255 |
| Blue | 0 136 255 | 0 145 255 | 30 110 244 | 92 184 255 |
| Indigo | 97 85 245 | 109 124 255 | 86 74 222 | 167 170 255 |
| Purple | 203 48 224 | 219 52 242 | 176 47 194 | 234 141 255 |
| Pink | 255 45 85 | 255 55 95 | 231 18 77 | 255 138 196 |
| Brown | 172 127 94 | 183 138 102 | 149 109 81 | 219 166 121 |

visionOS uses the dark values.

### iOS/iPadOS grays

| Name | Light | Dark | Light, high contrast | Dark, high contrast |
|---|---|---|---|---|
| Gray | 142 142 147 | 142 142 147 | 108 108 112 | 174 174 178 |
| Gray 2 | 174 174 178 | 99 99 102 | 142 142 147 | 124 124 128 |
| Gray 3 | 199 199 204 | 72 72 74 | 174 174 178 | 84 84 86 |
| Gray 4 | 209 209 214 | 58 58 60 | 188 188 192 | 68 68 70 |
| Gray 5 | 229 229 234 | 44 44 46 | 216 216 220 | 54 54 56 |
| Gray 6 | 242 242 247 | 28 28 30 | 235 235 240 | 36 36 38 |

### Semantic roles

- **iOS/iPadOS backgrounds**: two stacks — *system* (plain views) and *grouped* (grouped tables) — each with primary (whole view), secondary (groups inside it) and tertiary (groups inside groups).
- **iOS/iPadOS foreground**: label, secondary, tertiary, quaternary label; placeholder text; separator (lets content show through) and opaque separator; link.
- **macOS** has ~35 dynamic colours named by role: control accent, control/selected control, label tiers, selected content background (and its unemphasised version for inactive windows), alternating row backgrounds, grid, header text, keyboard focus ring, find highlight, window background, under-page background, and more. The person's accent colour overrides yours unless they chose *multicolor*; fixed-colour sidebar icons keep their colour.
- **tvOS**: small palette tied to your logo; focus is shown by scale and motion, never colour alone.
- **visionOS**: windows are glass that lets the room show through, so use colour sparingly and in bold text or large areas; balance brightness in immersive scenes (no bright flashing object on black).
- **watchOS**: background colour should carry information (the Activity ring views use their ring's colour); avoid full-screen colour on long-lived screens like workouts; complications may be rendered tinted.

## Dark Mode — [HIG](https://developer.apple.com/design/human-interface-guidelines/dark-mode)

- Follow the system setting. Don't ship an in-app appearance switch; people think the app is broken when it ignores the system choice. Auto mode can flip while your app is open.
- Permanently dark UI is acceptable only rarely, e.g. immersive media apps where the UI should recede.
- Dark palettes are dimmer backgrounds and brighter foregrounds, *not* simple inversions.
- Contrast: never below 4.5:1; aim for 7:1 for custom colours, especially small text. Test Dark Mode with Increase Contrast and Reduce Transparency, separately and together.
- Dim white-background images slightly so they don't glow.
- Prefer SF Symbols; make separate light/dark icons when shapes need an outline on one background only (a full moon, an oil drop).
- Use system label colours and system text views; they handle vibrancy.
- **iOS/iPadOS base vs elevated**: dark backgrounds come in a dimmer *base* set (receding) and brighter *elevated* set (advancing). The system switches to elevated for popovers, sheets, multitasking and multiple windows — custom backgrounds break that cue.
- **macOS desktop tinting**: with the graphite accent, window backgrounds pick up the wallpaper's colour. Give custom components with a visible bezel a little transparency in their neutral state only (not in coloured states, which would shimmer).
- Dark Mode doesn't exist on visionOS (glass adapts to surroundings) or watchOS.

## Materials — [HIG](https://developer.apple.com/design/human-interface-guidelines/materials)

Two families:

1. **Liquid Glass** — a functional layer for controls and navigation (tab bars, toolbars, sidebars) that floats above content and lets content peek through.
2. **Standard materials** — blur and vibrancy used *inside* the content layer to create structure.

**Liquid Glass rules**
- Not in the content layer. Content-layer backgrounds use standard materials. Exception: transient interactive parts of content controls (a slider's thumb, a toggle's knob) turn to glass while being touched.
- Use sparingly on custom controls; the system components already have it. Too much glass competes with the content it is meant to reveal.
- **Variants**:
  - *Regular*: blurs and adjusts luminosity of what's behind; the default; use wherever legibility could suffer or there's a lot of text (alerts, sidebars, popovers). Scroll edge effects add extra blur/fade.
  - *Clear*: highly translucent; only over visually rich backgrounds such as photos and video. Over bright content add a ~35% black dimming layer; over dark content, or with AVKit playback controls (which dim for you), skip it.
- People can choose a preferred glass look in Settings, and Reduce Transparency / Increase Contrast change the material — designs must survive all of them.

**Standard materials**
- Choose by meaning, not by the colour it seems to add; system settings change the look.
- Put vibrant system colours on top for legible labels, fills and separators.
- Thicker = more opaque = better for fine text. Thinner = more translucent = keeps context visible.
- **iOS/iPadOS**: ultra-thin, thin, regular (default), thick. Vibrant label levels (label, secondary, tertiary, quaternary — avoid quaternary on thin/ultra-thin), fill levels (fill, secondary, tertiary) and one separator level.
- **macOS**: purpose-named materials, vibrancy you opt into for custom views, and two blending modes (behind window, within window).
- **tvOS**: glass in navigation, Top Shelf and Control Center; image views and buttons turn to glass on focus. Standard materials: ultra-thin (full-screen, light scheme), thin (light overlays), regular (overlays), thick (dark overlays).
- **visionOS**: windows use a fixed system *glass* that adapts to the room's light. Prefer translucency to opaque fills. Thin material draws attention to interactive items; regular separates sections; thick makes a dark element distinct on top of regular. Vibrancy levels: label, secondary label (footnotes), tertiary (inactive only).
- **watchOS**: keep the default material backgrounds on full-screen modal sheets — they orient people.

## How this maps to liqUI9

- The web recipe in `liquid-glass-web` implements Regular, Clear (+35% dim) and Tinted, a monochrome label rule on glass, and the content-layer prohibition.
- `hig-review` flags: glass on content cards, tinted glass on more than one control per view, colour as the only signal, missing dark/high-contrast values, contrast under 4.5:1.
