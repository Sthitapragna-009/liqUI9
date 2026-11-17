# Technologies (part 1: AirPlay → CareKit)

Paraphrased from Apple's HIG *Technologies* section. Synced 2026-11-17. Many technology pages carry **brand-asset rules**: Apple's marks and buttons (AirPlay icon, Apple Pay button and mark, AR glyph and badges, App Clip Codes) must come from Apple's official resources and APIs, unaltered. liqUI9 never redraws them.

## AirPlay — [HIG](https://developer.apple.com/design/human-interface-guidelines/airplay)
- System player first; HLS playlists with the full resolution range (720p looks poor on a 4K TV); stream only content people expect (not background loops); support streaming *and* mirroring; support remote control events; keep playing in the background and when locked (no automatic mirroring); don't interrupt other apps' playback unless starting immersive content; keep the app usable during playback without starting other videos.
- Custom players: AirPlay buttons that match the system's states, Apple symbols only, positioned lower-right (iOS/iPadOS 16+).
- **Icon**: black on light, white on dark, or a custom colour matching other technology icons; never inside custom buttons or as a substitute for the word; less prominent than your own brand.
- **Wording**: "AirPlay" (one word, capital A and P) as a noun — "Use AirPlay to listen on your speaker", never "AirPlay to your speaker"; "works with / supports / compatible with AirPlay".

## Always On — [HIG](https://developer.apple.com/design/human-interface-guidelines/always-on)
iPhone Lock Screen (widgets, Live Activities) and Apple Watch apps stay visible, dimmed, when people stop interacting.
- Redact sensitive data (balances, health); keep useful personal info glanceable (workout pace, flight status).
- Keep key content legible and dim the rest (remove row backgrounds, rich images, big colour fills).
- Consistent layout: turn interactive controls to an unavailable look rather than removing them; update rarely and subtly (score only, not play-by-play) — face-up iPhones make motion visible.
- Ease motion to rest rather than freezing it.

## App Clips — [HIG](https://developer.apple.com/design/human-interface-guidelines/app-clips)
A small, instantly launched slice of an app for an in-the-moment task (rent a bike, order coffee, pay at a table, museum AR) or a demo (first game level).
- Complete the task or demo inside the clip; essential features only; no marketing-only clips or ads; no web views; linear UI without tab bars or settings; open on the most relevant step; no splash or waiting; small download; shareable deep links; Apple Pay for payment; no forced account (Sign in with Apple if needed); the full app must take over seamlessly (no re-login).
- **Privacy**: no background work; store little and securely off-device (the clip and its data may vanish).
- **Recommend the app** politely at a natural pause (an overlay), never repeatedly or by push.
- **Notifications**: allowed for 8 hours after launch; longer only with explicit permission when the task spans days; task-related only.
- **Multi-business platforms**: the business's branding, not yours; handle several businesses/locations.
- **Card**: informative photo or graphic (1800×1200 px PNG/JPEG, no transparency, no screenshots or text); title ≤30 characters, subtitle ≤56; button verb *View* (media/info), *Play* (games) or *Open* (everything else).
- **App Clip Codes**: only Apple-generated designs; *scan-only* (camera glyph — posters, screens, out-of-reach signage) or *NFC-integrated* (iPhone glyph — tabletops, registers, cards); badge with the App Clip logo when there's clear space (not on disposable, gambling or drinking items); flat or gently cylindrical surfaces (width ≤ 1/6 circumference); rigid, unobstructed, upright, never animated or dimmed; minimum 3/4 in (1.9 cm) printed, 256×256 px digital, 35 mm NFC tag (code ≥1.37 in); distance-to-size ratio ≤20:1, ideally 10:1; clear space = glyph-to-ring gap; clear call to action ("Scan to …", "Hold your iPhone near the … to …").
- Printing: matte, non-textured, UV-resistant outdoors; ≥600 ppi raster, ≥300 dpi print; sRGB → CMYK with relative colorimetric intent; grayscale codes for grayscale printers; Type 5 NFC tags; test batches and calibration sheets. Legal: never modify, never use in your own names, stop showing codes for inactive clips, never translate Apple trademarks.

