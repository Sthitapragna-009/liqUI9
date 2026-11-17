# Technologies (part 3: HomeKit → Wallet)

Paraphrased from Apple's HIG *Technologies* section. Synced 2026-11-17.

## HomeKit — [HIG](https://developer.apple.com/design/human-interface-guidelines/homekit)
- **Use HomeKit's model and words**: home → rooms and zones → accessories (with categories) → services (controllable features, named descriptively like "ceiling fan light" — never "service") → characteristics (brightness, speed — never "characteristic"); service groups; actions; **scenes** (never "action set" in UI); automations. Show an accessory's home/room/zone in its detail view; allow multiple homes; never duplicate Home app settings.
- **Setup**: system setup flow first; purpose string like "Lets you control this accessory with the Apple Home app and Siri across your Apple devices."; no required accounts or personal data (optional cloud accounts afterwards); don't force other platforms' setup; custom post-setup experiences for unique features.
- **Names**: suggest good service names (no brand or model numbers); enforce rules — letters, numbers, spaces and apostrophes, starting and ending alphanumeric, no emoji ("Reading lamp", "2nd garage door"); remove room names from service names (assign the room instead).
- **Siri**: show example phrases with the person's names right after setup and teach richer commands later (rooms, zones, groups, "brighter", "It's dark in here"); suggest zones and groups; shortcuts only for things HomeKit can't do ("Order AC filters"), and explain the difference.
- **Custom features**: say what belongs in your app vs the Home app; mirror Home app changes and show conflicts side by side; ask before writing to the Home database. Cameras: never cover the image; mic button only with two-way audio.
- **Icons and wording**: Apple's HomeKit icon (black, white or matching colour; non-interactive; not inside text); Apple Home app icon may link to its App Store page; "HomeKit" (capital H and K), "Apple Home" (first mention), "works with HomeKit", never "HomeKit unlocked the door"; your brand more prominent.

## iCloud — [HIG](https://developer.apple.com/design/human-interface-guidelines/icloud)
Works automatically (at most one first-launch all-or-nothing choice); don't make people pick which documents to sync; keep content current (or show that a newer version exists for huge files, with subtle progress after a few seconds); only store what people create (not regenerable resources; mind the Documents folder in backups); no alert when iCloud is off — just a quiet note that changes won't sync; sync app state people want everywhere (last page read); **warn before deletions that remove content from all devices**; resolve conflicts automatically or with a clear choice early; include iCloud content in search; GameSave for game progress.

## ID Verifier — [HIG](https://developer.apple.com/design/human-interface-guidelines/id-verifier)
iPhone reads ISO 18013-5 mobile IDs in person. *Display Only* requests show data in system UI (nothing reaches your app); *Data Transfer* requests need a legal requirement and an entitlement. Ask the minimum ("age at least 18", not birth date); register with Apple Business Register for your name and logo; buttons "Verify Age" / "Verify Identity" with no NFC/QR symbols and never the Apple logo; Display Only flows offer "Matches Person" / "Doesn't Match Person".

## iMessage apps and stickers — [HIG](https://developer.apple.com/design/human-interface-guidelines/imessage-apps-and-stickers)
One primary experience per app; share app content (lists, itineraries) or quick group decisions; essentials in the compact view, text editing only in the expanded view; stickers legible on any background and when rotated/scaled, with transparency and localised alt text. Icons from 54×40 to 148×110 px plus 1024 px App Store; stickers small 300, regular 408, large 618 px square (@3x), one size per pack, ≤500 KB, PNG/APNG (8-bit alpha), GIF (single-colour transparency), JPEG (none).

## Live Photos — [HIG](https://developer.apple.com/design/human-interface-guidelines/live-photos)
Apply edits to all frames (or convert to still); never split frames or audio; preview the whole Live Photo before sharing and allow sharing as a still; show download progress and readiness; show stills where unsupported; signal "live" with a hint of motion or the system badge (never a play button), always in the same corner. visionOS can view but not capture.

