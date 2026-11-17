# Accessibility, inclusion, privacy, writing, branding and right-to-left

Paraphrased from Apple's HIG Foundations. Synced 2026-11-17.

## Accessibility — [HIG](https://developer.apple.com/design/human-interface-guidelines/accessibility)

An accessible interface is **intuitive** (familiar, consistent), **perceivable** (never one channel only) and **adaptable** (honours system settings and personalisation). Audit with Accessibility Inspector; declare support with Accessibility Nutrition Labels on the App Store.

**Vision**
- Let text scale to at least 200% (140% on watchOS), ideally via Dynamic Type.
- Default/minimum sizes as in Typography; thin weights need more size.
- Contrast (Accessibility Inspector uses WCAG AA): text up to 17 pt needs 4.5:1; 18 pt and larger, or any bold text, needs 3:1. If the default can't meet it, the Increase Contrast mode must. Check light and dark. APCA is also accepted as a measure.
- Prefer system colours (they ship accessible variants). Never colour alone; consider letting people recolour charts or characters.
- Describe everything for VoiceOver.

**Hearing**: captions (synchronised text for dialogue and sounds), subtitles (dialogue in a chosen language), audio descriptions (narration of visual-only information in natural pauses), transcripts (full text for long-form media). Pair audio cues with haptics (Music Haptics, Audio Graphs on iOS) and with visual cues, especially for off-screen events in games and spatial apps.

**Mobility**
- Control sizes, default/minimum: iOS/iPadOS 44×44 / 28×28 pt, macOS 28×28 / 20×20, tvOS 66×66 / 56×56, visionOS 60×60 / 28×28, watchOS 44×44 / 28×28.
- Spacing matters as much as size: about **12 pt** around bezeled elements, about **24 pt** around the visible edges of borderless ones.
- Simplest gesture for frequent actions; no custom multi-finger or two-hand gestures. Every gesture has an on-screen alternative (swipe-to-dismiss also gets a button).
- Label elements for Voice Control; expose tasks to Siri and Shortcuts (and so to the Action button); test with VoiceOver, AssistiveTouch, Full Keyboard Access, Pointer Control and Switch Control.

**Speech**: everything reachable with the keyboard alone; don't override system shortcuts; support Switch Control.

**Cognitive**
- Familiar system gestures over custom ones.
- Avoid views that dismiss on a timer; prefer an explicit dismiss.
- Difficulty and reaction-time options in games.
- No autoplay without controls; respect the global autoplay preference and Dim Flashing Lights.
- **Reduce Motion**: cut automatic and repeating animation (zoom, scale, peripheral motion); tighten springs; tie motion to gestures; don't animate z-depth; swap slides for fades; don't animate into or out of blur.
- **Assistive Access** (iOS/iPadOS): strip to core tasks, one interaction per screen, confirm twice before hard-to-undo actions.

**visionOS comfort**: keep UI in view and prefer horizontal layouts (less neck strain); slow down peripheral animation; gentle camera motion; never head-lock content; avoid large repetitive gestures. Supports Pointer Control (head and hand) and Zoom.

## Inclusion — [HIG](https://developer.apple.com/design/human-interface-guidelines/inclusion)

- Inclusive is more than inoffensive: design for the full range of age, gender identity, race, sexuality, body, cognition, disability (permanent, temporary, situational), language, culture, religion, education, opinion and economic context.
- **Language**: check tone from other perspectives (academic tone can feel exclusive); address people as *you*, keep *we* for the company (or avoid it); define jargon; replace idioms (some have exclusionary origins); be careful with humour (hard to translate, wears thin).
- **Approachable**: simple interface, plus an optional, skippable path to learn more.
- **Gender**: avoid needless gendered words ("his or her" → rewrite with a plural); use non-gendered figures for generic people; let people customise avatars; if gender is truly required, offer options like nonbinary, self-identify and decline to state, and ask for pronouns.
- **People and settings**: show varied people without stereotyped roles; avoid excessive affluence; show relatable places and objects.
- **Stereotypes**: question assumptions (what a "family" is; security questions about college or cars). Prefer universal prompts ("name of your first friend").
- **Disability**: each disability is a spectrum; everyone experiences some; show people with disabilities; write people-first and ask how communities self-identify.
- **Languages**: internationalise first; plain language localises better; SF Symbols include localised and RTL glyphs; colour meanings differ by culture.

## Privacy — [HIG](https://developer.apple.com/design/human-interface-guidelines/privacy)

