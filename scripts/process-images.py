"""
Curate, grade and optimise the raw restaurant photos for the website.

Usage (from the website/ folder):
    python3 scripts/process-images.py   (needs Pillow: pip install pillow)

Reads from  ../Food picture im-aim thai cuisine/
Writes to   public/images/{dishes,venue,gallery}/<slug>.jpg
Generates   src/data/images.generated.ts  (width, height, blurDataURL per image)

To add or swap a photo: edit the PHOTOS table below and re-run.
HEIC files are converted with macOS `sips`.
"""

from __future__ import annotations

import base64
import io
import json
import subprocess
import sys
import tempfile
from pathlib import Path

from PIL import Image, ImageEnhance, ImageFilter, ImageOps

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT.parent / "Food picture im-aim thai cuisine"
AI_SRC = ROOT.parent / "gen_ai"
OUT = ROOT / "public" / "images"
MANIFEST = ROOT / "src" / "data" / "images.generated.ts"

MAX_EDGE = 2000
QUALITY = 82

# slug -> (folder, source filename, alt text)
# Only photos that passed curation are listed. Rejected (too small / poor
# composition): pic1, pic2, pic6, pic18, pic39, front, yellow curry,
# lamb shank x2, pic52.
PHOTOS: dict[str, tuple[str, str, str]] = {
    # --- Venue -------------------------------------------------------------
    "exterior": ("venue", "about us photo im-aim thai cuisine.webp", "Im Aim Thai Cuisine shopfront on Hood Street, Hamilton"),
    "interior-bar": ("venue", "about us im-aim thai cuisine.webp", "The bar and counter inside Im Aim Thai Cuisine"),
    "interior-dining": ("venue", "about us or headlwebsite im-aim thai cuisine.webp", "The dining room at Im Aim Thai Cuisine"),
    "wok-fire": ("venue", "wok.jpg", "Flames rising from a wok in the Im Aim kitchen"),
    # --- Appetizers --------------------------------------------------------
    "spring-roll": ("gallery", "pic5.jpg", "Home-made spring rolls served upright with sweet chilli sauce"),
    "spring-roll-plate": ("gallery", "pic3.jpg", "Crispy spring rolls with sweet chilli dipping sauce"),
    "deep-fry-tofu": ("dishes", "pic4.jpg", "Golden fried tofu with satay sauce"),
    "satay-chicken": ("dishes", "pic7.jpg", "Chicken satay skewers with peanut sauce"),
    "money-bag": ("dishes", "moneybag.jpg", "Crispy wonton money bags with dipping sauce"),
    "chicken-wing": ("dishes", "pic9.JPG", "Glazed BBQ chicken wings"),
    "mixed-appetizers": ("dishes", "pic10.webp", "Mixed Thai appetizer platter"),
    # --- Soup --------------------------------------------------------------
    "tom-yum": ("dishes", "soup- tom yum sooup im-aim thai cuisine.jpg", "Tom yum soup with fresh coriander"),
    "tom-yum-pot": ("gallery", "Soup cover - im-aim thai cuisine.jpg", "Tom yum served in a traditional hot pot"),
    "tom-kha": ("dishes", "pic11.jpg", "Tom kha coconut soup"),
    # --- Curries -----------------------------------------------------------
    "green-curry": ("dishes", "curry- green im-aim thai cuisine.jpg", "Green curry with Thai basil"),
    "red-curry": ("dishes", "pic12.jpg", "Red curry with bamboo shoots and beans"),
    "red-curry-duck": ("gallery", "curry - red curry im-aim thaicuisine.jpg", "Red curry with roast duck"),
    "panang-curry": ("dishes", "pic13.jpg", "Panang curry with prawns and crushed peanuts"),
    "massaman": ("dishes", "pic14.jpg", "Massaman beef curry with potato"),
    "curry-peanut": ("gallery", "png.jpg", "Coconut curry topped with crushed peanuts"),
    # --- Wok ---------------------------------------------------------------
    "pad-kra-pao": ("dishes", "pic15.jpg", "Pad kra pao, stir-fried holy basil with chilli"),
    "cashew-nut": ("dishes", "pic16.jpg", "Stir-fried cashew nut with vegetables"),
    "garlic-prawn": ("gallery", "pic17.jpg", "Wok-tossed prawns with vegetables"),
    "stir-fried-ginger": ("dishes", "pic19.jpg", "Stir-fried ginger with mushroom and capsicum"),
    "pad-prik-pao": ("dishes", "pic20.jpg", "Pad prik pao with green beans"),
    # --- Sizzling ----------------------------------------------------------
    "sizzling-meat": ("dishes", "pic21.png", "Sizzling chicken with vegetables in oyster sauce"),
    "sizzling-garlic-pepper": ("dishes", "pic22.jpg", "Sizzling beef with garlic and pepper"),
    "sizzling-pad-cha": ("dishes", "pic23.webp", "Sizzling pad cha seafood with green peppercorns"),
    "sizzling-vege-cashew": ("dishes", "pic24.jpg", "Sizzling vegetables with cashew nuts"),
    "sizzling-vege-cashew-alt": ("gallery", "sizzling vege cashewnut.jpg", "Sizzling vegetables and cashews"),
    "sizzling-salmon-teriyaki": ("dishes", "sizzling cover.jpg", "Sizzling salmon teriyaki with broccoli and mushroom"),
    # --- Thai salad --------------------------------------------------------
    "yum-gai-zab": ("dishes", "pic25.jpg", "Crispy chicken Thai salad"),
    "yum-tofu": ("dishes", "pic26.jpg", "Crispy tofu Thai salad"),
    "yum-gai-yang": ("dishes", "yum gai yang.png", "Grilled chicken thigh salad"),
    "deep-fry-prawn-salad": ("dishes", "pic28.JPG", "Deep fried prawn salad with dressing"),
    "prawn-salad-cashew": ("gallery", "pic29.jpg", "Crispy prawn salad with cashews"),
    "yum-beef": ("dishes", "yum beef salad - fireside.webp", "Yum beef salad with tomato, red onion and fresh herbs"),
    "yum-pork-belly": ("dishes", "pic30.jpg", "Crispy pork belly salad"),
    "yum-salmon": ("dishes", "pic31.JPG", "Fresh salmon yum salad"),
    "som-tum-carrot": ("gallery", "thai salad - som tum caarot im-aim thai cuisine.jpg", "Carrot som tum salad"),
    # --- Rice & noodle -----------------------------------------------------
    "thai-fried-rice": ("dishes", "pic33.jpg", "Thai fried rice with prawns"),
    "tom-yum-fried-rice": ("dishes", "pic34.jpg", "Tom yum fried rice"),
    "pineapple-fried-rice": ("dishes", "pic36.jpg", "Pineapple fried rice with cashews"),
    "pad-thai": ("dishes", "Noodle - pad thai prawn im-aim thai cuisine.jpg", "Pad thai with prawns, bean sprouts and chives"),
    "pad-thai-chicken": ("gallery", "padthai im aim thai cuisine.HEIC", "Chicken pad thai"),
    "tom-yum-noodle": ("dishes", "pic40.jpg", "Tom yum noodle soup with crispy wontons"),
    "hokkien-noodle": ("dishes", "pic42.jpg", "Stir-fried hokkien noodles"),
    "drunken-noodle": ("dishes", "pic43.jpg", "Drunken noodles with crispy holy basil"),
    "noodle-soup": ("gallery", "Noodle - noodle soup im-aim thai cuisine.jpg", "Thai noodle soup with pork"),
    "noodle-soup-wonton": ("gallery", "pic41.jpg", "Noodle soup with crispy wonton"),
    # --- Signature ---------------------------------------------------------
    "green-curry-salmon": ("dishes", "pic44.jpg", "Grilled salmon in green curry with crispy basil"),
    "garlic-pepper-chicken": ("dishes", "pic45.jpg", "Crispy chicken with garlic and black pepper sauce"),
    "salmon-basil": ("dishes", "pic46.webp", "Grilled salmon with basil sauce"),
    "duck-on-rice": ("dishes", "pic47.webp", "Roast duck on rice with Thai special sauce"),
    # --- Asian special -----------------------------------------------------
    "rice-bowl-prawn": ("dishes", "rice bowl salad deep fry prawn.png", "Rice bowl salad with crispy prawns"),
    "rice-bowl-satay": ("dishes", "rice bowl salad satay ck.png", "Rice bowl salad with satay chicken"),
    "rice-bowl-teriyaki": ("dishes", "rice bowl salad teriyaki ck breast.png", "Rice bowl salad with teriyaki chicken"),
    # --- Western -----------------------------------------------------------
    "garlic-bread": ("dishes", "garlic bread.png", "Toasted garlic bread"),
    "bbq-pork-rib": ("dishes", "Portk rib - im aim thai cuisine.jpg", "BBQ pork ribs with wedges and salad"),
    # --- Desserts (gallery only, not on the printed menu) -------------------
    "dessert-sundae": ("gallery", "dessert im-aim thai cuisine.HEIC", "Ice cream sundae with strawberries and chocolate"),
    "dessert-waffle": ("gallery", "dessert - waffle with ice-cream.jpg", "Waffle with ice cream and caramel"),
    "dessert-banana-split": ("gallery", "pic51.jpg", "Banana split"),
    "dessert-oreo-sundae": ("gallery", "pic53.JPG", "Oreo sundae"),
    "dessert-brownie": ("gallery", "pic54.jpg", "Chocolate brownie with vanilla ice cream"),
}


