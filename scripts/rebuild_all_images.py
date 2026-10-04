import os
from PIL import Image, ImageOps, ImageFilter

BASE = r"C:\Users\Asif Newaz\.gemini\antigravity\brain\d37e0de9-6ac3-4dff-a349-c818cc72ac4f"

# Source files
src_wood_hero     = os.path.join(BASE, "hero_wooden_accents_1791110483454.jpg")
src_jute_hero     = os.path.join(BASE, "hero_jute_living_1791110513299.jpg")
src_brass_hero    = os.path.join(BASE, "hero_brass_accents_1791110566308.jpg")
src_seagrass_hero = os.path.join(BASE, "hero_seagrass_coastal_1791110592763.jpg")

src_cat_seagrass  = os.path.join(BASE, "cat_seagrass_tile_1791110623806.jpg")
src_cat_rattan    = os.path.join(BASE, "cat_rattan_tile_1791110652881.jpg")
src_cat_jute      = os.path.join(BASE, "cat_jute_tile_1791110681131.jpg")
src_cat_brass     = os.path.join(BASE, "cat_brass_tile_1791110711456.jpg")
src_cat_terracotta= os.path.join(BASE, "cat_terracotta_tile_1791110740713.jpg")
src_cat_bamboo    = os.path.join(BASE, "cat_bamboo_tile_1791110771477.jpg")
src_cat_textiles  = os.path.join(BASE, "cat_textiles_tile_1791110801347.jpg")
src_cat_homedecor = os.path.join(BASE, "cat_homedecor_tile_1791110869050.jpg")
src_prod_hamper   = os.path.join(BASE, "prod_seagrass_hamper_1791110905596.jpg")

def create_banner(src_path, dest_path, crop_box=(0.0, 0.15, 1.0, 0.75), size=(1600, 500)):
    os.makedirs(os.path.dirname(dest_path), exist_ok=True)
    with Image.open(src_path) as im:
        w, h = im.size
        left = int(crop_box[0] * w)
        top = int(crop_box[1] * h)
        right = int(crop_box[2] * w)
        bottom = int(crop_box[3] * h)
        cropped = im.crop((left, top, right, bottom))
        resized = cropped.resize(size, Image.Resampling.LANCZOS)
        resized.save(dest_path, "JPEG", quality=90)
    print(f"Banner created: {dest_path}")

def create_product_shot(src_path, dest_path, crop_box=None, size=(1000, 1000), padding_pct=0.15, bg_color=(250, 250, 250)):
    """Creates a studio-lit square product photo with generous margins so it NEVER appears over-zoomed."""
    os.makedirs(os.path.dirname(dest_path), exist_ok=True)
    with Image.open(src_path) as im:
        w, h = im.size
        if crop_box:
            left = max(0, int(crop_box[0] * w))
            top = max(0, int(crop_box[1] * h))
            right = min(w, int(crop_box[2] * w))
            bottom = min(h, int(crop_box[3] * h))
            subject = im.crop((left, top, right, bottom))
        else:
            subject = im
            
        sw, sh = subject.size
        avail_w = int(size[0] * (1.0 - padding_pct * 2))
        avail_h = int(size[1] * (1.0 - padding_pct * 2))
        
        scale = min(avail_w / sw, avail_h / sh)
        target_w = int(sw * scale)
        target_h = int(sh * scale)
        
        resized = subject.resize((target_w, target_h), Image.Resampling.LANCZOS)
        
        canvas = Image.new("RGB", size, bg_color)
        paste_x = (size[0] - target_w) // 2
        paste_y = (size[1] - target_h) // 2
        canvas.paste(resized, (paste_x, paste_y))
        canvas.save(dest_path, "JPEG", quality=92)
    print(f"Product photo created: {dest_path}")

print("--- 1. BUILDING CATEGORY BANNERS (1600x500) ---")
create_banner(src_seagrass_hero, "public/categories/sea-grass-banner.jpg", (0.0, 0.20, 1.0, 0.70))
create_banner(src_jute_hero,     "public/categories/jute-banner.jpg",      (0.0, 0.25, 1.0, 0.75))
create_banner(src_brass_hero,    "public/categories/brass-banner.jpg",     (0.0, 0.15, 1.0, 0.65))
create_banner(src_wood_hero,     "public/categories/home-decor-banner.jpg",(0.0, 0.20, 1.0, 0.70))

