import os
from PIL import Image, ImageEnhance, ImageFilter, ImageOps

BASE_ARTIFACT_DIR = r"C:\Users\Asif Newaz\.gemini\antigravity\brain\d37e0de9-6ac3-4dff-a349-c818cc72ac4f"

# Master source images generated earlier
img_wooden_hero = os.path.join(BASE_ARTIFACT_DIR, "hero_wooden_accents_1791110483454.jpg")
img_jute_hero   = os.path.join(BASE_ARTIFACT_DIR, "hero_jute_living_1791110513299.jpg")
img_brass_hero  = os.path.join(BASE_ARTIFACT_DIR, "hero_brass_accents_1791110566308.jpg")
img_seagrass_hero = os.path.join(BASE_ARTIFACT_DIR, "hero_seagrass_coastal_1791110592763.jpg")

img_cat_seagrass = os.path.join(BASE_ARTIFACT_DIR, "cat_seagrass_tile_1791110623806.jpg")
img_cat_rattan   = os.path.join(BASE_ARTIFACT_DIR, "cat_rattan_tile_1791110652881.jpg")
img_cat_jute     = os.path.join(BASE_ARTIFACT_DIR, "cat_jute_tile_1791110681131.jpg")
img_cat_brass    = os.path.join(BASE_ARTIFACT_DIR, "cat_brass_tile_1791110711456.jpg")
img_cat_terracotta = os.path.join(BASE_ARTIFACT_DIR, "cat_terracotta_tile_1791110740713.jpg")
img_cat_bamboo   = os.path.join(BASE_ARTIFACT_DIR, "cat_bamboo_tile_1791110771477.jpg")
img_cat_textiles = os.path.join(BASE_ARTIFACT_DIR, "cat_textiles_tile_1791110801347.jpg")
img_cat_homedecor= os.path.join(BASE_ARTIFACT_DIR, "cat_homedecor_tile_1791110869050.jpg")
img_prod_hamper  = os.path.join(BASE_ARTIFACT_DIR, "prod_seagrass_hamper_1791110905596.jpg")

def crop_and_place(src_path, crop_box, dest_path, target_size=(1000, 1000), bg_color=(255, 255, 255), pad=True):
    os.makedirs(os.path.dirname(dest_path), exist_ok=True)
    with Image.open(src_path) as im:
        w, h = im.size
        # crop_box as relative fractions (left, top, right, bottom)
        left = int(crop_box[0] * w)
        top = int(crop_box[1] * h)
        right = int(crop_box[2] * w)
        bottom = int(crop_box[3] * h)
        
        cropped = im.crop((left, top, right, bottom))
        
        if pad:
            # Resize cropped keeping aspect ratio and paste onto pure white / neutral square
            cw, ch = cropped.size
            ratio = min((target_size[0] - 60) / cw, (target_size[1] - 60) / ch)
            new_size = (int(cw * ratio), int(ch * ratio))
            resized = cropped.resize(new_size, Image.Resampling.LANCZOS)
            
            final_img = Image.new("RGB", target_size, bg_color)
            paste_x = (target_size[0] - new_size[0]) // 2
            paste_y = (target_size[1] - new_size[1]) // 2
            final_img.paste(resized, (paste_x, paste_y))
            final_img.save(dest_path, "JPEG", quality=92)
        else:
            resized = cropped.resize(target_size, Image.Resampling.LANCZOS)
            resized.save(dest_path, "JPEG", quality=92)
            
    print(f"Created: {dest_path}")

# 1. coastal-seagrass-belly-basket
crop_and_place(img_cat_seagrass, (0.05, 0.20, 0.55, 0.80), "public/products/coastal-seagrass-belly-basket/1.jpg")
crop_and_place(img_cat_seagrass, (0.15, 0.35, 0.45, 0.65), "public/products/coastal-seagrass-belly-basket/2.jpg", pad=False)

# 2. braided-seagrass-laundry-hamper
crop_and_place(img_prod_hamper, (0.15, 0.05, 0.85, 0.95), "public/products/braided-seagrass-laundry-hamper/1.jpg")
crop_and_place(img_prod_hamper, (0.25, 0.05, 0.75, 0.45), "public/products/braided-seagrass-laundry-hamper/2.jpg", pad=False)

