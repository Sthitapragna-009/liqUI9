# HIG review checklist

Each line is a check. Values and sources live in the hig-foundations and hig-components references; the link after each section is the main Apple page.

## 1. Structure and purpose — [Design principles](https://developer.apple.com/design/human-interface-guidelines/design-principles), [Layout](https://developer.apple.com/design/human-interface-guidelines/layout)
- [ ] The screen's purpose and primary action are obvious within a glance.
- [ ] Most important content top/leading; hierarchy by size, weight, colour and spacing together.
- [ ] Progressive disclosure: advanced options one level deeper, not hidden entirely.
- [ ] Wayfinding: title says where people are; Back/Close where expected; no dead ends.
- [ ] Layout adapts by size class (compact/regular), not by device; safe areas respected (Dynamic Island, home indicator, rounded corners); works at the largest text size.
- [ ] macOS: nothing critical at the bottom of windows; every command in the menu bar.

## 2. Liquid Glass and materials — [Materials](https://developer.apple.com/design/human-interface-guidelines/materials), [Color › Liquid Glass color](https://developer.apple.com/design/human-interface-guidelines/color)
- [ ] Glass only on the functional layer (bars, buttons, menus, floating labels, thumbs while touched). No glass cards, list groups or backgrounds.
- [ ] No glass on glass.
- [ ] Glass has real content behind it; it refracts (not just blurs).
- [ ] Regular for anything with text; Clear only over rich media with a dim layer when bright; Tinted for one primary action only.
- [ ] Tint on the glass body, not on the label; labels monochrome over colourful content.
- [ ] Controls separated from content by glass + scroll edge effect, not opaque bars or divider lines.
- [ ] Inner corner radii concentric with containers.
- [ ] Reduce Transparency and Increase Contrast versions exist.

## 3. Colour and contrast — [Color](https://developer.apple.com/design/human-interface-guidelines/color), [Dark Mode](https://developer.apple.com/design/human-interface-guidelines/dark-mode), [Accessibility](https://developer.apple.com/design/human-interface-guidelines/accessibility)
- [ ] Text contrast ≥4.5:1 (≤17 pt) or ≥3:1 (≥18 pt or bold), in light and dark, including over glass at worst-case frames.
- [ ] No colour-only meaning (status, selection, chart series, errors).
- [ ] One meaning per colour; accent used sparingly for interactivity/primary actions.
- [ ] Semantic colours used for their roles; light, dark and high-contrast values defined.
- [ ] No in-app appearance switch overriding the system (unless an immersive-media exception).
- [ ] Dark Mode uses base vs elevated backgrounds correctly; white images dimmed.

## 4. Typography — [Typography](https://developer.apple.com/design/human-interface-guidelines/typography)
- [ ] Sizes at or above platform minimums (iOS 11 pt, macOS 10, watchOS 12, tvOS 23, visionOS 12); body at the default (iOS 17 pt).
- [ ] Text styles used; layout survives Dynamic Type up to AX5 without truncating key text.
- [ ] No Ultralight/Thin/Light weights for UI text.
- [ ] Few typefaces; custom fonts support Bold Text and Dynamic Type.
- [ ] Tracking appropriate to size (tight at body, neutral/positive at display for SF Pro).

## 5. Targets, spacing and input — [Accessibility › Mobility](https://developer.apple.com/design/human-interface-guidelines/accessibility), [Gestures](https://developer.apple.com/design/human-interface-guidelines/gestures), [Pointing devices](https://developer.apple.com/design/human-interface-guidelines/pointing-devices)
- [ ] Hit areas ≥44×44 pt (iOS/iPadOS/watchOS), 28×28 (macOS), 60×60 (visionOS), 66×66 (tvOS).
- [ ] ~12 pt around bezeled controls, ~24 pt around borderless ones; visionOS centres ≥60 pt apart.
- [ ] Press states on every custom control, shown on touch-down.
- [ ] Standard gestures mean standard things; every gesture has a visible alternative.
- [ ] Keyboard: Full Keyboard Access works; standard shortcuts not repurposed.

