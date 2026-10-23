"""
Optimize all treatment images for desktop and mobile:
1. Generate desktop .webp (736px max width, quality 85)
2. Generate mobile -mobile.webp (400px max width, quality 80) - 50-70% smaller file size!
3. Generate mobile -mobile.jpg (400px max width, quality 82)
"""

import os
from PIL import Image

def optimize_treatments():
    treatments_dir = os.path.join("public", "treatments")
    # Identify unique base names
    all_files = os.listdir(treatments_dir)
    base_names = set()
    for f in all_files:
        if f.endswith(('.jpg', '.jpeg', '.webp')) and not f.endswith(('-mobile.webp', '-mobile.jpg', '-mobile.jpeg')):
            name_no_ext = os.path.splitext(f)[0]
            base_names.add(name_no_ext)

    print(f"Found {len(base_names)} unique treatment conditions.")

    for base in sorted(base_names):
        # Prefer existing jpg or jpeg as master source
        src_path = None
        for ext in ('.jpg', '.jpeg', '.webp'):
            candidate = os.path.join(treatments_dir, base + ext)
            if os.path.exists(candidate):
                src_path = candidate
                break

        if not src_path:
            continue

        im = Image.open(src_path).convert("RGB")
        w, h = im.size

        # 1. Desktop WebP & JPG (max width 736)
        if w > 736:
            desktop_w = 736
            desktop_h = int(h * (736 / w))
            desktop_im = im.resize((desktop_w, desktop_h), Image.Resampling.LANCZOS)
        else:
            desktop_im = im

        desktop_webp = os.path.join(treatments_dir, f"{base}.webp")
        desktop_jpg = os.path.join(treatments_dir, f"{base}.jpg")
        desktop_im.save(desktop_webp, "WEBP", quality=85, method=6)
        desktop_im.save(desktop_jpg, "JPEG", quality=85, optimize=True)

        # 2. Mobile WebP & JPG (max width 400 - perfect for mobile screens, ~8-15KB)
        mobile_w = 400
        mobile_h = int(h * (400 / w))
        mobile_im = im.resize((mobile_w, mobile_h), Image.Resampling.LANCZOS)

        mobile_webp = os.path.join(treatments_dir, f"{base}-mobile.webp")
        mobile_jpg = os.path.join(treatments_dir, f"{base}-mobile.jpg")
        mobile_im.save(mobile_webp, "WEBP", quality=80, method=6)
        mobile_im.save(mobile_jpg, "JPEG", quality=80, optimize=True)

        d_kb = os.path.getsize(desktop_webp) / 1024
        m_kb = os.path.getsize(mobile_webp) / 1024
        print(f"{base:25}: Desktop {d_kb:5.1f}KB | Mobile {m_kb:5.1f}KB")

    print("All treatment images optimized successfully!")

if __name__ == "__main__":
    optimize_treatments()
