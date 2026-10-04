import os
from PIL import Image, ImageDraw, ImageFont

def create_placeholder(filepath, width, height, title, subtitle="", badge="PLACEHOLDER"):
    os.makedirs(os.path.dirname(filepath), exist_ok=True)
    
    # Strictly monochrome neutral grey background (#F4F4F4)
    img = Image.new("RGB", (width, height), color="#F4F4F4")
    draw = ImageDraw.Draw(img)
    
    # Hairline inner border (#DDDDDD)
    draw.rectangle([12, 12, width - 12, height - 12], outline="#DDDDDD", width=1)
    
    # Subtle geometric grid pattern or crosshairs
    center_x, center_y = width // 2, height // 2
    draw.line([center_x - 30, center_y, center_x + 30, center_y], fill="#CCCCCC", width=1)
    draw.line([center_x, center_y - 30, center_x, center_y + 30], fill="#CCCCCC", width=1)
    
    # Center diamond
    draw.polygon([
        (center_x, center_y - 20),
        (center_x + 20, center_y),
        (center_x, center_y + 20),
        (center_x - 20, center_y)
    ], outline="#BBBBBB", width=1)
    
    # Title & Subtitle text
    # Pillow default font is available on all systems
    try:
        font_large = ImageFont.truetype("arial.ttf", 22)
        font_small = ImageFont.truetype("arial.ttf", 13)
        font_tiny = ImageFont.truetype("arial.ttf", 11)
    except Exception:
        font_large = ImageFont.load_default()
        font_small = ImageFont.load_default()
        font_tiny = ImageFont.load_default()
        
    # Draw badge top right
    draw.text((width - 120, 24), badge, fill="#888888", font=font_tiny)
    
    # Draw aspect ratio info top left
    draw.text((24, 24), f"{width}x{height}", fill="#888888", font=font_tiny)
    
    # Draw title below center
    title_upper = title.upper()
    bbox_title = draw.textbbox((0, 0), title_upper, font=font_large)
    w_title = bbox_title[2] - bbox_title[0]
    draw.text((center_x - w_title // 2, center_y + 45), title_upper, fill="#111111", font=font_large)
    
    if subtitle:
        sub_upper = subtitle.upper()
        bbox_sub = draw.textbbox((0, 0), sub_upper, font=font_small)
        w_sub = bbox_sub[2] - bbox_sub[0]
        draw.text((center_x - w_sub // 2, center_y + 75), sub_upper, fill="#777777", font=font_small)
        
    # Bottom note
    bottom_text = "BANGLADESH HANDICRAFTS · EXPORT CATALOG"
    bbox_bot = draw.textbbox((0, 0), bottom_text, font=font_tiny)
    w_bot = bbox_bot[2] - bbox_bot[0]
    draw.text((center_x - w_bot // 2, height - 34), bottom_text, fill="#999999", font=font_tiny)
    
    img.save(filepath, "JPEG", quality=90)
    print(f"Generated: {filepath}")

# 1. Hero slides (21:9 ratio e.g. 1680x720)
hero_slides = [
    ("public/hero/slide-1.jpg", "WOODEN ACCENTS", "HERITAGE HAND-CARVED TIMBER"),
    ("public/hero/slide-2.jpg", "WOVEN JUTE LIVING", "BANGLADESH GOLDEN FIBER"),
    ("public/hero/slide-3.jpg", "ELEGANCE WRAPPED", "ANTIQUE BRASS & BELL METAL"),
    ("public/hero/slide-4.jpg", "COASTAL SEAGRASS", "NATURAL DELTA SUSTAINABILITY")
]
for path, title, sub in hero_slides:
    create_placeholder(path, 1680, 720, title, sub, "21:9 LIFESTYLE HERO")

# 2. Categories (banners 1600x500 and square tiles 800x800)
categories = [
    ("sea-grass", "Sea Grass", "Coastal Delta Weaves"),
    ("rattan", "Rattan", "Sculpted Natural Cane"),
    ("jute", "Jute", "The Golden Fiber of Bengal"),
    ("brass", "Brass", "Dhamrai Hand-Beaten Castings"),
    ("terracotta", "Terracotta", "Earthen River Clay"),
    ("bamboo-cane", "Bamboo & Cane", "Precision Split Lattice"),
    ("textiles-nakshi-kantha", "Textiles (Nakshi Kantha)", "Generational Folk Needlecraft"),
    ("home-decor", "Home Decor", "Minimalist Living & Tableware")
]
for slug, name, sub in categories:
    create_placeholder(f"public/categories/{slug}-banner.jpg", 1600, 500, name, sub, "CATEGORY BANNER")
    create_placeholder(f"public/categories/{slug}-tile.jpg", 800, 800, name, sub, "CATEGORY TILE")

# 3. Products (~24 products, 2 photos each, square 1000x1000)
products = [
    ("coastal-seagrass-belly-basket", "Coastal Seagrass Belly Basket", "Sea Grass"),
    ("braided-seagrass-laundry-hamper", "Braided Seagrass Hamper", "Sea Grass"),
    ("woven-seagrass-placemat-set", "Woven Seagrass Placemats", "Sea Grass"),
    ("scalloped-rattan-serving-tray", "Scalloped Rattan Tray", "Rattan"),
    ("geometric-rattan-pendant-shade", "Geometric Rattan Pendant", "Rattan"),
    ("oval-rattan-storage-caddy", "Oval Rattan Storage Caddy", "Rattan"),
    ("spiral-jute-floor-planter", "Spiral Jute Planter", "Jute"),
    ("braided-natural-jute-rug", "Braided Jute Oval Rug", "Jute"),
    ("minimalist-jute-wall-pocket", "Minimalist Jute Wall Pocket", "Jute"),
    ("raw-jute-twine-table-runner", "Raw Jute Table Runner", "Jute"),
    ("hammered-brass-taper-candle-holder", "Hammered Brass Candleholder", "Brass"),
    ("lost-wax-brass-lotus-dish", "Lost-Wax Brass Lotus Dish", "Brass"),
    ("etched-brass-footed-bowl", "Etched Brass Footed Bowl", "Brass"),
    ("ribbed-fluted-terracotta-planter", "Ribbed Terracotta Planter", "Terracotta"),
    ("unglazed-terracotta-water-carafe", "Unglazed Terracotta Carafe", "Terracotta"),
    ("hand-pinched-terracotta-burner", "Hand-Pinched Terracotta Burner", "Terracotta"),
    ("fine-lattice-bamboo-bread-basket", "Fine-Lattice Bamboo Basket", "Bamboo"),
    ("tiered-openwork-bamboo-stand", "Tiered Openwork Bamboo Stand", "Bamboo"),
    ("cylindrical-bamboo-floor-lantern", "Cylindrical Bamboo Lantern", "Bamboo"),
    ("geometric-lotus-nakshi-kantha-throw", "Lotus Nakshi Kantha Throw", "Textiles"),
    ("running-stitch-nakshi-cushion-cover", "Running-Stitch Cushion Cover", "Textiles"),
    ("indigo-dyed-kantha-bedspread", "Indigo Dyed Kantha Bedspread", "Textiles"),
    ("hand-carved-sheesham-wood-board", "Sheesham Wood Board", "Reclaimed Wood"),
    ("date-palm-leaf-storage-bin", "Date Palm Leaf Storage Bin", "Date Leaf")
]
for slug, name, mat in products:
    create_placeholder(f"public/products/{slug}/1.jpg", 1000, 1000, name, f"MATERIAL: {mat} · VIEW 01", "1:1 SQUARE PHOTO")
    create_placeholder(f"public/products/{slug}/2.jpg", 1000, 1000, name, f"MATERIAL: {mat} · DETAIL VIEW 02", "1:1 SQUARE PHOTO")

print("All placeholder images created successfully!")
