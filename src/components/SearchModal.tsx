"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, X, ArrowRight } from "lucide-react";
import { PRODUCTS } from "@/data/products";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery("");
    }
  }, [isOpen]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.material.toLowerCase().includes(q) ||
        p.categoryName.toLowerCase().includes(q) ||
        p.productType.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q))
    ).slice(0, 8);
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="relative min-h-screen px-4 text-center sm:block sm:p-0">
        <div className="inline-block w-full max-w-2xl mt-16 sm:mt-24 text-left align-middle transition-all transform bg-white border border-[#E5E5E5] shadow-2xl">
          {/* Search Header */}
          <div className="relative flex items-center border-b border-[#E5E5E5] px-4 py-4">
            <Search className="w-5 h-5 text-[#888888] mr-3 stroke-[1.5]" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by material (e.g. Sea Grass, Jute, Brass) or product name..."
              className="w-full text-sm placeholder-[#999999] text-[#111111] focus:outline-hidden bg-transparent"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="text-xs text-[#888888] hover:text-black mr-2 font-mono"
              >
                CLEAR
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1 text-[#888888] hover:text-black transition-colors"
              aria-label="Close search"
            >
              <X className="w-5 h-5 stroke-[1.5]" />
            </button>
          </div>

          {/* Search Results Body */}
          <div className="p-4 max-h-[60vh] overflow-y-auto">
            {query.trim().length === 0 ? (
              <div className="py-8 text-center">
                <p className="text-xs tracking-wider uppercase text-[#888888] mb-3">
                  Quick Material Searches
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  {["Sea Grass", "Jute", "Rattan", "Brass", "Terracotta", "Bamboo", "Nakshi Kantha"].map(
                    (mat) => (
                      <button
                        key={mat}
                        onClick={() => setQuery(mat)}
                        className="px-3 py-1.5 text-xs border border-[#E5E5E5] text-[#444444] hover:border-black hover:text-black transition-colors"
                      >
                        {mat}
                      </button>
                    )
                  )}
                </div>
              </div>
            ) : results.length === 0 ? (
              <div className="py-10 text-center">
                <p className="text-xs text-[#777777]">
                  No export products found matching &ldquo;{query}&rdquo;
                </p>
                <Link
                  href="/collections"
                  onClick={onClose}
                  className="inline-block mt-3 text-xs uppercase tracking-wider text-[#111111] underline hover:no-underline"
                >
                  Browse all collections
                </Link>
              </div>
            ) : (
              <div className="divide-y divide-[#F2F2F2]">
                {results.map((product) => (
                  <Link
                    key={product.id}
                    href={`/products/${product.slug}`}
                    onClick={onClose}
                    className="flex items-center justify-between py-3 px-2 hover:bg-[#F9F9F9] transition-colors group"
                  >
                    <div className="flex items-center space-x-3.5">
                      <div className="relative w-12 h-12 bg-[#F2F2F2] border border-[#E5E5E5] overflow-hidden flex-shrink-0">
                        <Image
                          src={product.images[0] || "/products/placeholder.jpg"}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <span className="text-[10px] tracking-[0.15em] uppercase text-[#777777] block font-medium">
                          {product.material} · {product.categoryName}
                        </span>
                        <h4 className="text-xs font-medium text-[#111111] group-hover:underline">
                          {product.name}
                        </h4>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#AAAAAA] group-hover:text-black group-hover:translate-x-1 transition-all" />
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Footer note */}
          <div className="px-4 py-2.5 bg-[#F9F9F9] border-t border-[#E5E5E5] flex justify-between items-center text-[10px] text-[#777777]">
            <span>Press ESC to close</span>
            <Link
              href="/collections"
              onClick={onClose}
              className="uppercase tracking-wider hover:underline"
            >
              View Full Catalog →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
