import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { CATEGORIES } from "@/data/categories";
import { PRODUCTS } from "@/data/products";
import { CatalogView } from "@/components/CatalogView";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return CATEGORIES.map((category) => ({
    slug: category.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = CATEGORIES.find((c) => c.slug === slug);

  if (!category) {
    return {
      title: "Category Not Found | Bangladesh Handicrafts",
    };
  }

  return {
    title: `${category.name} Export Collection | Bangladesh Handicrafts`,
    description: category.description,
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const category = CATEGORIES.find((c) => c.slug === slug);

  if (!category) {
    notFound();
  }

  return (
    <div className="bg-white min-h-screen">
      {/* Full-width banner image with category title centred over it in thin white uppercase type (Aarong Reference Match) */}
      <div className="relative w-full aspect-[21/9] sm:aspect-[24/8] md:aspect-[32/9] max-h-[460px] overflow-hidden bg-[#111111]">
        <Image
          src={category.bannerImage}
          alt={category.name}
          fill
          priority
          className="object-cover opacity-85"
          sizes="100vw"
        />
        {/* Subtle Dark Overlay for WCAG AA Contrast */}
        <div className="absolute inset-0 bg-black/35" />

        {/* Centered Thin White Uppercase Type */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <span className="text-[10px] sm:text-xs font-mono tracking-[0.3em] uppercase text-white/80 mb-2 sm:mb-3">
            CRAFT DISCIPLINE
          </span>
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-light tracking-[0.25em] uppercase text-white drop-shadow-xs">
            {category.name}
          </h1>
          <p className="text-xs sm:text-sm text-white/90 max-w-xl mx-auto mt-3 font-normal tracking-wider hidden sm:block">
            {category.shortDescription}
          </p>
        </div>
      </div>

      {/* Breadcrumb strip */}
      <div className="border-b border-[#E5E5E5] bg-white py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-xs text-[#777777]">
          <span>Home</span>
          <span className="mx-2">/</span>
          <span>Collections</span>
          <span className="mx-2">/</span>
          <span className="text-[#111111] font-medium uppercase">{category.name}</span>
        </div>
      </div>

      {/* Catalog View pre-filtered to this category */}
      <CatalogView
        initialProducts={PRODUCTS}
        initialCategory={category.slug}
        categoryTitle={category.name}
      />
    </div>
  );
}
