# Bangladesh Handicrafts (bangladeshhandicrafts.shop)

A clean, premium, image-led B2B wholesale portfolio and export catalog website for **Bangladesh Handicrafts**, showcasing and exporting authentic handmade Bangladeshi crafts to commercial buyers, department stores, concept shops, and interior brands across Europe (Germany, France, Netherlands, Scandinavia, and more).

Built with **Next.js (App Router)**, **TypeScript**, and **Tailwind CSS**. Fully static and serverless for zero-cost deployment on Vercel.

---

## 🎨 Visual & Design System

- **Monochrome Aesthetic**: Pure white background (`#FFFFFF`), near-black typography (`#111111`), with subtle light neutral grey (`#F2F2F2`) as the only alternate section background. Zero decorative color tints (color arrives purely through product photography).
- **Typography**: Clean geometric sans-serif (**Jost** via `next/font/google`). Uppercase navigation and headings with wide letter-spacing (`tracking-wider`, `tracking-widest`).
- **Two-Tier Header**: Sticky white bar with hairline border. Top tier displays the wordmark logo, primary navigation, search trigger, and live export enquiry badge; bottom tier features horizontal category links.
- **Hero Lifestyle Carousel**: Modeled on high-end editorial catalogs with desktop slide peeking, circular white navigation controls, slow auto-advance (with pause-on-hover and `prefers-reduced-motion` compliance), and centered underlined uppercase slide captions.
- **Category Banner**: Full-width edge-to-edge banner image overlaid with centered, thin white uppercase typography.
- **Export Catalog Layout**: 4 columns on desktop, 3 on tablet, 2 on mobile. Each card features a 1:1 square photo, subtle uppercase grey **MATERIAL** label above the product title, B2B wholesale MOQ specifications, and "Price on request" display.
- **B2B Export Focus**: Replaces retail shopping cart with an **Export Enquiry List Drawer** and **Request a Quote** workflow that aggregates multiple SKUs into a single CIF/FOB wholesale request.

---

## 📁 Project Structure

```
├── public/
│   ├── hero/                          # 21:9 lifestyle slides (slide-1.jpg .. slide-4.jpg)
│   ├── categories/                    # Category banners (1600x500) and tiles (800x800)
│   └── products/                      # 1:1 square product photography
│       └── [product-slug]/
│           ├── 1.jpg                  # Primary square 1:1 product photo
│           └── 2.jpg                  # Secondary detail/angle photo
├── scripts/
│   └── generate_placeholders.py       # Generates neutral grey placeholder images
├── src/
│   ├── app/
│   │   ├── layout.tsx                 # Root layout with Jost font, JSON-LD Schema & Providers
│   │   ├── page.tsx                   # Home: Hero, Category Tiles, Featured Grid, Export Strip, Process
│   │   ├── globals.css                # Monochrome tokens & hairline borders
│   │   ├── sitemap.ts                 # Dynamic sitemap generator
│   │   ├── robots.ts                  # Search engine robot directives
│   │   ├── collections/
│   │   │   ├── page.tsx               # Full wholesale catalog with live filters & pagination
│   │   │   └── [slug]/
│   │   │       └── page.tsx           # Category page with full-width banner
│   │   ├── products/
│   │   │   └── [slug]/
│   │   │       └── page.tsx           # Product detail with gallery, specs & JSON-LD schema
│   │   ├── about/                     # Artisan heritage & fair trade story
│   │   ├── export-europe/             # EU ports, freight times, REX duty-free & phytosanitary specs
│   │   ├── contact/                   # Wholesale enquiry form & Dhaka office info
│   │   └── privacy/                   # GDPR privacy & essential cookies policy
│   ├── components/
│   │   ├── Header.tsx                 # Two-tier sticky header
│   │   ├── Footer.tsx                 # Minimalist B2B footer
│   │   ├── HeroCarousel.tsx           # Editorial lifestyle carousel
│   │   ├── ShopByCategory.tsx         # Centered heading & image tile grid
│   │   ├── ProductCard.tsx            # Banglacraft-style product card
│   │   ├── CatalogView.tsx            # Client-side facet filtering, sort & pagination
│   │   ├── FilterSidebar.tsx          # Facet sidebar with live counts & mobile drawer
│   │   ├── EnquiryDrawer.tsx          # Global quote basket & submission drawer
│   │   ├── ProductGallery.tsx         # Image gallery with thumbnails and full-screen zoom
│   │   ├── ProductActions.tsx         # Volume input & quote buttons
│   │   ├── SearchModal.tsx            # Client-side instant search
│   │   └── CookieConsent.tsx          # EU GDPR essential cookie notice
│   ├── context/
│   │   └── EnquiryContext.tsx         # React Context with localStorage persistence
│   ├── data/
│   │   ├── site.ts                    # Site configuration, strings dictionary & EU destinations
│   │   ├── categories.ts              # 8 craft category definitions
│   │   └── products.ts                # 24 export-grade product database
│   └── lib/
│       └── types.ts                   # TypeScript interfaces
```

---

## 🛠️ How to Add or Edit Products

All product data is centralized in `src/data/products.ts`. You do not need a database.

### 1. Adding a New Product
Open `src/data/products.ts` and append a new object to the `PRODUCTS` array:

