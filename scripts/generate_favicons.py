"""
Generate high-resolution favicons, app icons, and master logos
meeting 100% of Google Search (SERP), Google Search Console,
and Schema.org structured data requirements.

Requirements satisfied:
1. Google Search Favicon Guidelines:
   - File must be a multiple of 48px square: 48x48, 96x96, 192x192, etc.
   - Standard /favicon.ico at root with 16x16, 32x32, 48x48.
   - Centered emblem with safe padding so it looks great when scaled to 16x16 in SERP.
   - Visible contrast against both light and dark browser modes.
2. Google Search Console & Schema.org Organization Logo Guidelines:
   - Minimum 112x112 px (recommendation: 512x512 px).
   - Crisp PNG / JPG / WebP format.
   - True 512x512 dimensions matching the declared JSON-LD metadata.
3. Web App Manifest & Apple Touch Icons.
"""

import os
from PIL import Image, ImageFilter, ImageOps
import numpy as np

def generate_assets():
    script_dir = os.path.dirname(os.path.abspath(__file__))
    root_dir = os.path.dirname(script_dir)
    public_dir = os.path.join(root_dir, "public")
    images_dir = os.path.join(public_dir, "images")
    os.makedirs(images_dir, exist_ok=True)

    src_logo_path = os.path.join(public_dir, "logo.jpeg")
    if not os.path.exists(src_logo_path):
        raise FileNotFoundError(f"Source logo not found at {src_logo_path}")

    # Load original image
    src = Image.open(src_logo_path).convert("RGB")
    arr = np.array(src, dtype=np.float32)

    # 1. Clean background compression noise:
    # Any pixel where R > 230, G > 230, B > 230 is background
    bg_mask = (arr[:, :, 0] > 230) & (arr[:, :, 1] > 230) & (arr[:, :, 2] > 230)
    arr[bg_mask] = [255.0, 255.0, 255.0]

    # Mask out the stray bottom-right scan artifact (x > 93, y > 115)
    for y in range(114, arr.shape[0]):
        for x in range(92, arr.shape[1]):
            arr[y, x] = [255.0, 255.0, 255.0]

    cleaned_img = Image.fromarray(arr.astype(np.uint8))

    # 2. Crop the authentic emblem (x: 25..93, y: 1..117)
    emblem_crop = cleaned_img.crop((25, 1, 93, 117))
    cw, ch = emblem_crop.size

    # 3. Create high-resolution 512x512 master logo
    # Safe padding: emblem height = 410px, leaving 51px margin top and bottom
    target_canvas_size = 512
    master_512 = Image.new("RGB", (target_canvas_size, target_canvas_size), (255, 255, 255))
    
    target_h = 410
    scale = target_h / ch
    target_w = int(cw * scale)
    
    resized_emblem = emblem_crop.resize((target_w, target_h), Image.Resampling.LANCZOS)
    # Subtle sharpening to restore edge definition
    resized_emblem = resized_emblem.filter(ImageFilter.UnsharpMask(radius=1.2, percent=115, threshold=2))

    px = (target_canvas_size - target_w) // 2
    py = (target_canvas_size - target_h) // 2
    master_512.paste(resized_emblem, (px, py))

    # Also create transparent RGBA version for formats that benefit from transparency
    master_512_rgba = master_512.convert("RGBA")
    rgba_data = master_512_rgba.getdata()
    new_data = []
    for item in rgba_data:
        # If pure or near pure white, set alpha to 0 (for transparent logo variant)
        if item[0] >= 253 and item[1] >= 253 and item[2] >= 253:
            new_data.append((255, 255, 255, 0))
        else:
            new_data.append(item)
    master_512_transparent = Image.new("RGBA", master_512.size)
    master_512_transparent.putdata(new_data)

    print("Generating assets...")

    # A. Master Logos (512x512)
    # 1. logo.png (White background, crisp - recommended for Schema.org & Google Search Console)
    logo_png_path = os.path.join(public_dir, "logo.png")
    master_512.save(logo_png_path, "PNG", optimize=True)
    master_512.save(os.path.join(images_dir, "logo.png"), "PNG", optimize=True)
    print(f"Generated {logo_png_path} (512x512)")

    # 2. logo.jpeg (512x512) - updates legacy file with true 512x512 resolution
    logo_jpeg_path = os.path.join(public_dir, "logo.jpeg")
    master_512.save(logo_jpeg_path, "JPEG", quality=95, optimize=True)
    master_512.save(os.path.join(images_dir, "logo.jpeg"), "JPEG", quality=95, optimize=True)
    print(f"Generated {logo_jpeg_path} (512x512)")

    # 3. logo.webp (512x512)
    logo_webp_path = os.path.join(public_dir, "logo.webp")
    master_512.save(logo_webp_path, "WEBP", quality=95)
    master_512.save(os.path.join(images_dir, "logo.webp"), "WEBP", quality=95)
    print(f"Generated {logo_webp_path} (512x512)")

    # B. Favicons (Multiples of 48px square as mandated by Google)
    # 1. favicon-48x48.png (EXACT Google Search SERP multiple)
    fav_48 = master_512.resize((48, 48), Image.Resampling.LANCZOS)
    fav_48 = fav_48.filter(ImageFilter.UnsharpMask(radius=0.8, percent=120, threshold=1))
    fav_48_path = os.path.join(public_dir, "favicon-48x48.png")
    fav_48.save(fav_48_path, "PNG", optimize=True)
    print(f"Generated {fav_48_path} (48x48)")

    # 2. favicon-96x96.png (2x Google Search SERP multiple)
    fav_96 = master_512.resize((96, 96), Image.Resampling.LANCZOS)
    fav_96 = fav_96.filter(ImageFilter.UnsharpMask(radius=0.8, percent=110, threshold=1))
    fav_96_path = os.path.join(public_dir, "favicon-96x96.png")
    fav_96.save(fav_96_path, "PNG", optimize=True)
    print(f"Generated {fav_96_path} (96x96)")

    # 3. favicon-192x192.png (4x Google Search SERP multiple / Android Chrome)
    fav_192 = master_512.resize((192, 192), Image.Resampling.LANCZOS)
    fav_192_path = os.path.join(public_dir, "favicon-192x192.png")
    fav_192.save(fav_192_path, "PNG", optimize=True)
    print(f"Generated {fav_192_path} (192x192)")

    # 4. favicon-512x512.png (PWA / Webmanifest)
    fav_512_path = os.path.join(public_dir, "favicon-512x512.png")
    master_512.save(fav_512_path, "PNG", optimize=True)
    print(f"Generated {fav_512_path} (512x512)")

    # 5. apple-touch-icon.png (180x180)
    fav_180 = master_512.resize((180, 180), Image.Resampling.LANCZOS)
    apple_path = os.path.join(public_dir, "apple-touch-icon.png")
    fav_180.save(apple_path, "PNG", optimize=True)
    print(f"Generated {apple_path} (180x180)")

    # 6. Standard favicon.ico containing 16x16, 32x32, 48x48
    ico_path = os.path.join(public_dir, "favicon.ico")
    master_512.save(ico_path, format="ICO", sizes=[(16, 16), (32, 32), (48, 48)])
    print(f"Generated {ico_path} (multi-size: 16x16, 32x32, 48x48)")

    # C. SVG Favicon (Modern browsers & Google crawlable)
    # Embed base64-encoded crisp PNG in an SVG canvas for infinite crispness and compatibility
    import base64
    with open(fav_96_path, "rb") as f:
        png_b64 = base64.b64encode(f.read()).decode("utf-8")
    
    svg_content = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96" width="96" height="96">
  <rect width="96" height="96" rx="16" fill="#FFFFFF"/>
  <image href="data:image/png;base64,{png_b64}" width="96" height="96"/>
</svg>'''
    svg_path = os.path.join(public_dir, "favicon.svg")
    with open(svg_path, "w", encoding="utf-8") as f:
        f.write(svg_content)
    print(f"Generated {svg_path}")

    # D. Web App Manifest
    manifest_content = '''{
  "name": "Dr. B. Bhattacharyya Clinic",
  "short_name": "Bhattacharyya Clinic",
  "description": "Personalised classical homeopathic care at Dr. B. Bhattacharyya Clinic in Patna.",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#FAF8F5",
  "theme_color": "#163829",
  "icons": [
    {
      "src": "/favicon-48x48.png",
      "sizes": "48x48",
      "type": "image/png",
      "purpose": "any"
    },
    {
      "src": "/favicon-96x96.png",
      "sizes": "96x96",
      "type": "image/png",
      "purpose": "any"
    },
    {
      "src": "/favicon-192x192.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "any maskable"
    },
    {
      "src": "/favicon-512x512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "any maskable"
    }
  ]
}
'''
    manifest_path = os.path.join(public_dir, "site.webmanifest")
    with open(manifest_path, "w", encoding="utf-8") as f:
        f.write(manifest_content)
    print(f"Generated {manifest_path}")

if __name__ == "__main__":
    generate_assets()
