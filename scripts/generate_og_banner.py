import os
import math
from PIL import Image, ImageDraw, ImageFont, ImageFilter

def draw_star(draw, cx, cy, r_outer=7.5, r_inner=3.4, fill=(255, 215, 0, 255)):
    points = []
    for i in range(10):
        r = r_outer if i % 2 == 0 else r_inner
        angle = i * math.pi / 5 - math.pi / 2
        x = cx + r * math.cos(angle)
        y = cy + r * math.sin(angle)
        points.append((x, y))
    draw.polygon(points, fill=fill)

def draw_diamond(draw, cx, cy, size=5, fill=(212, 175, 55, 255)):
    draw.polygon([(cx, cy - size), (cx + size, cy), (cx, cy + size), (cx - size, cy)], fill=fill)

def draw_check(draw, cx, cy, size=5, color=(74, 222, 128, 255)):
    # Clean 2-segment vector checkmark
    draw.line([(cx - size, cy), (cx - 1, cy + size - 1)], fill=color, width=2)
    draw.line([(cx - 1, cy + size - 1), (cx + size + 2, cy - size)], fill=color, width=2)

def draw_phone(draw, cx, cy, size=5, color=(240, 220, 160, 255)):
    # Clean phone handset vector
    draw.arc([cx - size, cy - size, cx + size, cy + size], 45, 225, fill=color, width=2)
    draw.rectangle([cx - size + 1, cy - 1, cx - size + 4, cy + 3], fill=color)
    draw.rectangle([cx + size - 4, cy - 3, cx + size - 1, cy + 1], fill=color)

