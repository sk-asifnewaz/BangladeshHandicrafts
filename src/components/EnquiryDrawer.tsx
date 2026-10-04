"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Trash2, Plus, Minus, ArrowRight, CheckCircle2, ShieldCheck } from "lucide-react";
import { useEnquiry } from "@/context/EnquiryContext";
import { SITE_CONFIG } from "@/data/site";

export function EnquiryDrawer() {
  const { items, isOpen, closeDrawer, removeFromEnquiry, updateQuantity, clearEnquiry, totalCount } =
    useEnquiry();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    country: "Germany",
    targetPort: "CIF Hamburg",
    notes: "",
    botcheck: "",
  });

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.botcheck) {
      // Honeypot triggered
      return;
    }

    if (items.length === 0) {
      setErrorMessage("Please add at least one product to your enquiry list.");
      setStatus("error");
      return;
    }

    setStatus("submitting");
    setErrorMessage("");

    const endpoint = process.env.NEXT_PUBLIC_FORM_ENDPOINT;
    const web3formsKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;

    const payload = {
      ...formData,
      to_email: SITE_CONFIG.contact.email,
      recipient: "zahir.ahmed@bangladeshhandicrafts.shop",
      subject: `New B2B Export Enquiry from ${formData.company || formData.name} (${formData.country})`,
      productsRequested: items.map((i) => ({
        id: i.product.id,
        name: i.product.name,
        material: i.product.material,
        quantity: i.quantity,
        moq: i.product.moq,
      })),
      totalProductsCount: totalCount,
      access_key: web3formsKey || "",
    };

    try {
      if (endpoint) {
        const res = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error("Submission failed. Please check connection.");
      } else if (web3formsKey) {
        const res = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error("Submission failed. Please check connection.");
      } else {
        // Fallback simulated submission when no API key is configured yet
        await new Promise((resolve) => setTimeout(resolve, 800));
      }

      setStatus("success");
      clearEnquiry();
    } catch (err: unknown) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error ? err.message : "Failed to send inquiry. Please email us directly."
      );
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
        onClick={closeDrawer}
        aria-hidden="true"
      />

      <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
        <div className="w-screen max-w-md bg-white border-l border-[#E5E5E5] flex flex-col shadow-2xl">
          {/* Header */}
          <div className="px-6 py-5 border-b border-[#E5E5E5] flex items-center justify-between bg-white">
            <div>
              <h2 className="text-sm font-semibold tracking-[0.15em] uppercase text-[#111111]">
                {SITE_CONFIG.i18n.en.enquiryDrawer.title}
              </h2>
              <p className="text-xs text-[#777777] mt-0.5">
                {items.length === 0
                  ? "0 items selected"
                  : `${items.length} item types · ${totalCount} units requested`}
              </p>
            </div>
            <button
              onClick={closeDrawer}
              className="p-2 text-[#555555] hover:text-black transition-colors"
              aria-label="Close enquiry list"
            >
              <X className="w-5 h-5 stroke-[1.5]" />
            </button>
          </div>

          {/* Drawer Body */}
          <div className="flex-1 overflow-y-auto px-6 py-6 divide-y divide-[#EFEFEF]">
            {status === "success" ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-12 h-12 mx-auto border border-[#111111] flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-[#111111]" />
                </div>
                <h3 className="text-sm font-medium tracking-[0.15em] uppercase text-[#111111]">
                  {SITE_CONFIG.i18n.en.enquiryDrawer.successTitle}
                </h3>
                <p className="text-xs leading-relaxed text-[#555555] max-w-xs mx-auto">
                  {SITE_CONFIG.i18n.en.enquiryDrawer.successMessage}
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => {
                      setStatus("idle");
                      closeDrawer();
                    }}
                    className="inline-block px-6 py-3 border border-[#111111] text-xs uppercase tracking-[0.15em] text-[#111111] hover:bg-[#111111] hover:text-white transition-colors"
                  >
                    Continue Browsing
                  </button>
                </div>
              </div>
            ) : items.length === 0 ? (
              <div className="py-16 text-center space-y-4">
                <p className="text-xs tracking-wider uppercase text-[#777777]">
                  {SITE_CONFIG.i18n.en.enquiryDrawer.emptySubtitle}
                </p>
                <p className="text-xs text-[#555555] max-w-xs mx-auto">
                  {SITE_CONFIG.i18n.en.enquiryDrawer.emptyHint}
                </p>
                <div className="pt-4">
                  <button
                    onClick={closeDrawer}
                    className="inline-flex items-center space-x-2 px-6 py-3 bg-[#111111] text-white text-xs uppercase tracking-[0.15em] hover:bg-black transition-colors"
                  >
                    <span>{SITE_CONFIG.i18n.en.enquiryDrawer.browseCatalog}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ) : (
              <>
                {/* Product List */}
                <div className="space-y-4 pb-6">
                  {items.map(({ product, quantity }) => (
                    <div
                      key={product.id}
                      className="flex items-start space-x-4 py-3 border-b border-[#F2F2F2] last:border-none"
                    >
                      <div className="relative w-18 h-18 bg-[#F2F2F2] flex-shrink-0 border border-[#E5E5E5] overflow-hidden">
                        <Image
                          src={product.images[0] || "/products/placeholder.jpg"}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="text-[10px] tracking-[0.15em] uppercase text-[#777777] block font-medium">
                          {product.material}
                        </span>
                        <Link
                          href={`/products/${product.slug}`}
                          onClick={closeDrawer}
                          className="text-xs font-medium text-[#111111] hover:underline line-clamp-1 mt-0.5 block"
                        >
                          {product.name}
                        </Link>
                        <p className="text-[11px] text-[#888888] mt-0.5">
                          MOQ: {product.moq.replace("[REPLACE: ", "").replace("]", "")}
                        </p>

                        <div className="flex items-center justify-between mt-2.5">
                          {/* Quantity control */}
                          <div className="inline-flex items-center border border-[#CCCCCC]">
                            <button
                              type="button"
                              onClick={() => updateQuantity(product.id, Math.max(1, quantity - 10))}
                              className="w-6 h-6 flex items-center justify-center text-[#555555] hover:bg-[#F2F2F2]"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-2 text-xs font-mono text-[#111111]">
                              {quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => updateQuantity(product.id, quantity + 10)}
                              className="w-6 h-6 flex items-center justify-center text-[#555555] hover:bg-[#F2F2F2]"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <button
                            type="button"
                            onClick={() => removeFromEnquiry(product.id)}
                            className="text-[#888888] hover:text-black p-1 transition-colors"
                            aria-label="Remove item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Sourcing Form */}
                <div className="pt-6">
                  <div className="flex items-center space-x-1.5 text-[11px] uppercase tracking-wider text-[#666666] mb-3">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#111111]" />
                    <span>Wholesale Export & Retail Inquiry</span>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-3.5">
                    {/* Honeypot field */}
                    <input
                      type="text"
                      name="botcheck"
                      value={formData.botcheck}
                      onChange={handleChange}
                      className="hidden"
                      tabIndex={-1}
                      autoComplete="off"
                    />

                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-[#555555] mb-1">
                        Contact Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="e.g. Henrik Lindqvist"
                        className="w-full px-3 py-2 text-xs border border-[#CCCCCC] focus:border-black focus:outline-hidden bg-white text-[#111111]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-[#555555] mb-1">
                        Work Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="sourcing@retailbrand.de"
                        className="w-full px-3 py-2 text-xs border border-[#CCCCCC] focus:border-black focus:outline-hidden bg-white text-[#111111]"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[11px] uppercase tracking-wider text-[#555555] mb-1">
                          Company / Brand *
                        </label>
                        <input
                          type="text"
                          name="company"
                          required
                          value={formData.company}
                          onChange={handleChange}
                          placeholder="e.g. Nordic Home GmbH"
                          className="w-full px-3 py-2 text-xs border border-[#CCCCCC] focus:border-black focus:outline-hidden bg-white text-[#111111]"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] uppercase tracking-wider text-[#555555] mb-1">
                          Country *
                        </label>
                        <select
                          name="country"
                          value={formData.country}
                          onChange={handleChange}
                          className="w-full px-3 py-2 text-xs border border-[#CCCCCC] focus:border-black focus:outline-hidden bg-white text-[#111111]"
                        >
                          {SITE_CONFIG.europeanDestinations.map((c) => (
                            <option key={c.code} value={c.name}>
                              {c.name}
                            </option>
                          ))}
                          <option value="Other Europe">Other European Country</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-[#555555] mb-1">
                        Target Port / Incoterm
                      </label>
                      <input
                        type="text"
                        name="targetPort"
                        value={formData.targetPort}
                        onChange={handleChange}
                        placeholder="e.g. CIF Hamburg or FOB Chittagong"
                        className="w-full px-3 py-2 text-xs border border-[#CCCCCC] focus:border-black focus:outline-hidden bg-white text-[#111111]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-[#555555] mb-1">
                        Notes / Specifications
                      </label>
                      <textarea
                        name="notes"
                        rows={2}
                        value={formData.notes}
                        onChange={handleChange}
                        placeholder="Target shipment month, custom branding, or packaging notes..."
                        className="w-full px-3 py-2 text-xs border border-[#CCCCCC] focus:border-black focus:outline-hidden bg-white text-[#111111] resize-none"
                      />
                    </div>

                    {status === "error" && (
                      <p className="text-xs text-red-600 bg-red-50 p-2 border border-red-200">
                        {errorMessage}
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={status === "submitting"}
                      className="w-full py-3 bg-[#111111] text-white text-xs uppercase tracking-[0.15em] font-medium hover:bg-black transition-colors disabled:opacity-60"
                    >
                      {status === "submitting"
                        ? SITE_CONFIG.i18n.en.enquiryDrawer.submitting
                        : SITE_CONFIG.i18n.en.enquiryDrawer.submitButton}
                    </button>

                    <p className="text-[10px] text-center text-[#888888] pt-1">
                      Inquiries for volume wholesale and retail orders welcome · Quotations sent within 24–48h.
                    </p>
                  </form>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
