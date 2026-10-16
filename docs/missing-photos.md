# Photo status

Every dish on the menu now has an image. 26 of them are AI-generated stand-ins
(in `../gen_ai/`, listed in `AI_PHOTOS` in `scripts/process-images.py`). The menu
page tells customers these are AI illustrations.

## Replace with real photos when possible

Customers expect the plate to match the picture, so photograph these dishes first:

A3 Prawn Pastry · A4 Curry Puffs · W3 Sweet and Sour · W4 Pad Pak Satay ·
R3 Basil Thai Fried Rice · N2 Pad See Ew · N4 Hokkien Noodles with Curry ·
SP5 Pork Belly on Rice · AS1 Chicken Teriyaki · AS3 Japanese Curry ·
Western: WS1, WS3–WS8, WS10, WS11 · Kids: K1–K7

To swap one in: put the photo in `../Food picture im-aim thai cuisine/`, add it to
`PHOTOS` in `scripts/process-images.py`, set `image:` on the dish in
`src/data/menu.ts`, then run `python3 scripts/process-images.py`. The real photo
replaces the AI one automatically.

## Real photos that should be reshot

- `money-bag` (on a steel bench)
- `sizzling-meat` (only 762px wide)
- `garlic-pepper-chicken` (only 749px wide)
- `chicken-wing`, `mixed-appetizers` (small and flat lighting)

## Shoot brief

Dark slate or dark timber, soft side light from a window, 45° and top-down
angles, no steel benches or takeaway containers in frame. The AI stand-ins were
made in this style, so real photos shot this way will sit alongside them.
