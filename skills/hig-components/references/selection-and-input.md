# Components: Selection and input

Paraphrased from Apple's HIG component group *Selection and input* (color wells, combo boxes, digit entry views, image wells, pickers, segmented controls, sliders, steppers, text fields, toggles, virtual keyboards). Synced 2026-11-17.

## Segmented controls — [HIG](https://developer.apple.com/design/human-interface-guidelines/segmented-controls)
Two or more equal-width segments acting as buttons: single choice, multiple choice (macOS), or momentary actions (Mail's Reply / Reply All / Forward).
- For closely related choices affecting an object, state or view; good when grouping or visible selection state matters.
- Don't mix action segments and selection segments in one control.
- About 5–7 segments in wide layouts, about 5 on iPhone. Equal widths; similar content sizes.
- Text **or** images, not both; noun labels in title case; no introductory text needed for text segments.
- *iOS/iPadOS*: switch closely related subviews (Calendar's Event / Reminder); separate app sections → tab bar. *macOS*: intro text or per-segment labels/tooltips for icon segments; main-window view switching → tab view; spring-loading. *tvOS*: segments select on focus — keep other focusable items away; filtering screens → split view. *visionOS*: icon segments show tooltips on gaze. Not on watchOS.

*Liquid Glass*: the selected-segment indicator is the "transient interactive element" that becomes glass while dragged; the liqUI9 kit's segmented control animates a glass bead between segments.

## Sliders — [HIG](https://developer.apple.com/design/human-interface-guidelines/sliders)
A track with a draggable **thumb**; the min-side fills with colour; optional min/max icons.
- Customise track colour, thumb and end icons when it communicates (small image ↔ large image).
- Min leading / max trailing (horizontal); min bottom / max top (vertical).
- Pair with a text field (exact values) and stepper (whole increments) for wide ranges.
- *iOS/iPadOS*: never for audio volume — use the system volume view. *macOS*: tick marks (labelled sparingly; endpoints often enough; periodic labels for non-linear scales), linear (lozenge thumb) or circular (for repeating values like rotation), live feedback, an introductory label with a colon, value tooltip. *visionOS*: prefer horizontal. *watchOS*: stepped or continuous bar with ± buttons; custom glyphs if helpful. Not on tvOS.

*Liquid Glass*: the slider thumb turns to glass while being dragged.

## Toggles — [HIG](https://developer.apple.com/design/human-interface-guidelines/toggles)
Two opposing states (on/off) — switches, checkboxes, or buttons that act like toggles.
- Only for state, never for picking from a list. Make clear what it affects. State difference must be visible without colour alone (fill, shape, checkmark).
- *iOS/iPadOS*: **switches only in list rows** (no label needed); default green, accent colour only with enough contrast; outside lists use a **toggle button** (icon whose background changes with state, like Phone's filter), no explanatory label.
- *macOS*: switches, checkboxes, radio buttons in the window body only. Switches for emphasised or group-level settings; mini switches in grouped-form rows; don't swap existing checkboxes for switches. **Checkboxes**: on/off/mixed, title trailing; best for hierarchies (indent dependents; parent shows mixed); introductory label aligned to the first checkbox baseline. **Radio buttons**: 2–5 mutually exclusive options (more → pop-up); a single on/off → checkbox; consistent horizontal spacing based on the longest label.

## Steppers — [HIG](https://developer.apple.com/design/human-interface-guidelines/steppers)
Two-segment +/− control beside a value field (it shows no value itself). Make the affected value obvious; pair with a text field when large jumps are likely; macOS: Shift-click for bigger steps (e.g. ×10). Not on watchOS or tvOS.

## Pickers — [HIG](https://developer.apple.com/design/human-interface-guidelines/pickers)
Scrollable lists of distinct values (single or multipart); values and order follow the locale.
- Medium-to-long lists (short → pull-down button; very long → list with index). Predictable ordering (alphabetical countries). Show in context (bottom of window or popover), not on a new screen. Coarser minute intervals that divide 60 (0, 15, 30, 45).
- *iOS/iPadOS date pickers*: styles **compact** (button showing the value in accent colour; opens a modal editor — best when space is tight), **inline** (calendar, or wheels for time), **wheels** (keyboard-enterable), **automatic**; modes **date**, **time**, **date and time**, **countdown timer** (≤23 h 59 min; not compact/inline).
- *macOS*: textual (precise, compact) or graphical (calendar browsing, ranges, clock face). *watchOS*: Digital Crown wheels; long lists become a navigation-link button that people can also scrub with the Crown.

## Text fields — [HIG](https://developer.apple.com/design/human-interface-guidelines/text-fields)
Small, specific text (name, email); long text → text view.
- Placeholder hint plus a persistent label (placeholders vanish while typing). Secure fields for sensitive data.
- Size suggests expected length; even spacing; vertical stacks with consistent widths per field group; logical tab order.
- Validate at the right time: emails on leaving the field, usernames/passwords before leaving. Number formatters (decimals, %, currency) without assuming locale formats.
- Line breaks: clip (default), wrap by word/character, or truncate at start/middle/end; expansion tooltips for clipped text.
- Show the right keyboard (iOS, iPadOS, tvOS, visionOS). Minimise typing on tvOS and watchOS (offer choices).
- *iOS/iPadOS*: trailing Clear button; leading image for purpose, trailing buttons for extras (Bookmarks). *macOS*: combo box for text + list. *watchOS*: only when necessary.

## Virtual keyboards — [HIG](https://developer.apple.com/design/human-interface-guidelines/virtual-keyboards)
- Pick the keyboard by content (and set the text content type so suggestions improve): ASCII capable, ASCII number pad, decimal pad, default, email, name/phone pad, number pad, numbers & punctuation, phone pad, social (@ and #), URL, web search.
- Customise the Return key when it clarifies (Search, Go, Send).
- **Custom input views** (app-only replacements, e.g. Numbers' numeric pad): must obviously help; play the standard key click.
- **Custom keyboards** (system-wide extensions, iOS/iPadOS/tvOS; never in secure or phone fields): an obvious Globe-style switch; don't duplicate the system Emoji/Dictation keys; tutorials in the app, not inside the keyboard.
- *iOS/iPadOS*: use the keyboard layout guide; controls above the keyboard (input accessory views) must be task-relevant — **give that container Liquid Glass if the rest of the app uses it** (standard toolbars adopt it automatically). *tvOS*: linear keyboard with the Siri Remote, grid with other devices. *visionOS*: keyboard is its own movable window. *watchOS*: keyboard on larger screens, else dictation or Scribble; set content type; paired iPhone can type.

## Combo boxes (macOS) — [HIG](https://developer.apple.com/design/human-interface-guidelines/combo-boxes)
Text field + pull-down list; custom entries aren't added to the list. Meaningful default from the list; introductory label in title case with a colon; relevant choices; items no wider than the field.

## Color wells — [HIG](https://developer.apple.com/design/human-interface-guidelines/color-wells)
Open a colour picker (prefer the system one, which keeps saved colours across apps). macOS: highlight while active, show the chosen colour, support drag between wells.

## Image wells (macOS) — [HIG](https://developer.apple.com/design/human-interface-guidelines/image-wells)
Editable image views: copy, paste, delete, drag in. Restore a default image if one is required; standard Edit menu items and shortcuts.

## Digit entry views (tvOS) — [HIG](https://developer.apple.com/design/human-interface-guidelines/digit-entry-views)
Full-screen digit entry (PINs) with optional title and prompt. Secure (asterisks) for sensitive data; explain why digits are needed.
