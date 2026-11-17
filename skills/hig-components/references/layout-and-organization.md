# Components: Layout and organization

Paraphrased from Apple's HIG component group *Layout and organization* (boxes, collections, column views, disclosure controls, labels, lists and tables, lockups, outline views, split views, tab views). Synced 2026-11-17.

## Boxes — [HIG](https://developer.apple.com/design/human-interface-guidelines/boxes)
A bordered or filled group of related content, optionally titled.
- Keep boxes small relative to their container; near full size they stop separating anything.
- Inside a box, group further with padding and alignment, not nested boxes.
- Title only if it clarifies: a short phrase in sentence case, no punctuation (except a trailing colon in macOS settings panes).
- iOS/iPadOS fill boxes with secondary/tertiary background colours; macOS puts the title above. Not on tvOS or watchOS.

*LiqUI note*: boxes and cards live in the **content layer** — standard materials or solid fills, never Liquid Glass.

## Collections — [HIG](https://developer.apple.com/design/human-interface-guidelines/collections)
Ordered, visual (usually image-based) content in rows or grids.
- Standard row or grid; avoid novel layouts that call attention to themselves. Text belongs in a list.
- Padding so focus/hover effects don't collide. Tap selects, touch-and-hold edits, swipe scrolls; add gestures only if needed.
- Animate insert, delete and reorder.
- iOS/iPadOS: don't change the layout under people unless they asked for it. Not on watchOS.

## Column views — [HIG](https://developer.apple.com/design/human-interface-guidelines/column-views)
macOS browsers (Finder's column view) for deep hierarchies people move up and down a lot, when sorting isn't needed. Root in the first column; show item details when there are no children; resizable columns. iPad/visionOS use split views instead.

## Disclosure controls — [HIG](https://developer.apple.com/design/human-interface-guidelines/disclosure-controls)
Hide details until relevant; frequently used controls stay visible at the top level.
- **Disclosure triangle**: points toward the content (leading) when collapsed, down when expanded; label what it reveals ("Advanced Options").
- **Disclosure button** (macOS): points down when collapsed, up when expanded; sits next to the content it affects; at most one per view.
- SwiftUI `DisclosureGroup` on iOS, iPadOS, visionOS.

## Labels — [HIG](https://developer.apple.com/design/human-interface-guidelines/labels)
Static, non-editable text (button titles, list item text, explanatory text).
- Small text only (text field for short editable text, text view for long).
- System fonts with Dynamic Type; custom styling must stay legible.
- Four label colours for importance: label (primary), secondary (subheads, supplemental), tertiary (unavailable items), quaternary (watermarks).
- Make useful text (errors, addresses, IPs) selectable.
- watchOS date and timer text components update and fit themselves; great in complications.

## Lists and tables — [HIG](https://developer.apple.com/design/human-interface-guidelines/lists-and-tables)
Rows in one or more columns; grouping, hierarchy, selection, add/delete/reorder.
- Best for text; widely varying sizes or many images → collection.
- Allow editing where sensible (reorder at least). iOS/iPadOS need an edit mode for multi-select.
- Selection feedback: navigation lists keep the selected row highlighted; option lists flash the row then show a checkmark.
- Short row text; for long items show titles and open details. Middle-truncation keeps both ends recognisable.
- Column headings: nouns, title case, no punctuation; single-column tables need a header or label for context.
- Styles: iOS grouped (headers, footers, spacing), watchOS elliptical (rolls off a curved surface), macOS bordered with alternating rows. Use system row configurations.
- *iOS/iPadOS/visionOS*: the info (detail disclosure) button only reveals info; use a disclosure indicator (chevron) to drill down. No alphabetical index on tables whose rows have trailing controls.
- *macOS*: click headings to sort (again to reverse); resizable columns; alternating rows for wide tables; outline view for hierarchy.
- *tvOS*: focused rows grow and round their corners — check adjacent images, don't pre-mask.
- *watchOS*: keep lists short but complete (show the most relevant, offer "more"); short detail views enable vertical paging between rows.

## Lockups (tvOS) — [HIG](https://developer.apple.com/design/human-interface-guidelines/lockups)
Header + content + footer that grow together on focus. Leave room for growth; consistent sizes per row.
- **Cards**: ratings and reviews. **Caption buttons**: image or text with title/subtitle; tilt with the swipe direction (vertical, horizontal or both in grids). **Monograms**: circular photo + name for cast and crew (prefer photos to initials). **Posters**: image with title/subtitle revealed on focus.

## Outline views — [HIG](https://developer.apple.com/design/human-interface-guidelines/outline-views)
macOS hierarchical tables (Finder list view), often the leading pane of a split view.
- Only for hierarchical data; hierarchy only in the first column; other columns are attributes.
- Headings: nouns, title case, no trailing colon; always present in multi-column views.
- Sort by heading (sorts within every level; again to reverse); resizable columns; Option-click expands all descendants; remember expansion state; alternating rows; single-click edits, double-click opens; middle-ellipsis truncation; a toolbar search field for long outlines.

## Split views — [HIG](https://developer.apple.com/design/human-interface-guidelines/split-views)
Adjacent panes showing several hierarchy levels (sidebar → list → detail), or supplementary panes (Keynote's navigator, notes, inspector).
- Persistently highlight the selection in each pane leading to the detail. Support dragging between panes.
- *iOS*: regular width only. *iPadOS*: 2 or 3 panes; design narrow, intermediate and wide widths with logical navigation between panes.
- *macOS*: vertical, horizontal or both; draggable dividers with sensible min/max so dividers never vanish; let people hide panes (with a toolbar button, menu command and shortcut to restore); prefer the thin 1-pt divider.
- *tvOS*: good for filtering (category → results); one-third/two-thirds default or halves; one title over the whole view — centred over collections, above the primary pane for a single main view.
- *visionOS*: prefer a split view over opening a new window for supplementary info; sheets for small tasks.
- *watchOS*: list or detail full screen; open on the most relevant detail; multiple detail pages in a vertical tab view navigated with the Digital Crown.
- *iPhone Duo*: expands on the inner display, collapses to one pane outside, rebalances around the fold.

## Tab views (macOS) — [HIG](https://developer.apple.com/design/human-interface-guidelines/tab-views)
Mutually exclusive panes in one area, switched by a tabbed control at the top.
- Closely related content; controls in a pane only affect that pane; noun labels in title case.
- Tabs, not pop-up buttons (one click and all choices visible) — unless there are too many; more than six tabs → use another pattern (e.g. a pop-up of views).
- Inset the tab view inside the window body. The control can be hidden for programmatic switching (borderless, bezeled or bordered content area).
- iOS/iPadOS use segmented controls instead; watchOS uses page controls.
