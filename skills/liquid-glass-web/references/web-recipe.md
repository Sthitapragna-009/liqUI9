# Web recipe: Liquid Glass that actually refracts

Working implementation: `kit/liqui-glass.js` + `kit/liqui.css` in this repo (MIT). React: `kit/react/LiquidGlass.tsx`. Live demo: `node scripts/serve.mjs` → `http://localhost:4321/demo/`.

## Why most CSS glass looks fake

`backdrop-filter: blur(20px)` + `background: rgba(255,255,255,.1)` + `border: 1px solid rgba(255,255,255,.2)` produces a **frosted pane with an outline**. Real glass bends light: content behind the edge is displaced toward the centre, the middle is slightly magnified, the rim catches a highlight that isn't uniform, and colour fringes appear at the edge. Without displacement the eye reads "translucent paper".

## The layer stack (bottom → top)

| # | Layer | How |
|---|---|---|
| 1 | Float + contact shadow | `box-shadow: 0 8px 22px -6px rgb(0 0 0/.5), 0 1px 2px rgb(0 0 0/.35)` (deeper when lifted/pressed) |
| 2 | **Refracted backdrop** | `backdrop-filter: url(#lens) brightness(1.08)` — an SVG filter (below) |
| 3 | Dim (Clear only) | `rgb(0 0 0 / 0.35)` over bright media |
| 4 | Body tint | Regular: slight dark (dark mode) or light (light mode) wash; Tinted: accent at ~65–70% |
| 5 | Edge thickness | `inset 0 0 10px rgb(0 0 0/.2), inset 0 0 28px rgb(255 255 255/.05)` |
| 6 | Caustic | radial highlight at the far inner edge (opposite the light), `mix-blend-mode: screen` |
| 7 | Top sheen | wide soft radial at the top, `screen` |
| 8 | Specular rim | 1.4 px ring via `mask-composite: exclude`, gradient brightest at the lit corner (135°) and faintly at the opposite one |
| 9 | Rim glow | the same ring, 3 px, blurred 2.5 px, 70% opacity |
| 10 | Label | monochrome text/symbols, tiny shadow for worst-case frames |

## The lens filter

1. **Displacement map** (canvas → PNG data URL), one per element size:
   - For each pixel compute the signed distance `d` to the rounded-rect edge and the outward normal `n`.
   - `k = clamp(-d / edge, 0, 1)` where `edge ≈ 0.5 × min(width, height)`.
   - Convex bevel profile: `m = 1 − sqrt(1 − (1 − k)²)` — near zero in the middle, rising steeply at the rim.
   - Add a whole-body zoom term `z = −(p / halfSize) × zoom` (zoom ≈ 0.1–0.16) so the centre magnifies.
   - Offset = `−n × m + z`, encoded as `R = 128 + dx·127`, `G = 128 + dy·127`.
2. **Filter graph** (`filterUnits` and `primitiveUnits` = `userSpaceOnUse`, region = element size):
   ```xml
   <feImage href="data:…" result="m0"/>
   <feGaussianBlur in="m0" stdDeviation="1.4" result="m"/>          <!-- smooth the map -->
   <feGaussianBlur in="SourceGraphic" stdDeviation="2.2" result="s"/> <!-- frost; omit if 0 -->
   <feDisplacementMap in="s" in2="m" scale="S"    xChannelSelector="R" yChannelSelector="G" result="d0"/>
   <feDisplacementMap in="s" in2="m" scale="S*1.05" … result="d1"/>
   <feDisplacementMap in="s" in2="m" scale="S*1.1"  … result="d2"/>
   <!-- keep R from d0, G from d1, B from d2, then add them: chromatic dispersion -->
   <feColorMatrix in="d0" values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0" result="c0"/> …
   <feComposite in="c0" in2="c1" operator="arithmetic" k2="1" k3="1" result="rg"/>
   <feComposite in="rg" in2="c2" operator="arithmetic" k2="1" k3="1"/>
   <feColorMatrix type="saturate" values="1.6"/>
   ```
   `S ≈ min(38, 0.36 × min(width, height))` px.

## Variants as parameters

| Variant | frost (px) | zoom | tint (dark) | tint (light) | label |
|---|---|---|---|---|---|
| Regular | 2.2 | 0.12 | `rgb(22 22 26/.34)` | `rgb(250 250 252/.5)` | white / black |
| Clear | 0 (skip the blur) | 0.16 | `rgb(255 255 255/.015)` + dim 35% | same | white |
| Tinted | 2.2 | 0.10 | accent at 68% | accent at 68% | white |

## Gotchas (all verified while building the kit)

- **`will-change: transform` (or opacity/filter/mask/clip-path) on the glass element or any ancestor silently disables the SVG refraction in Chromium.** Transforms themselves are fine — animate `transform`, just don't hint it with `will-change`.
- **`feGaussianBlur stdDeviation="0"` outputs transparent black in Chromium** and blanks everything downstream. Skip the step instead.
- **Loose text inside the glass element paints under the absolutely positioned layers.** Wrap it (the kit does this automatically) and give label children `position: relative; z-index` above the layers.
- An absolutely positioned glass element that you move with `transform` needs explicit `top/left` or it moves from its static position.
- Regenerating the map every frame is expensive. Bucket sizes (2 px), cache maps (LRU ~64), and animate size changes with `transform: scale()` rather than width/height where possible.
- Every lens is a full backdrop filter. Keep a handful live on screen; use the frosted fallback for long lists of small chips.
- Glass on flat black/white shows nothing. Design the content layer (imagery, gradients with structure, charts, text) before judging the glass.

## Browser support

| Engine | `backdrop-filter: url(#svg)` | What the kit does |
|---|---|---|
| Chromium (Chrome, Edge, Arc, Electron, Remotion's headless Chrome) | Renders | Full lens |
| WebKit (Safari) | Not rendered | Frosted fallback: `blur(14px) saturate(1.7) brightness(1.08)` with the same rim, sheen, caustic and shadow |
| Gecko (Firefox) | Not rendered | Same fallback |

Detect with `CSS.supports("backdrop-filter", "url(#a)")` **and** a Chromium user-agent check (WebKit reports support but doesn't render it). Show the result honestly in demos; don't present Chromium captures as cross-browser.

## Accessibility

```css
@media (prefers-reduced-transparency: reduce) { /* solid surface, no backdrop filter, no sheen/caustic */ }
@media (prefers-contrast: more)               { /* opaque body + 1.5px high-contrast rim */ }
@media (prefers-reduced-motion: reduce)       { /* no squish, stretch, morph; instant or cross-fade */ }
```

- Contrast of labels against the brightest and darkest frames that can pass under the glass (≥4.5:1 for text ≤17 pt).
- Keep 44×44 pt targets; glass doesn't change hit testing, so pad small glass buttons with an invisible hit area.
- Glass is decoration for assistive tech: mark layers `aria-hidden`, keep semantics on the real button/label.

## Remotion / motion graphics

The same engine renders in Remotion (headless Chromium). Render at 60 fps for liquid motion; expect slow renders when many large lenses are on screen (one render in the original project went from ~2 min to ~22 min after making every card glass — another reason glass belongs only on controls).