## Apple In-App Purchase — [HIG](https://developer.apple.com/design/human-interface-guidelines/apple-in-app-purchase)
For **digital** goods: consumable, non-consumable, auto-renewable subscriptions, non-renewing subscriptions. (Physical goods, services and donations use Apple Pay.)
- Let people experience the app first; an integrated store in your app's style; short product names; **always show the total billing price**; hide or explain the store when payments are restricted; never alter or copy the system confirmation sheet.
- **Family Sharing**: mention it where people learn about the offer ("Family" in names); explain how to join; messaging that works for purchaser and family ("Your family subscription includes…").
- **Refund help**: a help screen before refunds (missing purchases, FAQs, contact), titled simply "Refund" / "Request a Refund"; identify each purchase (image, name, date); alternatives offered but refund never blocked or buried; don't characterise Apple's policy.
- **Subscriptions**: show benefits in onboarding; range of tiers and durations; free access (freemium, metered paywall, free trial); prompt at relevant moments (near a free limit); never upsell existing subscribers; sign-in for subscriptions bought elsewhere.
- **Sign-up screen must show**: subscription name, duration and what each period includes; localised billing amount; sign-in / restore purchases; plus Terms and Privacy links. Clear options with price and duration (and intro price, its length and the price after); minimal info at sign-up; tvOS sign-up on another device; free trials state that payment starts automatically and how much; a sign-up entry in settings.
- **Offer codes** (iOS/iPadOS): one-time codes or custom codes (alphanumeric ASCII only); explain details and how to redeem; a "Redeem Code" button that opens the system sheet; promotional image; welcome people straight into unlocked content.
- **Management**: show renewal dates; use the system management UI; retention offers allowed, but **cancelling must always be easy to find**.
- *watchOS*: same required info, often in a modal sheet with Close; compact comparable options (one button per option, or a list plus one button).

