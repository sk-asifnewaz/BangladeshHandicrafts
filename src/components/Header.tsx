"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, ShoppingBag, Menu, X, ArrowRight, Globe } from "lucide-react";
import { CATEGORIES } from "@/data/categories";
import { SITE_CONFIG } from "@/data/site";
import { useEnquiry } from "@/context/EnquiryContext";
import { SearchModal } from "@/components/SearchModal";

export function Header() {
  const pathname = usePathname();
  const { totalCount, openDrawer } = useEnquiry();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);

  const primaryLinks = [
    { label: "COLLECTIONS", href: "/collections" },
    { label: "EXPORT TO EUROPE", href: "/export-europe" },
    { label: "OUR ARTISANS", href: "/about" },
    { label: "CONTACT", href: "/contact" },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 bg-white border-b border-[#E5E5E5]">
        {/* Tier 1: Main Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-16 flex items-center justify-between">
            {/* Left: Wordmark & Primary Nav */}
            <div className="flex items-center space-x-8 lg:space-x-12">
              <Link
                href="/"
                className="text-sm sm:text-base font-semibold tracking-[0.2em] uppercase text-[#111111] hover:opacity-85 transition-opacity whitespace-nowrap"
              >
                {SITE_CONFIG.name}
              </Link>

              {/* Primary Navigation on Desktop */}
              <nav className="hidden lg:flex items-center space-x-7" aria-label="Primary Navigation">
                {primaryLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`text-xs uppercase tracking-[0.15em] font-medium transition-colors hover:text-black ${
                        isActive ? "text-black border-b border-black pb-0.5" : "text-[#555555]"
                      }`}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Right: Search, Country indicator, Enquiry Bag, Mobile Toggle */}
            <div className="flex items-center space-x-3 sm:space-x-5">
              {/* Search button / trigger */}
              <button
                type="button"
                onClick={() => setSearchModalOpen(true)}
                className="hidden sm:flex items-center space-x-2 text-xs text-[#666666] hover:text-black px-3 py-1.5 border border-[#E5E5E5] hover:border-black transition-colors"
                aria-label="Search products"
              >
                <Search className="w-3.5 h-3.5 stroke-[1.5]" />
                <span className="text-[11px] uppercase tracking-wider text-[#777777]">
                  Search products...
                </span>
              </button>

              {/* Mobile search icon */}
              <button
                type="button"
                onClick={() => setSearchModalOpen(true)}
                className="sm:hidden p-2 text-[#444444] hover:text-black"
                aria-label="Search products"
              >
                <Search className="w-5 h-5 stroke-[1.5]" />
              </button>

              {/* WhatsApp Quick Link */}
              <a
                href={SITE_CONFIG.socials.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:flex items-center space-x-1.5 text-xs text-[#111111] hover:opacity-75 px-2.5 py-1.5 border border-[#E5E5E5] hover:border-black transition-colors"
                title="Chat on WhatsApp"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-600 inline-block animate-pulse" />
                <span className="font-mono text-[11px] font-medium">+880 1713-001747</span>
              </a>

              {/* Export & Retail indicator */}
              <div className="hidden lg:flex items-center space-x-1 text-[11px] font-mono uppercase tracking-wider text-[#777777] border-l border-[#E5E5E5] pl-4">
                <Globe className="w-3.5 h-3.5" />
                <span>EXPORT & RETAIL</span>
              </div>

              {/* Enquiry list drawer trigger */}
              <button
                type="button"
                onClick={openDrawer}
                className="relative p-2 text-[#111111] hover:opacity-75 transition-opacity"
                aria-label={`Open export enquiry list with ${totalCount} items`}
              >
                <ShoppingBag className="w-5 h-5 stroke-[1.5]" />
                {totalCount > 0 && (
                  <span className="absolute top-1 right-0 min-w-4.5 h-4.5 px-1 bg-[#111111] text-white text-[10px] font-medium flex items-center justify-center font-mono">
                    {totalCount}
                  </span>
                )}
              </button>

              {/* Mobile Menu Toggle Button */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 text-[#111111] hover:text-[#555555] transition-colors"
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6 stroke-[1.5]" />
                ) : (
                  <Menu className="w-6 h-6 stroke-[1.5]" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Tier 2: Secondary Category Navigation Bar */}
        <div className="border-t border-[#EAEAEA] bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="overflow-x-auto scrollbar-none py-2.5">
              <nav
                className="flex items-center space-x-6 sm:space-x-8 whitespace-nowrap"
                aria-label="Category Navigation"
              >
                <Link
                  href="/collections"
                  className={`text-[11px] uppercase tracking-[0.15em] font-medium transition-colors hover:text-black ${
                    pathname === "/collections"
                      ? "text-black underline underline-offset-4 decoration-1 font-semibold"
                      : "text-[#555555]"
                  }`}
                >
                  ALL COLLECTIONS
                </Link>

                {CATEGORIES.map((cat) => {
                  const catHref = `/collections/${cat.slug}`;
                  const isCatActive = pathname === catHref;
                  return (
                    <Link
                      key={cat.id}
                      href={catHref}
                      className={`text-[11px] uppercase tracking-[0.15em] font-medium transition-colors hover:text-black ${
                        isCatActive
                          ? "text-black underline underline-offset-4 decoration-1 font-semibold"
                          : "text-[#555555]"
                      }`}
                    >
                      {cat.name}
                    </Link>
                  );
                })}
              </nav>
            </div>
          </div>
        </div>

        {/* Mobile Slide-down Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-[#E5E5E5] bg-white px-6 py-6 space-y-6 shadow-xl">
            <nav className="space-y-4">
              <p className="text-[10px] tracking-widest uppercase text-[#999999] font-medium">
                Navigation
              </p>
              {primaryLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-sm uppercase tracking-[0.15em] font-medium text-[#111111] hover:text-black"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="border-t border-[#EFEFEF] pt-4">
              <p className="text-[10px] tracking-widest uppercase text-[#999999] font-medium mb-3">
                Craft Categories
              </p>
              <div className="grid grid-cols-2 gap-2.5">
                {CATEGORIES.map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/collections/${cat.slug}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-xs uppercase tracking-wider text-[#444444] hover:text-black py-1 block"
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            </div>

            <div className="border-t border-[#EFEFEF] pt-4 space-y-2">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  openDrawer();
                }}
                className="w-full flex items-center justify-between px-4 py-3 bg-[#111111] text-white text-xs uppercase tracking-[0.15em]"
              >
                <span>Export Enquiry List</span>
                <span className="font-mono">({totalCount})</span>
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Global Search Modal */}
      <SearchModal isOpen={searchModalOpen} onClose={() => setSearchModalOpen(false)} />
    </>
  );
}
