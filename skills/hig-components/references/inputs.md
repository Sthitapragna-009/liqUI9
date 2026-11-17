# Inputs

Paraphrased from Apple's HIG *Inputs* section (13 pages). Synced 2026-11-17.

## Gestures — [HIG](https://developer.apple.com/design/human-interface-guidelines/gestures)
- Always offer more than one way (voice, keyboard, Switch Control). Standard gestures mean the same everywhere; don't repurpose tap/swipe for app-unique actions or invent gestures for standard ones.
- Respond immediately with feedback that previews the result and shows how far to go; make unavailable gestures obvious (locked object, disabled button).
- **Custom gestures** only for frequent specialised tasks; discoverable, easy, distinct, never the only way; teachable in plain words; shortcuts *supplement* standard controls (edge-swipe back + a Back button); never collide with system gestures.
- **Standard gestures** (all platforms unless noted): tap (activate/select), swipe (reveal actions, dismiss, scroll), drag (move), touch/pinch and hold (more options), double tap (zoom; open on touch Macs; primary action on newer Apple Watches), zoom and rotate (not watchOS).
- *iOS/iPadOS*: three-finger swipe = undo/redo, three-finger pinch = copy/paste, four-finger swipe = app switch (iPad), shake = undo; simultaneous gestures for games.
- *macOS* with touch (touch displays, Sidecar): keep layout and control sizes unchanged; enlarge hit targets, not controls; expandable variants for dense controls (steppers, sliders, dials do it automatically); touch never the only route; align with existing gestures; custom gestures should work on touch and trackpad. Trackpad vs touch: select = click/tap, open = double click/double tap, scroll = two-finger/one-finger slide, context menu = secondary click/touch-and-hold, drag = click-drag/hold-then-drag.
- *visionOS*: **indirect** (look + pinch, at any distance — default for UI) and **direct** (touch, hold, drag, double touch, swipe, two-hand pinch-zoom and rotate — for close objects, briefly). Support standard gestures everywhere; avoid requiring specific body positions. Custom gestures need a Full Space and hand-tracking permission; prioritise comfort; avoid two-hand or specific-hand requirements. Palm-up and hand-roll are reserved for system overlays (Home, Control Center) — don't anchor content to hands; immersive apps can defer the overlay to require a tap.
- *watchOS*: double tap scrolls lists and tab views, or performs a view's primary action — don't set a primary action in scrolling views; choose the most-used button (play/pause).

## Pointing devices — [HIG](https://developer.apple.com/design/human-interface-guidelines/pointing-devices)
- Consistent gesture behaviour; never redefine system trackpad gestures; same experience across touch, eyes, pointer and keyboard; pointer reveals auto-hiding controls; modifier keys behave the same with touch and pointer.
- *iPadOS*: band selection in custom views; distinguish pointer vs finger only when it adds value (precise scrub seek).
  - **Content effects**: *highlight* — a **Liquid Glass shape materialises between pointer and control** (bar buttons, tab bars, segmented controls, edit menus; use for groups of controls in a glass container); *lift* — scale + shadow + specular highlight, the element floats (standalone glass controls, app icons, Control Center buttons; small opaque elements); *hover* — custom scale/tint/shadow for large elements.
  - Accessories (resize arrows, `plus` → `circle.slash` transitions); system pointers for buttons and text; ~12 pt padding around bezeled elements, ~24 pt around borderless; contiguous hit regions in bars (no gaps where the highlight blinks out).
  - Custom effects: system effects for standard-like elements; consistent; never decorative; simple shapes; useful annotations (X/Y values, dimensions); no instructional text; scale only where there's room — tint without scale in tight spaces; never shadow without scale.
- *macOS*: the full set of mouse/trackpad interactions (primary/secondary click, scroll, smart zoom, swipes, Mission Control, lookup, force click, pinch, rotate…). Standard pointers: arrow, open/closed hand, context menu, crosshair, disappearing item, drag copy, drag link, I-beam (horizontal/vertical), not allowed, pointing hand, resize variants, zoom in/out. **Touch on Macs with hidden-on-hover controls**: only essential ones; reveal on tap in their area, hide after use or a few seconds; keep the current selection; also put them in a context menu; sidebars reveal on header/row tap; tabbed windows show the selected tab's close button on any tap.
- *visionOS*: pointer context follows gaze; hidden while gesturing.

