# Components: Menus and actions

Paraphrased from Apple's HIG component group *Menus and actions* (activity views, buttons, context menus, Dock menus, edit menus, Home Screen quick actions, menus, ornaments, pop-up buttons, pull-down buttons, the menu bar, toolbars). Synced 2026-11-17.

## Buttons — [HIG](https://developer.apple.com/design/human-interface-guidelines/buttons)
A button = **style** (size, colour, shape) + **content** (symbol, text, or both) + **role** (system meaning).
- **Hit region at least 44×44 pt** (60×60 pt in visionOS) and enough space to separate it from neighbours.
- **Always design a pressed state** for custom buttons.
- **Prominent style for the most likely action**, so the system tints its background with the accent colour. One or two prominent buttons per view at most.
- Show preference with **style, not size**: options in a set share a size; the preferred one gets the more prominent style.
- Over colourful content, keep labels monochrome; don't colour labels like the content behind them.
- Familiar icons for familiar actions (`square.and.arrow.up` for share); text when a few words are clearer — title case, verb first ("Add to Cart").
- macOS and visionOS show tooltips on hover.
- **Roles**: normal; primary (default button, accent colour, responds to Return, closes sheets/alerts); cancel; destructive (system red). **Never give a destructive action the primary role**, even if it's the likely choice.
- *iOS/iPadOS*: a button can show an activity indicator in place with an alternate label ("Checkout" → "Checking out…").
- *macOS*: push buttons (standard; flexible-height only for tall content; trailing ellipsis when it opens another window/view; spring-loading); square/gradient buttons (symbols only, inside or under the view they affect, never in toolbars); help button (system "?" button, one per window, opens the relevant help topic; lower corner opposite dismissal buttons, or lower-left/right in settings); image buttons (inside views, ~10 px padding, label below).
- *visionOS*: buttons have visible backgrounds and play sounds (no haptics). Shapes: circle for icon-only, rounded rectangle or capsule for text, capsule for icon + text. Sizes: mini 28, small 32, regular 44, large 52, extra-large 64 pt (circles at all sizes; capsules small–large). Thin material on glass windows; glass when floating in space. **White fill with black content is reserved for the toggled state.** Prefer rounded shapes (eyes are drawn to corners). Centres ≥60 pt apart; +4 pt padding for buttons ≥60 pt; no rows or stacks of mini/small buttons; rounded rectangles in vertical stacks, capsules in horizontal rows. Custom hover effects aren't supported.
- *watchOS*: inline buttons are capsules with a material; toolbar buttons in the corners get Liquid Glass; full-width buttons for primary actions; equal heights for side-by-side or stacked buttons.

**LiqUI reading of the four Liquid Glass button styles** (as the kit implements them): *tinted glass* (prominent, accent-tinted background — the one primary action), *plain glass* (secondary), *bordered gray* (tertiary in content), *borderless/text* (inline). Sizes small/medium/large share one height scale; roles change colour, not size.