## Apple Pay — [HIG](https://developer.apple.com/design/human-interface-guidelines/apple-pay)
For physical goods, services, subscriptions and donations, in apps and browsers.
- Offer it wherever supported (and not where unsupported). If you check for an active card, **Apple Pay must be the primary option** (pre-selected, first, larger, or separated by a line), in the same flow.
- Apple Pay buttons only start payment or setup; custom buttons can't say "Apple Pay" or show its logo (then show the Apple Pay mark nearby); the mark only signals acceptance, never acts as a button; never hide or disable the button — explain missing options after the tap; list Apple Pay in search-engine product markup; web pages need a privacy statement.
- **Checkout**: cohesive, branded, no new windows; single-item buy buttons on product pages (excluding cart items); express checkout for carts; coupon entry on the payment sheet; collect size/colour, optional notes, multiple shipping destinations and pickup locations *before* the sheet; prefer Apple Pay's contact and address data; account creation after purchase (prefilled); report results in the sheet; thank-you page (optionally "1234 (Apple Pay)").
- **Payment sheet**: only essential fields (no shipping address for e-gift cards); show active codes; shipping methods with cost and delivery window; line items for extra charges, discounts, pending amounts, donations and recurring payments — not for listing products; short line items; "Pay [Business Name]" matching the bank statement, or "Pay [Merchant] (via [You])" for marketplaces; disclose pending amounts (tips, metered rides); let the sheet show progress (no extra spinners).
- Website icon 60×60 pt (@2x, @3x).
- **Errors**: tolerant validation (accept ZIP+4, phone formats); correct status codes; specific field messages as noun phrases in sentence case, ≤128 characters ("Zip code doesn't match city"); cancel in-progress payment on interruption.
- **Subscriptions**: explain terms before the sheet; line items for frequency, discounts, fees, trials (amount, regular price, start date); total shows what's charged now; re-authorise only when a change costs more; keep the billing-agreement field short or empty. **Donations**: a "Donation" line item; preset amounts plus Other.
- **Buttons** (always via Apple's API — correct captions, localisation, VoiceOver): Buy, Pay, Check Out, Continue, Book, Donate, Subscribe, Reload, Add Money, Top Up, Order, Rent, Support, Contribute, Tip, plain Apple Pay; Set Up Apple Pay. Styles: automatic, black (light backgrounds), white with outline (light, low contrast), white (dark backgrounds). As large as other payment buttons, no scrolling to reach; **right of Add to Cart side by side, above it when stacked**; corner radius adjustable (square to capsule); minimum 100×30 pt (plain) or 140×30 pt (with caption), margins ≥1/10 of height.
- **Mark**: Apple artwork only, height-adjustable (≥ other payment marks), no other changes, clear space 1/10 of height.
- **Wording**: "Apple Pay" (two words, capital A and P; never plural, possessive, the Apple logo, or translated); ® on first US body-text use; your own font; text-only only when every option is text-only.

## Augmented reality (iOS/iPadOS) — [HIG](https://developer.apple.com/design/human-interface-guidelines/augmented-reality)
- Offer AR only on capable devices (hide, don't error). Use the whole display; realistic, well-lit, grounded objects at 60 fps; small or coarse reflective surfaces; audio and haptics for contact; minimal text in the scene; persistent controls in *screen space*, translucent where possible; plan for cramped or flat-less rooms; comfort (no long arm-holding); introduce movement gradually; safety (no sudden sweeping motions).
- **Coaching**: system coaching view during setup and relocalisation; hide other UI meanwhile.
- **Placement**: show where placement is possible; place instantly, refine later; guide to off-screen objects; don't snap to approximate plane edges; use plane classification (floor, table).
- **Interaction**: direct manipulation with standard gestures (drag, two-finger rotate); generous targeting near objects; scaling only where it makes sense (never to fake distance; not for real products); test similar gestures; physics-consistent movement; proximity/motion-driven behaviour.
- **Multiuser**: people occlusion; let late joiners in.
- **Image/object detection**: delay removal ~1 s when an image is lost; ≤100 reference images at once; few tracked images.
- **Language**: friendly — "Unable to find a surface. Try moving to the side…" not "Unable to find a plane. Adjust tracking."; 3D hints over text in 3D; critical text in screen space (or billboarded, constant size); tap-for-more indicators.
- **Interruptions**: relocalise with coaching; hide objects meanwhile; avoid leaving AR for sub-tasks; allow reset; indicate lost face tracking (~0.5 s).
- **AR glyph and badges**: Apple's only, unaltered (size/colour for the glyph), only for ARKit experiences; badges only when some items aren't AR; same corner every time; clear space 10% of height.

## CareKit — [HIG](https://developer.apple.com/design/human-interface-guidelines/carekit)
Care-plan apps (CareKit UI views + CareKit Store data).
- Clear privacy policy; HealthKit requests only when needed, with explanatory text on the system screen (no custom duplicates); manage sharing only in system Settings; motion data and photos with permission; ResearchKit for consent and surveys.
- **Tasks** (title + schedule required; instructions, group ID optional): *simple* (one step), *instructions* (one step + notes), *log* (timestamped events, e.g. nausea), *checklist* (multi-step with times), *grid* (compact multi-step, custom UI allowed). Colour reinforces categories (never alone); accurate but simple names (brand names, no redundant "take"); images or video for complex steps.
- **Charts** (bar, scatter, line): narratives that show progress (adherence vs pain); short labels (units on the axis); distinct, contrasting colours; legends when needed; explicit time units; consolidate large datasets; offset extremes so small values stay readable.
- **Contacts** (simple, detailed): colour-code the care team.
- Few notifications (coalesce); actionable notification detail views; CareKit's symbols (SF Symbols for custom grid items, care-related, never logos); subtle branding, no ads.
