import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ShieldCheck, Anchor, CheckCircle, Package, Sparkles } from "lucide-react";
import { HeroCarousel } from "@/components/HeroCarousel";
import { ShopByCategory } from "@/components/ShopByCategory";
import { ProductCard } from "@/components/ProductCard";
import { PRODUCTS } from "@/data/products";
import { SITE_CONFIG } from "@/data/site";

export default function HomePage() {
  const featuredProducts = PRODUCTS.filter((p) => p.isFeatured).slice(0, 8);

  return (
    <div>
      {/* 1. Home Hero Carousel (Aarong Reference Style) */}
      <HeroCarousel />

      {/* 2. Shop By Category Tiles (Aarong Reference Style) */}
      <ShopByCategory />

      {/* 3. Featured Export Collections Grid */}
      <section className="py-16 sm:py-20 bg-white border-t border-[#EAEAEA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 sm:mb-12 pb-4 border-b border-[#E5E5E5] gap-4">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#777777] block mb-1">
                WHOLESALE & RETAIL SELECTIONS
              </span>
              <h2 className="text-xl sm:text-2xl font-bold tracking-[0.18em] uppercase text-[#111111]">
                {SITE_CONFIG.i18n.en.catalog.featuredCollection}
              </h2>
            </div>
            <Link
              href="/collections"
              className="inline-flex items-center space-x-2 text-xs uppercase tracking-[0.15em] font-semibold text-[#111111] hover:underline"
            >
              <span>View Full Catalog</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center mt-12 sm:mt-16">
            <Link
              href="/collections"
              className="inline-block px-8 py-3.5 border border-[#111111] text-xs uppercase tracking-[0.18em] font-medium text-[#111111] hover:bg-[#111111] hover:text-white transition-colors"
            >
              Explore All Handcrafted Collections
            </Link>
          </div>
        </div>
      </section>

      {/* 4. Brand Statement with Editorial Large Image */}
      <section className="py-16 sm:py-24 bg-white border-t border-[#EAEAEA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* One Large Editorial Image */}
            <div className="lg:col-span-7">
              <div className="relative aspect-[16/10] sm:aspect-[4/3] w-full bg-[#F2F2F2] border border-[#E5E5E5] overflow-hidden group">
                <Image
                  src="/hero/slide-1.jpg"
                  alt="Bangladeshi master artisans handcrafting sustainable fibers"
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-102"
                />
                <div className="absolute bottom-4 left-4 bg-white/95 px-3 py-1.5 border border-[#E0E0E0] text-[10px] uppercase font-mono tracking-widest text-[#333333]">
                  RURAL ARTISAN COOPERATIVE · BANGLADESH
                </div>
              </div>
            </div>

            {/* Brand Statement Copy */}
            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-2">
                <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#777777] block">
                  ETHICAL PROVENANCE
                </span>
                <h2 className="text-xl sm:text-2xl font-bold tracking-[0.16em] uppercase text-[#111111] leading-snug">
                  {SITE_CONFIG.i18n.en.brandStatement.heading}
                </h2>
              </div>

              <div className="w-12 h-px bg-[#111111]" />

              <p className="text-xs sm:text-sm leading-relaxed text-[#555555]">
                {SITE_CONFIG.i18n.en.brandStatement.body}
              </p>

              <div className="pt-2">
                <Link
                  href="/about"
                  className="inline-flex items-center space-x-2 text-xs uppercase tracking-[0.15em] font-semibold text-[#111111] underline underline-offset-6 decoration-1 hover:no-underline"
                >
                  <span>Learn About Our Artisan Network</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. "Exporting to Europe" Strip Listing Countries Served */}
      <section className="py-16 sm:py-20 bg-white border-t border-[#EAEAEA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#777777] block mb-2">
              B2B FREIGHT & LOGISTICS
            </span>
            <h2 className="text-xl sm:text-2xl font-bold tracking-[0.18em] uppercase text-[#111111] mb-3">
              {SITE_CONFIG.i18n.en.exportSection.title}
            </h2>
            <p className="text-xs text-[#555555] tracking-wider uppercase">
              {SITE_CONFIG.i18n.en.exportSection.subtitle}
            </p>
          </div>

          {/* European Countries Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-12">
            {SITE_CONFIG.europeanDestinations.map((country) => (
              <div
                key={country.code}
                className="p-3.5 border border-[#E5E5E5] bg-white text-center hover:border-black transition-colors"
              >
                <span className="text-xs font-semibold tracking-wider uppercase text-[#111111] block">
                  {country.name}
                </span>
                <span className="text-[10px] text-[#777777] mt-1 block font-mono">
                  {country.mainPorts.split(",")[0]}
                </span>
              </div>
            ))}
          </div>

          {/* Export Specifications Strip */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-[#E5E5E5]">
            <div className="flex items-start space-x-3.5 p-4 bg-[#F2F2F2]">
              <ShieldCheck className="w-5 h-5 text-[#111111] flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#111111]">
                  Duty-Free GSP & REX
                </h4>
                <p className="text-[11px] text-[#555555] mt-1 leading-relaxed">
                  Shipments include EU Registered Exporter (REX) documentation for zero or preferential
                  import customs tariffs.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3.5 p-4 bg-[#F2F2F2]">
              <Anchor className="w-5 h-5 text-[#111111] flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#111111]">
                  Direct Port Dispatches
                </h4>
                <p className="text-[11px] text-[#555555] mt-1 leading-relaxed">
                  Direct sea container freight from Chittagong Port to Hamburg, Rotterdam, Antwerp, and
                  Le Havre (28–35 days ocean transit).
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3.5 p-4 bg-[#F2F2F2]">
              <Package className="w-5 h-5 text-[#111111] flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#111111]">
                  Export-Grade Packaging
                </h4>
                <p className="text-[11px] text-[#555555] mt-1 leading-relaxed">
                  5-ply & 7-ply heavy-duty master cartons, silica gel moisture defense, conforming to EU
                  Packaging Directive 94/62/EC.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Four-Stage Process Steps (Designated #F2F2F2 Background) */}
      <section className="py-16 sm:py-24 bg-[#F2F2F2] border-t border-[#E5E5E5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#777777] block mb-2">
              OUR RIGOROUS STANDARDS
            </span>
            <h2 className="text-xl sm:text-2xl font-bold tracking-[0.18em] uppercase text-[#111111]">
              {SITE_CONFIG.i18n.en.exportSection.stepsTitle}
            </h2>
            <div className="w-12 h-px bg-[#111111] mx-auto mt-3" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {SITE_CONFIG.processSteps.map((step) => (
              <div
                key={step.step}
                className="bg-white p-6 sm:p-7 border border-[#E0E0E0] flex flex-col justify-between"
              >
                <div>
                  <div className="text-2xl font-mono font-bold text-[#111111] mb-3">
                    {step.step}
                  </div>
                  <h3 className="text-xs font-bold tracking-[0.15em] uppercase text-[#111111] mb-2.5">
                    {step.title}
                  </h3>
                  <p className="text-xs text-[#555555] leading-relaxed">
                    {step.description}
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-[#F2F2F2] flex items-center text-[10px] font-mono uppercase tracking-wider text-[#888888]">
                  <span>VERIFIED STAGE</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Final Wholesale Inquiry Banner */}
      <section className="py-20 sm:py-24 bg-white border-t border-[#EAEAEA]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#777777] block">
            EXPORT & RETAIL ORDERS WELCOME
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-[0.15em] uppercase text-[#111111] leading-tight">
            Ready to Curate Your Next Sustainable Collection?
          </h2>
          <p className="text-xs sm:text-sm text-[#555555] max-w-2xl mx-auto leading-relaxed">
            Connect directly with our Dhaka export desk to receive volume FOB/CIF price sheets, material
            swatch samples, and custom OEM development timelines.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/collections"
              className="w-full sm:w-auto px-8 py-3.5 bg-[#111111] text-white text-xs uppercase tracking-[0.18em] font-medium hover:bg-black transition-colors"
            >
              Browse Export Catalog
            </Link>
            <Link
              href="/contact"
              className="w-full sm:w-auto px-8 py-3.5 border border-[#111111] text-[#111111] text-xs uppercase tracking-[0.18em] font-medium hover:bg-[#111111] hover:text-white transition-colors"
            >
              Request Direct Quotation
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
