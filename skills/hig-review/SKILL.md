---
name: hig-review
description: Audit a screen, flow, Figma frame, screenshot, prototype or codebase against Apple's Human Interface Guidelines and Liquid Glass rules, and produce a prioritised findings report with HIG links and concrete fixes. Checks glass placement and legibility, colour and contrast, typography and Dynamic Type, touch targets and spacing, component choice and behaviour, navigation, modality, motion and Reduce Motion, accessibility (VoiceOver, colour-only meaning), UX writing, privacy prompts, and misuse of Apple marks (Apple Pay, Sign in with Apple, Activity rings). Use when someone says "review this design", "is this HIG compliant", "does this look like iOS 26", "critique my glass UI", or before shipping or presenting Apple-platform work.
---

# HIG review

A structured audit against Apple's Human Interface Guidelines, using the digests in the **hig-foundations** and **hig-components** skills and the glass rules in **liquid-glass-web**.

## Procedure

1. **Establish context.** Platform(s) and device sizes, light/dark, the screen's job, the primary action, and whether it's native, web or a mock. If the person can't say, infer and state your assumption.
2. **Look at the real thing.** Screenshots or frames at actual size; for code, run it or read the components. For glass, look at the brightest and darkest content that can pass beneath. In a browser, note the engine (SVG refraction renders only in Chromium).
3. **Walk the checklist** in `references/checklist.md`, section by section. Load the relevant hig-foundations / hig-components reference whenever a finding needs a specific value or rule.
4. **Write findings** using the template below. Every finding names the evidence (where on the screen / which file and line), the rule, why it matters to people, and a specific fix. Link the Apple page.
5. **Prioritise**:
   - **Blocker** — breaks accessibility minimums, misuses Apple marks or Activity rings, violates privacy rules, or would fail App Review.
   - **Major** — wrong component or pattern, glass on content, illegible labels, missing states, broken platform conventions.
   - **Minor** — polish: spacing, tracking, copy tone, icon weight mismatch.
6. **Close with strengths** worth keeping (one or two lines) and the three fixes that matter most.

Do not pad the report: no finding without evidence, no generic advice. If something is fine, don't list it as a finding.

## Finding template

```
### [Blocker | Major | Minor] Short title
Where: <screen / element / file:line>
Rule: <one-line paraphrase> — <Apple HIG link>
Why it matters: <effect on people>
Fix: <specific change, with values>
```

## Quick glass triage (the most common failures)

| Symptom | Cause | Fix |
|---|---|---|
| "Doesn't look like glass", looks like a frosted page with a border | No refraction; uniform 1 px white border | Add the lens filter (or Figma glass effect); replace the border with a specular rim gradient |
| Looks like a tinted rectangle | Flat background behind it | Put structured content beneath; or don't use glass there |
| Cards, list groups or backgrounds are glass | Glass in the content layer | Solid or standard-material cards; keep glass for bars and controls |
| Several tinted glass buttons | Tint overused | One tinted primary per view; others regular glass or gray |
| Labels unreadable at some scroll positions | No luminosity adjustment / dim; colourful labels over colourful content | Regular variant with darker body, monochrome labels, 35% dim under clear glass |
| Glass stacked on glass | Two refracting layers | Make the lower one a fill; only the moving thumb/selection is glass |
| Refraction randomly missing on the web | `will-change`, `opacity < 1`, `filter` or `mask` on an ancestor; zero-blur step; non-Chromium browser | Remove the property; skip zero blur; accept/communicate the fallback |
| Motion feels rushed or mechanical | Fixed-duration easing, sped-up playback | Springs (damping ~0.85–1, response ~0.35–0.45 s), real-speed playback, 60 fps |