# Custom wide composites for rattan, terracotta, bamboo, and textiles
create_banner(src_cat_rattan,    "public/categories/rattan-banner.jpg",    (0.0, 0.20, 1.0, 0.80))
create_banner(src_cat_terracotta,"public/categories/terracotta-banner.jpg",(0.0, 0.10, 1.0, 0.75))
create_banner(src_cat_bamboo,    "public/categories/bamboo-cane-banner.jpg",(0.0, 0.15, 1.0, 0.85))
create_banner(src_cat_textiles,  "public/categories/textiles-nakshi-kantha-banner.jpg", (0.0, 0.15, 1.0, 0.85))

print("\n--- 2. BUILDING CATEGORY TILES (800x800) ---")
create_product_shot(src_cat_seagrass,   "public/categories/sea-grass-tile.jpg",   None, (800, 800), 0.08)
create_product_shot(src_cat_rattan,     "public/categories/rattan-tile.jpg",      None, (800, 800), 0.08)
create_product_shot(src_cat_jute,       "public/categories/jute-tile.jpg",        None, (800, 800), 0.08)
create_product_shot(src_cat_brass,      "public/categories/brass-tile.jpg",       None, (800, 800), 0.08)
create_product_shot(src_cat_terracotta, "public/categories/terracotta-tile.jpg",  None, (800, 800), 0.08)
create_product_shot(src_cat_bamboo,     "public/categories/bamboo-cane-tile.jpg",  None, (800, 800), 0.08)
create_product_shot(src_cat_textiles,   "public/categories/textiles-nakshi-kantha-tile.jpg", None, (800, 800), 0.08)
create_product_shot(src_cat_homedecor,  "public/categories/home-decor-tile.jpg",   None, (800, 800), 0.08)

print("\n--- 3. BUILDING 24 PRODUCTS (VIEW 1 AND VIEW 2) ---")

# 1. coastal-seagrass-belly-basket
create_product_shot(src_cat_seagrass, "public/products/coastal-seagrass-belly-basket/1.jpg", (0.04, 0.18, 0.58, 0.82), padding_pct=0.10)
create_product_shot(src_cat_seagrass, "public/products/coastal-seagrass-belly-basket/2.jpg", (0.55, 0.32, 0.95, 0.82), padding_pct=0.12)

# 2. braided-seagrass-laundry-hamper
create_product_shot(src_prod_hamper, "public/products/braided-seagrass-laundry-hamper/1.jpg", None, padding_pct=0.10)
create_product_shot(src_prod_hamper, "public/products/braided-seagrass-laundry-hamper/2.jpg", (0.15, 0.02, 0.85, 0.50), padding_pct=0.12)

# 3. woven-seagrass-placemat-set
create_product_shot(src_seagrass_hero, "public/products/woven-seagrass-placemat-set/1.jpg", (0.19, 0.52, 0.38, 0.85), padding_pct=0.12)
create_product_shot(src_cat_seagrass,  "public/products/woven-seagrass-placemat-set/2.jpg", (0.55, 0.35, 0.95, 0.80), padding_pct=0.15)

# 4. scalloped-rattan-serving-tray
create_product_shot(src_cat_rattan, "public/products/scalloped-rattan-serving-tray/1.jpg", None, padding_pct=0.10)
create_product_shot(src_cat_rattan, "public/products/scalloped-rattan-serving-tray/2.jpg", (0.15, 0.15, 0.85, 0.85), padding_pct=0.12)

# 5. geometric-rattan-pendant-shade
create_product_shot(src_cat_rattan, "public/products/geometric-rattan-pendant-shade/1.jpg", (0.05, 0.05, 0.95, 0.95), padding_pct=0.12)
create_product_shot(src_cat_rattan, "public/products/geometric-rattan-pendant-shade/2.jpg", (0.25, 0.25, 0.75, 0.75), padding_pct=0.15)

# 6. oval-rattan-storage-caddy
create_product_shot(src_cat_rattan, "public/products/oval-rattan-storage-caddy/1.jpg", (0.05, 0.10, 0.95, 0.90), padding_pct=0.12)
create_product_shot(src_cat_rattan, "public/products/oval-rattan-storage-caddy/2.jpg", (0.0, 0.25, 0.40, 0.75), padding_pct=0.15)

