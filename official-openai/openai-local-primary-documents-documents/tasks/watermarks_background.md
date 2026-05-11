# Watermarks + Background Elements

## Goal
Detect and (carefully) remove watermark-like background elements from a DOCX, then verify the output via **render + diff**.

## What watermarks are in Word
Watermarks are often implemented as **VML shapes in headers**:
`w:hdr â†’ w:p â†’ w:r â†’ w:pict â†’ v:shape â†’ v:textpath string="DRAFT"`

Other documents may use DrawingML shapes or background images.

## Steps
1. Audit the document:
   ```bash
   python scripts/watermark_audit_remove.py input.docx --mode report
   ```

2. Remove (heuristic) by matching a substring inside the watermark text:
   ```bash
   python scripts/watermark_audit_remove.py input.docx --mode remove --contains DRAFT --out cleaned.docx
   ```

3. Render and diff (recommended for QA/regressions):
   ```bash
   python scripts/render_and_diff.py input.docx cleaned.docx --outdir diff_watermark
   ```

## Render â†’ PNG review checklist
- If the watermark is visible in your renderer, confirm it is gone in the cleaned version.
- Confirm headers/footers still render correctly (no missing logos/lines).
- Confirm page count and layout remain acceptable.

## Pitfalls
- Removal is heuristic: it can delete legitimate header graphics if they match the substring.
- Some VML watermarks wonâ€™t show in LibreOffice headless. When in doubt, validate in Word.