## Mac Catalyst — [HIG](https://developer.apple.com/design/human-interface-guidelines/mac-catalyst)
- Good candidates already support drag and drop, keyboard navigation and shortcuts, multitasking sizes and multiple windows; poor candidates depend on gyro, rear camera, HealthKit, ARKit, handwriting or navigation.
- **iPad idiom** scales UI to 77% (17 pt → 13 pt); **Mac idiom** renders at 100% with more detail and performance but needs a layout and type audit (separate asset catalog, text styles, no fixed sizes, only shared appearance customisations).
- Mac-ify: tab bar → sidebar split view (or segmented control for flat apps) with tabs also in the View menu; Next/Previous buttons beside swipe paging; macOS app icon; multiple columns and side-by-side reflow, inspectors instead of popovers; controls move to the window toolbar and every command to the menu bar; top-down flow; no edge-anchored buttons; context menus on everything. Gestures map automatically (tap → click, hold → click-hold, pan → drag, pinch, rotate).

## Machine learning — [HIG](https://developer.apple.com/design/human-interface-guidelines/machine-learning)
- Define the role: **critical vs complementary**, **private vs public data**, **proactive vs reactive**, **visible vs invisible**, **dynamic vs static** improvement — each raises or lowers the accuracy people expect.
- **Explicit feedback**: only when needed, always voluntary, options that state consequences ("Suggest less pop music", "Mute politics for a week"), icons only with text, several progressively specific options, act immediately and remember.
- **Implicit feedback**: secure it; let people control cross-app flow; don't trap people in their past (leave room to explore); combine signals; withhold sensitive suggestions on shared devices; weight recent behaviour; update at a cadence matching expectations (typing instantly, music slowly); UI changes shift the signal; beware confirmation bias.
- **Calibration** (Face ID-style setup): only if essential; secure; say why (what it does, not how); minimum info, no look-ups or hard actions; once, early; clear goal and progress; immediate help when stalled, never blaming; confirm success; cancellable anytime; editable later.
- **Mistakes**: anticipate, help handle, learn when it helps; match remedies to severity (wrong word vs missed flight); easy fixes for frequent errors; keep improving; keep the UI simple; be extra careful with proactive features; watch side effects of fixes.
- **Corrections**: familiar tools (Photos' crop controls), instant persistent results, correctable corrections, worth less effort than doing it by hand, never a crutch for poor quality; prefer guided corrections (alternatives) over freeform.
- **Multiple options**: diverse (Maps' toll-free/scenic/highway routes), few, most likely first (maybe preselected), easy to tell apart, learn from choices.
- **Confidence**: only show it if it truly tracks quality; translate into familiar ideas ("Because you listen to pop music", not "97% match"); rank or use semantic categories ("high chance"); numbers only where people expect stats (weather, polls); actionable phrasing ("Good time to buy"); change presentation by threshold (ask to confirm at lower confidence); hide low-confidence proactive results.
- **Attribution**: neither too specific (creepy) nor too general; factual ("Because you've read nonfiction", not "you love"); no jargon.
- **Limitations**: set expectations, show how to get good results (placeholders, live coaching, alternatives instead of empty states), explain poor results (Memoji in the dark), announce when limits are lifted.

## Maps — [HIG](https://developer.apple.com/design/human-interface-guidelines/maps)
- Interactive maps; *default* (saturated) or *muted* (desaturated, for information-rich overlays) emphasis; search plus category filters; clear selection styling; **cluster** overlapping pins that split apart on zoom; keep the Apple logo and Legal link visible (7 pt side, 10 pt top/bottom padding; fixed to the map; 10 pt above the lowest resting position of a pull-up card; hidden below 200×100 px).
- Annotations tinted to your style with 2–3 character glyphs or a small image; selectable map features with custom info; overlays *above roads* (default) or *above labels* (hide the map); contrast for custom controls (thin stroke, light shadow or blend modes).
- **Place cards**: automatic, callout (full or compact), caption ("Open in Apple Maps"), sheet; choose by map size and avoid duplicating your own info; keep the location visible (offset); outside a map, the card must include a map and the trigger should look location-related.
- **Indoor maps**: detail grows with zoom; colour + icons per area type; concise floor picker; dimmed surroundings for context; routes to transit and parking; limit scrolling away from the venue; match your app's style, not Apple Maps'.
- *watchOS*: static snapshot, up to five annotations, fits the screen, smallest region showing all points.

## NFC — [HIG](https://developer.apple.com/design/human-interface-guidelines/nfc)
Say "scan" and "hold near", never "tap"/"touch"; no jargon ("NFC", "tag") — "Hold your iPhone near the [object] to learn more about it." then "Now hold your iPhone near another [object]."; complete short sentences; support background tag reading **and** in-app scanning.

## Photo editing extensions — [HIG](https://developer.apple.com/design/human-interface-guidelines/photo-editing)
Confirm Cancel when edits exist; no second top toolbar; preview edits before returning; use your app icon.

## ResearchKit — [HIG](https://developer.apple.com/design/human-interface-guidelines/researchkit)
- Onboarding order: **introduction** (purpose, call to action, existing-participant login) → **eligibility** (early, minimal, plain) → **informed consent** (bite-size sections with Learn More, the full document viewable, optional comprehension quiz, signature and contact, emailed PDF) → **permissions** (only critical data, plus notifications).
- Surveys: say how many questions and how long, one per screen, show progress, keep short (several small beats one long), smaller explanatory text, tell people when done. Active tasks: plain instructions, requirements stated, obvious completion.
- Profile screen (edit data, upcoming activities, leave the study, consent and privacy docs) and a motivating dashboard.

## SharePlay — [HIG](https://developer.apple.com/design/human-interface-guidelines/shareplay)
- Real-time shared activities with FaceTime/Messages (each participant needs their own access to paid content).
- For synchronous moments (offer share/save for asynchronous follow-up); shared or role-specific views as fits; works across platforms; easy start (SharePlay symbol, share sheet, visionOS Share button); frictionless joining (provisional access, defer profile setup); short clear invitations (title, summary, poster); show who changed what (initials on contributions); "SharePlay" as noun or verb label ("SharePlay Movie"), never with adjectives or inflections. iOS/iPadOS/macOS: PiP for shared video.
- *visionOS*: shared context keeps content in the same relative place; start from a window when possible; resolve conflicts socially (last change wins); unique views only when warranted (swap the Persona for a contact photo); immersion changes are opt-in for people mid-task; personal comfort settings stay personal; easy leave and rejoin; support participants without spatial Personas.
- **Spatial templates**: *side-by-side* (watching), *surround* (tabletop, 3D), *conversational* (being together while the app does something in the background); stage complex activities with different templates; people trigger transitions; smooth, faded seat moves. **Custom templates**: account for co-located people with markers; orient seats deliberately; five seats always defined; ≥1 m apart; balanced fill order; roles independent of seats.

## ShazamKit — [HIG](https://developer.apple.com/design/human-interface-guidelines/shazamkit)
Explain microphone use; stop recording as soon as you have a sample; ask before saving recognised songs to the iCloud library.

## Sign in with Apple — [HIG](https://developer.apple.com/design/human-interface-guidelines/sign-in-with-apple)
- Ask only in exchange for value and as late as possible; if an account is required, explain why and set it up before showing sign-in options; offer linking to existing accounts; in commerce, create accounts after purchase; welcome immediately; show "Using Sign in with Apple" in account settings.
- **Data**: say what's required vs optional; never ask for a password; respect private relay emails (show the relay address, use order numbers instead); ask for optional data later in context; show the data you received.
- **Buttons**: at least as prominent as other sign-in options. System buttons give approved appearance, localisation and VoiceOver; titles *Sign in / Sign up / Continue with Apple* (watchOS: "Sign in"); white (dark backgrounds), white with outline (light, low contrast), black (light backgrounds; watchOS dark grey); adjustable corner radius; minimum 140×30 pt with 1/10-height margins.
- **Custom buttons**: Apple's downloadable logo only (never as a button by itself, never cropped, height = button height); fixed titles; black or white only; rectangle for logo+text, circle or rectangle for logo-only (1:1). May change font, case, subtle background texture/gradient, corner radius, bezel and shadow. Title font ≈43% of button height; right margin ≥8% of width; PNG logos only at 44 pt; App Review checks every custom button.

## Siri — [HIG](https://developer.apple.com/design/human-interface-guidelines/siri)
- Expose actions and content via **App Intents**; adopt **app schema domains** (mail, music, photos…) for richer natural-language handling with Apple Intelligence; annotate on-screen content with entities ("Add *this* photo to my Landscapes album"); donate relevant entities to Spotlight and actions as intents.
- Prioritise popular actions and contexts (hands-free, specific devices); use the words people use; offer personally relevant content; no ads or upsells; custom responses only when built-ins fall short.
- **Responses**: clear and descriptive ("Which soup?" not "Which one?"); short (no filler or jokes); work both spoken and visual; inclusive ("Who should I send it to?"); open questions when lists are long; device-independent; no app name (the system attributes it); clean language, respect parental controls; specific errors ("Sorry, we're out of chicken noodle soup").
- **Editorial**: call Siri "Siri" (no pronouns); never impersonate Siri or use reserved phrases ("Call 911", "Hey Siri"); translate only "Hey" in "Hey Siri" using Apple's list (e.g. Oye Siri, Dis Siri, Hej Siri).

## Tap to Pay on iPhone — [HIG](https://developer.apple.com/design/human-interface-guidelines/tap-to-pay-on-iphone)
- **Enable**: terms accepted by an admin before customer-facing flows (or via web for enterprise); prompt OS updates first if the PSP requires.
- **Educate merchants**: a tutorial covering checkout per payment type, card/wallet positioning and PIN entry (incl. accessibility mode), using Apple assets or the ProximityReaderDiscovery API; end with terms acceptance if needed.
- **Checkout**: always show the option (configure in the background, show determinate/indeterminate progress); prepare at launch and every foreground; easy to find (auto-open if it's the only method); easy switching with hardware readers; label **"Tap to Pay on iPhone"** or "Tap to Pay" (or your Charge button if it's the only method), optional `wave.3.right.circle` symbol, never the Apple logo, styled like your buttons; final amount (tips etc.) settled before the screen.
- **Results**: start processing early; show authorisation progress after the checkmark animation; clear approved/declined screens with digital receipts; fallbacks after failed taps (cash, link, hardware, try another card); handle SCA PIN requests and offline-PIN markets with your PSP; clear errors and support contact.
- **Non-payment reads**: generic labels ("Look Up", "Store Card", "Verify", "Refund"); separate, non-payment-named buttons for loyalty-only reads.

## VoiceOver — [HIG](https://developer.apple.com/design/human-interface-guidelines/voiceover)
- Descriptive labels for every key element (kept current); describe meaningful images (only what the image adds); full chart/infographic descriptions and interactions; hide decorative images.
- Unique screen titles and accurate headings; group related elements (image with caption) and define order; announce content and layout changes; support the rotor (headings, links, braille keyboard).
- visionOS: with VoiceOver on, custom gestures don't receive hand input unless people enable Direct Gesture mode.

## Wallet — [HIG](https://developer.apple.com/design/human-interface-guidelines/wallet)
- **Passes**: offer one-tap add after creating a pass (background-add after one-time authorisation for routine ones like check-in); suggest adding passes made elsewhere once; add related passes as a group; Add to Apple Wallet button where pass info appears; "View in Wallet" links; correct expiry/relevance/voided data; permission before deleting; relevance (time, place) to surface on the Lock Screen (and Live Activities for events); keep passes updated; change messages only for time-critical changes (gate change), never marketing.
- **Anatomy**: logo and logo text, header (visible when collapsed), primary, secondary/auxiliary, footer, back fields; semantic tags (required for poster event tickets and semantic boarding passes) enable automatic layout and featured actions.
- **Design** (Pass Designer): works on every device (watch shows less; no image padding); uncluttered front with the key fact in the header; instantly identifiable brand colours/art; legible contrast; device-neutral wording ("Slide to view" fails on watch).
- **Styles**: boarding passes, coupons, event tickets (incl. poster style with full art), store cards, poster generic, generic.
- **Images** (PNG @2x/@3x; no embedded text or barcodes; small files): logo 50 pt tall, 50–160 pt wide; primary logo 30 pt tall (≤126 wide); secondary logo 12 pt tall; icon 38×38 pt; strip 375×144 pt (coupons, store cards); thumbnail 90 pt tall (60–90 wide); background 343×503 pt; poster artwork 358×448 pt (bottom strip covered by material); boarding footer 268×15 pt.
- **Order tracking**: add orders automatically after Apple Pay or via the "Track with Apple Wallet" button; show something immediately ("Check back later for full order details"); keep status current (Order Placed, Processing, Ready for Pickup, Picked Up, Out for Delivery, Delivered, Issue, Canceled); 300×300 px opaque logo and plain product images; brief, localised text with the confirmed price; universal link to manage orders; clear line items and PDF receipts; prioritised app list; no duplicate notifications; several contact methods; carrier links, pickup barcodes and instructions; carrier name or "Track Shipment"; specific statuses only when known; direct explanations for Issue/Canceled.
- **Identity verification (Verify with Wallet)**: only on capable devices (with fallback); ask at the precise moment; purpose strings that state the legal reason ("Federal law requires this information to verify your identity…"); minimum data (age thresholds); state retention; buttons *Verify Age / Verify Identity / Continue / Verify with Apple Wallet* (white on black, optional outline, adjustable radius).
- *watchOS*: passes in a card carousel with details on tap; strip images are cropped.
