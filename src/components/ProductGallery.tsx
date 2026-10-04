"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ZoomIn, X } from "lucide-react";

interface ProductGalleryProps {
  images: string[];
  productName: string;
}

export function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isZoomOpen, setIsZoomOpen] = useState(false);

  const activeImage = images[activeIndex] || images[0] || "/products/placeholder.jpg";

  return (
    <div className="space-y-4 select-none">
      {/* Main Large Display Image */}
      <div className="relative aspect-square w-full bg-[#F8F8F8] border border-[#E5E5E5] overflow-hidden group">
        <Image
          src={activeImage}
          alt={`${productName} view ${activeIndex + 1}`}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-contain p-6 transition-transform duration-500 ease-out group-hover:scale-103"
        />

        {/* Zoom Button Trigger */}
        <button
          type="button"
          onClick={() => setIsZoomOpen(true)}
          className="absolute top-3 right-3 p-2 bg-white/95 text-[#111111] hover:bg-black hover:text-white transition-colors border border-[#E0E0E0] shadow-xs cursor-pointer z-10"
          aria-label="Zoom product image"
        >
          <ZoomIn className="w-4 h-4 stroke-[1.5]" />
        </button>

        <div className="absolute bottom-3 left-3 bg-white/95 px-2.5 py-1 border border-[#E0E0E0] text-[10px] font-mono uppercase tracking-widest text-[#555555] z-10">
          VIEW {activeIndex + 1} OF {images.length}
        </div>
      </div>

      {/* Row of Thumbnail Previews */}
      {images.length > 1 && (
        <div className="flex items-center space-x-3">
          {images.map((img, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setActiveIndex(idx)}
              className={`relative w-20 h-20 bg-[#F8F8F8] border transition-all overflow-hidden cursor-pointer ${
                activeIndex === idx
                  ? "border-[#111111] ring-1 ring-[#111111]"
                  : "border-[#E5E5E5] hover:border-[#888888] opacity-75 hover:opacity-100"
              }`}
              aria-label={`Select product image view ${idx + 1}`}
            >
              <Image
                src={img}
                alt={`${productName} thumbnail ${idx + 1}`}
                fill
                className="object-contain p-1.5"
              />
            </button>
          ))}
        </div>
      )}

      {/* Full-Screen Zoom Modal */}
      {isZoomOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
          <button
            onClick={() => setIsZoomOpen(false)}
            className="absolute top-6 right-6 p-2 text-white/80 hover:text-white transition-colors"
            aria-label="Close zoom preview"
          >
            <X className="w-7 h-7 stroke-[1.5]" />
          </button>
          <div className="relative max-w-4xl max-h-[85vh] w-full h-[80vh] bg-white/5 p-4 flex items-center justify-center">
            <Image
              src={activeImage}
              alt={`${productName} high resolution zoom`}
              fill
              className="object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
}