- Ask only for what a feature needs, only when people reach that feature; on-device processing where possible; use system protections.
- Needs permission: personal data (location, health, finance, contacts), user content (mail, messages, calendar, photos, media, HomeKit data, gameplay), protected resources (Bluetooth, local network, Wi-Fi, home), camera and microphone, ARKit data in a visionOS Full Space, the advertising identifier.
- **Launch-time requests** only when the app can't work without them (navigation needs location).
- **Purpose strings**: one short, active, specific sentence in sentence case with a full stop. Good: "The app records during the night to detect snoring sounds." Bad: "Microphone access is needed for a better experience." / "Turn on microphone access."
- **Pre-alert screens**: allowed when extra context is truly needed, with exactly one button labelled like *Continue* or *Next* (never *Allow*), and no way to skip past the system alert.
- **Tracking**: no misleading pre-screens. Rejected patterns: incentives ("get ₹100 credit"), screens that mimic a request, pictures of the alert, arrows or annotations pointing at Allow. Legally required consent screens are allowed.
- **Location button** (iOS, iPadOS, watchOS): one-time location access at the moment of need; customise title (from a fixed set), filled/outlined glyph, colours and corner radius only; must stay legible and untruncated at all text sizes and languages or the system disables it.
- **Protecting data**: passkeys over passwords, 2FA if passwords remain, Face ID / Touch ID / Optic ID to re-enter; secrets in the keychain, never plain text; no home-made auth — use passkeys, Sign in with Apple, Password AutoFill.
- *macOS*: Developer ID signing, sandboxing (required on the Mac App Store), don't assume who is signed in. *visionOS*: ARKit data only in a Full Space with permission; gaze is private (hover effects are drawn by the system); the back camera returns blank — replace camera features with import.

## Writing — [HIG](https://developer.apple.com/design/human-interface-guidelines/writing)

- **Voice** is constant (who you're talking to, the vocabulary, the feeling); **tone** shifts with context (serious alert vs. celebration). Keep a terms list.
- Clear, short, plain; read it aloud; write for everyone and for localisation.
- Each screen has one purpose; most important first; split multiple ideas across screens.
- **Verbs on buttons and links.** "Send", not "Let's do it!"; "Learn more about UX writing", not "Click here".
- Build reusable language patterns. Pick a capitalisation per element type (title case reads formal, sentence case casual) and stick to it.
- Multi-step flows: start with something like *Get Started*, move with consistent *Continue* or *Next*, end with *Done*.
- Few possessives ("Favorites", not "Your Favorites"); never *we* ("Unable to load content", not "We're having trouble…").
- Use the device's verbs: *tap* on touch, *click* on Mac. Shared TV screens: consider who's reading.
- **Empty states**: welcome, explain, and give a button for the next action; don't put crucial info there (it disappears).
- **Errors**: prevent first; show beside the problem; no blame, no "oops"; say how to fix it ("Choose a password with at least 8 characters", not "That password is too short"). If wording can't fix a common error, redesign the interaction.
- Choose the right channel by urgency: notification, alert or action sheet.
- **Settings labels**: say what *on* does; link straight to a setting instead of describing its location.
- **Text fields**: labels plus hint text (example "name@example.com" or description "Your name"); inline, instructive errors ("Use only letters for your name", not "Invalid name").

## Branding — [HIG](https://developer.apple.com/design/human-interface-guidelines/branding)

- Express the brand through voice and tone in all copy.
- **Accent colour sparingly**: primary actions and status (unread badges, selected tab icon). Better: move brand colour into the *content layer*, where it scrolls under the glass controls and tints them naturally.
- Custom font for headlines, system font for body and captions; custom fonts must support Bold Text and Dynamic Type.
- Brand familiar components; keep their size, position and behaviour.
- Branding defers to content: no space spent only on brand assets, no logo repeated through the app, no branded launch screen (use onboarding for that).
- Standard patterns, standard symbols, standard navigation even in a stylised UI.
- No Apple trademarks in app names or images.

## Right to left — [HIG](https://developer.apple.com/design/human-interface-guidelines/right-to-left)

System components flip automatically for Arabic, Hebrew and other RTL languages.
- **Text**: alignment follows interface direction for 1–2 line blocks; paragraphs (3+ lines) align to their own language; one alignment for all items in a list.
- **Numbers**: never reverse the digits within a number (phone, card, "541"); do reverse sequences that show progress or order (slider ticks, rating scales). Arabic may use Western or Eastern Arabic numerals depending on region.
- **Controls**: flip progress controls (sliders, progress bars) with their end glyphs; flip ordered navigation (Back points right); keep controls that mean a physical direction ("to the right"). Bump Arabic/Hebrew ~2 pt beside all-caps Latin.
- **Images**: don't mirror photos or artwork (meaning and copyright); reverse the *order* of ordered images.
- **Icons**: flip icons for text and for forward/back motion (speaker waves); localise icons containing text; never flip logos, universal marks (checkmark) or real-world objects (clocks, right-handed tools); think through badges and slashes individually (SF Symbols keep the same backslash in both directions).
