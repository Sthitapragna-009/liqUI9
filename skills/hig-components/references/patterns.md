# Patterns

Paraphrased from Apple's HIG *Patterns* section (25 pages). Each heading links to Apple's page. Synced 2026-11-17.

## Charting data — [HIG](https://developer.apple.com/design/human-interface-guidelines/charting-data)
Use a chart to *say something* about data: a trend, a current state, a comparison. Data that only needs to be looked up belongs in a searchable, sortable list or table.
- Keep charts simple; reveal detail progressively (levels, subsets, progressively richer versions).
- Every chart is accessible: accessibility labels for values and parts, and elements people can move through. A text summary helps but never replaces them.
- Prefer common types (bar, line). Teach novel ones (Activity introduces each ring separately).
- Look at data at macro (totals, averages), mid (useful subsets) and point level (call out specific values).
- Add titles, subtitles, annotations and a one-line headline ("Chance of light rain in the next hour").
- Size follows function: big enough for labels and interaction; small for glanceable previews of a larger chart.
- Consistent style across charts with similar purpose; change type or style only to signal a real difference. Same dataset in several views → same type, colours, annotations and layout (Health trend thumbnails expand into identical full charts).

## Collaboration and sharing — [HIG](https://developer.apple.com/design/human-interface-guidelines/collaboration-and-sharing)
- Share button in a toolbar. Customise the share sheet/popover with the sharing modes you support ("send copy" vs collaborate).
- Summarise permissions in short phrases ("Only invited people can edit"); keep custom options few and grouped.
- Show the Collaboration button beside Share as soon as sharing starts. Its popover: collaborators + Messages/FaceTime at top, your essential custom items in the middle, a manage button (rename "Manage Shared File" if helpful) at the bottom.
- Post collaboration events (edits, joins, mentions) into Messages with a universal link.
- visionOS shares the window from the Shared Space; the stream pauses in a Full Space. watchOS uses ShareLink.

## Drag and drop — [HIG](https://developer.apple.com/design/human-interface-guidelines/drag-and-drop)
- Support it everywhere people would try it; always offer an alternative (menu commands, accessibility drag/drop descriptors).
- Default: same container = move, different container = copy, between apps = always copy. Pick whichever loses less data.
- Multi-item drags; undo (or confirm when undo is impossible, e.g. a write-only folder; or offer a cancel afterwards).
- Offer representations from highest to lowest fidelity (native object → PDF → PNG → JPEG); destinations take the richest they understand and extract only what's relevant (a contact dropped on a recipient field = name + email).
- Spring-loading: hovering a drag over a button or segment activates it.
- **Feedback**: translucent drag image after ~3 pt of movement; may morph to preview the result; *flocking* groups multiple items; highlight only valid destinations while hovered (or show `circle.slash`); on failure, animate back to source or scale-and-fade away.
- **Drops**: auto-scroll long containers; Option forces copy; show progress or placeholders for slow transfers; show that a task started (printing); keep text styling when both sides support it; dropped content stays selected.
- *iPadOS*: add items to an in-progress drag. *macOS*: drag to Finder as a re-openable file or clipping; drag from inactive windows without activating them; count badge; pointer shapes (copy, link, disappearing item, not allowed); select-and-drag in one motion. *visionOS*: dropping into empty space can launch your app.

## Entering data — [HIG](https://developer.apple.com/design/human-interface-guidelines/entering-data)
- Get it from the system or with permission instead of asking. Say what's needed (label "Email", hint "username@company.com"); sensible prefilled defaults.
- Secure fields for sensitive data; never prefill passwords.
- Choices (pickers, menus) beat typing. Accept paste and drop.
- Validate as people type; number formatters for numeric fields (decimals, %, currency).
- Disable Next/Continue until required data is present.
- *macOS*: expansion tooltips show clipped field text.