## Keyboards — [HIG](https://developer.apple.com/design/human-interface-guidelines/keyboards)
- Support **Full Keyboard Access** (iOS, iPadOS, macOS, visionOS); on iPad don't add your own keyboard navigation for controls (FKA handles them).
- Never repurpose standard shortcuts (unless the original action can't exist in your app, e.g. Command-I → Get Info where there's no italic). Key ones: Command-Space Spotlight, Command-Tab app switch, Esc / Command-Period cancel, Command-Comma settings, Command-? help, Command-A/C/V/X/Z, Shift-Command-Z redo, Command-B/I/U styles, Command-F/G find, Command-N/O/P/S/W/Q/M/H, Control-Command-F full screen, Option-Command-T toolbar, Command-` next window.
- **Custom shortcuts** only for frequent app-specific commands. Command first; Shift as a related secondary; Option sparingly for power features; **avoid Control**. List modifiers as Control, Option, Shift, Command. Don't add Shift for a key's upper character (Command-?, not Shift-Command-/). Let the system localise and mirror. Don't make an unrelated command by adding a modifier to an existing one.
- *visionOS*: holding Command shows a flat shortcut list by menu category — titles must stand alone; physical keyboards show a typing overlay.

## Focus and selection — [HIG](https://developer.apple.com/design/human-interface-guidelines/focus-and-selection)
- Use system focus effects; never move focus without interaction (except to a neighbour when the focused item disappears during directional navigation; otherwise hide the indicator).
- iPadOS/macOS: focus only content (lists, text fields, search) — FKA covers controls; tvOS: every element must be focusable.
- Focus ring for text/search fields; row highlight for lists and collections.
- *iPadOS*: focus groups — Tab moves between groups (reading order), arrows move within; halo (customisable ring) vs highlighted appearance; set group order and primary items.
- *tvOS*: gestures act on full-screen content, not focus; no free pointer outside gameplay; five focus states (unfocused, focused — larger, lifted, lit; highlighted on press; selected; unavailable) — supply assets at focused size and leave room.
- *visionOS*: keyboard/controller focus is separate from the gaze hover effect.

## Eyes (visionOS) — [HIG](https://developer.apple.com/design/human-interface-guidelines/eyes)
- Gaze is private: the system draws hover effects; apps learn only about taps.
- Multiple input methods; content in the field of view; avoid quick eye jumps across area or depth; reading content at least 1 m away; standard components.
- Minimise visual noise and motion near what people look at; **≥16 pt margin around items or ≥60 pt between centres**; no field-filling repeating patterns (eyes lock onto false depths).
- Gentle cues (centre placement, motion, contrast, colour, scale); **rounded shapes** (corners pull the eye); one containing shape for multi-part interactive elements.
- **Custom hover effects** run out of process (no code knows when people look): use for special moments; delays — none (subtle invitations like a slider knob), short (tab bar expansion), long (tooltips); keep at least one primary view unchanged; test on device.

## Digital Crown — [HIG](https://developer.apple.com/design/human-interface-guidelines/digital-crown)
- *Vision Pro*: volume, immersion level, recentre, accessibility, exit to Home (apps don't receive it).
- *Apple Watch*: the primary navigation input (Smart Stack, Home Screen, vertical tabs, lists); presses are system-reserved. Anchor navigation to it with touch equivalents; use it to inspect data where navigation isn't needed (World Clock scrubs time); always show visual feedback; match update speed to rotation speed; default detents, or turn them off / use linear detents for uneven rows.

## Action button — [HIG](https://developer.apple.com/design/human-interface-guidelines/action-button)
- Offer essential functions as App Shortcuts (not "open app"). Labels: title case, verb first, present tense, no articles, **≤3 words** ("Start Race").
- Let the system teach it. *iOS*: act without leaving context (Set Timer → Live Activity). *watchOS Ultra*: a secondary press that advances the primary action (mark segment, next leg) rather than stopping it; Action + side button pauses (except dives).

## Camera Control — [HIG](https://developer.apple.com/design/human-interface-guidelines/camera-control)
iPhone 16 family. Light press shows an overlay from the bezel; light double-press lists controls; slide to adjust.
- Controls are *sliders* (ranges) or *pickers* (discrete); system zoom/exposure available.
- SF Symbols only (no custom); short names; units on slider values (EV, %); *prominent values* the slider snaps to; keep viewfinder UI clear of the overlay zone; don't duplicate controls while the overlay shows; enable/disable per camera mode (can't add/remove at runtime); most-used controls in the middle; offer a locked-camera extension.

## Apple Pencil and Scribble — [HIG](https://developer.apple.com/design/human-interface-guidelines/apple-pencil-and-scribble)
- Behave like a real marking tool (write in margins); controls respond to Pencil too; mark immediately on contact (no mode switch); use tilt, pressure, azimuth and barrel roll for stroke character (pressure → continuous properties like opacity/size); direct visual connection; left- and right-handed layouts (movable controls).
- **Hover**: preview the mark (size, colour) without changing with height; never trigger actions; preview mid-range dynamic values; hover menus near the tip (with squeeze or a modifier); Pencil-only previews.
- **Double tap**: honour the system setting (tool ↔ eraser, previous tool, colour picker); custom modes must be explicit and off by default; never content-modifying or destructive.
- **Squeeze** (Pencil Pro): one discrete action; UI appears near the tip; non-destructive and undoable (people may map it to an App Shortcut).
- **Barrel roll**: only modifies marking (e.g. highlighter angle), never navigation.
- **Scribble**: works in every standard text input except passwords; no tap-to-focus first; allow writing where text naturally goes (Reminders' blank space); no autocompletion or lingering placeholders while writing; fields stay put (delay moves until a pause); no autoscroll while writing/selecting; generous field size (grow before writing or on pause).
- **PencilKit**: disable dynamic colour adaptation when marking up PDFs/photos; undo/redo buttons in compact widths; three-finger undo.

## Game controls — [HIG](https://developer.apple.com/design/human-interface-guidelines/game-controls)
- **Touch controls** (iOS/iPadOS): virtual controls only when direct interaction can't do it; clear of safe areas, Home indicator and Dynamic Island; frequent buttons near thumbs; ≥44×44 pt (menus ≥28×28 pt); visible + audio + haptic press states; action icons, not "A/X/R1"; show/hide by context; combine actions (hold for power attack); movement on the left (thumbstick wherever the thumb lands), camera on the right (direct pan).
- **Physical controllers**: always a default-input fallback; "Game Controller Required" badge only on tvOS/visionOS with graceful prompting; auto-detect; match the connected controller's labels and use SF Symbols for buttons; UI mapping — A activates, B cancels/back, shoulders switch sections, sticks/d-pad move selection, Menu opens settings/pause, Home reserved; label per player in multiplayer.
- **Keyboard bindings**: single keys (I = Inventory, Space = main action); test on Apple keyboards (Command near Space); cluster related keys near WASD; customisable.
- *visionOS*: spatial controllers mirror hands (look + trigger = indirect, reach + trigger = direct).

## Remotes (tvOS) — [HIG](https://developer.apple.com/design/human-interface-guidelines/remotes)
- Standard gestures; focus moves with the gesture; clear feedback (resting thumb hints the swipe-down info area); custom gestures mainly in games.
- **Press** is intentional (select, confirm); **tap** is for navigation/info — ignore taps during live playback (accidental). Positional taps only if intuitive.
- **Back** opens the parent screen (top level → Home Screen); in active gameplay it opens a pause menu (and closes it). **Play/Pause** controls playback (games: secondary button, skip intro). Touch surface swipe navigates (games: d-pad), press activates (games: primary).
- Compatible remotes: guide/browse open the EPG; page up/down page the EPG, or change channel during playback.

## Gyroscope and accelerometer — [HIG](https://developer.apple.com/design/human-interface-guidelines/gyro-and-accelerometer)
Use motion data only for a real benefit, with a purpose string; outside gameplay, don't drive UI with device motion (imprecise, hard for some, drains battery).

## Nearby interactions — [HIG](https://developer.apple.com/design/human-interface-guidelines/nearby-interactions)
Ultra Wideband experiences with temporary, private device IDs.
- Ground tasks in physical action (bring iPhone to HomePod to hand off music); use distance, direction and context (share sheet suggests the person you're facing); feedback sharpens as you get closer (Find My: arrow → pulsing circle); continuous feedback; mix visual, audio and haptics; never the only way.
- Portrait orientation (teach implicitly); design for the sensor's field of view (direction only within it); explain that people and objects in between reduce accuracy. iOS gives distance + direction; watchOS distance only, foreground only.
