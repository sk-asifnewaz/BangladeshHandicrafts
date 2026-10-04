"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Plus, Check, ArrowUpRight } from "lucide-react";
import { Product } from "@/lib/types";
import { SITE_CONFIG } from "@/data/site";
import { useEnquiry } from "@/context/EnquiryContext";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToEnquiry, isInEnquiry, openDrawer } = useEnquiry();
  const added = isInEnquiry(product.id);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToEnquiry(product, 1);
  };

  const handleRequestQuote = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!added) {
      addToEnquiry(product, 1);
    } else {
      openDrawer();
    }
  };

  return (
    <div className="group flex flex-col h-full bg-white text-left select-none">
      {/* 1:1 Square Image Container with object-contain */}
      <div className="relative aspect-square w-full overflow-hidden bg-[#F8F8F8] border border-[#E5E5E5]">
        <Link href={`/products/${product.slug}`} className="block w-full h-full relative">
          <Image
            src={product.images[0] || "/products/placeholder.jpg"}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-contain p-3.5 transition-transform duration-500 ease-out group-hover:scale-104"
          />
        </Link>

        {/* Small Monochrome Tag Labels (New, Best seller) */}
        {product.tags && product.tags.length > 0 && (
          <div className="absolute top-2 left-2 flex flex-col space-y-1 z-10">
            {product.tags.slice(0, 1).map((tag) => (
              <span
                key={tag}
                className="bg-[#111111] text-white text-[9px] uppercase tracking-[0.15em] px-2 py-0.5 font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Hover Action Bar on Desktop */}
        <div className="absolute inset-x-0 bottom-0 p-2 bg-gradient-to-t from-white/95 via-white/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex gap-1.5 z-10">
          <button
            type="button"
            onClick={handleQuickAdd}
            className={`flex-1 py-2 text-[10px] uppercase tracking-[0.12em] font-medium flex items-center justify-center space-x-1 transition-colors ${
              added
                ? "bg-[#111111] text-white"
                : "bg-white text-[#111111] border border-[#111111] hover:bg-[#111111] hover:text-white"
            }`}
            aria-label={`Add ${product.name} to export enquiry`}
          >
            {added ? (
              <>
                <Check className="w-3 h-3" />
                <span>In Enquiry</span>
              </>
            ) : (
              <>
                <Plus className="w-3 h-3" />
                <span>Add to List</span>
              </>
            )}
          </button>
          <button
            type="button"
            onClick={handleRequestQuote}
            className="px-2.5 py-2 bg-[#111111] text-white text-[10px] uppercase tracking-[0.12em] hover:bg-black transition-colors"
            title="Request a Quote"
            aria-label={`Request quote for ${product.name}`}
          >
            <ArrowUpRight className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Product Information (Banglacraft Style) */}
      <div className="pt-3 pb-1 flex flex-col flex-1">
        {/* Small grey MATERIAL label above product name */}
        <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.18em] font-medium text-[#777777] block">
          {product.material}
        </span>

        {/* Product Name */}
        <Link
          href={`/products/${product.slug}`}
          className="text-xs sm:text-sm font-medium text-[#111111] group-hover:underline line-clamp-1 mt-0.5"
        >
          {product.name}
        </Link>

        {/* Price / Price on request flag */}
        <div className="mt-1 flex items-center justify-between text-[11px]">
          <span className="text-[#666666] tracking-wider uppercase font-medium">
            {SITE_CONFIG.showPrices && product.price
              ? `€${product.price.toFixed(2)} / pc`
              : SITE_CONFIG.i18n.en.catalog.priceOnRequest}
          </span>
          <span className="text-[10px] text-[#999999] tracking-wider font-mono">
            MOQ {product.moq.replace("[REPLACE: ", "").replace("]", "").replace(" units", "").replace(" pcs", "").replace(" sets", "")}
          </span>
        </div>
      </div>
    </div>
  );
}
