# Components: Presentation

Paraphrased from Apple's HIG component group *Presentation* (action sheets, alerts, page controls, panels, popovers, scroll views, sheets, windows). Synced 2026-11-17.

## Alerts — [HIG](https://developer.apple.com/design/human-interface-guidelines/alerts)
Critical information people need right now: a problem, a warning about data loss, confirming an important action.
- **Sparingly**; never purely informational (show status in context instead, like Mail's offline indicator); never for common undoable actions (deleting an email); never at launch (show cached data and a quiet label).
- Content: title, optional message, up to three buttons; text field on iOS/iPadOS/macOS/visionOS only when input resolves the situation; macOS/visionOS can add an icon and accessory view; macOS adds a suppression checkbox and Help button.
- **Tone** direct and neutral; don't hide severity or blame.
- **Title** says what happened, where and why, in ≤2 lines; never "Error" or "Error 329347". Full sentence → sentence case with punctuation; fragment → title case, no punctuation.
- Message only if it adds value; don't explain the buttons (if you must, say "choose" and quote no titles).
- **Buttons**: one or two words, verbs tied to the text ("View All", "Reply", "Ignore"); "OK" only in informational alerts; never Yes/No; always "Cancel" to cancel; sentence case, no punctuation. Specific verbs beat OK ("Erase", "Delete").
- Placement: likely/default button trailing in a row, top in a stack; Cancel leading or bottom.
- **Destructive style only when the destruction wasn't the person's explicit intent** (Empty Trash after choosing Empty Trash isn't styled destructive). Always offer Cancel with a destructive action; Cancel is never the default; to force reading, have no default; a lone default button is "Done", not "Cancel".
- Other ways out: Home Screen (iOS/iPadOS), Esc or Command-Period, Menu on the remote.
- *iOS/iPadOS*: action sheet (not alert) for choices about a deliberate action; avoid scrolling alerts. *macOS*: app icon by default; `exclamationmark.triangle` only for unexpected data loss. *visionOS*: in front of the window (Shared Space) or centred in view (Full Space); accessory views ≤154 pt tall with 16 pt corner radius.

## Action sheets — [HIG](https://developer.apple.com/design/human-interface-guidelines/action-sheets)
Choices tied to an action the person started (Mail draft: Delete Draft / Save Draft).
- Sparingly; single-line title; message only if needed; Cancel at the bottom (watchOS: top-left); **destructive choices styled destructive and placed at the top**.
- *iOS/iPadOS*: action sheet, not a menu, for clarifying choices; never scrolling. *watchOS*: default/destructive/cancel styles; four buttons max including Cancel. Not in visionOS.

## Sheets — [HIG](https://developer.apple.com/design/human-interface-guidelines/sheets)
A scoped task closely related to the current context.
- Modal everywhere; on iOS/iPadOS can also be **non-modal** (Notes' formatting sheet edits the note behind it).
- Buttons: **Cancel/Close** (dismiss without saving), **Done** (finish/save), **Back** (previous step; never dismisses). Done always paired with Cancel or Back; never all three at once.
- Complex or long flows → full-screen modal (iOS/iPadOS), a new window or full screen (macOS), a Full Space (visionOS).
- One sheet at a time; close one before opening another.
- Supplementary, non-blocking tools → non-modal sheet (iOS/iPadOS), panel (macOS), split view (visionOS).
- *iOS/iPadOS*: Cancel top-leading, Done top-trailing (multi-step: Cancel → Back on later steps; Done enabled on the last). **Detents**: large (full) and medium (about half), plus custom; medium enables progressive disclosure (share sheet), skip it for creation sheets (Mail compose). Show a **grabber** on resizable sheets (tap cycles detents; works with VoiceOver). Swipe down to dismiss, with an action sheet if there are unsaved changes. iPadOS: page or form sheet styles.
- *macOS*: card over a dimmed parent; sensible default size (resizable if helpful); other windows stay usable; repeated input-and-observe tasks → panel.
- *visionOS*: centred in view (not rising from the bottom edge); don't cover the whole window.
- *watchOS*: full-screen, semi-transparent material sheet; only when a custom title or layout is needed (else alert/action sheet); brief and rare; symbol for the dismiss label, not text that looks like a title.

## Popovers — [HIG](https://developer.apple.com/design/human-interface-guidelines/popovers)
A transient view anchored to the control that opened it.
- A few related tasks or a bit of information; a way to save permanent space.
- Arrow points straight at its source; don't cover the source or essential content.
- Close/Cancel/Done buttons only when they clarify (save vs discard); otherwise closes on outside tap or selection; stays open for multi-select.
- **Auto-dismissal saves work**; only explicit Cancel discards.
- One at a time, never cascading; nothing over it but an alert; one tap closes one and opens another.
- As small as possible; animate size changes; don't say "popover" in help; never for warnings (use an alert).
- *iOS/iPadOS*: not in compact widths — use a sheet. *macOS*: detachable into a panel that looks nearly the same.

## Page controls — [HIG](https://developer.apple.com/design/human-interface-guidelines/page-controls)
A row of dots for pages in a flat, ordered list.
- Sequential pages only (hierarchies → sidebar/split view); centred at the bottom; about 10 dots max (beyond that, a grid).
- Custom indicators: simple symbols (no text, inner lines or negative space); change the default only if it adds meaning; at most two indicator types (Weather's location arrow + dots); let the system colour them.
- *iOS/iPadOS*: current dot highlighted; edge dots shrink when overflowing; tap sides for next/previous; scrub to move quickly (no animated transitions while scrubbing). Backgrounds: automatic (on interaction), prominent (always — only when it's the primary navigation), minimal (never — then don't allow scrubbing).
- *tvOS*: full-screen peer pages. *visionOS*: display-only. *watchOS*: bottom for horizontal paging, beside the Digital Crown for vertical tab views; prefer vertical pages of one screen height each, variable-height pages last.

*LiqUI note*: the demo's glass "bead" that stretches between dots is an expressive interpretation of a page control's current-page indicator; keep it on the functional layer and respect reduced motion.

## Scroll views — [HIG](https://developer.apple.com/design/human-interface-guidelines/scroll-views)
- Standard gestures, shortcuts and elastic bounce; show that content continues (partially visible items); no same-axis nested scroll views (cross-axis is fine).
- Paged scrolling with a small overlap unit; auto-scroll only as much as needed (to search results, the insertion point when typing resumes, following a drag-select, to a selection before acting on it). Sensible zoom limits.
- **Scroll edge effects** (iOS, iPadOS, macOS): separate floating bars from content scrolling beneath. Prefer *automatic* (more opaque for dense toolbars, text outside glass controls, pinned headers); test legibility carefully if using *soft*; *hard* exists for extra clarity. **Only where a scroll view sits behind floating UI — never decorative.** One per view; in split views one per pane, equal heights.
- *iOS/iPadOS*: page control with paged scroll views (then hide that axis's scroll indicator). *macOS*: scroll bars; small/mini in tight panels. *tvOS*: focus drives scrolling. *visionOS*: small fixed indicator at trailing centre (vertical) or bottom centre (horizontal); look + drag enables a jog bar for speed; widen tight margins. **Look to Scroll** (eyes only, near edges): opt in for reading and browsing views, not for dense or control-heavy lists; consistent across similar views; full-width/height scroll areas with clear edges; remove scroll-driven custom effects (parallax) first. *watchOS*: vertical scrolling with the Digital Crown; vertical tab views for paging; one screen height per page where possible.

## Panels (macOS) — [HIG](https://developer.apple.com/design/human-interface-guidelines/panels)
Floating supplementary windows for the active window or selection.
- Quick controls for the current content; **inspectors** (contents follow the selection) as panels, *Info* windows (fixed contents) as regular windows; simple direct controls (sliders, steppers) over typing.
- Noun titles ("Fonts", "Colors", "Inspector"); all panels come forward when the app activates and hide when it doesn't; not in the Window menu's document list; no minimise button; menus say "Show Inspector", not "panel".
- **HUD panels** (dark, translucent): only for media apps, when a standard panel would hide essential content, and without most controls; keep one style across modes; tiny amounts of high-contrast colour; small.

## Windows — [HIG](https://developer.apple.com/design/human-interface-guidelines/windows)
*Primary* windows hold the main navigation and content; *auxiliary* windows hold one task and close when done.
- Adapt fluidly to size; open new windows at the right moments (Mail compose) but not by default; offer "Open in New Window" in a context or File menu; never custom window frames or controls; call them "windows" (not "scenes").
- *iPadOS*: full screen or windowed (freely resizable, remembered). Keep leading toolbar buttons clear of window controls; pinch to open an item in a new window (Notes).
- *macOS*: frame (controls, toolbar) + body (+ rare bottom bar). States: **main** (frontmost of the app), **key** (receives input; coloured close/minimise/zoom), **inactive** (grey controls, no materials — looks farther away). Custom windows must show those states. Bottom bars only for a little contextual info (Finder status bar); more → inspector.
- *visionOS*: **windows** (upright glass plane with close, window bar, resize; optional Share, tab bar, toolbar, ornaments; dynamic scale), **volumes** (3D, viewable from any angle; controls turn to face the viewer), and a *plain* style without glass. Windows for familiar UI tasks; **keep the glass background** (opaque feels heavy and hides the room; removing glass hurts legibility); default 1280×720 pt, placed ~2 m away (~3 m apparent width) — minimise empty space; shape follows content (Keynote wide, Safari tall); set min/max sizes; keep 3D shallow (it gets clipped). Volumes: for rich 3D; pin 2D content with attachments; dynamic scaling unless life-size; default baseplate glow helps find edges; one extra ornament max, not on the toolbar/tab bar edge; baseplate parallel to the floor for passive content, tilting with gaze for interactive content.
