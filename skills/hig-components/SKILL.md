---
name: hig-components
description: Apple Human Interface Guidelines for every UI component, pattern, input and Apple technology — buttons, toolbars, tab bars, sidebars, search, sheets, alerts, popovers, menus, context menus, segmented controls, sliders, toggles, pickers, text fields, lists, collections, split views, charts, gauges, progress indicators, Activity rings, Live Activities and the Dynamic Island, widgets, notifications, controls, App Shortcuts, complications; patterns like onboarding, loading, feedback, modality, charting data, drag and drop, settings, undo, accounts, notifications; inputs like gestures, pointer, keyboard shortcuts, focus, eyes, Digital Crown, Apple Pencil, Camera Control, Action button, game controls; and technologies like Apple Pay, In-App Purchase, Sign in with Apple, Wallet, Maps, HealthKit, HomeKit, CarPlay, SharePlay, Siri, Generative AI, machine learning, AR, App Clips. Use when choosing or specifying a component, designing a flow, writing component-level UX copy, or checking platform behaviour for any Apple platform.
---

# HIG components, patterns, inputs and technologies

Paraphrased, link-backed digests of Apple's *Components* (64 pages in 8 groups), *Patterns* (25), *Inputs* (13) and *Technologies* (29) sections, synced 2026-11-17. Apple's text is not copied; each entry links to its source.

## How to use this skill

1. Find the right file in the router below and read only that file (they're long).
2. Answer with: what to use, when not to use it, the platform differences, and concrete values (sizes, counts, durations). Cite the Apple link.
3. Recommend the **standard component** before any custom one — standard components get Liquid Glass, accessibility, localisation and platform behaviour for free.
4. For colours, type, layout, motion and accessibility fundamentals use **hig-foundations**. For building the glass itself (web, Figma, SwiftUI) use **liquid-glass-web**. For audits use **hig-review**.

| Topic | Read |
|---|---|
| Buttons, toolbars, menus, context menus, edit menus, pop-up / pull-down buttons, share sheets, the menu bar, ornaments, quick actions | `references/menus-and-actions.md` |
| Tab bars, sidebars, search fields, scope bars and tokens, token fields, path controls | `references/navigation-and-search.md` |
| Alerts, action sheets, sheets and detents, popovers, page controls, scroll views and scroll edge effects, panels, windows | `references/presentation.md` |
| Segmented controls, sliders, toggles, steppers, pickers and date pickers, text fields, keyboards, combo boxes, color/image wells | `references/selection-and-input.md` |
| Boxes, collections, lists and tables, labels, disclosure controls, split views, outline/column views, tab views, lockups | `references/layout-and-organization.md` |
| Charts (marks, axes, accessibility), image/text/web views, gauges, progress indicators, Activity rings, rating indicators | `references/content-and-status.md` |
| Live Activities and the Dynamic Island, widgets, notifications, controls, App Shortcuts, snippets, complications, watch faces, status bar, Top Shelf | `references/system-experiences.md` |
| All 25 patterns: charting data, feedback, loading, launching, onboarding, modality, multitasking, searching, settings, undo, drag and drop, entering data, accounts, notifications, audio, haptics, video, printing, ratings, workouts… | `references/patterns.md` |
| Gestures, pointer and iPad pointer effects, keyboard shortcuts, focus, eyes, Digital Crown, Action button, Camera Control, Apple Pencil, game controls, remotes, motion sensors, nearby interactions | `references/inputs.md` |
| AirPlay, Always On, App Clips, In-App Purchase, Apple Pay, AR, CareKit | `references/technologies-a.md` |
| CarPlay, Game Center, Generative AI, HealthKit | `references/technologies-b.md` |
| HomeKit, iCloud, ID Verifier, iMessage, Live Photos, Mac Catalyst, machine learning, Maps, NFC, photo editing, ResearchKit, SharePlay, ShazamKit, Sign in with Apple, Siri, Tap to Pay, VoiceOver, Wallet | `references/technologies-c.md` |

## Quick decisions

| If you need… | Use | Not |
|---|---|---|
| Switch app sections | Tab bar (iPhone bottom, iPad top; adapts to a sidebar) | Segmented control, toolbar |
| Act on the current view | Toolbar (≤3 groups, one `.prominent` trailing action) | Tab bar |
| Switch closely related subviews | Segmented control (≤5 on iPhone) | Tab bar |
| Critical, actionable interruption | Alert (≤3 buttons, specific verbs, never "OK" for actions) | Popover, notification |
| Choices about an action the person started | Action sheet (destructive first, Cancel last) | Alert, menu |
| A scoped task | Sheet (Cancel + Done or Back + Done; medium/large detents) | Nested modals |
| Small, transient options anchored to a control | Popover (wide layouts only) | Popover on iPhone |
| Ongoing, time-bound status | Live Activity (≤8 h; compact/minimal/expanded/Lock Screen) | Repeated notifications |
| Glanceable, periodic info | Widget | Live Activity |
| Mutually exclusive options in little space | Pop-up button | Pull-down button |
| Actions related to a button | Pull-down button (≥3 items) | Pop-up button |
| On/off in a list row | Switch | Switch outside lists (use a toggle button) |
| A value in a range | Gauge (standard or capacity) | Activity rings (reserved) |
| Progress of known duration | Determinate bar or ring | Spinner |

## Hard "never" list

- Never redraw Apple's marks or buttons: Apple Pay button/mark, Sign in with Apple, Add to Apple Wallet, AirPlay/HomeKit/Apple Health icons, AR glyph, App Clip Codes, Activity rings. Use Apple's APIs or downloads.
- Never use Activity rings (or look-alike triple rings) for anything except Move/Exercise/Stand.
- Never hide or disable tabs; never make a destructive button the primary/default; never put more than one alert on screen.
- Never show ads in Live Activities, widgets, App Clips or Siri responses.
- Never use Time Sensitive notifications for marketing.
- Never pre-fill passwords or ask for one after Sign in with Apple.
- Never automate irreversible actions with generative AI without confirmation.
