# Components: Navigation and search

Paraphrased from Apple's HIG component group *Navigation and search* (path controls, search fields, sidebars, tab bars, token fields). Synced 2026-11-17.

## Tab bars — [HIG](https://developer.apple.com/design/human-interface-guidelines/tab-bars)
Switch between top-level sections while each keeps its own navigation state.
- **Navigation, not actions** (actions go in a toolbar).
- Keep it visible across sections (only a modal may cover it).
- As few tabs as the structure needs; for complex apps use a sidebar or a tab bar that converts into one.
- Avoid the iOS/iPadOS overflow "More" tab.
- **Never disable or hide tabs**; an empty section explains why it's empty.
- Single-word labels; SF Symbols, preferably filled. Compact = icon above label; regular = side by side.
- Badges (red oval, white number or "!") only for critical new information.
- Monochrome labels over colourful content, or an accent clearly different from the content.
- *iOS*: floats at the bottom on Liquid Glass with content peeking through. An attached accessory (Music's MiniPlayer) can collapse inline with a **minimised** tab bar on scroll-down; tapping a tab or scrolling to top restores it. A dedicated search tab can sit at the trailing end.
- *iPadOS*: near the top; fixed, or *sidebar-adaptable* (a button converts it to a sidebar). Prefer the tab bar; allow customisation with five or fewer default tabs.
- *tvOS*: translucent with an opaque selected tab; 68 pt tall, 46 pt from the top (fixed); fades truncate overflow; scrolls away with single-view content, stays pinned with split views; Menu returns focus to it. Live apps order tabs: live, recorded, other.
- *visionOS*: always vertical on the window's leading side, expanding on gaze to show labels; symbol + short label for every tab; a sidebar can live inside a tab without switching tabs.

## Sidebars — [HIG](https://developer.apple.com/design/human-interface-guidelines/sidebars)
Leading-edge navigation between app areas or top-level collections; needs a lot of space (tab bars are the compact alternative, and many apps can use a tab bar that becomes a sidebar).
- **Floats on Liquid Glass**: extend rich content beneath it by horizontal scrolling or the *background extension effect* (mirrors adjacent content under the glass).
- Customisable contents; disclosure groups for lots of content; SF Symbols (custom symbols, not bitmaps).
- Hideable with platform gestures (iPad edge swipe; macOS button + View menu) but visible by default.
- **At most two levels**; deeper → split view with a content list. Short group titles.
- Icons use the accent colour (macOS follows the person's accent); fixed colours only sparingly for meaning (Mail's yellow VIP).
- *iOS/iPadOS*: consider a tab bar first; sidebar-adaptable tab view switches between them. *macOS*: small/medium/large sizes follow General settings; may auto-collapse as the window narrows; nothing critical at the bottom. *visionOS*: a sidebar inside a tab for deep hierarchies.

## Search fields — [HIG](https://developer.apple.com/design/human-interface-guidelines/search-fields)
A text field with a search icon, clear button and placeholder; can use scope bars and tokens.
- Placeholder says what can be searched. Search as people type. Recent and predictive suggestions. Most relevant results first, categorised; filters in the results.
- **Scope bars** filter among clear categories, defaulting to the broad scope (Mail: all mailboxes → current). **Tokens** encapsulate a term or attribute as a selectable filter (a contact, "Photos"); pair with suggestions so people learn them.
- *iOS* entry points:
  - **Tab**: *standard* style opens a landing page for discovery (TV app genres); *button* style jumps straight to the keyboard and returns to the previous tab after.
  - **Toolbar**: bottom when there's room (Settings alone; Mail, Notes beside other controls) — expands into a field above the keyboard; top when bottom content must stay visible (Wallet).
  - **Inline**: next to the content it filters (Music library); above the list, optionally pinned on scroll.
- *iPadOS/macOS*: trailing side of the toolbar for split-view apps (Mail, Notes, Freeform); top of the sidebar to filter it (Settings); a sidebar/tab item for discovery-heavy search (Music, TV), focusing the field on arrival — except with only a virtual keyboard on iPad. Keep search reachable as windows shrink.
- *tvOS*: dedicated keyboard screen with results below; lean on suggestions. *watchOS*: full-screen input until Cancel or Search.

## Token fields (macOS) — [HIG](https://developer.apple.com/design/human-interface-guidelines/token-fields)
Text that becomes draggable, selectable tokens (Mail recipients), optionally with suggestions and per-token context menus. Add useful context menus; extra conversion shortcuts besides comma (Return); tune the suggestion delay so it doesn't distract.

## Path controls (macOS) — [HIG](https://developer.apple.com/design/human-interface-guidelines/path-controls)
Show a file's path: *standard* (linear, middle names hidden if long) or *pop-up* (menu of ancestors, optional Choose…). Editable versions accept drops. Use in the window body, not toolbars or status bars.
