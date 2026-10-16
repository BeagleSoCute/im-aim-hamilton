"""
Stop-gap: cut a transparent wordmark and cat emblem out of the shop-sign PNG.
Replace with the real vector logo (SVG/AI) as soon as the designer supplies it.

Usage (from the website/ folder):
    python3 scripts/extract-logo.py   (needs Pillow, numpy, scipy)
"""

from pathlib import Path

import numpy as np
from PIL import Image, ImageChops, ImageFilter
from scipy import ndimage

ROOT = Path(__file__).resolve().parent.parent
SIGN = ROOT.parent / "IM_AIM_sign_upscaled_9600x7200.png"
OUT = ROOT / "public" / "brand"

Image.MAX_IMAGE_PIXELS = None


def alpha_from_luma(img: Image.Image, floor: int, gain: float) -> Image.Image:
    luma = img.convert("L")
    return luma.point(lambda v: max(0, min(255, int((v - floor) * gain))))


def trim(img: Image.Image, pad: int) -> Image.Image:
    box = img.getchannel("A").point(lambda v: 255 if v > 24 else 0).getbbox()
    img = img.crop(box)
    canvas = Image.new("RGBA", (img.width + pad * 2, img.height + pad * 2))
    canvas.paste(img, (pad, pad))
    return canvas


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    sign = Image.open(SIGN).convert("RGB")

    # Wordmark: "IM x AIM / THAI CUISINE / TAKEAWAY" sits on a clean dark field.
    word = sign.crop((4150, 2700, 9350, 5450)).resize((2600, 1375), Image.LANCZOS)
    word_rgba = word.convert("RGBA")
    word_rgba.putalpha(alpha_from_luma(word, floor=28, gain=2.4))
    trim(word_rgba, 16).save(OUT / "wordmark.png", optimize=True)

    # Cat: solid gold silhouette over a fine constellation. A morphological
    # opening (erode then dilate) removes the thin lines and glowing dots.
    cat = sign.crop((1150, 2350, 4050, 5150)).resize((1450, 1400), Image.LANCZOS)
    solid = cat.convert("L").point(lambda v: 255 if v > 95 else 0)
    opened = solid.filter(ImageFilter.MinFilter(9)).filter(ImageFilter.MaxFilter(9))
    # Drop any surviving star dots: keep only sizeable connected shapes (body, head, bow).
    labels, count = ndimage.label(np.array(opened) > 0)
    sizes = ndimage.sum(np.ones_like(labels), labels, range(1, count + 1))
    keep = np.isin(labels, [i + 1 for i, s in enumerate(sizes) if s > 2500])
    opened = Image.fromarray((keep * 255).astype(np.uint8))
    mask = opened.filter(ImageFilter.GaussianBlur(1.2))
    mask = ImageChops.multiply(mask, alpha_from_luma(cat, floor=40, gain=3.0))
    cat_rgba = cat.convert("RGBA")
    cat_rgba.putalpha(mask)
    emblem = trim(cat_rgba, 12)
    emblem.save(OUT / "cat.png", optimize=True)

    # Favicon / app icon: emblem centred on the brand's near-black.
    for size, name in ((512, "icon.png"), (180, "apple-icon.png")):
        tile = Image.new("RGBA", (size, size), (14, 12, 10, 255))
        e = emblem.copy()
        e.thumbnail((int(size * 0.78), int(size * 0.78)), Image.LANCZOS)
        tile.alpha_composite(e, ((size - e.width) // 2, (size - e.height) // 2))
        tile.convert("RGB").save(ROOT / "src" / "app" / name, optimize=True)

    print("wrote", sorted(p.name for p in OUT.iterdir()))


if __name__ == "__main__":
    main()
