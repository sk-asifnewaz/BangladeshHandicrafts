"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface HeroSlide {
  id: string;
  image: string;
  caption: string;
  subtitle: string;
  href: string;
}

const HERO_SLIDES: HeroSlide[] = [
  {
    id: "slide-1",
    image: "/hero/slide-1.jpg",
    caption: "WOODEN ACCENTS",
    subtitle: "Heritage Hand-Carved Timber & Natural Vessels",
    href: "/collections/home-decor",
  },
  {
    id: "slide-2",
    image: "/hero/slide-2.jpg",
    caption: "WOVEN JUTE LIVING",
    subtitle: "The Golden Fiber of Bengal",
    href: "/collections/jute",
  },
  {
    id: "slide-3",
    image: "/hero/slide-3.jpg",
    caption: "ELEGANCE WRAPPED",
    subtitle: "Dhamrai Lost-Wax Brass & Hammered Metalwork",
    href: "/collections/brass",
  },
  {
    id: "slide-4",
    image: "/hero/slide-4.jpg",
    caption: "COASTAL SEAGRASS",
    subtitle: "Sustainably Harvested River Delta Plant Weaves",
    href: "/collections/sea-grass",
  },
];

export function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const totalSlides = HERO_SLIDES.length;
  const containerRef = useRef<HTMLDivElement>(null);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  // Autoplay with pause on hover & prefers-reduced-motion check
  useEffect(() => {
    // Check prefers-reduced-motion
    if (typeof window !== "undefined") {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      if (mediaQuery.matches) {
        return; // Disable autoplay if reduced motion preferred
      }
    }

    if (isPaused) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 6000);

    return () => clearInterval(interval);
  }, [isPaused, nextSlide]);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      prevSlide();
    } else if (e.key === "ArrowRight") {
      nextSlide();
    }
  };

  const activeSlide = HERO_SLIDES[currentIndex];

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-white pt-3 sm:pt-5 pb-6 overflow-hidden select-none outline-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="region"
      aria-roledescription="carousel"
      aria-label="Bangladesh Handicrafts Featured Collections"
    >
      {/* Slides Container with peeking neighboring slides on desktop */}
      <div className="relative w-full px-2 sm:px-6 md:px-12 lg:px-24 max-w-[1600px] mx-auto">
        <div className="relative aspect-[16/10] sm:aspect-[16/8] md:aspect-[21/9] w-full overflow-hidden bg-[#F2F2F2] border border-[#E5E5E5]">
          {HERO_SLIDES.map((slide, index) => {
            const isActive = index === currentIndex;
            const isPrev = index === (currentIndex - 1 + totalSlides) % totalSlides;
            const isNext = index === (currentIndex + 1) % totalSlides;

            // Position calculation
            let transformClass = "translate-x-full opacity-0 pointer-events-none";
            if (isActive) {
              transformClass = "translate-x-0 opacity-100 z-10 pointer-events-auto";
            } else if (isPrev) {
              transformClass = "-translate-x-full opacity-0 pointer-events-none";
            } else if (isNext) {
              transformClass = "translate-x-full opacity-0 pointer-events-none";
            }

            return (
              <div
                key={slide.id}
                className={`absolute inset-0 transition-all duration-700 ease-in-out ${transformClass}`}
                role="group"
                aria-roledescription="slide"
                aria-label={`${index + 1} of ${totalSlides}: ${slide.caption}`}
                aria-hidden={!isActive}
              >
                <Link href={slide.href} className="block w-full h-full relative group">
                  <Image
                    src={slide.image}
                    alt={slide.caption}
                    fill
                    priority={index === 0}
                    className="object-cover transition-transform duration-1000 ease-out group-hover:scale-102"
                    sizes="(max-width: 768px) 100vw, 1400px"
                  />
                  <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </div>
            );
          })}

          {/* Left Circular White Arrow Button */}
          <button
            type="button"
            onClick={prevSlide}
            className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white text-[#111111] border border-[#E0E0E0] shadow-md flex items-center justify-center hover:bg-black hover:text-white hover:border-black transition-all cursor-pointer"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5 stroke-[1.5]" />
          </button>

          {/* Right Circular White Arrow Button */}
          <button
            type="button"
            onClick={nextSlide}
            className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white text-[#111111] border border-[#E0E0E0] shadow-md flex items-center justify-center hover:bg-black hover:text-white hover:border-black transition-all cursor-pointer"
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5 stroke-[1.5]" />
          </button>
        </div>

        {/* Peeking preview edges on large desktop screens */}
        <div
          className="hidden xl:block absolute left-4 top-1/2 -translate-y-1/2 w-16 h-[70%] opacity-20 hover:opacity-40 transition-opacity cursor-pointer overflow-hidden border border-[#E0E0E0]"
          onClick={prevSlide}
        >
          <Image
            src={HERO_SLIDES[(currentIndex - 1 + totalSlides) % totalSlides].image}
            alt="Previous slide peek"
            fill
            className="object-cover"
          />
        </div>
        <div
          className="hidden xl:block absolute right-4 top-1/2 -translate-y-1/2 w-16 h-[70%] opacity-20 hover:opacity-40 transition-opacity cursor-pointer overflow-hidden border border-[#E0E0E0]"
          onClick={nextSlide}
        >
          <Image
            src={HERO_SLIDES[(currentIndex + 1) % totalSlides].image}
            alt="Next slide peek"
            fill
            className="object-cover"
          />
        </div>
      </div>

      {/* Centred Underlined Uppercase Caption Beneath Active Slide (Matching Reference Exactly) */}
      <div className="text-center pt-5 sm:pt-6 pb-2">
        <Link
          href={activeSlide.href}
          className="inline-block text-xs sm:text-sm font-medium tracking-[0.2em] uppercase text-[#111111] underline underline-offset-8 decoration-1 hover:opacity-75 transition-opacity"
        >
          {activeSlide.caption}
        </Link>
        <p className="text-[11px] text-[#777777] tracking-wider mt-2 max-w-md mx-auto hidden sm:block">
          {activeSlide.subtitle}
        </p>
      </div>

      {/* Subtle indicator dots */}
      <div className="flex justify-center items-center space-x-2 pt-2">
        {HERO_SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`transition-all ${
              i === currentIndex
                ? "w-6 h-1 bg-[#111111]"
                : "w-2 h-1 bg-[#CCCCCC] hover:bg-[#888888]"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
