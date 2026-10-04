"use client";

import React, { useState } from "react";
import { Plus, Check, ArrowRight, ShieldCheck, Truck } from "lucide-react";
import { Product } from "@/lib/types";
import { useEnquiry } from "@/context/EnquiryContext";

interface ProductActionsProps {
  product: Product;
}

export function ProductActions({ product }: ProductActionsProps) {
  const { addToEnquiry, isInEnquiry, openDrawer } = useEnquiry();
  const added = isInEnquiry(product.id);
  const [volume, setVolume] = useState<number>(100);

  const handleAdd = () => {
    addToEnquiry(product, volume);
  };

  const handleRequestQuote = () => {
    if (!added) {
      addToEnquiry(product, volume);
    } else {
      openDrawer();
    }
  };

  return (
    <div className="space-y-5 pt-4 border-t border-[#E5E5E5]">
      {/* Volume selector */}
      <div className="flex items-center justify-between">
        <label htmlFor="volume-select" className="text-xs uppercase tracking-wider text-[#666666] font-medium">
          Planned Order Quantity:
        </label>
        <div className="inline-flex items-center space-x-2">
          <input
            id="volume-select"
            type="number"
            min={10}
            step={10}
            value={volume}
            onChange={(e) => setVolume(Math.max(1, parseInt(e.target.value) || 1))}
            className="w-24 px-3 py-1.5 text-xs border border-[#CCCCCC] focus:border-black focus:outline-hidden font-mono text-center"
          />
          <span className="text-xs text-[#777777]">units</span>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          type="button"
          onClick={handleAdd}
          className={`flex-1 py-3.5 px-6 text-xs uppercase tracking-[0.15em] font-medium flex items-center justify-center space-x-2 transition-colors ${
            added
              ? "bg-[#111111] text-white"
              : "border border-[#111111] text-[#111111] hover:bg-[#111111] hover:text-white"
          }`}
        >
          {added ? (
            <>
              <Check className="w-4 h-4" />
              <span>In Export Enquiry ({volume})</span>
            </>
          ) : (
            <>
              <Plus className="w-4 h-4" />
              <span>Add to Enquiry List</span>
            </>
          )}
        </button>

        <button
          type="button"
          onClick={handleRequestQuote}
          className="flex-1 py-3.5 px-6 bg-[#111111] text-white text-xs uppercase tracking-[0.15em] font-medium hover:bg-black transition-colors flex items-center justify-center space-x-2"
        >
          <span>Request a Quote</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Direct WhatsApp Quick Chat */}
      <a
        href={`https://wa.me/8801713001747?text=${encodeURIComponent(
          `Hello, I would like to inquire about "${product.name}" (${product.material}) from Bangladesh Handicrafts.`
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full py-3 px-4 border border-[#CCCCCC] hover:border-black text-[#111111] text-xs uppercase tracking-[0.12em] font-medium flex items-center justify-center space-x-2 transition-colors"
      >
        <span className="w-2 h-2 rounded-full bg-emerald-600 inline-block" />
        <span>Direct WhatsApp Inquiry (+880 1713-001747)</span>
      </a>

      {/* Trust reassurance */}
      <div className="grid grid-cols-2 gap-3 pt-3 text-[11px] text-[#666666]">
        <div className="flex items-center space-x-2">
          <ShieldCheck className="w-4 h-4 text-[#111111] flex-shrink-0" />
          <span>FOB & CIF Quotations within 24h</span>
        </div>
        <div className="flex items-center space-x-2">
          <Truck className="w-4 h-4 text-[#111111] flex-shrink-0" />
          <span>Consignment Air / Sea Freight</span>
        </div>
      </div>
    </div>
  );
}