def create_banner():
    width = 1200
    height = 630
    
    # 1. Base Gradient Canvas (Rich Heritage Medical Forest Green)
    canvas = Image.new("RGBA", (width, height), (10, 36, 23, 255))
    draw = ImageDraw.Draw(canvas)
    
    # Smooth diagonal gradient
    for y in range(height):
        ratio_y = y / height
        for x in range(0, width, 4):
            ratio_x = x / width
            blend = (ratio_x * 0.45 + ratio_y * 0.55)
            r = int(9 + blend * (24 - 9))
            g = int(32 + blend * (68 - 32))
            b = int(22 + blend * (48 - 22))
            draw.rectangle([x, y, x + 4, y + 1], fill=(r, g, b, 255))
    
    # 2. Add subtle luxury emerald glow
    glow = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    glow_draw = ImageDraw.Draw(glow)
    glow_draw.ellipse([680, -80, 1260, 480], fill=(28, 92, 62, 55))
    glow_draw.ellipse([-80, 220, 520, 780], fill=(18, 70, 48, 45))
    glow = glow.filter(ImageFilter.GaussianBlur(75))
    canvas = Image.alpha_composite(canvas, glow)
    
    # 3. Framing & Safe Area Margin
    draw = ImageDraw.Draw(canvas)
    frame_m = 24
    draw.rounded_rectangle(
        [frame_m, frame_m, width - frame_m, height - frame_m],
        radius=20,
        outline=(212, 175, 55, 75),  # Subtle gold outline
        width=1
    )
    
    # 4. Load Fonts
    font_dir = "C:/Windows/Fonts"
    font_badge = ImageFont.truetype(os.path.join(font_dir, "segoeuib.ttf"), 14)
    font_title = ImageFont.truetype(os.path.join(font_dir, "georgiab.ttf"), 38)
    font_subtitle = ImageFont.truetype(os.path.join(font_dir, "georgiai.ttf"), 22)
    font_feature_b = ImageFont.truetype(os.path.join(font_dir, "segoeuib.ttf"), 17)
    font_feature = ImageFont.truetype(os.path.join(font_dir, "segoeui.ttf"), 15)
    font_pill_b = ImageFont.truetype(os.path.join(font_dir, "segoeuib.ttf"), 15)
    font_pill = ImageFont.truetype(os.path.join(font_dir, "segoeui.ttf"), 14)
    font_contact = ImageFont.truetype(os.path.join(font_dir, "segoeuib.ttf"), 16)
    
    # 5. LEFT COLUMN: Clinic Identity & Highlights
    left_x = 65
    
    # Top Location Pill
    badge_y = 62
    badge_text = "PATNA, BIHAR  •  ESTABLISHED 1940"
    draw.rounded_rectangle([left_x, badge_y, left_x + 310, badge_y + 34], radius=17, fill=(16, 52, 35, 230), outline=(212, 175, 55, 140), width=1)
    # Emerald pulse dot
    draw.ellipse([left_x + 14, badge_y + 12, left_x + 22, badge_y + 20], fill=(74, 222, 128, 255))
    draw.text((left_x + 30, badge_y + 7), badge_text, font=font_badge, fill=(240, 222, 175, 255))
    
    # Main Headline
    title_y = 114
    draw.text((left_x, title_y), "DR. B. BHATTACHARYYA", font=font_title, fill=(255, 255, 255, 255))
    draw.text((left_x, title_y + 46), "CLINIC", font=font_title, fill=(212, 175, 55, 255))
    
    # Gold decorative divider line
    draw.line([(left_x, title_y + 98), (left_x + 180, title_y + 98)], fill=(212, 175, 55, 190), width=2)
    
    # Subtitle
    sub_y = title_y + 112
    draw.text((left_x, sub_y), "Personalised Classical Homeopathy", font=font_subtitle, fill=(240, 230, 205, 255))
    
    # 3 Key Features with Gold Diamond Bullets
    bullets_y = sub_y + 44
    bullets = [
        ("Constitutional Healing & Chronic Care", "Root-cause cure for lasting health & vitality"),
        ("In-Clinic & Remote Video Consultations", "Patna consultations + Online appointments"),
        ("Doorstep Medicine Parcel Dispatch", "Pure authentic remedies delivered across India")
    ]
    
    curr_y = bullets_y
    for b_title, b_desc in bullets:
        draw_diamond(draw, left_x + 6, curr_y + 10, size=5, fill=(212, 175, 55, 255))
        draw.text((left_x + 22, curr_y), b_title, font=font_feature_b, fill=(255, 255, 255, 255))
        draw.text((left_x + 22, curr_y + 23), b_desc, font=font_feature, fill=(185, 215, 200, 230))
        curr_y += 53
        
    # Bottom Left Rating Card (aligned with bottom right card)
    bottom_y = 506
    bottom_h = 56
    draw.rounded_rectangle([left_x, bottom_y, left_x + 540, bottom_y + bottom_h], radius=12, fill=(14, 46, 31, 230), outline=(212, 175, 55, 100), width=1)
    
    # Draw 5 Gold Stars
    star_x = left_x + 20
    for i in range(5):
        draw_star(draw, star_x + (i * 18), bottom_y + 28, r_outer=7.5, r_inner=3.4, fill=(255, 215, 0, 255))
    
    draw.text((star_x + 98, bottom_y + 18), "4.8 / 5.0 (120+ Google Reviews)", font=font_badge, fill=(255, 240, 200, 255))
    draw.text((star_x + 328, bottom_y + 18), "•  East Patel Nagar, Patna", font=font_pill, fill=(200, 225, 215, 230))
    
    # 6. RIGHT COLUMN: Doctor Photograph Card & Quick Action Pills
    doc_path = "public/doctor.jpeg"
    if os.path.exists(doc_path):
        doc_img = Image.open(doc_path).convert("RGBA")
        doc_w, doc_h = doc_img.size
        
        card_w = 485
        card_h = int(card_w * (doc_h / doc_w))  # ~335px
        doc_resized = doc_img.resize((card_w, card_h), Image.Resampling.LANCZOS)
        
        mask = Image.new("L", (card_w, card_h), 0)
        mask_draw = ImageDraw.Draw(mask)
        mask_draw.rounded_rectangle([0, 0, card_w, card_h], radius=18, fill=255)
        
        doc_x = 648
        doc_y = 66
        
        # Soft drop shadow for doctor card
        shadow = Image.new("RGBA", (width, height), (0, 0, 0, 0))
        shadow_draw = ImageDraw.Draw(shadow)
        shadow_draw.rounded_rectangle(
            [doc_x - 3, doc_y - 1, doc_x + card_w + 3, doc_y + card_h + 8],
            radius=20,
            fill=(0, 0, 0, 130)
        )
        shadow = shadow.filter(ImageFilter.GaussianBlur(14))
        canvas = Image.alpha_composite(canvas, shadow)
        
        # Paste doctor card
        canvas.paste(doc_resized, (doc_x, doc_y), mask)
        
        # IMPORTANT: Re-instantiate draw after composite!
        draw = ImageDraw.Draw(canvas)
        
        # Crisp gold border around doctor card
        draw.rounded_rectangle(
            [doc_x, doc_y, doc_x + card_w, doc_y + card_h],
            radius=18,
            outline=(212, 175, 55, 230),
            width=2
        )
        
        # Two Action Badges below Doctor Card
        p1_x = doc_x
        p1_y = doc_y + card_h + 16
        draw.rounded_rectangle([p1_x, p1_y, p1_x + 236, p1_y + 40], radius=10, fill=(16, 52, 35, 240), outline=(212, 175, 55, 100), width=1)
        draw_check(draw, p1_x + 20, p1_y + 20, size=5, color=(74, 222, 128, 255))
        draw.text((p1_x + 34, p1_y + 10), "In-Clinic & Video Consult", font=font_pill_b, fill=(255, 255, 255, 255))
        
        p2_x = doc_x + 248
        draw.rounded_rectangle([p2_x, p1_y, p2_x + 237, p1_y + 40], radius=10, fill=(16, 52, 35, 240), outline=(212, 175, 55, 100), width=1)
        draw_check(draw, p2_x + 20, p1_y + 20, size=5, color=(74, 222, 128, 255))
        draw.text((p2_x + 34, p1_y + 10), "Doorstep Medicines", font=font_pill_b, fill=(255, 255, 255, 255))
        
        # Bottom Right Contact Line (aligned with bottom left card)
        draw.rounded_rectangle([doc_x, bottom_y, doc_x + card_w, bottom_y + bottom_h], radius=12, fill=(22, 68, 46, 240), outline=(212, 175, 55, 180), width=1)
        draw_phone(draw, doc_x + 24, bottom_y + 28, size=6, color=(255, 220, 160, 255))
        draw.text((doc_x + 38, bottom_y + 18), "Appointments: +91 7050086029 / 9934298080", font=font_contact, fill=(255, 235, 180, 255))

    # 7. Save High-Quality Optimized JPEG
    final_img = canvas.convert("RGB")
    final_img.save("public/og-image.jpeg", "JPEG", quality=93, optimize=True)
    final_img.save("public/og-image.jpg", "JPEG", quality=93, optimize=True)
    final_img.save("public/og-image-v2.jpeg", "JPEG", quality=93, optimize=True)
    print("og-image.jpeg, og-image.jpg and og-image-v2.jpeg successfully generated!")

if __name__ == "__main__":
    create_banner()