```typescript
{
  id: "prod-sg-04",
  slug: "sculptural-seagrass-floor-vase",
  name: "Sculptural Seagrass Floor Vase",
  categorySlug: "sea-grass",
  categoryName: "Sea Grass",
  material: "Sea Grass",
  productType: "Vase",
  shortDescription: "Coiled delta seagrass tall urn for dried botanical arrangements.",
  description: "Detailed description written for European retail buyers...",
  craftDetails: "Hand-braided coastal seagrass over internal cane frame.",
  dimensions: "[REPLACE: Dia 30cm x Height 65cm]",
  moq: "[REPLACE: 80 units]",
  leadTime: "[REPLACE: 30-40 business days]",
  exportPackaging: "[REPLACE: 6 units per master export carton]",
  hsCode: "[REPLACE: 4602.19.10]",
  origin: "Handcrafted in Barishal Delta Cluster, Bangladesh",
  tags: ["New", "Export Favorite"],
  images: [
    "/products/sculptural-seagrass-floor-vase/1.jpg",
    "/products/sculptural-seagrass-floor-vase/2.jpg",
  ],
  isFeatured: true,
}
```

### 2. Modifying Price Visibility
In `src/data/site.ts`, set the `showPrices` configuration flag:
```typescript
export const SITE_CONFIG = {
  // Set to true to display numerical prices; false shows "Price on request"
  showPrices: false,
};
```
When `showPrices: false`, all product cards and detail pages automatically render **"Price on request"**.

---

## 🖼️ How to Replace Images

The codebase follows a clean, documented image convention:

| Asset Type | Directory | Recommended Dimensions | Ratio | Notes |
|------------|-----------|------------------------|-------|-------|
| **Hero Carousel** | `/public/hero/` | 1680 × 720 px or 2100 × 900 px | 21:9 | High-res editorial lifestyle photography |
| **Category Banners** | `/public/categories/{slug}-banner.jpg` | 1600 × 500 px | 32:10 | Wide horizontal banner behind white text |
| **Category Tiles** | `/public/categories/{slug}-tile.jpg` | 800 × 800 px | 1:1 | Square category tile on white or neutral background |
| **Product Photos** | `/public/products/{slug}/1.jpg`, `2.jpg` | 1000 × 1000 px | 1:1 | Clean square photo on pure white/neutral background |

> **To replace an image**: Simply drop your new `.jpg` or `.png` file into the corresponding folder using the exact file path. Next.js will automatically serve the real image in place of the placeholder!

To regenerate neutral placeholder images at any time:
```bash
python scripts/generate_placeholders.py
```

---

## 🔑 Environment Variables

Create a `.env.local` file in the project root:

```env
# Optional: Formspree or custom form backend endpoint URL
NEXT_PUBLIC_FORM_ENDPOINT=https://formspree.io/f/your_form_id

# Optional: Web3Forms access key (if using Web3Forms instead of Formspree)
NEXT_PUBLIC_WEB3FORMS_KEY=your_web3forms_access_key

# Public site domain for SEO schema & sitemap
NEXT_PUBLIC_SITE_URL=https://bangladeshhandicrafts.shop
```

> **Note**: If neither form endpoint is set, the enquiry drawer and contact forms operate in graceful simulation mode, allowing clients to test submissions with realistic feedback and confirmation screens.

---

## 🚀 Deploying to Vercel with Custom Domain

Because this site is 100% statically generated with Next.js App Router, it deploys free on Vercel with zero server overhead.

### Step 1: Push to GitHub / GitLab / Bitbucket
```bash
git add .
git commit -m "feat: complete Bangladesh Handicrafts export catalog"
git branch -M main
git remote add origin https://github.com/your-username/bangladesh-handicrafts.git
git push -u origin main
```

### Step 2: Import into Vercel
1. Log in to [Vercel](https://vercel.com).
2. Click **Add New...** -> **Project**.
3. Select your repository and click **Import**.
4. In **Environment Variables**, add `NEXT_PUBLIC_WEB3FORMS_KEY` (or `NEXT_PUBLIC_FORM_ENDPOINT`).
5. Click **Deploy**. Vercel will build all 43 static pages in ~20 seconds.

### Step 3: Connect Custom Domain (`bangladeshhandicrafts.shop`)
1. In your Vercel Project Dashboard, navigate to **Settings** -> **Domains**.
2. Enter `bangladeshhandicrafts.shop` and click **Add**.
3. Also add `www.bangladeshhandicrafts.shop` (Vercel will recommend redirecting `www` to apex).
4. Update your DNS records at your domain registrar:
   - **Type A**: `@` -> `76.76.21.21`
   - **CNAME**: `www` -> `cname.vercel-dns.com`
5. Vercel will automatically provision a free SSL certificate within a few minutes.

---

## 📋 Content & Compliance Verification

- **Placeholders**: All unverified figures, client names, certifications, and specific weights/dimensions use the `[REPLACE: ...]` pattern so you can replace them with your legal business details.
- **EU Compliance**: Includes dedicated European export documentation guides covering:
  - EU GSP / Registered Exporter (REX) system for duty-free entry.
  - Official Phytosanitary certificates for natural plant fibers.
  - EU Packaging Waste Directive (94/62/EC).
  - Sub-12% moisture control and container desiccant protocols.
- **GDPR**: EU-compliant privacy statement with essential cookies only.

---

## 💻 Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run production build & verify static export
npm run build

# Start production server locally
npm start
```

Visit [http://localhost:3000](http://localhost:3000) to view the site.
