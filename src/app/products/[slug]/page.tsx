import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PRODUCTS } from "@/data/products";
import { SITE_CONFIG } from "@/data/site";
import { ProductGallery } from "@/components/ProductGallery";
import { ProductActions } from "@/components/ProductActions";
import { ProductCard } from "@/components/ProductCard";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return PRODUCTS.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = PRODUCTS.find((p) => p.slug === slug);

  if (!product) {
    return {
      title: "Product Not Found | Bangladesh Handicrafts",
    };
  }

  return {
    title: `${product.name} | ${product.material} Export Catalog | Bangladesh Handicrafts`,
    description: product.shortDescription,
    openGraph: {
      title: `${product.name} | Bangladesh Handicrafts Export`,
      description: product.shortDescription,
      images: [
        {
          url: product.images[0] || "/hero/slide-1.jpg",
          width: 1000,
          height: 1000,
          alt: product.name,
        },
      ],
    },
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = PRODUCTS.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  // Related products from same category or complementary
  const relatedProducts = PRODUCTS.filter(
    (p) => p.id !== product.id && (p.categorySlug === product.categorySlug || p.material === product.material)
  ).slice(0, 4);

  // If not enough related from same category, pick any others to fill 4
  const finalRelated =
    relatedProducts.length === 4
      ? relatedProducts
      : [
          ...relatedProducts,
          ...PRODUCTS.filter((p) => p.id !== product.id && !relatedProducts.some((r) => r.id === p.id)).slice(
            0,
            4 - relatedProducts.length
          ),
        ];

  // JSON-LD Product Schema
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: product.images.map((img) => `${SITE_CONFIG.baseUrl}${img}`),
    description: product.description,
    category: product.categoryName,
    material: product.material,
    countryOfOrigin: "Bangladesh",
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "EUR",
      availability: "https://schema.org/InStock",
      priceValidUntil: "2027-12-31",
      itemCondition: "https://schema.org/NewCondition",
    },
  };

  return (
    <div className="bg-white min-h-screen">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumb Bar */}
      <div className="border-b border-[#E5E5E5] bg-white py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-xs text-[#777777]">
          <Link href="/" className="hover:text-black">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link href="/collections" className="hover:text-black">
            Collections
          </Link>
          <span className="mx-2">/</span>
          <Link href={`/collections/${product.categorySlug}`} className="hover:text-black uppercase">
            {product.categoryName}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-[#111111] font-medium">{product.name}</span>
        </div>
      </div>

      {/* Main Product Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          {/* Left Column: Image Gallery with thumbnails & zoom */}
          <div className="lg:col-span-7">
            <ProductGallery images={product.images} productName={product.name} />
          </div>

          {/* Right Column: Specifications & Enquiry Actions */}
          <div className="lg:col-span-5 space-y-6">
            {/* Material & Classification Tags */}
            <div className="flex items-center space-x-3">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#777777]">
                {product.material}
              </span>
              <span className="text-[#CCCCCC]">·</span>
              <span className="text-xs uppercase tracking-[0.15em] text-[#777777]">
                {product.productType}
              </span>
              {product.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-[#111111] text-white text-[9px] uppercase tracking-wider px-2 py-0.5 font-mono"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Product Title */}
            <h1 className="text-2xl sm:text-3xl font-semibold tracking-wide uppercase text-[#111111] leading-tight">
              {product.name}
            </h1>

            {/* Pricing Section (SHOW_PRICES flag adherence) */}
            <div className="py-2 border-b border-[#E5E5E5]">
              <span className="text-sm uppercase tracking-wider font-semibold text-[#111111]">
                {SITE_CONFIG.showPrices && product.price
                  ? `€${product.price.toFixed(2)} per unit`
                  : SITE_CONFIG.i18n.en.catalog.priceOnRequest}
              </span>
              <p className="text-[11px] text-[#777777] mt-1">
                FOB / CIF volume quotes & individual retail inquiries welcome upon request.
              </p>
            </div>

            {/* Short Narrative & Craft Details */}
            <div className="space-y-3 text-xs leading-relaxed text-[#444444]">
              <p>{product.description}</p>
              <p className="text-[#666666] italic bg-[#F9F9F9] p-3 border-l border-[#111111]">
                Craftsmanship: {product.craftDetails}
              </p>
            </div>

            {/* Export Specifications Matrix */}
            <div className="space-y-2.5 pt-2">
              <h3 className="text-xs font-semibold tracking-[0.15em] uppercase text-[#111111]">
                {SITE_CONFIG.i18n.en.catalog.specsTitle}
              </h3>
              <div className="border border-[#E5E5E5] divide-y divide-[#EFEFEF] text-xs">
                <div className="grid grid-cols-2 p-2.5">
                  <span className="text-[#777777] uppercase tracking-wider text-[11px]">Dimensions</span>
                  <span className="text-[#111111] font-mono text-[11px]">{product.dimensions}</span>
                </div>
                <div className="grid grid-cols-2 p-2.5">
                  <span className="text-[#777777] uppercase tracking-wider text-[11px]">Minimum Order (MOQ)</span>
                  <span className="text-[#111111] font-mono text-[11px]">{product.moq}</span>
                </div>
                <div className="grid grid-cols-2 p-2.5">
                  <span className="text-[#777777] uppercase tracking-wider text-[11px]">Production Lead Time</span>
                  <span className="text-[#111111] font-mono text-[11px]">{product.leadTime}</span>
                </div>
                <div className="grid grid-cols-2 p-2.5">
                  <span className="text-[#777777] uppercase tracking-wider text-[11px]">Export Packaging</span>
                  <span className="text-[#111111] text-[11px]">{product.exportPackaging}</span>
                </div>
                <div className="grid grid-cols-2 p-2.5">
                  <span className="text-[#777777] uppercase tracking-wider text-[11px]">Harmonized HS Code</span>
                  <span className="text-[#111111] font-mono text-[11px]">{product.hsCode}</span>
                </div>
                <div className="grid grid-cols-2 p-2.5">
                  <span className="text-[#777777] uppercase tracking-wider text-[11px]">Artisan Origin</span>
                  <span className="text-[#111111] text-[11px]">{product.origin}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons & Volume Input */}
            <ProductActions product={product} />
          </div>
        </div>

        {/* "You may also like" Curated Grid */}
        <section className="mt-20 pt-16 border-t border-[#E5E5E5]">
          <div className="text-center mb-10">
            <h2 className="text-xl font-bold tracking-[0.2em] uppercase text-[#111111]">
              {SITE_CONFIG.i18n.en.catalog.youMayAlsoLike}
            </h2>
            <div className="w-12 h-px bg-[#111111] mx-auto mt-3" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {finalRelated.map((relProduct) => (
              <ProductCard key={relProduct.id} product={relProduct} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
