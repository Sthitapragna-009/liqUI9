# Liquid motion

Grounded in Apple's HIG [Motion](https://developer.apple.com/design/human-interface-guidelines/motion) and [Accessibility](https://developer.apple.com/design/human-interface-guidelines/accessibility) pages and Apple's *Designing Fluid Interfaces* principles. The kit's `spring()` and `liquidStretch()` helpers implement the values below.

## Principles

1. **Respond on press, not release.** Glass reacts the instant a finger lands.
2. **Track 1:1** while dragging, respecting the grab offset.
3. **Interruptible**: every animation starts from the current on-screen value; never lock input during a transition.
4. **Springs, not fixed curves**, for anything touchable. Think *damping ratio* (1.0 = no overshoot) and *response* (seconds to reach the target).
5. **Hand off velocity** from the gesture to the spring so there's no seam.
6. **Purposeful and brief**; no motion on frequent interactions beyond what standard controls already do; always cancellable; optional.

## Springs

| Use | Damping | Response |
|---|---|---|
| Default UI move | 1.0 | 0.35–0.4 s |
| Segmented / tab indicator glide | 0.85–0.9 | 0.4 s |
| After a flick or throw | ~0.8 | 0.3–0.4 s |
| Drawer / sheet | 0.8–1.0 | 0.3 s |

Overshoot only when a gesture carried momentum. A menu that fades in doesn't bounce.

## Glass-specific behaviours

| Behaviour | What happens | Web technique |
|---|---|---|
| **Materialize** (enter/exit) | Refraction strength, frost and scale ramp together from 0 → 1; glass doesn't simply fade | Animate `transform: scale(.92→1)` with a spring while stepping the filter `scale` attribute (or cross-fading two pre-built filters); avoid `opacity` on the glass element itself — it disables refraction |
| **Liquid stretch** (indicator travelling) | Grows along the direction of travel, thins across it, then settles | `scale(1 + k·|v|, 1 − 0.35·k·|v|)` from spring velocity (`liquidStretch()`), k ≈ 0.0009 per px/s, capped at +35% |
| **Squish** (press) | Widens and flattens slightly, sheen and caustic brighten, shadow deepens | `scale(1.06, .95)` in ~120 ms on press; release with an overshooting ease (≈ `cubic-bezier(.34,1.56,.64,1)`, 400 ms) |
| **Lift** (pointer hover on iPad/Mac) | Scales up with deeper shadow and a specular highlight | `scale(1.04)` + stronger shadow; only for standalone glass controls |
| **Morph / merge** | Nearby glass shapes merge into one and split apart (e.g. toolbar items, a button growing into its menu) | Animate one glass element's width/height/radius from the trigger's geometry to the menu's; anchor `transform-origin` at the trigger; content cross-fades inside |
| **Thicken with size** | A bigger glass surface gets more frost, refraction and shadow | Scale `refr`, `frost` and shadow with min(width, height) |
| **Bead between page dots** | The current-page indicator flows dot to dot | Spring the x position; apply liquid stretch from velocity |

## Timing for UI motion graphics (videos, showreels)

- 60 fps for anything liquid; 30 fps makes stretch look steppy.
- Play interactions at their real speed (≈1×); sped-up UI reads as "rushed". A screen with 3–5 interactions needs ~8–10 s.
- Let each interaction finish before the next starts on the same element; stagger across elements by 150–300 ms.
- Keep an anchor (title, chrome) still while content moves.

## Reduce Motion

Replace slides, stretch, squish, morph and depth changes with short cross-fades or instant changes; tighten springs (no bounce); keep motion tied 1:1 to gestures; don't animate into or out of blur. The kit's `spring()` jumps straight to the target when `prefers-reduced-motion: reduce` is set.