## 6. Components and patterns — see hig-components
- [ ] Right component: tab bar for sections, toolbar for actions, segmented control for related subviews, alert for critical, action sheet for choices about an action, sheet for scoped tasks, popover only in wide layouts.
- [ ] Tab bar: never hides or disables tabs; ≤5 on iPhone; labels present; badges only for critical info.
- [ ] Toolbar: ≤3 groups; one prominent trailing action; borderless symbols; no custom backgrounds.
- [ ] Buttons: verb labels in title case; one or two prominent per view; destructive never the default; roles colour, sizes consistent.
- [ ] Alerts: specific title, ≤3 buttons, "Cancel" to cancel, no "OK" for actions, not at launch, not for undoable actions.
- [ ] Sheets: Cancel + Done (or Back + Done); grabber on resizable sheets; confirm before discarding edits.
- [ ] Loading: something shown immediately; determinate progress when possible; no spinner ↔ bar switching.
- [ ] Empty states: explain and offer the next action.
- [ ] Charts: common type, titled with the takeaway, accessible labels + Audio Graphs, not colour-only, interaction optional.
- [ ] Live Activities/widgets: glanceable, no ads, compact/minimal/expanded/Lock Screen designed, Dynamic Island content hugs the camera, ≤8 h.

## 7. Motion — [Motion](https://developer.apple.com/design/human-interface-guidelines/motion)
- [ ] Purposeful, brief, cancellable; no decoration on frequent interactions.
- [ ] Springs with velocity hand-off for anything touchable; symmetric enter/exit paths; origins anchored to triggers.
- [ ] Reduce Motion: fades instead of slides/zoom/stretch; no bounce; no blur animation; no 0.2 Hz oscillation.

## 8. Accessibility — [Accessibility](https://developer.apple.com/design/human-interface-guidelines/accessibility), [VoiceOver](https://developer.apple.com/design/human-interface-guidelines/voiceover)
- [ ] Every control and meaningful image labelled; decorative images hidden; logical reading order and grouping; headings.
- [ ] Changes announced; rotor support for long content.
- [ ] Captions/transcripts for media; haptics or visuals paired with sounds.
- [ ] No timed auto-dismiss for important content; autoplay controllable.

## 9. Writing — [Writing](https://developer.apple.com/design/human-interface-guidelines/writing)
- [ ] Verbs on buttons; no "Click here"; no "we" in errors; no "oops".
- [ ] Errors say what happened and how to fix it, next to the problem.
- [ ] Consistent capitalisation per element type; consistent flow verbs (Continue/Next → Done).
- [ ] Device-correct verbs (tap vs click).

## 10. Privacy and trust — [Privacy](https://developer.apple.com/design/human-interface-guidelines/privacy), [Managing accounts](https://developer.apple.com/design/human-interface-guidelines/managing-accounts)
- [ ] Permissions requested in context; purpose strings specific and active.
- [ ] Pre-permission screens have one "Continue"-type button, no skip, no imitation of the system alert.
- [ ] Sign-in delayed until needed; account deletion available in-app.
- [ ] No sensitive data on Lock Screen surfaces, notifications or Always On.

## 11. Apple marks and legal — technology pages
- [ ] Apple Pay, Sign in with Apple, Add to Apple Wallet, Verify with Wallet buttons come from Apple's APIs/artwork, unaltered, at minimum sizes.
- [ ] No Activity rings or look-alike triple rings for other data.
- [ ] No Apple logo, product images or SF Symbols in app icons or branding; trademarks spelled exactly ("Apple Pay", "AirPlay", "HomeKit"), never pluralised or translated.
- [ ] SF fonts not bundled in web deliverables; Apple design-kit assets used within their licence.
