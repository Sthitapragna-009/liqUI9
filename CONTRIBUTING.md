# Contributing to liqUI9

Thanks for helping designers build better Apple-style interfaces.

## Ground rules

1. **Paraphrase, never paste.** Apple's guideline text is copyrighted. Write rules in your own words, keep Apple's published numbers (sizes, values) where useful, and link the source page. Short quotes are not needed and not accepted.
2. **Every rule needs a source.** Link the Apple page (or WWDC session) it comes from. Our own recommendations (like kit parameter values) must say they're liqUI9's, not Apple's.
3. **No Apple assets.** Don't add SF fonts, SF Symbols exports, Apple logos, Apple Pay or Sign in with Apple artwork, device frames from Apple's kits, or screenshots of Apple apps.
4. **Accessibility is not optional.** Kit changes must keep Reduce Transparency, Increase Contrast and Reduce Motion paths working and keep 44 pt targets.
5. **Verify glass claims in a browser.** If you change the engine, check the demo in a Chromium browser *and* in Safari or Firefox (fallback), and say which you tested.

## Updating the HIG digests

```bash
node scripts/hig-sync.mjs           # report added / removed / changed pages
```

- Read the changed pages in `.hig-cache/` (git-ignored; never commit it).
- Update the matching file under `skills/*/references/` and its "Synced" date.
- Run `node scripts/hig-sync.mjs --update` to refresh `scripts/hig-manifest.json` and commit that with your digest changes.

| HIG section | Digest location |
|---|---|
| Getting started | `skills/hig-foundations/references/getting-started.md` |
| Foundations | `skills/hig-foundations/references/*.md` |
| Components | `skills/hig-components/references/{menus-and-actions,navigation-and-search,presentation,selection-and-input,layout-and-organization,content-and-status,system-experiences}.md` |
| Patterns | `skills/hig-components/references/patterns.md` |
| Inputs | `skills/hig-components/references/inputs.md` |
| Technologies | `skills/hig-components/references/technologies-{a,b,c}.md` |

## Kit and demo

- `kit/liqui-glass.js` is dependency-free ES2020. Keep it that way.
- Run the demo with `node scripts/serve.mjs` and open `http://localhost:4321/demo/`.
- Known engine constraints are documented in `skills/liquid-glass-web/references/web-recipe.md` (Gotchas). Add new ones there when you find them.

## Pull requests

Describe what changed, which Apple pages you used, and how you tested. Screenshots of glass changes should state the browser.

By contributing, you agree your code is licensed under MIT and your writing under CC BY 4.0.