# Optional crops for real photos, as fractions (left, top, right, bottom).
CROPS: dict[str, tuple[float, float, float, float]] = {
    "yum-beef": (0.0, 0.36, 1.0, 1.0),  # drop the fireplace, keep the plate
    "deep-fry-prawn-salad": (0.0, 0.29, 1.0, 0.8),  # drop the steel bench above and below
}


def load(path: Path) -> Image.Image:
    if path.suffix.lower() == ".heic":
        tmp = Path(tempfile.mkdtemp()) / (path.stem + ".jpg")
        subprocess.run(
            ["sips", "-s", "format", "jpeg", "-s", "formatOptions", "95", str(path), "--out", str(tmp)],
            check=True,
            capture_output=True,
        )
        path = tmp
    img = Image.open(path)
    img = ImageOps.exif_transpose(img)
    return img.convert("RGB")


def grade(img: Image.Image) -> Image.Image:
    """One consistent, restrained look: a touch more contrast, warmth and a soft vignette."""
    img = ImageEnhance.Contrast(img).enhance(1.07)
    img = ImageEnhance.Color(img).enhance(1.06)

    r, g, b = img.split()
    r = r.point(lambda v: min(255, int(v * 1.025)))
    b = b.point(lambda v: int(v * 0.97))
    img = Image.merge("RGB", (r, g, b))

    w, h = img.size
    small = Image.radial_gradient("L").resize((w, h))  # 0 centre -> 255 edge
    mask = small.point(lambda v: int(max(0, v - 120) * 0.55))
    dark = Image.new("RGB", (w, h), (8, 6, 4))
    return Image.composite(dark, img, mask)