# 7. spiral-jute-floor-planter
create_product_shot(src_cat_jute, "public/products/spiral-jute-floor-planter/1.jpg", None, padding_pct=0.10)
create_product_shot(src_jute_hero, "public/products/spiral-jute-floor-planter/2.jpg", (0.70, 0.52, 0.95, 0.88), padding_pct=0.12)

# 8. braided-natural-jute-rug
create_product_shot(src_jute_hero, "public/products/braided-natural-jute-rug/1.jpg", (0.08, 0.58, 0.80, 0.99), padding_pct=0.12)
create_product_shot(src_jute_hero, "public/products/braided-natural-jute-rug/2.jpg", (0.15, 0.60, 0.35, 0.72), padding_pct=0.15)

# 9. minimalist-jute-wall-pocket
create_product_shot(src_jute_hero, "public/products/minimalist-jute-wall-pocket/1.jpg", (0.57, 0.01, 0.86, 0.36), padding_pct=0.12)
create_product_shot(src_jute_hero, "public/products/minimalist-jute-wall-pocket/2.jpg", (0.60, 0.02, 0.82, 0.25), padding_pct=0.15)

# 10. raw-jute-twine-table-runner
create_product_shot(src_jute_hero, "public/products/raw-jute-twine-table-runner/1.jpg", (0.35, 0.49, 0.50, 0.63), padding_pct=0.15)
create_product_shot(src_cat_jute,  "public/products/raw-jute-twine-table-runner/2.jpg", (0.15, 0.25, 0.85, 0.75), padding_pct=0.15)

# 11. hammered-brass-taper-candle-holder
create_product_shot(src_cat_brass, "public/products/hammered-brass-taper-candle-holder/1.jpg", None, padding_pct=0.10)
create_product_shot(src_brass_hero, "public/products/hammered-brass-taper-candle-holder/2.jpg", (0.36, 0.12, 0.60, 0.85), padding_pct=0.12)

# 12. lost-wax-brass-lotus-dish
create_product_shot(src_brass_hero, "public/products/lost-wax-brass-lotus-dish/1.jpg", (0.60, 0.52, 0.92, 0.88), padding_pct=0.12)
create_product_shot(src_brass_hero, "public/products/lost-wax-brass-lotus-dish/2.jpg", (0.64, 0.58, 0.88, 0.84), padding_pct=0.15)

# 13. etched-brass-footed-bowl
create_product_shot(src_brass_hero, "public/products/etched-brass-footed-bowl/1.jpg", (0.18, 0.50, 0.34, 0.82), padding_pct=0.12)
create_product_shot(src_brass_hero, "public/products/etched-brass-footed-bowl/2.jpg", (0.09, 0.68, 0.22, 0.89), padding_pct=0.15)

# 14. ribbed-fluted-terracotta-planter
create_product_shot(src_cat_terracotta, "public/products/ribbed-fluted-terracotta-planter/1.jpg", None, padding_pct=0.10)
create_product_shot(src_cat_terracotta, "public/products/ribbed-fluted-terracotta-planter/2.jpg", (0.15, 0.25, 0.85, 0.85), padding_pct=0.14)

# 15. unglazed-terracotta-water-carafe
create_product_shot(src_brass_hero, "public/products/unglazed-terracotta-water-carafe/1.jpg", (0.90, 0.44, 1.0, 0.76), padding_pct=0.12)
create_product_shot(src_seagrass_hero, "public/products/unglazed-terracotta-water-carafe/2.jpg", (0.45, 0.66, 0.55, 0.85), padding_pct=0.15)

# 16. hand-pinched-terracotta-burner
create_product_shot(src_seagrass_hero, "public/products/hand-pinched-terracotta-burner/1.jpg", (0.29, 0.68, 0.39, 0.85), padding_pct=0.12)
create_product_shot(src_cat_terracotta, "public/products/hand-pinched-terracotta-burner/2.jpg", (0.20, 0.05, 0.80, 0.55), padding_pct=0.15)

# 17. fine-lattice-bamboo-bread-basket
create_product_shot(src_cat_bamboo, "public/products/fine-lattice-bamboo-bread-basket/1.jpg", None, padding_pct=0.10)
create_product_shot(src_cat_bamboo, "public/products/fine-lattice-bamboo-bread-basket/2.jpg", (0.15, 0.30, 0.85, 0.85), padding_pct=0.15)

