# Getting started: principles and platforms

Paraphrased from Apple's Human Interface Guidelines, *Getting started* section. Every heading links to Apple's page; read it before relying on a rule for shipping work. Synced 2026-11-17.

## Design principles — [HIG](https://developer.apple.com/design/human-interface-guidelines/design-principles)

Apple reintroduced eight named principles in June 2026. They are trade-off tools, not a checklist: use them to argue a decision.

| Principle | One-line meaning | What it asks of a design |
|---|---|---|
| Purpose | Make something worth using | Know what the product is for; put effort into the few features that matter; look for a new answer rather than copying an existing one |
| Agency | People do things their own way | Get people to the task fast; never trap them in a flow (guided flows must be skippable); make mistakes cheap to undo |
| Responsibility | Act in people's interest | Say plainly what the product does and why; explain every permission request; collect only what's needed; plan for misuse |
| Familiarity | Build on what people know | Use known real-world and software concepts; once a look or behaviour is set, repeat it everywhere; give clear feedback through system patterns |
| Flexibility | Fit many contexts and needs | Accessibility from day one; keep controls in stable positions across sizes; support voice, touch, keyboard and more; give every platform equal care |
| Simplicity | Clear and direct | Simplicity is not minimalism: keep the important things close and let the rest fall away; use the exact words needed; make hierarchy obvious |
| Craft | Care about every detail | Deliberate visuals, motion, wording and sound; prototype early and throw away what fails; keep the product current after launch |
| Delight | Make it human | Pick the emotion first (calm, energised, thrilled); turn small moments (a press, an error) into character; delight is the sum of the other seven, never decoration on top |

## Platform quick facts