def blur_data_url(img: Image.Image) -> str:
    thumb = img.copy()
    thumb.thumbnail((16, 16))
    thumb = thumb.filter(ImageFilter.GaussianBlur(0.6))
    buf = io.BytesIO()
    thumb.save(buf, "JPEG", quality=60)
    return "data:image/jpeg;base64," + base64.b64encode(buf.getvalue()).decode()


# AI-generated stand-ins for dishes with no real photo: menu code -> file in ../gen_ai/.
# A real photo always wins: once a dish has `image:` set in src/data/menu.ts this is ignored.
AI_PHOTOS: dict[str, tuple[str, str]] = {
    "A1": ("Spring Rolls", "spring_roll.jpeg"),
    "A3": ("Prawn Pastry", "Prawn Pastry.jpeg"),
    "A4": ("Curry Puffs", "curry puff.jpeg"),
    "W3": ("Sweet and Sour", "Sweet and Sour.jpeg"),
    "W4": ("Pad Pak Satay", "Pad Pak Satay.jpeg"),
    "R3": ("Basil Thai Fried Rice", "Basil Thai Fried Rice.jpeg"),
    "N2": ("Pad See Ew", "Pad See Ew.jpeg"),
    "N4": ("Hokkien Noodles with Curry", "Hokkien Noodles with Curry.jpeg"),
    "SP5": ("Pork Belly on Rice with Vegetables", "Pork Belly on Rice with Vegetables.jpeg"),
    "AS1": ("Chicken Teriyaki", "Chicken Teriyaki.jpeg"),
    "AS3": ("Japanese Curry", "Japanese Curry.jpeg"),
    "WS1": ("Chips", "Chips.jpeg"),
    "WS3": ("Wedges", "Wedges.jpeg"),
    "WS4": ("Calamari", "Calamari.jpeg"),
    "WS5": ("BBQ Chicken Wings", "BBQ Chicken Wings.jpeg"),
    "WS6": ("Gambas", "Gambas.jpeg"),
    "WS7": ("Sizzling Beef with Chips", "Sizzling Beef with Chips.jpeg"),
    "WS8": ("Pork Belly with Chips", "Pork Belly with Chips.jpeg"),
    "WS10": ("Lamb Shank", "Lamb Shank.jpeg"),
    "WS11": ("Chicken with Gravy & Chips", "Chicken with Gravy & Chips.jpeg"),
    "K1": ("Nuggets with Chips", "Nuggets with Chips.jpeg"),
    "K2": ("Chicken Sticks with Chips", "Chicken Sticks with Chips.jpeg"),
    "K3": ("Thai Fried Rice, Chicken with Butter", "Thai Fried Rice, Chicken with Butter.jpeg"),
    "K4": ("Deep Fried Chicken with Chips", "Deep Fried Chicken with Chips.jpeg"),
    "K5": ("Kids Fish with Chips", "Kids Fish with Chips.jpeg"),
    "K6": ("Chicken Wings with Chips", "Chicken Wings with Chips.jpeg"),
    "K7": ("Deep Fried Prawn Salad", "Deep Fried Prawn Salad (Kids).jpeg"),
}


