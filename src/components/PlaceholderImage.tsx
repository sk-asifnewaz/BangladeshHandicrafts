"use client";

import React, { useState } from "react";
import Image from "next/image";

interface PlaceholderImageProps {
  src?: string;
  alt: string;
  aspectRatio?: "square" | "hero" | "banner" | "tile" | "portrait";
  className?: string;
  label?: string;
  subtitle?: string;
  priority?: boolean;
  fill?: boolean;
  sizes?: string;
}

export function PlaceholderImage({
  src,
  alt,
  aspectRatio = "square",
  className = "",
  label,
  subtitle,
  priority = false,
  fill = false,
  sizes,
}: PlaceholderImageProps) {
  const [hasError, setHasError] = useState(false);

  // Aspect ratio classes when not using fill
  const ratioClasses = {
    square: "aspect-square",
    hero: "aspect-[21/9]",
    banner: "aspect-[21/7] md:aspect-[24/8]",
    tile: "aspect-[4/5] sm:aspect-square",
    portrait: "aspect-[3/4]",
  }[aspectRatio];

  const displayLabel = label || alt || "BANGLADESH HANDICRAFTS";
  const displaySubtitle = subtitle || (src ? src.replace(/^\//, "") : "Handmade Craft");

  // If real image source is provided and hasn't errored
  if (src && !hasError) {
    return (
      <div
        className={`relative overflow-hidden bg-[#F2F2F2] ${fill ? "w-full h-full" : ratioClasses} ${className}`}
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes || "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"}
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          onError={() => setHasError(true)}
        />
      </div>
    );
  }

  // Elegant neutral placeholder block matching strict monochrome aesthetic
  return (
    <div
      className={`relative overflow-hidden bg-[#F2F2F2] flex flex-col items-center justify-center p-6 text-center select-none border border-[#EAEAEA] ${
        fill ? "w-full h-full" : ratioClasses
      } ${className}`}
      role="img"
      aria-label={alt}
    >
      {/* Subtle minimalist grid/crosshair background */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="relative z-10 max-w-[85%] flex flex-col items-center space-y-2">
        {/* Minimal geometric craft silhouette */}
        <div className="w-10 h-10 border border-[#CCCCCC] flex items-center justify-center text-[#777777] mb-1">
          <svg
            className="w-5 h-5 text-[#888888]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="1.2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>

        <p className="text-[12px] font-medium tracking-[0.15em] uppercase text-[#222222] line-clamp-1">
          {displayLabel}
        </p>
        <p className="text-[10px] tracking-wider font-mono text-[#888888] line-clamp-1">
          {displaySubtitle}
        </p>
      </div>

      {/* Tiny subtle corner indicator */}
      <div className="absolute bottom-2 right-2 text-[9px] uppercase tracking-widest text-[#AAAAAA] font-mono">
        1:1 EXPORT
      </div>
    </div>
  );
}