| Platform | Display & distance | Primary input | Session shape | System features to integrate |
|---|---|---|---|---|
| iOS — [HIG](https://developer.apple.com/design/human-interface-guidelines/designing-for-ios) | Medium, high-res; held 1–2 ft away, portrait or landscape | Multi-Touch, virtual keyboard, voice | Minute-long check-ins to hour-long sessions; frequent app switching | Widgets, Home Screen quick actions, Spotlight, Shortcuts, activity views |
| iPadOS — [HIG](https://developer.apple.com/design/human-interface-guidelines/designing-for-ipados) | Large; held or on a stand, within ~3 ft | Touch, keyboard, pointer, Apple Pencil, voice — often mixed | Quick actions to hours of creation; several apps on screen | Multitasking, widgets, drag and drop |
| macOS — [HIG](https://developer.apple.com/design/human-interface-guidelines/designing-for-macos) | Large, often several displays (incl. iPad via Sidecar); on a desk | Keyboard and pointer; trackpad gestures; touch on touch-display Macs for brief, intentional actions | Minutes to hours of deep work; many apps open | Menu bar, file management, full screen, Dock menus |
| tvOS — [HIG](https://developer.apple.com/design/human-interface-guidelines/designing-for-tvos) | Very large; viewed from 8 ft or more | Siri Remote, game controller, voice, companion devices | Long immersive sessions; picture in picture | TV app integration, SharePlay, Top Shelf, TV provider accounts |
| visionOS — [HIG](https://developer.apple.com/design/human-interface-guidelines/designing-for-visionos) | Infinite 3D canvas; content placed relative to the head | Eyes to target + indirect pinch; direct touch | Shared Space by default; Full Space for single-app immersion | Windows, volumes, immersive spaces, spatial Personas, Spatial Audio |
| watchOS — [HIG](https://developer.apple.com/design/human-interface-guidelines/designing-for-watchos) | Small; within a foot, wrist raised | Digital Crown, tap/swipe, Action button, sensors | Glances under a minute; complications and notifications used more than the app | Complications, notifications, Always On, watch faces |

### Platform best practices, condensed

- **iOS.** Few on-screen controls, with secondary actions discoverable in one step. Adapt to rotation, Dark Mode and Dynamic Type. Put frequent controls in the middle or bottom of the screen where thumbs reach; support swipe-back and swipe actions on rows. With permission, use device data (location, payments, biometrics) instead of asking people to type.
- **iPadOS.** Use the big screen to show more content with fewer modal and full-screen hops. Size content density by viewing distance and input. Allow combined inputs (Pencil + touch, keyboard + pointer). Survive every multitasking size and run well on Mac.
- **macOS.** Show more content in fewer nested levels and with less modality, but keep density comfortable. Windows must resize, hide, move and go full screen. Every command lives in the menu bar; add keyboard shortcuts. Support pixel-precise pointer work. On touch-display Macs, expand controls on touch but keep the pointer-optimised size and density. Let people customise toolbars, window views, colours and fonts.
- **tvOS.** Build on the focus system (items lift and expand as focus moves). Edge-to-edge artwork, slow subtle motion, legible from across the room. Make sign-in rare and support shared profiles.
- **visionOS.** Find the *minimum* immersion each moment needs. Use windows for UI-centric tasks. Keep content in the field of view, never jarring or missing a stable frame of reference; let hands rest in the lap; keep direct-touch targets close and interactions short. Note Apple's safety notes (not for use while driving, age 13+).
- **watchOS.** Glanceable, single-screen, one-or-two-gesture tasks. Shallow navigation driven by the Digital Crown. Anticipate needs with on-device data. Lean on complications and actionable notifications; the app must still work on its own. Use background colour to carry meaning and materials to show hierarchy.

## Designing for iPhone Duo — [HIG](https://developer.apple.com/design/human-interface-guidelines/designing-for-iphone-duo)

New in September 2026. iPhone Duo is a folding iPhone with an outer display (wide and short) and an inner display, a centre hinge, and a corner camera on the outside. iOS rules still apply.

- **Build to resize, don't build per pose.** Use size classes: compact width on the outer display, regular on the inner. Layout margins and safe areas, no fixed widths, no display-specific code.
- **One app, two displays.** Same functions and state on both; the inner display may add one more level of hierarchy (Mail: list *or* message when closed, list *and* message when open).
- **Vertical controls.** On the outer display (and the inner one in landscape), toolbars, tab bars, the status bar and the Dynamic Island move to the side edge. Order top to bottom: Back/Close, then the prominent action (Done), then the remaining groups. Give every toolbar item both a title and a symbol; keep text-only buttons rare because text labels stay horizontal.
- **Overflow.** Items overflow bottom-to-top; set visibility priorities so frequent and badged items stay visible. Use the system overflow menu and reserve the ellipsis symbol for it.
- **When space runs out:** navigation-led views keep the tab bar and push toolbar items to overflow (default); task-led views minimise the tab bar and keep the toolbar.
- **Reserved regions** are areas content avoids: the outer camera (grows into the Dynamic Island for Live Activities), the inner camera when active, and the fold when the device is partly open. Alerts, menus, sheets and split views adapt automatically; custom views use the ReservedRegion API.
- **Folding.** Prefer containers that adapt (split views rebalance pane widths); prefer an even column count in grids; make small adjustments, never dramatic rearrangement.
- **Arrangement views** hold a primary and secondary view and arrange them as a *split* (side by side or stacked, by aspect) or an *overlay* (layered; moves to either side of the fold). Use when the layout already resembles an HStack/VStack (split) or ZStack (overlay). Keep navigation containers outside them.
- **Games** must fill the screen in every pose; prefer changing aspect ratio to letterboxing, or fill the bars with art.

## Designing for games — [HIG](https://developer.apple.com/design/human-interface-guidelines/designing-for-games)

- Playable as soon as install finishes (initial download 30 minutes or less, rest in the background). Smart defaults from the device (resolution, paired controllers, accessibility settings). Teach through play; ask for permissions and ratings only at the moment they make sense.
- Legibility and target sizes by platform (useful far beyond games):

| Platform | Default text | Minimum text | Default button | Minimum button |
|---|---|---|---|---|
| iOS, iPadOS | 17 pt | 11 pt | 44×44 pt | 28×28 pt |
| macOS | 13 pt | 10 pt | 28×28 pt | 20×20 pt |
| tvOS | 29 pt | 23 pt | 66×66 pt | 56×56 pt |
| visionOS | 17 pt | 12 pt | 60×60 pt | 28×28 pt |
| watchOS | 16 pt | 12 pt | 44×44 pt | 28×28 pt |

- Resolution-independent art (vector in visionOS); respect safe areas, rounded corners and camera housings; in-game menus must work at 16:10, 19.5:9 and 4:3; support full screen.
- Default inputs: touch on iPhone/iPad/watch, keyboard + pointer on Mac, remote on TV, eyes + hands on Vision Pro. Support controllers but always offer an alternative; on iPhone/iPad, offer touch controls designed for glass, not ported gamepads.
- Perceivability: never colour alone; subtitle cutscenes; let players tune text size, control mapping, motion intensity and sound balance; inclusive avatars; avoid stereotypes.
- Adopt Game Center, cross-device saves, haptics and Spatial Audio where they serve the game.