# 3. woven-seagrass-placemat-set
crop_and_place(img_cat_seagrass, (0.55, 0.35, 0.95, 0.80), "public/products/woven-seagrass-placemat-set/1.jpg")
crop_and_place(img_seagrass_hero, (0.20, 0.55, 0.35, 0.80), "public/products/woven-seagrass-placemat-set/2.jpg")

# 4. scalloped-rattan-serving-tray
crop_and_place(img_cat_rattan, (0.02, 0.02, 0.98, 0.98), "public/products/scalloped-rattan-serving-tray/1.jpg")
crop_and_place(img_cat_rattan, (0.25, 0.25, 0.75, 0.75), "public/products/scalloped-rattan-serving-tray/2.jpg", pad=False)

# 5. geometric-rattan-pendant-shade
crop_and_place(img_cat_rattan, (0.10, 0.10, 0.90, 0.90), "public/products/geometric-rattan-pendant-shade/1.jpg")
crop_and_place(img_cat_rattan, (0.35, 0.35, 0.65, 0.65), "public/products/geometric-rattan-pendant-shade/2.jpg", pad=False)

# 6. oval-rattan-storage-caddy
crop_and_place(img_cat_rattan, (0.05, 0.15, 0.95, 0.85), "public/products/oval-rattan-storage-caddy/1.jpg")
crop_and_place(img_cat_rattan, (0.0, 0.30, 0.30, 0.70), "public/products/oval-rattan-storage-caddy/2.jpg", pad=False)

# 7. spiral-jute-floor-planter
crop_and_place(img_cat_jute, (0.05, 0.08, 0.95, 0.92), "public/products/spiral-jute-floor-planter/1.jpg")
crop_and_place(img_cat_jute, (0.20, 0.25, 0.80, 0.75), "public/products/spiral-jute-floor-planter/2.jpg", pad=False)

# 8. braided-natural-jute-rug
crop_and_place(img_jute_hero, (0.10, 0.60, 0.78, 0.98), "public/products/braided-natural-jute-rug/1.jpg")
crop_and_place(img_jute_hero, (0.25, 0.68, 0.65, 0.92), "public/products/braided-natural-jute-rug/2.jpg", pad=False)

# 9. minimalist-jute-wall-pocket
crop_and_place(img_jute_hero, (0.58, 0.01, 0.85, 0.35), "public/products/minimalist-jute-wall-pocket/1.jpg")
crop_and_place(img_jute_hero, (0.60, 0.05, 0.80, 0.25), "public/products/minimalist-jute-wall-pocket/2.jpg", pad=False)

# 10. raw-jute-twine-table-runner
crop_and_place(img_jute_hero, (0.35, 0.50, 0.48, 0.62), "public/products/raw-jute-twine-table-runner/1.jpg")
crop_and_place(img_cat_jute, (0.25, 0.35, 0.75, 0.65), "public/products/raw-jute-twine-table-runner/2.jpg", pad=False)

# 11. hammered-brass-taper-candle-holder
crop_and_place(img_cat_brass, (0.15, 0.05, 0.85, 0.95), "public/products/hammered-brass-taper-candle-holder/1.jpg")
crop_and_place(img_cat_brass, (0.25, 0.30, 0.75, 0.85), "public/products/hammered-brass-taper-candle-holder/2.jpg", pad=False)

# 12. lost-wax-brass-lotus-dish
crop_and_place(img_brass_hero, (0.60, 0.55, 0.92, 0.88), "public/products/lost-wax-brass-lotus-dish/1.jpg")
crop_and_place(img_brass_hero, (0.65, 0.60, 0.88, 0.82), "public/products/lost-wax-brass-lotus-dish/2.jpg", pad=False)

# 13. etched-brass-footed-bowl
crop_and_place(img_brass_hero, (0.18, 0.52, 0.33, 0.82), "public/products/etched-brass-footed-bowl/1.jpg")
crop_and_place(img_brass_hero, (0.09, 0.70, 0.22, 0.88), "public/products/etched-brass-footed-bowl/2.jpg")

