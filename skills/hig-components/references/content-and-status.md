# Components: Content and Status

Paraphrased from Apple's HIG component groups *Content* (charts, image views, text views, web views) and *Status* (activity rings, gauges, progress indicators, rating indicators). Synced 2026-11-17.

## Charts — [HIG](https://developer.apple.com/design/human-interface-guidelines/charts)

**Anatomy**: *marks* (bars, lines, points…) plot values in the *plot area*; *scales* map data to position, colour or height; *axes* with *ticks* and *grid lines* give a frame of reference; *labels*, titles, subtitles, annotations and a *legend* (for non-positional encodings like colour or shape) describe it; *accessibility labels* describe it non-visually.

**Marks**
- Bar: compare categories or parts of a whole; over time when each value is a sum (steps per day).
- Line: change over time; slope shows magnitude and trend.
- Point: individual values, relationships between two properties, outliers and clusters.
- Combine when it clarifies (points on a line to call out readings).

**Axes**
- *Fixed* range when the bounds mean something (battery 0–100%); *dynamic* when values vary widely and marks should fill the plot (Health Steps).
- Bars generally start at zero; ranges far from zero (heart rate) shouldn't, or real differences flatten.
- Familiar tick sequences (0, 5, 10), not odd ones (1, 6, 11).
- Grid density and label weight follow the task; interactive charts can use fewer, lighter grid lines.

**Descriptive content**: say what the chart is for before people read it (vital for VoiceOver and cognitive accessibility); put the main message in a title/subtitle (Weather's next-hour precipitation).

**Best practices**
- Data most prominent; axes and text support without competing.
- Compact widths: maximise plot width, shorten Y labels, move units into the title, put long category labels inside the plot when they don't hide data.
- Fully accessible: labels per element plus **Audio Graphs** (tones that trace the data, with a spoken summary).
- Interaction is optional, never required for critical info (Stocks: period picker, then drag a vertical indicator for exact values).
- Small marks: make the whole plot the hit area and let people scrub.
- Keyboard and Switch Control: a logical path (along the X axis) or navigation by subsets for big datasets.
- Announce important changes in non-visual ways too (animation alone isn't enough).
- Align the chart's leading edge with the rest of the screen; put grid-line labels on the trailing side or move the Y axis to the trailing side; anchor orphan labels with a tick.
- **Colour**: never the only differentiator — add shapes or patterns (Health uses two point shapes for blood pressure); add separators between stacked colour areas.

**Accessibility labels**
- Swift Charts provides Audio Graphs and per-mark elements; otherwise describe chart type, what each axis represents and its bounds.
- Decide per chart whether to label every mark (Health Steps: each bar), summarise groups (Maps elevation: segments), or give one summary (a thumbnail chart inside a button).
- Context first, then the value; actual values, not subjective words ("rapidly", "almost"); unambiguous formats ("June 6", "60 minutes", not "6/6", "60m"); describe what series *mean*, not their colours; mention axes in a consistent order; hide visible axis/tick labels from assistive tech.
- *watchOS*: glanceable, minimal interaction; deeper exploration on iPhone.

## Image views — [HIG](https://developer.apple.com/design/human-interface-guidelines/image-views)
- For displaying images, not interaction (wrap an image in a button if it must be tappable; macOS: image button, or image well for editable images).
- Icons → SF Symbols or template icons, which can take accent colours.
- Text over images: ensure contrast with a shadow or background layer.
- Animated sequences: same size and shape for every frame.
- tvOS uses layered images; visionOS image views show 2D, stereo and spatial photos.

## Text views — [HIG](https://developer.apple.com/design/human-interface-guidelines/text-views)
- For long, editable or specially formatted text; labels and text fields for short text.
- Legible with Dynamic Type and Bold Text; make useful text selectable (error messages, serial numbers, IP addresses).
- iOS/iPadOS: show the right keyboard type. tvOS: display only; use text fields for input.

## Web views — [HIG](https://developer.apple.com/design/human-interface-guidelines/web-views)
- Add back/forward controls if people will visit several pages. Don't build a browser — Safari is the browser.

## Activity rings — [HIG](https://developer.apple.com/design/human-interface-guidelines/activity-rings)
Apple's Move/Exercise/Stand rings. **Third parties may display them only through HealthKit (`HKActivityRingView`) and must never imitate them.**
- Only for Move, Exercise and Stand; never other data; never show those metrics in another ring-like element.
- One person only, clearly identified.
- Never recolour, filter or change opacity; always on black, ideally inside a circle (via corner radius, not a mask), with black visible around the outer ring; no gradients, shadows or effects; scale sensibly; adapt the UI to the rings, not the reverse.
- Matching label colours: Move 250 17 79, Exercise 166 255 0, Stand 0 255 246.
- Outer margin at least the gap between rings; nothing may crop or encroach.
- Separate other rings clearly (padding, lines, labels, colour, scale).
- No notifications duplicating Activity's; no rings in notifications, decorations, backgrounds, branding, app icons or marketing.
- iOS shows one Move ring without a paired Watch, three with one.

**For liqUI9's web kit this means**: radial progress gauges must not look like three concentric Move/Exercise/Stand rings. Use one open-arc gauge, different colours, and labels.

## Gauges — [HIG](https://developer.apple.com/design/human-interface-guidelines/gauges)
- A value within a range on a circular or linear path. *Standard* style shows an indicator at the value; *capacity* style fills up to it; *accessory* variants mimic watch complications (iOS Lock Screen widgets).
- Short labels for the value and both ends (VoiceOver reads them). A gradient along the path can carry meaning (hot red → cold blue).
- *macOS level indicators*: capacity (continuous bar for large ranges, discrete equal segments that fill whole), recolour at significant levels or use tiered colours; rating; and rarely relevance (shaded bar in search results).

## Progress indicators — [HIG](https://developer.apple.com/design/human-interface-guidelines/progress-indicators)
*Determinate* (progress bars fill leading → trailing; circular fills clockwise) or *indeterminate* (spinner; macOS also has an indeterminate bar). Always transient.
- Prefer determinate; report honestly and evenly (not 90% in 5 s then 10% in 5 min).
- Keep it moving; if stalled, say why and what to do.
- Switch indeterminate → determinate once duration is known, but never spinner ↔ bar.
- Optional short, specific description (not "Loading…"). Same location every time.
- Cancel when safe; Pause + Cancel when cancelling loses work; confirm destructive cancels.
- *iOS/iPadOS refresh control*: pull to refresh, but also refresh automatically; a title only if it adds information ("Updated 5 minutes ago"), never instructions.
- *macOS*: spinners for background work or tight spaces, unlabeled. *watchOS*: white by default, tintable.

## Rating indicators — [HIG](https://developer.apple.com/design/human-interface-guidelines/rating-indicators)
macOS only. Whole symbols only (rounded), fixed spacing. Let people change rankings inline. Custom symbols must still read as a rating; the star is the safest.
