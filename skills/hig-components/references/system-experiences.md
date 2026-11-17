# Components: System experiences

Paraphrased from Apple's HIG component group *System experiences* (App Shortcuts, complications, controls, Live Activities and the Dynamic Island, notifications, snippets, status bars, Top Shelf, watch faces, widgets). Synced 2026-11-17. Sizes are Apple's published points; the full per-device tables are on Apple's pages.

## Live Activities and the Dynamic Island — [HIG](https://developer.apple.com/design/human-interface-guidelines/live-activities)
Glanceable tracking of a task or event with a clear start and end (delivery ETA, a match score, a workout), updated over a few hours. Starts on iPhone/iPad and appears on the Lock Screen, Home Screen, Dynamic Island, StandBy, the Mac menu bar, the Apple Watch Smart Stack and CarPlay Dashboard.

**Presentations you must design** (start with iPhone, then refine others):
- **Compact** — one Live Activity in the Dynamic Island: a leading and a trailing element either side of the camera. Read as one unit (shared colour and type), hug the camera with no padding, keep both sides similar width (shorten units, round values), most essential dynamic info only (two logos + score), both sides deep-link to the same place.
- **Minimal** — when several are active, up to three show: one attached to the island, others detached (circle or oval). Show live data, not just a logo (Timer shows time left).
- **Expanded** — on touch-and-hold: a larger version of compact that keeps element positions; wrap content tightly around the camera.
- **Lock Screen** — a banner at the bottom (also briefly over other apps on devices without the island). Its own layout, not a notification clone; 14 pt standard margin; works with personalised wallpapers and tints; check Dark Mode and the dimmed Always-On display; verify the auto-generated dismiss button colour.
- **StandBy** — minimal, then Lock Screen layout at 2× full screen; prefer the default background (blends with the bezel and scales larger); standard margins; test the red Night Mode tint.
- **CarPlay** — compact's two halves merged; custom small layouts allowed; interactivity is disabled while driving. **watchOS** Smart Stack: merged compact by default; a custom layout can add a button (but that layout also drives CarPlay).
- **Limited width** (island in landscape): fit compact/minimal into a 28-pt circle with an abbreviation or graphic; leading-only is fine.

