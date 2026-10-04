import React from "react";
import type { Metadata } from "next";
import { PRODUCTS } from "@/data/products";
import { CatalogView } from "@/components/CatalogView";
import { SITE_CONFIG } from "@/data/site";

export const metadata: Metadata = {
  title: "Export Collections & Wholesale Catalog | Bangladesh Handicrafts",
  description:
    "Explore our full export catalog of handcrafted sea grass, rattan, natural jute, brass, terracotta, bamboo, and Nakshi Kantha textiles for European retailers and importers.",
};

export default function CollectionsPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Page Header */}
      <div className="border-b border-[#E5E5E5] bg-[#F2F2F2] py-12 sm:py-16 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#777777] block mb-2">
            WHOLESALE & RETAIL CATALOG
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-[0.2em] uppercase text-[#111111] mb-3">
            All Collections
          </h1>
          <p className="text-xs sm:text-sm text-[#555555] max-w-xl mx-auto leading-relaxed">
            Direct artisan manufacturing across 8 sustainable craft disciplines. Available for volume
            export orders and individual retail inquiries worldwide.
          </p>
        </div>
      </div>

      {/* Catalog View */}
      <CatalogView initialProducts={PRODUCTS} initialCategory="all" />
    </div>
  );
}