## Feedback — [HIG](https://developer.apple.com/design/human-interface-guidelines/feedback)
Feedback communicates status, success or failure, warnings, and chances to fix mistakes. Match the delivery to the significance.
- Multi-channel (colour, text, sound, haptics) so it reaches everyone.
- Put status near what it describes (Mail's toolbar: last update + unread count).
- Alerts only for critical, ideally actionable information.
- Warn before *unexpected* irreversible data loss; don't warn when loss is the point (emptying a file into Trash).
- Confirm only significant completions (an Apple Pay payment); people assume success otherwise.
- When something can't be done, say why.
- *watchOS*: avoid indeterminate spinners; promise a notification instead.

## File management — [HIG](https://developer.apple.com/design/human-interface-guidelines/file-management)
- New/Open via menus and keyboard shortcuts plus an Add (+) button. Custom browsers still let people reach the whole file system.
- Autosave; hide extensions by default but honour the choice to show them.
- Quick Look viewers for files you can't open; Quick Look generators for your custom types.
- *iOS/iPadOS document launcher*: title card (app name + primary button that creates, secondary for options like templates), a distinct background (solid, gradient or pattern), accessories around the card (never hiding the name or buttons), gentle animation only. File provider extensions: show only relevant files, let people choose destinations, no second toolbar.
- *macOS*: default panels unless there's real reason; Open Recent; rename the Open button to the task (Insert); Save lets people set name, format and location; accessory views in Save; Finder Sync extensions for sync badges. With autosave off, show a dot in the close button and Window menu; with it on, never show the dot; "Edited" in the title clears on save.

## Going full screen — [HIG](https://developer.apple.com/design/human-interface-guidelines/going-full-screen)
iPhone, iPad and Mac only (TV and Watch are always full screen; Vision Pro uses immersion).
- Offer it for games, media and deep focus. Adjust proportions, don't programmatically resize the window.
- Keep essential controls reachable; let the Dock appear (except games); pause and resume where people left; never exit automatically.
- Hide bars while content is the focus and restore them with a familiar gesture (tap, swipe down, pointer to the top).
- *iOS/iPadOS*: keep the auto-hiding Home indicator; require two swipes only if accidental exits happen. *macOS*: use the system full screen (handles the camera housing); don't change display mode; enter via the window button, View menu or Control-Command-F.

## Launching — [HIG](https://developer.apple.com/design/human-interface-guidelines/launching)
- Launch instantly; restore previous state in detail (scroll position, windows).
- Launch screens (iOS, iPadOS, tvOS) look almost exactly like the first screen — no text, no logo, no advertising; match orientation and appearance. A splash screen, if needed, belongs at the start of onboarding.
- *tvOS* live apps may auto-start playback after a few idle seconds. *visionOS* immersive apps should open a Shared Space window first.

## Live-viewing apps — [HIG](https://developer.apple.com/design/human-interface-guidelines/live-viewing-apps)
- Live content first and one tap (or zero) from launch; a Watch Now button vanishes into full-screen playback.
- Make live look live (playing previews, "Live" rows, badges); show progress of in-progress programmes.
- Playback stays primary; other actions in a fixed order (Watch, Start Over, Record, Favorite); show other air times.
- Content footer during playback: darkened, current item badged, categories matching the guide, symmetric invoke/dismiss gestures. Instant feedback on channel change. Audio follows the live context and stops when leaving the live tab.
- **EPG**: current programme/channel/time obvious, easy paging, My Channels/Favorites, familiar categories, browse while content keeps playing (PiP).
- **Cloud DVR**: record from the info panel; record one or all episodes from detail views; fine-grained rules; manage storage automatically.

## Loading — [HIG](https://developer.apple.com/design/human-interface-guidelines/loading)
- Show something immediately (placeholders); let people act while loading; for long loads show something worth reading (tips) timed to the real wait; Background Assets for big downloads.
- Determinate indicators when duration is known, indeterminate when not. Games may design custom loading views.
- *watchOS*: avoid loaders; if needed for a second or two, better than blank.

## Managing accounts — [HIG](https://developer.apple.com/design/human-interface-guidelines/managing-accounts)
- Require an account only for core functions; explain the benefit; delay sign-in as long as possible (browse first, sign in to buy).
- Sign in with Apple, otherwise passkeys; passwords need 2FA. Name the method ("Sign In with Face ID"), only if the device has it. No in-app toggle for biometrics. Never say *passcode*.
- **Deletion**: in-app (or a direct, easy-to-find link), as simple as on the web, optionally scheduled (with an immediate option), with completion status; explain that subscriptions billed by Apple continue until cancelled. State legal retention requirements plainly. Revoke Sign in with Apple tokens.
- *TV provider*: use system sign-in; no sign-out button (or send people to Settings > TV Provider); privacy settings aren't a sign-out. *tvOS*: sign in via another device; shared accounts with per-person profiles; minimal typing. *watchOS*: iCloud Keychain autofill.

## Managing notifications — [HIG](https://developer.apple.com/design/human-interface-guidelines/managing-notifications)
- Permission first. Respect Focus and scheduled summaries.
- Communication notifications (calls, messages, via SiriKit) vs non-communication notifications, which carry an interruption level:

| Level | Use | Overrides summary | Breaks Focus | Overrides silent switch |
|---|---|---|---|---|
| Passive | Read whenever (a recommendation) | No | No | No |
| Active (default) | Good to know now (a score) | No | No | No |
| Time Sensitive | Affects the person now or within the hour (security issue, delivery) | Yes | Yes | No |
| Critical | Health and safety; needs an entitlement | Yes | Yes | Yes |

- Be honest about urgency. Marketing only with explicit opt-in, never Time Sensitive, and changeable in an in-app settings screen.

## Modality — [HIG](https://developer.apple.com/design/human-interface-guidelines/modality)
Modal = separate mode, blocks the parent, needs explicit dismissal. Use for critical info, confirming or changing a just-taken action, a narrow self-contained task, or immersion/focus.
- Only with clear benefit; short and simple; never an app-within-an-app (if subviews are needed, one path, and no buttons that look like Dismiss).
- Full-screen modal for media, camera or complex multi-step edits.
- Obvious dismissal (iOS/iPadOS/watchOS: toolbar button or swipe down; macOS/tvOS: button in the content).
- Confirm before discarding people's content (an action sheet with Save).
- Title the task. One modal at a time; never two alerts.

## Multitasking — [HIG](https://developer.apple.com/design/human-interface-guidelines/multitasking)
- Always be ready to save and restore context. Pause attention-demanding activities when people leave.
- Audio interruptions: pause for primary audio (music, podcasts), duck or pause briefly for short ones (directions) and resume.
- Finish user-started tasks in the background; notify only for important completions.
- *iOS*: PiP and FaceTime over other apps. *iPadOS*: full-screen or windowed apps with macOS-like tiling; frontmost window has coloured controls and casts a shadow; apps aren't told the configuration. *macOS*: multitasking is the default. *visionOS*: one active window at a time (others recede and turn translucent); don't alter window edges; keep playing video when people look away; expect audio to duck.

## Offering help — [HIG](https://developer.apple.com/design/human-interface-guidelines/offering-help)
- Match help to task size: inline text for simple tasks, tutorials for complex goals. Use the right device language and images (Remote vs controller; tap vs click). Don't explain standard components.
- **Tips** (TipKit): popover tips keep flow; inline tips keep context visible (annotation style points at UI, hint style doesn't). For features of three steps or fewer. One or two action-oriented sentences, no promotion. Eligibility rules and frequency limits (e.g. once a day). Include the feature's symbol (filled variant) unless it's right next to it. Buttons can link to settings or more info.
- **Tooltips** (macOS, visionOS): describe only the indicated control, start with a verb, don't repeat its name, 60–75 characters max, sentence case, can vary by state.

## Onboarding — [HIG](https://developer.apple.com/design/human-interface-guidelines/onboarding)
- After launch, never part of it. Fast, fun, optional.
- Teach by doing; prefer contextual tips over one big flow; if a flow is required keep it short and memorable; tutorials skippable and findable later; teach the app, not the device.
- Splash screens brief; downloads must not block onboarding; licences belong on the App Store.
- Defer setup with good defaults; ask for permissions in onboarding only if the app can't function without them; ask for ratings or purchases after people have used the app.

## Playing audio — [HIG](https://developer.apple.com/design/human-interface-guidelines/playing-audio)
- Silent mode mutes everything people didn't explicitly start; system volume governs everything; plugging headphones reroutes, unplugging pauses.
- Adjust relative levels, never system volume. Allow rerouting (AirPlay). Use the system volume view.
- Pick the right audio session category:

| Category | For | Silent switch | Mixes | Background |
|---|---|---|---|---|
| Solo ambient | Non-essential sound that silences others (game soundtrack) | Obeys | No | No |
| Ambient | Non-essential, lets other audio play | Obeys | Yes | No |
| Playback | Essential (audiobook, language course) | Ignores | Optional | Yes |
| Record | Recording | Ignores | No | Yes |
| Play and record | Calls, voice messages | Ignores | Optional | Yes |

- Respond to remote audio controls only in an audio context; never repurpose them; custom player controls only for commands the system lacks; tell other apps when your temporary audio ends.
- Decide whether to resume after an interruption based on its type (resumable phone call vs non-resumable new playlist); don't silently re-open a muted microphone.
- *visionOS*: prefer playing sound (silence feels broken); custom sounds for custom elements; Spatial Audio (ambient + point sources); sounds come from their window; vary repeated sounds by randomising pitch/volume; choose fixed (head-relative) vs tracked (object-relative) sound. *watchOS*: 64 kbps HE-AAC; Now Playing view.

## Playing haptics — [HIG](https://developer.apple.com/design/human-interface-guidelines/playing-haptics)
- Use system patterns only for their documented meaning; be consistent so each haptic maps to one cause; pair with matching visuals and sound (intensity and sharpness in sync); don't overuse; short haptics for discrete events in apps; make them optional; don't disturb camera, gyro or microphone.
- Custom haptics: *transient* (taps) and *continuous* (sustained) events, each with *intensity* and *sharpness* (soft/organic ↔ crisp/mechanical), optionally with audio.
- *iOS* feedback generators: notification (task outcome), impact (snap, collision), selection (value changing). *macOS* trackpad: alignment, level change, generic. *watchOS*: notification, up, down, success, failure, retry, start, stop, click; Digital Crown detents.

## Playing video — [HIG](https://developer.apple.com/design/human-interface-guidelines/playing-video)
- System player by default (aspect-fill for 2:1–2.40:1, aspect-fit otherwise, PiP). Custom players should behave like it.
- Original aspect ratio — never bake letterbox or pillarbox bars into the file.
- Add metadata (image, title, description) without covering playback. Space toggles play/pause everywhere. tvOS: transport controls for playback actions, content tabs for extra info. Prevent mixed audio when switching to PiP.
- **TV app integration**: show your own black screen immediately, then content (no splash, no "resume?" prompt); switch to the requested profile; resume long videos where they stopped; loading screen only after 2 s (black, centred spinner); on exit, show the item's detail view with Resume.
- *tvOS*: small translucent SDR overlays (image retention); pause ≥0.5 s before interactive overlays. *visionOS*: people start playback; small resizable windows; surroundings visible; nothing over the transport ornament; never auto-start immersive video; 160 px-wide thumbnails for scrubbing; don't stretch inline players to fill the window; RealityKit player for decorative or transitional video. *watchOS*: clips ≤30 s, H.264 High 160 kbps up to 30 fps, 208×260 px full screen or 320×180 px 16:9, 64 kbps HE-AAC audio; poster images that show the content, never look like controls.

## Printing — [HIG](https://developer.apple.com/design/human-interface-guidelines/printing)
- Print in standard places (File menu on Mac; toolbar → action sheet on iOS/iPadOS); hide or dim when nothing is printable or no printer exists; system print options.
- *macOS*: custom print-panel category named after your app; page setup only for document-specific settings; clear option dependencies; advanced options behind a disclosure; live preview thumbnails; remember settings with the document.

## Ratings and reviews — [HIG](https://developer.apple.com/design/human-interface-guidelines/ratings-and-reviews)
- Ask after real engagement (finished a level or task), never at first launch or mid-task; wait a week or two between asks; use the system prompt (limited to three times a year per app); think before resetting the summary rating on a new version.

## Searching — [HIG](https://developer.apple.com/design/human-interface-guidelines/searching)
- If search matters, give it a primary spot (Notes: bottom toolbar; Photos, TV: a Search tab). One place to search everything, with local filtering where sections differ (Music library).
- Show the current scope (placeholder text, scope bar, tokens, title). Recent searches and suggestions; respect privacy and let people clear history.
- **Spotlight**: index content with metadata; importers for custom file types; buttons that launch scoped Spotlight searches; system open/save panels (built-in search); Quick Look generators.

## Settings — [HIG](https://developer.apple.com/design/human-interface-guidelines/settings)
- Great defaults; few settings; open with Command-Comma (games: Esc); detect instead of asking (controllers, Dark Mode); never duplicate system-wide settings.
- In-app settings area: general, rarely changed options. Task-specific options (show/hide, sort, filter) live in the view they affect. System Settings app: only the rarest options, with a button that jumps there.
- *macOS*: Settings item in the App menu (not a toolbar button); dimmed minimise/zoom; fixed visible toolbar of panes with the active one indicated; window title = pane name (or "App Name Settings"); reopen the last pane. *watchOS*: no Settings app entries; a few options at the bottom of the main view or in a More menu.

## Undo and redo — [HIG](https://developer.apple.com/design/human-interface-guidelines/undo-and-redo)
- Make the result predictable (label "Undo Typing", "Redo Bold"; the shake alert names the action) and visible (scroll to the restored content).
- Unlimited steps since the last logical point (open, save); consider batch undo for many small related changes.
- Dedicated buttons only when necessary, with standard symbols, in a toolbar.
- *iOS/iPadOS*: don't redefine shake or three-finger swipe; alert titles "Undo Name". *macOS*: top of the Edit menu, Command-Z / Shift-Command-Z.

## Workouts — [HIG](https://developer.apple.com/design/human-interface-guidelines/workouts)
- watchOS workout sessions keep the app on screen: show the metrics people need (time, calories, distance) and controls (laps, intervals); nothing else.
- Distinct look for an active workout (live values, unique layout); easy pause/resume/stop with clear start/stop feedback.
- Explain missing sensor data in the system Workout app's tone (water may block heart rate, calories still tracked).
- End with a summary (Activity rings welcome); discard sessions of a few seconds or ask.
- Large, high-contrast text for people in motion. Activity rings only for their documented meaning.