## Toolbars — [HIG](https://developer.apple.com/design/human-interface-guidelines/toolbars)
Toolbars hold the view title, navigation (Back, search) and actions. Tab bars are for switching app areas instead.
- **Don't overcrowd**; define which items overflow as width shrinks. The system adds the overflow menu on macOS/iPadOS — never add one by hand or design layouts that overflow by default. A More menu holds lower-priority actions only if truly needed.
- Customisable toolbars on iPadOS and macOS for long-session, feature-rich apps.
- **No custom toolbar backgrounds or tinted controls.** Let the content layer colour the glass; use a *scroll edge effect* to separate the bar from content. Keep labels monochrome over colourful content.
- Standard components get **concentric corner radii** with the bar; custom ones must match.
- Hide toolbars contextually for focus, always restorable.
- **Titles**: useful per window, never the app name, under 15 characters; may be empty when the content names itself (Notes).
- **Navigation**: standard Back and Close symbols, not the words "Back"/"Close".
- **Actions**: symbols over text (except things like Edit); system symbols without borders (the bar's sections are already containers); **one `.prominent` primary action (Done, Submit) on the trailing side**.
- **Groups**: leading (back, sidebar toggle, title, document menu — not customisable); centre (common controls, customisable, overflow first); trailing (always visible: inspectors, search, More, primary action). Group by function and frequency; navigation and critical actions in distinct groups; same placement across platforms; **at most three groups**; separate adjacent text-labelled buttons with fixed space.
- *iOS*: only essentials plus a More menu; large titles that shrink on scroll. *iPadOS*: toolbar and tab bar can share the top row. *macOS*: toolbar in the window frame, items without bezels; every toolbar item must also be a menu-bar command. *visionOS*: bottom-edge ornament with variable blur; symbol or text (gaze reveals the label); no vertical toolbars (tab bars are vertical); windows shouldn't shrink below the toolbar width; context-specific toolbars for modal states; no pull-downs (they'd cover window controls). *watchOS*: corner or bottom buttons stay put over scrolling content; scroll-revealed toolbar buttons for important but non-primary actions (Mail's New Message). *iPhone Duo*: vertical side toolbars with Back/Close on top (see Getting started).

## Menus — [HIG](https://developer.apple.com/design/human-interface-guidelines/menus)
- **Labels**: verbs for actions (View, Close, Select); title case; drop articles; dim unavailable items but keep the menu openable; trailing ellipsis when more input is needed.
- **Icons**: standard icons for common actions; sparingly and only when clear; all or none within a group.
- **Organisation**: most-used first; related items grouped with separators (keep Paste and Match Style with Paste); split long menus (except user-generated lists like History).
- **Submenus**: sparingly (e.g. when a term repeats in 3+ items: "Sort By ▸ Date/Score/Time"); one level; about five items max; always openable; never indentation instead.
- **Toggled items**: one item whose label flips (Show Map / Hide Map); add a verb if state vs action is ambiguous (Turn HDR On); or show both items; checkmarks for active attributes; a "Plain"-style reset for many toggles.
- **In-game menus**: platform-default navigation; legible and tappable at every screen size.
- *iOS/iPadOS layouts*: small (row of four icon-only items on top — only for tight groups like B/I/U/S), medium (row of three icon + short label — e.g. Scan, Lock, Pin), large (plain list, default). *visionOS*: small or large; menus near the content they affect; *subtle* breakthrough effect over 3D content by default.

## Context menus — [HIG](https://developer.apple.com/design/human-interface-guidelines/context-menus)
Hidden menus of item-specific actions (touch/pinch and hold, Control-click, secondary click).
- Most relevant actions only; short; available consistently wherever similar items appear; **every item also reachable in the main UI**.
- One submenu level, with a predictive title. **Hide** unavailable items (don't dim — except Cut/Copy/Paste on macOS).
- Most-used items nearest the pointer/finger (reverse order when the menu opens upward). No keyboard shortcuts shown. About three groups max.
- Destructive items last and marked destructive (red) on iOS, iPadOS, visionOS.
- Title only if it clarifies scope ("3 Messages"). Standard icons.
- *iOS/iPadOS*: context menu *or* edit menu per item, never both; iPadOS can create objects from a context menu in empty space; previews should be graphical and keep their clip shape through the animation. *visionOS*: context menus instead of extra panels; never taller than the window.

## Edit menus — [HIG](https://developer.apple.com/design/human-interface-guidelines/edit-menus)
- System edit menu, revealed by standard gestures; only applicable commands; custom commands next to related system ones; data-detected actions appear automatically (an address adds directions).
- Let people copy non-editable content text (not control labels). Support undo. Don't duplicate edit commands elsewhere. Distinguish Delete (no clipboard) from Cut.
- iOS: compact horizontal bar expanding into a context menu; iPadOS: horizontal for touch, context menu for pointer — design both; you can move it to avoid covering content.

## Pop-up buttons — [HIG](https://developer.apple.com/design/human-interface-guidelines/pop-up-buttons)
Flat list of mutually exclusive options; the button shows the current choice.
- Useful default; predictable options via a label; good when space is short; a Custom… item for rare options. Actions, multiple selection or submenus → pull-down button.
- iPadOS: in popovers/modals, a pop-up can replace drilling into a detail view for small option sets.

## Pull-down buttons — [HIG](https://developer.apple.com/design/human-interface-guidelines/pull-down-buttons)
Menu of actions related to the button's purpose (Add ▸ item type; Sort ▸ attribute; Back ▸ history).
- Don't hide all of a view's primary actions in one; three or more items (1–2 → plain buttons or toggles); title only if it adds meaning; destructive items red and confirmed in an action sheet (iOS) or popover (iPadOS); icons after labels when useful.
- iOS/iPadOS: long-press menus on buttons (Safari's Tabs button); a More (ellipsis) pull-down trades discoverability for space.

## Activity views (share sheets) — [HIG](https://developer.apple.com/design/human-interface-guidelines/activity-views)
- Opened only from the Share button. Don't duplicate system actions (Print); give similar custom ones specific titles ("Print Transaction"). Symbol icons (custom icons centred in ~70×70 px). Short verb titles without company names. Exclude irrelevant system activities.
- **Share/action extensions**: familiar UI (system compose view for sharing; app name and app-like elements for actions); few steps; no modals over the extension (alerts excepted); progress for long tasks shown in the main app; don't notify just because it finished.

## Dock menus (macOS) — [HIG](https://developer.apple.com/design/human-interface-guidelines/dock-menus)
High-value items (open windows, New Message) that also exist elsewhere.

## Home Screen quick actions — [HIG](https://developer.apple.com/design/human-interface-guidelines/home-screen-quick-actions)
Up to four touch-and-hold actions with title, optional subtitle and monochrome icon. High-value tasks; dynamic but predictable changes; titles that state the result ("Directions Home"), no app name; SF Symbols, never emoji.

## Ornaments (visionOS) — [HIG](https://developer.apple.com/design/human-interface-guidelines/ornaments)
Controls in a plane slightly in front of and parallel to a window, moving with it. For frequent controls in a stable place (Music's Now Playing). Usually visible (hide during immersive viewing); few, for balance; no wider than the window; borderless buttons on the glass background; use system toolbars/tab bars, which already are ornaments. Not for supplementary content (use an adjacent window).

## The menu bar (macOS, iPadOS) — [HIG](https://developer.apple.com/design/human-interface-guidelines/the-menu-bar)
Order: **App name, File, Edit, Format, View, app-specific menus, Window, Help** (macOS adds the Apple menu and menu bar extras).
- Keep standard menus and order; show the same items always (disable, don't hide); standard icons and shortcuts; short one-word titles.
- **App menu**: About (first, alone; short name ≤16 chars, no version) · Settings… · app-wide items · Services · Hide / Hide Others / Show All · Quit (Option → Quit and Keep Windows).
- **File**: New *Item*, Open…, Open Recent (names, newest first, Clear Menu), Close (Option → Close All), Close Tab, Close File, Save (autosave; format pop-up in the save sheet), Save All, Duplicate (prefer over Save As/Export/Copy To), Rename…, Move To…, Export As… (other formats only), Revert To, Page Setup…, Print….
- **Edit**: Undo/Redo with targets ("Undo Typing"), Cut, Copy, Paste, Paste and Match Style, Delete (not Erase/Clear), Select All, Find ▸, Spelling and Grammar ▸, Substitutions ▸, Transformations ▸, Speech ▸, then system-added Start Dictation and Emoji & Symbols. Object-finding Find items may belong in File.
- **Format**: Font ▸, Text ▸ (omit if no rich text). **View**: always present (even just Enter Full Screen); Show/Hide Tab Bar, Show All Tabs, Show/Hide Toolbar, Customize Toolbar, Show/Hide Sidebar, Enter/Exit Full Screen — titles reflect current state. **App-specific menus**: every custom command lives here (discoverability, shortcuts, Full Keyboard Access), ordered by app hierarchy and from general to specific. **Window**: always present with Minimize and Zoom (not for full screen), tab commands, Bring All to Front, open windows alphabetically (no panels). **Help**: feedback, help book (auto search field), a few extras after a separator.
- **Dynamic items** (Option-variants): never the only way; menu bar only; one modifier.
- *iPadOS*: hidden until revealed, centred, no extras or Apple menu; everything must also be reachable in the UI; App > Settings opens your iPadOS Settings page (internal prefs as a separate item below); tabs can be listed in View with shortcuts; use submenus more.
- *Menu bar extras* (macOS): template symbol, 24 pt bar height; open a menu, not a popover; people choose whether to show it; never rely on it being visible; also offer a Dock menu.