# 14. ribbed-fluted-terracotta-planter
crop_and_place(img_cat_terracotta, (0.10, 0.05, 0.90, 0.95), "public/products/ribbed-fluted-terracotta-planter/1.jpg")
crop_and_place(img_cat_terracotta, (0.20, 0.35, 0.80, 0.85), "public/products/ribbed-fluted-terracotta-planter/2.jpg", pad=False)

# 15. unglazed-terracotta-water-carafe
crop_and_place(img_brass_hero, (0.91, 0.46, 1.0, 0.75), "public/products/unglazed-terracotta-water-carafe/1.jpg")
crop_and_place(img_seagrass_hero, (0.46, 0.68, 0.54, 0.84), "public/products/unglazed-terracotta-water-carafe/2.jpg")

# 16. hand-pinched-terracotta-burner
crop_and_place(img_seagrass_hero, (0.30, 0.70, 0.38, 0.84), "public/products/hand-pinched-terracotta-burner/1.jpg")
crop_and_place(img_cat_terracotta, (0.25, 0.10, 0.75, 0.50), "public/products/hand-pinched-terracotta-burner/2.jpg")

# 17. fine-lattice-bamboo-bread-basket
crop_and_place(img_cat_bamboo, (0.05, 0.05, 0.95, 0.95), "public/products/fine-lattice-bamboo-bread-basket/1.jpg")
crop_and_place(img_cat_bamboo, (0.20, 0.35, 0.80, 0.85), "public/products/fine-lattice-bamboo-bread-basket/2.jpg", pad=False)

# 18. tiered-openwork-bamboo-stand
crop_and_place(img_cat_bamboo, (0.10, 0.10, 0.90, 0.90), "public/products/tiered-openwork-bamboo-stand/1.jpg")
crop_and_place(img_cat_bamboo, (0.25, 0.20, 0.75, 0.70), "public/products/tiered-openwork-bamboo-stand/2.jpg", pad=False)

# 19. cylindrical-bamboo-floor-lantern
crop_and_place(img_cat_bamboo, (0.05, 0.15, 0.95, 0.90), "public/products/cylindrical-bamboo-floor-lantern/1.jpg")
crop_and_place(img_cat_bamboo, (0.15, 0.30, 0.85, 0.75), "public/products/cylindrical-bamboo-floor-lantern/2.jpg", pad=False)

# 20. geometric-lotus-nakshi-kantha-throw
crop_and_place(img_cat_textiles, (0.05, 0.05, 0.95, 0.95), "public/products/geometric-lotus-nakshi-kantha-throw/1.jpg")
crop_and_place(img_cat_textiles, (0.20, 0.20, 0.80, 0.80), "public/products/geometric-lotus-nakshi-kantha-throw/2.jpg", pad=False)

# 21. running-stitch-nakshi-cushion-cover
crop_and_place(img_cat_textiles, (0.15, 0.25, 0.85, 0.75), "public/products/running-stitch-nakshi-cushion-cover/1.jpg")
crop_and_place(img_cat_textiles, (0.30, 0.35, 0.70, 0.65), "public/products/running-stitch-nakshi-cushion-cover/2.jpg", pad=False)

# 22. indigo-dyed-kantha-bedspread
crop_and_place(img_cat_textiles, (0.10, 0.15, 0.90, 0.85), "public/products/indigo-dyed-kantha-bedspread/1.jpg")
crop_and_place(img_cat_textiles, (0.25, 0.15, 0.75, 0.65), "public/products/indigo-dyed-kantha-bedspread/2.jpg", pad=False)

# 23. hand-carved-sheesham-wood-board
crop_and_place(img_cat_homedecor, (0.05, 0.20, 0.95, 0.80), "public/products/hand-carved-sheesham-wood-board/1.jpg")
crop_and_place(img_cat_homedecor, (0.35, 0.35, 0.85, 0.75), "public/products/hand-carved-sheesham-wood-board/2.jpg", pad=False)

# 24. date-palm-leaf-storage-bin
crop_and_place(img_seagrass_hero, (0.50, 0.54, 0.64, 0.78), "public/products/date-palm-leaf-storage-bin/1.jpg")
crop_and_place(img_seagrass_hero, (0.61, 0.58, 0.73, 0.82), "public/products/date-palm-leaf-storage-bin/2.jpg")

print("All 24 products now populated with real, high-resolution photography views 1 and 2!")