# 18. tiered-openwork-bamboo-stand
create_product_shot(src_cat_bamboo, "public/products/tiered-openwork-bamboo-stand/1.jpg", (0.05, 0.05, 0.95, 0.95), padding_pct=0.12)
create_product_shot(src_cat_bamboo, "public/products/tiered-openwork-bamboo-stand/2.jpg", (0.20, 0.15, 0.80, 0.75), padding_pct=0.15)

# 19. cylindrical-bamboo-floor-lantern
create_product_shot(src_cat_bamboo, "public/products/cylindrical-bamboo-floor-lantern/1.jpg", (0.05, 0.10, 0.95, 0.92), padding_pct=0.12)
create_product_shot(src_cat_bamboo, "public/products/cylindrical-bamboo-floor-lantern/2.jpg", (0.10, 0.25, 0.90, 0.80), padding_pct=0.15)

# 20. geometric-lotus-nakshi-kantha-throw
create_product_shot(src_cat_textiles, "public/products/geometric-lotus-nakshi-kantha-throw/1.jpg", None, padding_pct=0.10)
create_product_shot(src_cat_textiles, "public/products/geometric-lotus-nakshi-kantha-throw/2.jpg", (0.15, 0.15, 0.85, 0.85), padding_pct=0.12)

# 21. running-stitch-nakshi-cushion-cover
create_product_shot(src_cat_textiles, "public/products/running-stitch-nakshi-cushion-cover/1.jpg", (0.10, 0.20, 0.90, 0.80), padding_pct=0.12)
create_product_shot(src_cat_textiles, "public/products/running-stitch-nakshi-cushion-cover/2.jpg", (0.25, 0.30, 0.75, 0.70), padding_pct=0.15)

# 22. indigo-dyed-kantha-bedspread
create_product_shot(src_cat_textiles, "public/products/indigo-dyed-kantha-bedspread/1.jpg", (0.05, 0.10, 0.95, 0.90), padding_pct=0.12)
create_product_shot(src_cat_textiles, "public/products/indigo-dyed-kantha-bedspread/2.jpg", (0.20, 0.10, 0.80, 0.70), padding_pct=0.15)

# 23. hand-carved-sheesham-wood-board (THE ONE FROM THE USER SCREENSHOT!)
# Both 1.jpg and 2.jpg will now be high-res, full board view and angled detail view!
create_product_shot(src_cat_homedecor, "public/products/hand-carved-sheesham-wood-board/1.jpg", None, padding_pct=0.10)
create_product_shot(src_wood_hero,     "public/products/hand-carved-sheesham-wood-board/2.jpg", (0.30, 0.60, 0.70, 0.88), padding_pct=0.12)

# 24. date-palm-leaf-storage-bin
create_product_shot(src_seagrass_hero, "public/products/date-palm-leaf-storage-bin/1.jpg", (0.49, 0.52, 0.65, 0.80), padding_pct=0.12)
create_product_shot(src_seagrass_hero, "public/products/date-palm-leaf-storage-bin/2.jpg", (0.60, 0.56, 0.74, 0.84), padding_pct=0.14)

# 25. peacock-motif-nakshi-kantha-tapestry
create_product_shot(src_cat_textiles, "public/products/peacock-motif-nakshi-kantha-tapestry/1.jpg", (0.40, 0.15, 0.85, 0.60), padding_pct=0.10)
create_product_shot(src_cat_textiles, "public/products/peacock-motif-nakshi-kantha-tapestry/2.jpg", (0.45, 0.18, 0.75, 0.48), padding_pct=0.12)

# 26. floral-mandala-nakshi-baby-quilt
create_product_shot(src_cat_textiles, "public/products/floral-mandala-nakshi-baby-quilt/1.jpg", (0.05, 0.05, 0.95, 0.95), padding_pct=0.10)
create_product_shot(src_cat_textiles, "public/products/floral-mandala-nakshi-baby-quilt/2.jpg", (0.15, 0.35, 0.65, 0.85), padding_pct=0.12)

# 27. traditional-bengal-kalka-table-runner
create_product_shot(src_cat_textiles, "public/products/traditional-bengal-kalka-table-runner/1.jpg", (0.08, 0.20, 0.92, 0.75), padding_pct=0.10)
create_product_shot(src_cat_textiles, "public/products/traditional-bengal-kalka-table-runner/2.jpg", (0.10, 0.38, 0.55, 0.80), padding_pct=0.12)

print("\nAll category banners, category tiles, and product views successfully regenerated with studio padding!")