**Best practices**
- At most ~8 hours; tasks with a beginning and end. Glanceable essentials only; tap opens the app at the exact detail.
- No ads or promotions. Hide sensitive data (innocuous summary, redaction, or a privacy setting).
- Match your app's look in light and dark; a logo mark without a container (never the whole app icon). Don't add UI pointing at the Dynamic Island.
- Text medium weight or heavier, large; small text sparingly.
- Layout: only the space needed; even margins and **concentric** rounded elements (use container-relative shapes, not hard-coded radii); separate blocks with inset containers or thick lines, never to the island's edge; **change height dynamically** (rideshare grows as driver details arrive).
- Colour: compact/minimal/expanded sit on **opaque black**; Lock Screen may use a custom background with enough contrast; bold brand colours for text and objects; tint the island's **key line** (visible in Dark Mode) to match.
- Motion: animations up to **2 seconds**; none on the reduced-luminance Always-On display; animate to reinforce updates (numeric transitions for scores, fade a timer at zero); move existing elements to new positions rather than removing and re-adding; avoid overlaps (fade list items that don't move).
- Interactivity: only essential, related, start/stop-style actions (playback, workouts, recording) — ideally one control; respond-to-update buttons (contact driver) are good.
- Lifecycle: start when people expect (after ordering, at kickoff), let them turn it off in the matching app view; offer an App Shortcut to start it; update only when content changes; **alert only for essential updates** (and not also via push for the same thing); one Live Activity cycling through several events rather than many; end immediately when done, with a dismissal time proportional to duration (15–30 minutes typical; up to 4 hours on Lock Screen/Mac/watch).

**iPhone sizes (pt)**: 430×932 screens — compact 62.33×36.67 per side, minimal 36.67–45×36.67, expanded and Lock Screen 408 wide × 84–160 tall; 393×852 screens — compact 52.33×36.67, expanded/Lock Screen 371 × 84–160; limited width 28×28. iPad Lock Screen: 425–500 wide × 84–160. CarPlay: 240×78, 240×100, 170×78. Watch Smart Stack: 152×69.5 (40 mm) to 198×81.5 (49 mm Ultra 3/4).

## Widgets — [HIG](https://developer.apple.com/design/human-interface-guidelines/widgets)
Glanceable content and focused actions on iPhone/iPad Home and Lock Screens, Mac desktop and Notification Center, Vision Pro surfaces, the Watch Smart Stack and Apple HomeView.
- **System family**: small, medium, large, extra large (iPad, Mac, Vision Pro), extra large portrait (Vision Pro). **Accessory**: circular, rectangular, inline (Lock Screen, watch), corner (watch).
- **Appearances**: light, dark, **clear** (system desaturates and adds translucency, highlights and Liquid Glass), tinted. **Rendering modes**: full-colour; *accented* (background replaced by tint or Liquid Glass, views split into accent and primary groups, each solid-coloured); *vibrant* (Lock Screen, StandBy at night — desaturated; brightness = vibrancy, so use opaque greys: white/light grey for primary, darker grey for secondary).
- One simple idea tied to the app's purpose; meaningful content and deep links (not an app-icon replica); content that changes through the day; occasional delight (birthdays).
- Multiple sizes only when each adds value (don't just stretch the small one); balanced density; stay on-purpose as size grows.
- Brand lightly; a small logo top-right only if content comes from several sources. Configurable vs automatic content. Don't mimic the widget inside the app. Say when signing in unlocks more.
- **Updates**: periodic, not real-time; show "updated at" if people check more often than you can update; let the system tick dates/times; animate changes up to 2 s.
- **Interactivity**: simple buttons/toggles (Reminders' checkboxes); taps elsewhere open the app at the right place; generous targets; inline accessory widgets have one target.
- **Margins** 16 pt standard, 11 pt for tight groupings; smaller on Mac desktop and Lock Screen; concentric corners via container-relative shapes.
- **Text**: system font and SF Symbols; custom fonts sparingly (big numbers custom, small text SF Pro); never below 11 pt; never rasterised; Dynamic Type Large–AX5.
- **Colour**: never the sole carrier of meaning; full-colour images sparingly in tinted/clear (reserve for media like album art, and smaller than the widget).
- Gallery: realistic preview; placeholder of static UI plus grey shapes; one verb-first description for all sizes ("See the current weather…", never "This widget shows…"); optional coloured Add button.
- *iOS/iPadOS Lock Screen*: treat like complications; support Always-On; use Live Activities for real-time. *StandBy/CarPlay*: two small widgets scaled up with background removed — larger text, less imagery; mark the background removable; red tint at night. *HomeView*: small widgets on the Modular face (up to four, shared household) and personal Home Screens.
- *visionOS*: real-world-scale 3D objects that persist on surfaces; design for the room (poster on a wall, small on a desk); test all tint palettes and lighting. Two distance thresholds — *simplified* far (larger type, no controls) and *default* near — sharing elements. People scale widgets 75–125%. **Mounting**: elevated (default; tilts back on tables, flush on walls) or recessed (walls only, window-like). **Treatment**: *paper* (print-like, responds to room light — art, posters) or *glass* (layered, foreground stays bright — information-rich widgets). Sizes 158×158 to 450×338 pt (268–763 mm at 100%).
- *watchOS*: meaningful background colour (Stocks red/green); relevance signals to surface in the Smart Stack.
- iPhone sizes (430×932): small 170×170, medium 364×170, large 364×382, circular 76×76, rectangular 172×76, inline 257×26.

## Notifications — [HIG](https://developer.apple.com/design/human-interface-guidelines/notifications)
Banners, badges and Notification Center items; communication notifications show avatars and group names.
- Concise and valuable; never repeat the same notification; don't instruct people to do things in the app; errors belong in alerts; in the foreground, update quietly (badge, insert data); no sensitive data.
- **Content**: short title-case title with real information (subject, event), else let the app name show; body in complete sentences (system truncates); a generic hidden-preview text ("New comment", "Shipment"); no app name or icon (the system adds them); optional short, distinctive, well-produced sound — never the only signal.
- **Actions**: up to four time-saving buttons with short title-case labels and SF Symbols; never just "Open"; prefer non-destructive.
- **Badges**: only for unread notification counts — never weather, prices, scores; not the only signal; keep current; never fake a badge.
- *watchOS*: *short look* (brief, discreet) and *long look* (static fallback required, dynamic preferred; sash with colour or blur; content background default transparent or white at 18% opacity; up to four actions plus system Dismiss). Double tap runs the first non-destructive action — order actions accordingly.

## Controls — [HIG](https://developer.apple.com/design/human-interface-guidelines/controls)
Buttons or toggles in Control Center, the Lock Screen or on the Action button: symbol + title + optional value.
- High-value actions that don't need the app (start a Live Activity). Update on interaction, completion or push.
- Descriptive symbols, with on/off pairs for toggles (`door.garage.open` / `closed`); animate state changes; animate continuously while a timed action runs.
- Brand tint (used for on-state symbols and in the Dynamic Island for Action button use). Prompt for configuration on add; verb-based Action button hint text; placeholders for variable titles; redact sensitive info when locked; require authentication for security actions.
- Locked camera capture (iOS 18+): reuse the app's camera UI; explain how to add the control.

## App Shortcuts — [HIG](https://developer.apple.com/design/human-interface-guidelines/app-shortcuts)
Up to 10 per app, available right after install via Siri, Spotlight, Shortcuts, the Action button and Apple Pencil squeeze.
- Prefer *app schemas* for common domains (Apple Intelligence); App Shortcuts for unique features.
- Most common, important tasks; one optional, predictable parameter ("Start [morning/daily/sleep] meditation"); ask for missing info with a sensible default; phrases simple enough to say aloud; surface them with in-app tips.
- Respond with dialogue, *snippets* (static info, confirmations) or Live Activities (ongoing); include everything critical in the spoken text for AirPods/HomePod.
- Brief, natural phrases including the app name; write "App Shortcuts" and "Shortcuts" in title case, plural; individual "shortcut" lowercase. iOS: SF Symbol per shortcut, order by importance.

## Snippets — [HIG](https://developer.apple.com/design/human-interface-guidelines/snippets)
Compact results or confirmations for Siri, Spotlight and Shortcuts. Anatomy: spoken dialogue, a custom view, system buttons (confirmation: Cancel + a primary with a specific label like "Order", default "Continue"; result: Done). Legible in light and dark with consistent margins; **≤400 pt tall**; deep-link for more; communicate visually rather than repeating the dialogue.

## Status bars — [HIG](https://developer.apple.com/design/human-interface-guidelines/status-bars)
Keep the status bar legible with a scroll edge effect behind it and never imply content under it is interactive. Hide temporarily for full-screen media, never permanently; a simple gesture (tap) brings it back.

## Complications (watchOS) — [HIG](https://developer.apple.com/design/human-interface-guidelines/complications)
- Essential, dynamic, always-fresh data; support every family (fallback to an app image); several per family for shareable faces (a triathlon app's swim/bike/run); a distinct deep link per complication; privacy on Always-On; plan timeline updates within daily limits.
- **Gauges**: *closed* for percentages of a whole (battery), *open* for arbitrary ranges (speed), *segmented* for rapid changes (Noise).
- **Tinted mode**: never colour-only meaning; supply tinted image versions; people may prefer tinted. Lines ≥2 pt. Static placeholder images per complication.
- Families: circular (incl. bezel text up to ~180°, and extra-large for X-Large faces), corner, inline (utilitarian small and large), rectangular (rich charts; can appear in the Smart Stack — meaningful background, relevance intents), plus legacy templates. Default type: SF Compact Rounded, Medium (Semibold for corners).

**liqUI9 note**: liqUI9's "radial gauge" web components follow the *open* gauge style (gap at the bottom, value centred) — distinct from Activity rings.

## Watch faces — [HIG](https://developer.apple.com/design/human-interface-guidelines/watch-faces)
Share curated faces featuring your complications (prompts app install); show previews (bezel art from Apple Design Resources); offer versions for older devices and fall back gracefully on incompatible faces.

## Top Shelf (tvOS) — [HIG](https://developer.apple.com/design/human-interface-guidelines/top-shelf)
- Jump straight into content (Play + More Info); new and personalised content; no ads or prices; dynamic, layered images; a static fallback image (2320×720 pt) that doesn't look interactive.
- Layouts: *carousel actions* (full-screen video/images, title + optional subtitle), *carousel details* (adds summary, cast), *sectioned content row* (fill the width; poster 2:3, square, 16:9 sizes; mixed sizes scale to the tallest), *scrolling inset banner* (3–8 images, text baked into a top layer and repeated in accessibility labels; 1940×692 pt).
