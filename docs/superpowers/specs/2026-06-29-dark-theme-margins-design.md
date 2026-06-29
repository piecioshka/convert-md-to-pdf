# Dark theme white margins — design (issue #3)

## Problem

When generating a PDF with the dark theme, the page has white margins around the dark content (issue #3).

Root cause: `markdown-pdf` sets a physical paper margin via PhantomJS (`page.paperSize.border = 2cm`, passed from `pdf-helper.ts` as `paperBorder`). That margin lives outside the CSS rendering viewport, so the theme's `body { background: #000 }` cannot paint it. The margin keeps the PDF's default white paper background.

## Solution

Move the margin out of the paper border and into CSS as `padding` on `body`. With `paperBorder = 0`, the body fills the whole page including the margin area, so the body background covers it.

Margin size stays `2cm` (centimeters), matching the previous default.

## Changes

1. **`src/pdf-helper.ts`**
   - Set `paperBorder` to `0` instead of the 2cm-per-side object.
   - Remove the `border` handling (the `--border` split into top/right/bottom/left).
   - Remove the `border?` field from `BuildPDFOptions`.

2. **`src/cli.ts`**
   - Remove the `-b, --border` option: the `border` string arg, the `b` alias, the `const border` line, and the `border` passed to `buildPDF`.
   - Remove its line from `showHelp()`.

3. **`themes/paper.css`**
   - Change `body` padding from `0` to `2cm`. All five themes import `paper.css`, so they inherit the padding — no duplication.

4. **`themes/dark.css`**
   - Add `html { background: #000 }` next to the existing `body` rule so the whole page background is black even if body does not fill 100% height.

5. **`src/pdf-helper.spec.ts`**
   - Adjust if it asserts on the border option.

6. **`README.md`**
   - Remove the `--border` option documentation.

## Conscious trade-off

The CLI option `-b, --border` is a documented public option. This design removes it deliberately (API regression) in favor of a uniform CSS-padding approach that fixes the dark-theme margins for all themes.

## Verification

- Generate a PDF from `mock/example.md` with `--theme dark`, confirm the margins are black, not white.
- `npm test`, `npm run build`, `npm run lint` all pass.
