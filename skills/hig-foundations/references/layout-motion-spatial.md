# Layout, motion, spatial layout and immersion

Paraphrased from Apple's HIG Foundations. Synced 2026-11-17.

## Layout — [HIG](https://developer.apple.com/design/human-interface-guidelines/layout)

**Visual hierarchy**
- Put the most important things top and leading (reading order); use system components so right-to-left languages flip correctly.
- Alignment reads as relationship, indentation as subordination. Group with space, containers or separators.
- Progressive disclosure: disclosure triangles, menus, nested views and horizontally scrolling rows keep the first view light.
- **Separate controls from content with Liquid Glass, not with a solid or semi-opaque bar.** Elevate controls with a scroll edge effect. Full-screen backgrounds extend under sidebars, toolbars and tab bars; where a sidebar or inspector would cover an important part of an image, use the *background extension effect* (mirrors and blurs the image beneath the adjacent panel).

**Adaptability** — handle all of these: compact/regular size classes in both dimensions, every screen size, orientation and aspect ratio, the Dynamic Island, external displays, Display Zoom, resizable windows on iPad and Mac (including iPhone Mirroring), text-size changes, and locale (direction, formats, text length).
- Respect safe areas, margins and layout guides; even orientation-locked games must resize gracefully.
- Dynamic Type: stack horizontal neighbours, grow rows, wrap single-line rows.
- Test the smallest and largest layouts first.
- Scale background art to fill (never distort); allow for very wide or very tall windows.

**Size classes** (iOS/iPadOS): horizontal and vertical, each compact or regular, set by device, window and multitasking state.
- Decide layout from size class, never from device type or orientation.
- Design every combination.
- Same functions at every size; only how much is *visible* changes (tab bar ↔ sidebar, overflow menu ↔ visible buttons). The app stays recognisably iPhone/iPad/Mac even when resized.

**Safe areas and guides**: layout guides give standard margins and readable text width; safe areas keep content clear of the Dynamic Island, bars and rounded corners.

**Platform specifics**
- *macOS*: nothing critical at the bottom of a window (windows get dragged below the screen edge); nothing behind the camera housing.
- *tvOS*: safe area insets 60 pt top/bottom, 80 pt sides. Leave room for focused items to grow. Grid presets at 40 pt horizontal and ≥100 pt vertical spacing, unfocused widths: 2 cols 860 pt, 3 → 560, 4 → 410, 5 → 320, 6 → 260, 7 → 217, 8 → 184, 9 → 160. Extra space for titled rows; partially visible items symmetric on both sides.
- *visionOS*: support resizing (min/max sizes allowed, but not to block resizing); keep content centred at large sizes; 3D inside windows only for meaningful moments and inset from edges; supplemental content in an adjacent window, not an ornament; button centres at least 60 pt apart.
- *watchOS*: at most three glyph buttons or two text buttons side by side; allow autorotation for content people show others (images, QR codes).

## Motion — [HIG](https://developer.apple.com/design/human-interface-guidelines/motion)

System components animate for you and adapt to settings and input: Liquid Glass responds more strongly to direct touch and more subtly to trackpad.

- **Purposeful only.** Gratuitous motion distracts and can cause discomfort.
- **Optional.** Never the only carrier of information; pair with haptics or sound.
- **Realistic feedback** that follows the gesture: a view pulled down from the top dismisses upward, not sideways.
- **Brief and precise** feedback reads faster than big animation.
- **Don't decorate frequent interactions** with custom motion; the system's subtle defaults are enough.
- **Cancellable.** Never make people wait for an animation, especially a repeated one.
- Consider animated SF Symbols.
- Games: steady 30–60 fps by default; offer power/performance modes.
- *visionOS*: no motion at the edges of vision; make large moving objects translucent or lower-contrast; fade out, move, fade in when relocating; don't rotate the world (use a quick fade with an instant direction change); give a stationary frame of reference; avoid sustained oscillation, especially near 0.2 Hz.
- *watchOS*: layout and appearance animations have fixed built-in easing.

The accessibility page adds the Reduce Motion substitutions: tighter springs (less bounce), motion tied directly to gestures, no animated z-depth changes, fades instead of x/y/z slides, no animating into or out of blur.

## Spatial layout (visionOS) — [HIG](https://developer.apple.com/design/human-interface-guidelines/spatial-layout)

- **Field of view**: centre important content; no distracting motion or bright high-contrast objects in the periphery. Never head-lock content; anchor it in the room. (The system doesn't report anyone's field of view.)
- **Depth**: provide accurate depth cues (conflicting cues cause discomfort); use depth for hierarchy (a sheet comes forward, the window recedes); don't give text depth; use depth on large elements (toolbars, tab bars), not small ones (a button's glyph); limit how many depth levels the eye must refocus between.
- **Scale**: *dynamic* scale keeps windows the same apparent size at any distance; *fixed* scale behaves like a real object (for life-size products). Keep fixed scale for non-interactive objects.
- Few windows. Prefer indirect gestures (look + pinch); direct touch only for close objects and short sessions. The Digital Crown recentres. Interactive items: centres ≥60 pt apart with ≥16 pt between, never overlapping. Minimal physical movement. Place large immersive content on a floor-aligned plane.

## Immersive experiences (visionOS) — [HIG](https://developer.apple.com/design/human-interface-guidelines/immersive-experiences)

- **Spaces**: *Shared Space* (beside other apps) or *Full Space* (alone). Digital Crown: press-and-hold recentres, double-click reveals surroundings.
- **Styles**: dimmed or tinted passthrough (Shared or Full Space); `mixed` (unbounded 3D blended with the room; nearby content goes semi-opaque near real objects); `progressive` (custom environment partly replacing passthrough, Crown-adjustable within 120–360° or your range, portrait or landscape); `full` (360° environment). Progressive and full set a ~1.5 m boundary; past it the scene fades to passthrough and is replaced by your app icon.
- Launch in the Shared Space or `mixed` and let people raise immersion. Reserve immersion for meaningful moments (Photos: browse in a window, immerse in one photo). Guide attention with subtle cues first. Subtle passthrough tints only.
- **Comfort**: content in the field of view; pick the immersion style for the movement you expect; never encourage walking around in progressive/full; don't let `mixed` content block too much of the room; ARKit (with permission) to blend with surroundings.
- **Transitions**: smooth and trackable; people choose when to enter and leave; exit buttons say whether they go back or quit (offer save/pause before quitting).
- **Virtual hands**: match real hand pose; beware oversized hands; if tracking drops, fade them out and show real hands.
- **Environments**: little motion or high contrast behind primary content (use texture quality and dimming to steer attention); proximity signals interactivity; gentle animation (drifting clouds), none at the periphery; expansive, never claustrophobic; non-repetitive Spatial Audio that ducks for other audio; prefer meshes with lighting and shaders over flat 360° images; always a ground plane; vary assets.
