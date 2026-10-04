"use client";

import React, { useState, useMemo } from "react";
import { Filter, ChevronDown, RefreshCw } from "lucide-react";
import { Product } from "@/lib/types";
import { ProductCard } from "@/components/ProductCard";
import { FilterSidebar } from "@/components/FilterSidebar";

interface CatalogViewProps {
  initialProducts: Product[];
  initialCategory?: string;
  categoryTitle?: string;
}

const ITEMS_PER_PAGE = 12;

export function CatalogView({
  initialProducts,
  initialCategory = "all",
  categoryTitle,
}: CatalogViewProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [selectedProductTypes, setSelectedProductTypes] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>("default");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Toggle handlers
  const handleToggleMaterial = (mat: string) => {
    setSelectedMaterials((prev) =>
      prev.includes(mat) ? prev.filter((m) => m !== mat) : [...prev, mat]
    );
    setCurrentPage(1);
  };

  const handleToggleProductType = (type: string) => {
    setSelectedProductTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
    setCurrentPage(1);
  };

  const handleSelectCategory = (cat: string) => {
    setSelectedCategory(cat);
    setCurrentPage(1);
  };

  const handleClearAll = () => {
    setSelectedCategory("all");
    setSelectedMaterials([]);
    setSelectedProductTypes([]);
    setSortBy("default");
    setCurrentPage(1);
  };

  // Filter products
  const filteredProducts = useMemo(() => {
    return initialProducts.filter((product) => {
      // Category filter
      if (selectedCategory !== "all" && product.categorySlug !== selectedCategory) {
        return false;
      }
      // Material filter
      if (selectedMaterials.length > 0 && !selectedMaterials.includes(product.material)) {
        return false;
      }
      // Product type filter
      if (
        selectedProductTypes.length > 0 &&
        !selectedProductTypes.includes(product.productType)
      ) {
        return false;
      }
      return true;
    });
  }, [initialProducts, selectedCategory, selectedMaterials, selectedProductTypes]);

  // Sort products
  const sortedProducts = useMemo(() => {
    const list = [...filteredProducts];
    if (sortBy === "name-asc") {
      list.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "name-desc") {
      list.sort((a, b) => b.name.localeCompare(a.name));
    } else if (sortBy === "material") {
      list.sort((a, b) => a.material.localeCompare(b.material));
    } else if (sortBy === "latest") {
      // Prioritize tags with "New"
      list.sort((a, b) => (b.tags.includes("New") ? 1 : 0) - (a.tags.includes("New") ? 1 : 0));
    }
    return list;
  }, [filteredProducts, sortBy]);

  // Pagination
  const totalItems = sortedProducts.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE) || 1;
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, totalItems);
  const currentProducts = sortedProducts.slice(startIndex, endIndex);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="flex flex-col lg:flex-row items-start">
        {/* Left Filter Sidebar */}
        <FilterSidebar
          products={initialProducts}
          selectedCategory={selectedCategory}
          selectedMaterials={selectedMaterials}
          selectedProductTypes={selectedProductTypes}
          onSelectCategory={handleSelectCategory}
          onToggleMaterial={handleToggleMaterial}
          onToggleProductType={handleToggleProductType}
          onClearAll={handleClearAll}
          isMobileOpen={isMobileFilterOpen}
          onCloseMobile={() => setIsMobileFilterOpen(false)}
        />

        {/* Right Main Catalog Content */}
        <main className="flex-1 w-full min-w-0">
          {/* Top Control Bar: Results count, Mobile Filter toggle, Sort Dropdown */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-[#E5E5E5] gap-4">
            {/* Showing results count */}
            <div className="flex items-center justify-between sm:justify-start space-x-4">
              <button
                type="button"
                onClick={() => setIsMobileFilterOpen(true)}
                className="lg:hidden flex items-center space-x-2 px-3 py-2 border border-[#CCCCCC] text-xs uppercase tracking-wider text-[#111111]"
              >
                <Filter className="w-3.5 h-3.5" />
                <span>Filters</span>
              </button>

              <p className="text-xs text-[#666666] tracking-wide">
                {totalItems === 0
                  ? "Showing 0 results"
                  : `Showing ${startIndex + 1} to ${endIndex} of ${totalItems} results`}
              </p>
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center space-x-2 self-end sm:self-auto">
              <label htmlFor="sort-select" className="text-xs uppercase tracking-wider text-[#777777]">
                Sort:
              </label>
              <div className="relative inline-block">
                <select
                  id="sort-select"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-white text-xs border border-[#CCCCCC] pl-3 pr-8 py-2 text-[#111111] focus:border-black focus:outline-hidden uppercase tracking-wider cursor-pointer"
                >
                  <option value="default">Default / Featured</option>
                  <option value="latest">Latest Additions</option>
                  <option value="name-asc">Name (A to Z)</option>
                  <option value="name-desc">Name (Z to A)</option>
                  <option value="material">By Material</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-[#666666] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Active filter chips (if any) */}
          {(selectedMaterials.length > 0 ||
            selectedProductTypes.length > 0 ||
            selectedCategory !== "all") && (
            <div className="flex flex-wrap items-center gap-2 mb-6">
              <span className="text-[11px] uppercase tracking-wider text-[#888888]">
                Applied Filters:
              </span>
              {selectedCategory !== "all" && (
                <span className="inline-flex items-center px-2.5 py-1 text-[11px] uppercase tracking-wider bg-[#F2F2F2] border border-[#E0E0E0] text-[#111111]">
                  Category: {selectedCategory}
                  <button
                    onClick={() => setSelectedCategory("all")}
                    className="ml-1.5 text-[#777777] hover:text-black"
                  >
                    ×
                  </button>
                </span>
              )}
              {selectedMaterials.map((m) => (
                <span
                  key={m}
                  className="inline-flex items-center px-2.5 py-1 text-[11px] uppercase tracking-wider bg-[#F2F2F2] border border-[#E0E0E0] text-[#111111]"
                >
                  {m}
                  <button
                    onClick={() => handleToggleMaterial(m)}
                    className="ml-1.5 text-[#777777] hover:text-black"
                  >
                    ×
                  </button>
                </span>
              ))}
              {selectedProductTypes.map((t) => (
                <span
                  key={t}
                  className="inline-flex items-center px-2.5 py-1 text-[11px] uppercase tracking-wider bg-[#F2F2F2] border border-[#E0E0E0] text-[#111111]"
                >
                  {t}
                  <button
                    onClick={() => handleToggleProductType(t)}
                    className="ml-1.5 text-[#777777] hover:text-black"
                  >
                    ×
                  </button>
                </span>
              ))}
              <button
                onClick={handleClearAll}
                className="text-[11px] text-[#555555] hover:text-black underline ml-2 uppercase tracking-wider"
              >
                Reset All
              </button>
            </div>
          )}

          {/* Product Grid: 4 columns desktop, 3 tablet, 2 mobile */}
          {currentProducts.length === 0 ? (
            <div className="py-20 text-center border border-dashed border-[#DDDDDD] bg-[#FAFAFA]">
              <p className="text-xs uppercase tracking-widest text-[#777777] mb-2">
                No matching export products
              </p>
              <p className="text-xs text-[#555555] max-w-sm mx-auto mb-4">
                Try removing some filters or clearing all selections to view available handcrafted
                collections.
              </p>
              <button
                type="button"
                onClick={handleClearAll}
                className="inline-flex items-center space-x-2 px-5 py-2.5 border border-[#111111] text-xs uppercase tracking-wider text-[#111111] hover:bg-[#111111] hover:text-white transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reset All Filters</span>
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
              {currentProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          {/* Numbered Pagination (Modeled on Banglacraft Shop Reference) */}
          {totalPages > 1 && (
            <div className="mt-14 pt-6 border-t border-[#E5E5E5] flex items-center justify-center space-x-2 select-none">
              <button
                type="button"
                disabled={currentPage === 1}
                onClick={() => {
                  setCurrentPage((p) => Math.max(1, p - 1));
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="px-3.5 py-2 text-xs uppercase tracking-wider border border-[#CCCCCC] text-[#111111] hover:border-black disabled:opacity-30 disabled:pointer-events-none"
              >
                Prev
              </button>

              {Array.from({ length: totalPages }).map((_, idx) => {
                const pageNumber = idx + 1;
                const isActive = pageNumber === currentPage;
                return (
                  <button
                    key={pageNumber}
                    type="button"
                    onClick={() => {
                      setCurrentPage(pageNumber);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className={`w-9 h-9 text-xs font-mono flex items-center justify-center border transition-colors ${
                      isActive
                        ? "bg-[#111111] text-white border-[#111111] font-semibold"
                        : "border-[#CCCCCC] text-[#111111] hover:border-black hover:bg-[#F2F2F2]"
                    }`}
                  >
                    {pageNumber}
                  </button>
                );
              })}

              <button
                type="button"
                disabled={currentPage === totalPages}
                onClick={() => {
                  setCurrentPage((p) => Math.min(totalPages, p + 1));
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="px-3.5 py-2 text-xs uppercase tracking-wider border border-[#CCCCCC] text-[#111111] hover:border-black disabled:opacity-30 disabled:pointer-events-none"
              >
                Next
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