def main() -> int:
    jobs = [(slug, folder, SRC / filename, alt, None) for slug, (folder, filename, alt) in PHOTOS.items()]
    jobs += [
        (f"ai-{code.lower()}", "dishes", AI_SRC / filename, f"{name} (AI-generated illustration)", code)
        for code, (name, filename) in AI_PHOTOS.items()
    ]

    entries: list[str] = []
    ai_by_code: list[str] = []
    for slug, folder, src, alt, ai_code in jobs:
        if not src.exists():
            print(f"missing: {src.name}", file=sys.stderr)
            return 1
        img = load(src)
        if slug in CROPS:
            w, h = img.size
            l, t, r, b = CROPS[slug]
            img = img.crop((int(w * l), int(h * t), int(w * r), int(h * b)))
        if ai_code:
            # The AI shots show the dining room behind the table; crop in on the plate.
            w, h = img.size
            img = img.crop((int(w * 0.11), int(h * 0.22), int(w * 0.89), h))
        img.thumbnail((MAX_EDGE, MAX_EDGE), Image.LANCZOS)
        img = grade(img)

        dest = OUT / folder / f"{slug}.jpg"
        dest.parent.mkdir(parents=True, exist_ok=True)
        img.save(dest, "JPEG", quality=QUALITY, optimize=True, progressive=True)

        w, h = img.size
        ai_flag = ", aiGenerated: true" if ai_code else ""
        entries.append(
            f'  "{slug}": {{ src: "/images/{folder}/{slug}.jpg", width: {w}, height: {h}, '
            f'alt: {json.dumps(alt)}, blurDataURL: "{blur_data_url(img)}"{ai_flag} }},'
        )
        if slug in CROPS:
            w, h = img.size
            l, t, r, b = CROPS[slug]
            img = img.crop((int(w * l), int(h * t), int(w * r), int(h * b)))
        if ai_code:
            ai_by_code.append(f'  {json.dumps(ai_code)}: "{slug}",')
        print(f"{folder:8} {slug:28} {w}x{h}  {dest.stat().st_size // 1024}KB")

    MANIFEST.parent.mkdir(parents=True, exist_ok=True)
    MANIFEST.write_text(
        "// Generated by scripts/process-images.py. Do not edit by hand.\n\n"
        'import type { SiteImage } from "./types";\n\n'
        "export const images = {\n" + "\n".join(entries) + "\n} as const satisfies Record<string, SiteImage>;\n\n"
        "export type ImageSlug = keyof typeof images;\n\n"
        "/** AI stand-ins by menu code, used only when a dish has no real photo. */\n"
        "export const aiImageByCode: Partial<Record<string, ImageSlug>> = {\n" + "\n".join(ai_by_code) + "\n};\n"
    )
    print(f"\n{len(entries)} images ({len(ai_by_code)} AI) -> {MANIFEST.relative_to(ROOT)}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
