"use client";

import React from "react";
import { X, SlidersHorizontal, Check } from "lucide-react";
import { Product } from "@/lib/types";
import { CATEGORIES } from "@/data/categories";

interface FilterSidebarProps {
  products: Product[];
  selectedCategory: string;
  selectedMaterials: string[];
  selectedProductTypes: string[];
  onSelectCategory: (categorySlug: string) => void;
  onToggleMaterial: (material: string) => void;
  onToggleProductType: (productType: string) => void;
  onClearAll: () => void;
  isMobileOpen: boolean;
  onCloseMobile: () => void;
}

export function FilterSidebar({
  products,
  selectedCategory,
  selectedMaterials,
  selectedProductTypes,
  onSelectCategory,
  onToggleMaterial,
  onToggleProductType,
  onClearAll,
  isMobileOpen,
  onCloseMobile,
}: FilterSidebarProps) {
  // Compute live facet counts
  const materialCounts = React.useMemo(() => {
    const counts: Record<string, number> = {};
    products.forEach((p) => {
      counts[p.material] = (counts[p.material] || 0) + 1;
    });
    return counts;
  }, [products]);

  const typeCounts = React.useMemo(() => {
    const counts: Record<string, number> = {};
    products.forEach((p) => {
      counts[p.productType] = (counts[p.productType] || 0) + 1;
    });
    return counts;
  }, [products]);

  const categoryCounts = React.useMemo(() => {
    const counts: Record<string, number> = {};
    products.forEach((p) => {
      counts[p.categorySlug] = (counts[p.categorySlug] || 0) + 1;
    });
    return counts;
  }, [products]);

  const materialsList = Object.keys(materialCounts).sort();
  const typesList = Object.keys(typeCounts).sort();

  const hasActiveFilters =
    selectedCategory !== "all" ||
    selectedMaterials.length > 0 ||
    selectedProductTypes.length > 0;

  const content = (
    <div className="space-y-8 select-none">
      {/* Active filters heading & reset */}
      <div className="flex items-center justify-between pb-4 border-b border-[#E5E5E5]">
        <div className="flex items-center space-x-2">
          <SlidersHorizontal className="w-3.5 h-3.5 text-[#111111]" />
          <h3 className="text-xs font-semibold tracking-[0.15em] uppercase text-[#111111]">
            Catalog Filters
          </h3>
        </div>
        {hasActiveFilters && (
          <button
            onClick={onClearAll}
            className="text-[11px] uppercase tracking-wider text-[#777777] hover:text-black hover:underline"
          >
            Clear All
          </button>
        )}
      </div>

      {/* Filter by Category */}
      <div>
        <h4 className="text-[11px] font-semibold tracking-[0.18em] uppercase text-[#111111] mb-3">
          Craft Categories
        </h4>
        <div className="space-y-1.5">
          <button
            onClick={() => onSelectCategory("all")}
            className={`w-full text-left text-xs py-1.5 px-2 flex items-center justify-between transition-colors ${
              selectedCategory === "all"
                ? "bg-[#111111] text-white font-medium"
                : "text-[#444444] hover:bg-[#F2F2F2]"
            }`}
          >
            <span className="uppercase tracking-wider">All Categories</span>
            <span className="text-[10px] opacity-70 font-mono">({products.length})</span>
          </button>
          {CATEGORIES.map((cat) => {
            const count = categoryCounts[cat.slug] || 0;
            const isSelected = selectedCategory === cat.slug;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.slug)}
                className={`w-full text-left text-xs py-1.5 px-2 flex items-center justify-between transition-colors ${
                  isSelected
                    ? "bg-[#111111] text-white font-medium"
                    : "text-[#444444] hover:bg-[#F2F2F2]"
                }`}
              >
                <span className="uppercase tracking-wider line-clamp-1">{cat.name}</span>
                <span className="text-[10px] opacity-70 font-mono">({count})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Filter by Material (with live counts) */}
      <div>
        <h4 className="text-[11px] font-semibold tracking-[0.18em] uppercase text-[#111111] mb-3">
          Raw Material
        </h4>
        <div className="space-y-1 max-h-56 overflow-y-auto pr-1">
          {materialsList.map((material) => {
            const count = materialCounts[material] || 0;
            const isChecked = selectedMaterials.includes(material);
            return (
              <label
                key={material}
                className="flex items-center justify-between py-1.5 px-2 text-xs text-[#333333] hover:bg-[#F9F9F9] cursor-pointer"
              >
                <div className="flex items-center space-x-2.5">
                  <div
                    className={`w-3.5 h-3.5 border flex items-center justify-center transition-colors ${
                      isChecked ? "bg-[#111111] border-[#111111]" : "border-[#CCCCCC] bg-white"
                    }`}
                  >
                    {isChecked && <Check className="w-2.5 h-2.5 text-white stroke-[2.5]" />}
                  </div>
                  <input
                    type="checkbox"
                    className="sr-only"
                    checked={isChecked}
                    onChange={() => onToggleMaterial(material)}
                  />
                  <span className="tracking-wide uppercase text-[11px]">{material}</span>
                </div>
                <span className="text-[10px] text-[#888888] font-mono">({count})</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Filter by Product Type */}
      <div>
        <h4 className="text-[11px] font-semibold tracking-[0.18em] uppercase text-[#111111] mb-3">
          Product Type
        </h4>
        <div className="space-y-1 max-h-56 overflow-y-auto pr-1">
          {typesList.map((type) => {
            const count = typeCounts[type] || 0;
            const isChecked = selectedProductTypes.includes(type);
            return (
              <label
                key={type}
                className="flex items-center justify-between py-1.5 px-2 text-xs text-[#333333] hover:bg-[#F9F9F9] cursor-pointer"
              >
                <div className="flex items-center space-x-2.5">
                  <div
                    className={`w-3.5 h-3.5 border flex items-center justify-center transition-colors ${
                      isChecked ? "bg-[#111111] border-[#111111]" : "border-[#CCCCCC] bg-white"
                    }`}
                  >
                    {isChecked && <Check className="w-2.5 h-2.5 text-white stroke-[2.5]" />}
                  </div>
                  <input
                    type="checkbox"
                    className="sr-only"
                    checked={isChecked}
                    onChange={() => onToggleProductType(type)}
                  />
                  <span className="tracking-wide uppercase text-[11px]">{type}</span>
                </div>
                <span className="text-[10px] text-[#888888] font-mono">({count})</span>
              </label>
            );
          })}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sticky Sidebar */}
      <aside className="hidden lg:block w-64 flex-shrink-0 pr-8">
        <div className="sticky top-28">{content}</div>
      </aside>

      {/* Mobile Filter Drawer */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
            onClick={onCloseMobile}
            aria-hidden="true"
          />
          <div className="fixed inset-y-0 left-0 max-w-xs w-full bg-white shadow-xl flex flex-col z-10 border-r border-[#E5E5E5]">
            <div className="p-4 border-b border-[#E5E5E5] flex items-center justify-between">
              <span className="text-xs uppercase tracking-widest font-semibold text-[#111111]">
                Filter Catalog
              </span>
              <button
                onClick={onCloseMobile}
                className="p-1 text-[#666666] hover:text-black"
                aria-label="Close filters"
              >
                <X className="w-5 h-5 stroke-[1.5]" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-5">{content}</div>
            <div className="p-4 border-t border-[#E5E5E5] bg-[#F9F9F9]">
              <button
                onClick={onCloseMobile}
                className="w-full py-2.5 bg-[#111111] text-white text-xs uppercase tracking-widest font-medium"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
