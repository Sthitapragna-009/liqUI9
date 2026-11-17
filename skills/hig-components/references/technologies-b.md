# Technologies (part 2: CarPlay → HealthKit)

Paraphrased from Apple's HIG *Technologies* section. Synced 2026-11-17.

## CarPlay — [HIG](https://developer.apple.com/design/human-interface-guidelines/carplay)
Built for drivers, using system templates (audio, communication, navigation…) that the system renders for every car display. Audio and video CarPlay apps also run on Apple HomeView.
- **No iPhone interaction while CarPlay is active**; never block CarPlay on iPhone input; everything works with iPhone locked; set-up happens before driving.
- **Audio**: people start playback (except single-source apps or resuming); don't open an audio session until playing (it silences the car radio); start as soon as buffered (the system shows a spinner on the selection); show Now Playing immediately and load metadata after; resume only after resumable interruptions; adjust relative levels, never overall volume.
- **Layout** (common displays 800×480, 960×540, 1280×720, 1920×720 px): high-value info, scannable from the driver's seat; consistent; primary content large and in the top half.
- **Colour**: limited palette tied to the logo; different colours for interactive vs static; test in a real car in sun and at night; light and dark appearances; inclusive colour.
- **Icons**: @2x and @3x art; mirror the iPhone icon; no black backgrounds; 120×120 / 180×180 px.
- **Errors**: only when necessary, shown in CarPlay — never "pick up your iPhone".

## Game Center — [HIG](https://developer.apple.com/design/human-interface-guidelines/game-center)
Social gaming: discovery, friend invites, activity across the system and the Games app.
- Authenticate at launch. **Access point** (Apple's UI to the Game Overlay or dashboard): on menus and settings, not during gameplay, cutscenes or tutorials; keep controls clear of its collapsed and expanded forms; consider pausing while the overlay is open.
- Custom links use Apple's artwork unchanged and exact terms: Game Center, Game Center Profile, Achievements (not Trophies), Leaderboards (not Rankings), Challenges (not Competitions), Add Friends.
- **Achievements**: map to locked / in-progress / hidden / completed; upload in a sensible display order; title (title case) and description (sentence case) ≤2 lines each; progressive achievements show encouragement; unique, rich art — 512×512 pt image with 512 pt circular mask (tvOS 320×320, 200 pt mask).
- **Leaderboards**: *classic* (all-time best) or *recurring* (resets daily/weekly); group into sets (difficulty, activity, genre); unique art 512×512 pt with a 512×312 pt crop (tvOS 659×371 layered focus art).
- **Challenges**: 1–5 minute skill tasks completable solo (fastest lap, fewest mistakes); score the latest attempt, not personal bests; deep-link straight in (tutorial first if needed); art 1920×1080 pt with a 1465×767 pt safe crop, localised text.
- **Multiplayer**: party codes (8 characters like "2MP4-9CMF") with late join/leave/return, visible and manually enterable codes; in-game invite UI; activity art as above.
- tvOS optional dashboard banner 600×180 pt (logo/wordmark, not the app icon); watchOS has no Game Center UI (shows on iPhone).

## Generative AI — [HIG](https://developer.apple.com/design/human-interface-guidelines/generative-ai)
- **Responsible by design**: outputs vary unpredictably; plan for inclusion, care and privacy.
- **People stay in control**: honour clear in-scope requests; dismiss, revert, retry; label where AI is used.
- **Inclusive**: ask rather than infer personal or cultural attributes; test across diverse people to remove stereotypes.
- **Useful, not everywhere**: offer AI where it clearly saves time, improves communication or boosts creativity; provide non-AI fallbacks where possible (regular emoji alongside Genmoji).
- **Transparency**: never let people think they're dealing with a human; explain capabilities and limits up front; curated starter suggestions; explain poor results.
- **Privacy**: prefer on-device models; for server models minimise and disclose what's sent, stored or used for training; ask before using personal data; offer opt-out; stricter rules for kids' apps.
- **Models and data**: evaluate capabilities early (availability depends on device, network, battery; Foundation Models needs Apple Intelligence); licensed, diverse datasets; budget time for bias testing.
- **Inputs**: example prompts; warn that output can be wrong; scope requests to avoid hallucination; no AI facts where a mistake could harm; **confirm before irreversible or significant actions** (never auto-delete or auto-purchase).
- **Outputs**: Edit / Undo / Retry / Adjust near results, with acknowledgement that changes took effect; coach people after blocked results ("Unable to use that description" plus examples); red-team for misuse and sensitive topics; avoid reproducing copyrighted content (curated prompts, model guards); design for latency (loading UI or background generation) with **specific progress messages** ("Summarizing key themes from your notes", not "Processing…"); offer several distinct results when choice helps (Image Playground).
- **Improve continuously**: update block lists and models, retest; voluntary, unobtrusive thumbs up/down plus detailed feedback; separate model from UX so models can be swapped.

## HealthKit — [HIG](https://developer.apple.com/design/human-interface-guidelines/healthkit)
Only for apps with real health or fitness functionality.
- Clear privacy policy; request access in context (when logging weight, not at launch) and every time it's needed; explain the benefit in the system permission screen (no custom imitations); manage sharing only via system Settings.
- **Activity rings**: Move/Exercise/Stand only, one person, never decorative or for branding, unaltered colours on black, margins at least the ring gap, other rings clearly separated, no duplicate Activity notifications (see the Status components digest).
- **Apple Health icon**: Apple's artwork only, named "Apple Health" nearby, no smaller than other health app icons, never a button, never altered or masked, clear space 1/10 of height, never inside text; no Health app screenshots.
- **Wording**: "Apple Health" or "the Apple Health app" (never "HealthKit" to users); capital A and H; use the system's localised name.
