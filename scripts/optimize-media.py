#!/usr/bin/env python3
"""Build web-sized copies of the images in public/ and write app/data/media.json.

Originals stay untouched (the lightbox still opens them at full resolution).
Run again whenever you add or replace an image:  python3 scripts/optimize-media.py
Needs Pillow (pip install pillow).
"""
import json
import re
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
PUBLIC = ROOT / "public"
OUT = PUBLIC / "img"
MANIFEST = ROOT / "app" / "data" / "media.json"
SIZES = (800, 1600)
EXTS = {".png", ".jpg", ".jpeg", ".webp"}


def slug(name: str) -> str:
    return re.sub(r"[^a-z0-9]+", "-", Path(name).stem.lower()).strip("-")


def main() -> None:
    OUT.mkdir(exist_ok=True)
    manifest = {}
    for src in sorted(PUBLIC.iterdir()):
        if src.suffix.lower() not in EXTS or not src.is_file():
            continue
        with Image.open(src) as im:
            im = im.convert("RGBA") if im.mode in ("P", "LA", "RGBA") else im.convert("RGB")
            w, h = im.size
            variants = {}
            for size in SIZES:
                target_w = min(size, w)
                out = OUT / f"{slug(src.name)}-{size}.webp"
                if not out.exists() or out.stat().st_mtime < src.stat().st_mtime:
                    resized = im.resize((target_w, round(h * target_w / w)), Image.LANCZOS) if target_w < w else im
                    resized.save(out, "WEBP", quality=82, method=6)
                variants[size] = f"/img/{out.name}"
            manifest["/" + src.name] = {"w": w, "h": h, "sm": variants[800], "lg": variants[1600]}
            print(f"{src.name}: {w}x{h}")
    MANIFEST.write_text(json.dumps(manifest, indent=2, ensure_ascii=False) + "\n")


if __name__ == "__main__":
    main()
