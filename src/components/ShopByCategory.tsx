import React from "react";
import Link from "next/link";
import Image from "next/image";
import { CATEGORIES } from "@/data/categories";
import { SITE_CONFIG } from "@/data/site";

export function ShopByCategory() {
  return (
    <section className="py-14 sm:py-20 bg-white border-t border-[#EAEAEA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Bold Uppercase Centered Heading (Aarong Reference Match) */}
        <div className="text-center mb-10 sm:mb-14">
          <h2 className="text-xl sm:text-2xl font-bold tracking-[0.2em] uppercase text-[#111111]">
            {SITE_CONFIG.i18n.en.catalog.shopByCategory}
          </h2>
          <div className="w-12 h-px bg-[#111111] mx-auto mt-3" />
        </div>

        {/* Grid of Large Image Tiles with Category Name Underneath */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              href={`/collections/${cat.slug}`}
              className="group block text-center"
            >
              {/* Tile Image with hover zoom */}
              <div className="relative aspect-square w-full overflow-hidden bg-[#F2F2F2] border border-[#E5E5E5] mb-3 sm:mb-4">
                <Image
                  src={cat.tileImage}
                  alt={cat.name}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
              </div>

              {/* Category Name Underneath */}
              <h3 className="text-xs sm:text-sm font-semibold tracking-[0.15em] uppercase text-[#111111] group-hover:underline underline-offset-4 decoration-1">
                {cat.name}
              </h3>
              <p className="text-[11px] text-[#777777] tracking-wider mt-1 line-clamp-1 hidden sm:block">
                {cat.shortDescription}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
