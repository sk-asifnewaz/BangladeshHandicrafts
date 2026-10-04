"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Mail, Phone, MapPin, MessageCircle, Clock, ShieldCheck, CheckCircle2 } from "lucide-react";
import { SITE_CONFIG } from "@/data/site";
import { CATEGORIES } from "@/data/categories";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    country: "Germany",
    phone: "",
    productInterest: "General Catalog / Mixed Assortment",
    estimatedQuantity: "100 - 500 units",
    message: "",
    botcheck: "",
  });

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.botcheck) {
      // Honeypot caught spam
      return;
    }

    setStatus("submitting");
    setErrorMessage("");

    const endpoint = process.env.NEXT_PUBLIC_FORM_ENDPOINT;
    const web3formsKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;

    const payload = {
      ...formData,
      subject: `Export Inquiry from ${formData.company || formData.name} (${formData.country})`,
      access_key: web3formsKey || "",
    };

    try {
      if (endpoint) {
        const res = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error("Submission failed. Please check network.");
      } else if (web3formsKey) {
        const res = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error("Submission failed. Please check network.");
      } else {
        // Fallback simulation when no API key is set yet
        await new Promise((resolve) => setTimeout(resolve, 800));
      }

      setStatus("success");
      setFormData({
        name: "",
        email: "",
        company: "",
        country: "Germany",
        phone: "",
        productInterest: "General Catalog / Mixed Assortment",
        estimatedQuantity: "100 - 500 units",
        message: "",
        botcheck: "",
      });
    } catch (err: unknown) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error ? err.message : "Failed to send message. Please email export@bangladeshhandicrafts.shop directly."
      );
    }
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="border-b border-[#E5E5E5] bg-[#F2F2F2] py-14 sm:py-20 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#777777] block mb-2">
            WHOLESALE SOURCING DESK
          </span>
          <h1 className="text-2xl sm:text-4xl font-bold tracking-[0.2em] uppercase text-[#111111] mb-3">
            Contact Export Desk
          </h1>
          <p className="text-xs sm:text-sm text-[#555555] max-w-xl mx-auto leading-relaxed">
            Direct communication for European buyers seeking CIF/FOB pricing, product catalog line sheets,
            sample orders, and custom OEM manufacturing.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: Direct Contacts */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#777777] block">
                DHAKA EXPORT OFFICE
              </span>
              <h2 className="text-lg sm:text-xl font-bold tracking-[0.15em] uppercase text-[#111111] mt-1">
                Direct Inquiries
              </h2>
              <div className="w-10 h-px bg-[#111111] mt-3" />
            </div>

            <p className="text-xs text-[#555555] leading-relaxed">
              Our export management team operates during standard business hours (GMT+6) and coordinates
              directly with village artisan cooperatives across Bangladesh. We communicate fluently in English
              and provide written responses to European procurement teams.
            </p>

            {/* Contact Items */}
            <div className="space-y-4 pt-2 border-t border-[#E5E5E5] text-xs">
              <div className="flex items-start space-x-3.5">
                <Mail className="w-4 h-4 text-[#111111] flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-[#111111] uppercase tracking-wider text-[11px]">
                    Direct Sourcing Email
                  </strong>
                  <a
                    href={`mailto:${SITE_CONFIG.contact.email}`}
                    className="text-[#555555] hover:text-black hover:underline mt-0.5 block"
                  >
                    {SITE_CONFIG.contact.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-3.5">
                <MessageCircle className="w-4 h-4 text-[#111111] flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-[#111111] uppercase tracking-wider text-[11px]">
                    WhatsApp Direct Business Line
                  </strong>
                  <a
                    href={SITE_CONFIG.socials.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#555555] hover:text-black hover:underline mt-0.5 block font-mono"
                  >
                    {SITE_CONFIG.contact.whatsapp}
                  </a>
                  <span className="text-[10px] text-[#888888]">
                    (Available for instant messaging & photo swatches)
                  </span>
                </div>
              </div>

              <div className="flex items-start space-x-3.5">
                <MapPin className="w-4 h-4 text-[#111111] flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-[#111111] uppercase tracking-wider text-[11px]">
                    Display Suite & Export Office
                  </strong>
                  <span className="text-[#555555] mt-0.5 block leading-relaxed">
                    {SITE_CONFIG.contact.address}
                  </span>
                </div>
              </div>

              <div className="flex items-start space-x-3.5">
                <Clock className="w-4 h-4 text-[#111111] flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-[#111111] uppercase tracking-wider text-[11px]">
                    Working Hours
                  </strong>
                  <span className="text-[#555555] mt-0.5 block">
                    {SITE_CONFIG.contact.workingHours}
                  </span>
                </div>
              </div>
            </div>

            {/* Export Guarantee Note */}
            <div className="p-5 bg-[#F2F2F2] border border-[#E0E0E0] space-y-2">
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-[#111111]" />
                <span className="text-xs font-bold uppercase tracking-wider text-[#111111]">
                  European Buyer Protection
                </span>
              </div>
              <p className="text-[11px] text-[#555555] leading-relaxed">
                We accept Irrevocable Letters of Credit (L/C at sight) or Telegraphic Transfer (T/T).
                Third-party pre-shipment inspections (e.g. SGS, Bureau Veritas) welcome at Dhaka consolidation facility.
              </p>
            </div>
          </div>

          {/* Right Column: Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="bg-white border border-[#E5E5E5] p-6 sm:p-10">
              <div className="mb-6">
                <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#777777] block">
                  FORM TRANSMISSION
                </span>
                <h3 className="text-base sm:text-lg font-bold tracking-[0.15em] uppercase text-[#111111] mt-1">
                  Submit Wholesale Inquiry
                </h3>
                <p className="text-xs text-[#666666] mt-1">
                  Receive quotation line sheets, FOB/CIF breakdown, and sample terms within 24–48h.
                </p>
              </div>

              {status === "success" ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-12 h-12 mx-auto border border-[#111111] flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6 text-[#111111]" />
                  </div>
                  <h4 className="text-sm font-bold tracking-[0.15em] uppercase text-[#111111]">
                    Inquiry Submitted Successfully
                  </h4>
                  <p className="text-xs text-[#555555] max-w-sm mx-auto leading-relaxed">
                    Thank you for reaching out. Our export desk has received your request and will review
                    specifications before emailing you an official response.
                  </p>
                  <button
                    onClick={() => setStatus("idle")}
                    className="mt-4 px-6 py-2.5 border border-[#111111] text-xs uppercase tracking-wider text-[#111111] hover:bg-[#111111] hover:text-white transition-colors"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
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

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-[#555555] mb-1.5 font-medium">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="e.g. Marc Dubois"
                        className="w-full px-3.5 py-2.5 text-xs border border-[#CCCCCC] focus:border-black focus:outline-hidden bg-white text-[#111111]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-[#555555] mb-1.5 font-medium">
                        Business Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="buyer@conceptstore.fr"
                        className="w-full px-3.5 py-2.5 text-xs border border-[#CCCCCC] focus:border-black focus:outline-hidden bg-white text-[#111111]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-[#555555] mb-1.5 font-medium">
                        Company / Brand Name *
                      </label>
                      <input
                        type="text"
                        name="company"
                        required
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="e.g. Maison Naturelle SAS"
                        className="w-full px-3.5 py-2.5 text-xs border border-[#CCCCCC] focus:border-black focus:outline-hidden bg-white text-[#111111]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-[#555555] mb-1.5 font-medium">
                        Destination Country *
                      </label>
                      <select
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        className="w-full px-3.5 py-2.5 text-xs border border-[#CCCCCC] focus:border-black focus:outline-hidden bg-white text-[#111111]"
                      >
                        {SITE_CONFIG.europeanDestinations.map((c) => (
                          <option key={c.code} value={c.name}>
                            {c.name}
                          </option>
                        ))}
                        <option value="Other European Country">Other European Country</option>
                        <option value="International / Overseas">International / Overseas</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-[#555555] mb-1.5 font-medium">
                        Craft Category of Interest
                      </label>
                      <select
                        name="productInterest"
                        value={formData.productInterest}
                        onChange={handleChange}
                        className="w-full px-3.5 py-2.5 text-xs border border-[#CCCCCC] focus:border-black focus:outline-hidden bg-white text-[#111111]"
                      >
                        <option value="General Catalog / Mixed Assortment">
                          General Catalog / Mixed Assortment
                        </option>
                        {CATEGORIES.map((cat) => (
                          <option key={cat.id} value={cat.name}>
                            {cat.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-[#555555] mb-1.5 font-medium">
                        Estimated Order Volume
                      </label>
                      <select
                        name="estimatedQuantity"
                        value={formData.estimatedQuantity}
                        onChange={handleChange}
                        className="w-full px-3.5 py-2.5 text-xs border border-[#CCCCCC] focus:border-black focus:outline-hidden bg-white text-[#111111]"
                      >
                        <option value="Sample Order (Under 50 pcs)">Sample Order (Under 50 pcs)</option>
                        <option value="100 - 500 units">100 – 500 units (LCL)</option>
                        <option value="500 - 2,000 units">500 – 2,000 units</option>
                        <option value="Full Container Load (20ft / 40ft FCL)">
                          Full Container Load (20ft / 40ft FCL)
                        </option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#555555] mb-1.5 font-medium">
                      Inquiry Details / Specific Products / Delivery Port *
                    </label>
                    <textarea
                      name="message"
                      required
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Please mention specific products or SKUs of interest, target delivery port (e.g. CIF Hamburg), private labeling requirements, or target timeline..."
                      className="w-full px-3.5 py-2.5 text-xs border border-[#CCCCCC] focus:border-black focus:outline-hidden bg-white text-[#111111] resize-none"
                    />
                  </div>

                  {status === "error" && (
                    <p className="text-xs text-red-600 bg-red-50 p-3 border border-red-200">
                      {errorMessage}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="w-full py-4 bg-[#111111] text-white text-xs uppercase tracking-[0.2em] font-medium hover:bg-black transition-colors disabled:opacity-60"
                  >
                    {status === "submitting" ? "Transmitting Inquiry..." : "Send Wholesale Export Inquiry"}
                  </button>

                  <p className="text-[10px] text-center text-[#777777] pt-2">
                    Information submitted is treated strictly confidentially under EU GDPR standards.
                    No promotional marketing emails without consent.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
