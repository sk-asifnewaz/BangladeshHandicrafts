import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Ship, Plane, FileCheck, Package, Shield, Globe, Clock, CheckCircle } from "lucide-react";
import { SITE_CONFIG } from "@/data/site";

export const metadata: Metadata = {
  title: "Export to Europe | Freight, Compliance & Logistics | Bangladesh Handicrafts",
  description:
    "Comprehensive European export guide for wholesale buyers: sea freight transit times, ports served, phytosanitary fumigation, EU REX duty-free status, and export packaging.",
};

export default function ExportEuropePage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Editorial Page Header */}
      <div className="border-b border-[#E5E5E5] bg-[#F2F2F2] py-14 sm:py-20 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#777777] block mb-2">
            LOGISTICS & TRADE COMPLIANCE
          </span>
          <h1 className="text-2xl sm:text-4xl font-bold tracking-[0.2em] uppercase text-[#111111] mb-4">
            Exporting to European Markets
          </h1>
          <p className="text-xs sm:text-sm text-[#555555] max-w-2xl mx-auto leading-relaxed">
            Reliable supply chain corridors connecting rural manufacturing hubs in Bangladesh with
            continental European ports and distribution warehouses.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 space-y-16 sm:space-y-24">
        {/* Section 1: Countries & Ports Matrix */}
        <section className="space-y-8">
          <div>
            <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#777777] block">
              DESTINATION NETWORK
            </span>
            <h2 className="text-xl sm:text-2xl font-bold tracking-[0.15em] uppercase text-[#111111] mt-1">
              Primary European Ports & Distribution Hubs
            </h2>
            <div className="w-12 h-px bg-[#111111] mt-3" />
          </div>

          <p className="text-xs sm:text-sm text-[#555555] leading-relaxed max-w-3xl">
            We handle consignments for importers, department stores, and catalog distributors across
            Western, Northern, and Southern Europe. Shipments are consolidated at our Dhaka export hub
            and dispatched via Chittagong Port (Sea Freight) or Hazrat Shahjalal International Airport
            (Air Cargo).
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {SITE_CONFIG.europeanDestinations.map((country) => (
              <div
                key={country.code}
                className="p-5 border border-[#E5E5E5] bg-white hover:border-black transition-colors space-y-2"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-[#111111]">
                    {country.name}
                  </h3>
                  <span className="text-[10px] font-mono bg-[#F2F2F2] px-2 py-0.5 text-[#555555]">
                    {country.code}
                  </span>
                </div>
                <p className="text-xs text-[#666666]">
                  <strong className="text-[#111111]">Main Ports:</strong> {country.mainPorts}
                </p>
                <div className="pt-2 flex items-center text-[10px] font-mono text-[#888888] space-x-1.5">
                  <CheckCircle className="w-3 h-3 text-[#111111]" />
                  <span>Door-to-port CIF & FOB available</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 2: Freight & Transit Times */}
        <section id="shipping" className="border-t border-[#E5E5E5] pt-16 space-y-8">
          <div>
            <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#777777] block">
              TRANSIT MODES
            </span>
            <h2 className="text-xl sm:text-2xl font-bold tracking-[0.15em] uppercase text-[#111111] mt-1">
              Shipping Methods & Lead Times
            </h2>
            <div className="w-12 h-px bg-[#111111] mt-3" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Sea Freight */}
            <div className="p-7 border border-[#E5E5E5] bg-[#F2F2F2] space-y-4">
              <div className="w-10 h-10 bg-white border border-[#111111] flex items-center justify-center">
                <Ship className="w-5 h-5 text-[#111111]" />
              </div>
              <h3 className="text-sm font-bold tracking-[0.15em] uppercase text-[#111111]">
                Ocean Freight (FCL & LCL)
              </h3>
              <p className="text-xs text-[#555555] leading-relaxed">
                Most cost-effective for volume orders of bulky natural baskets, planters, and furniture.
                Dispatched from Chittagong Port (BDCGP) via feeder vessels through Colombo or Singapore
                transshipment hubs directly to main North European and Mediterranean container terminals.
              </p>
              <div className="pt-3 border-t border-[#DDDDDD] space-y-1.5 text-xs text-[#444444]">
                <div className="flex justify-between">
                  <span className="text-[#777777]">Transit to Hamburg / Rotterdam:</span>
                  <span className="font-mono font-medium">[REPLACE: 28–35 days]</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#777777]">Transit to Le Havre / Antwerp:</span>
                  <span className="font-mono font-medium">[REPLACE: 30–38 days]</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#777777]">Container Types:</span>
                  <span className="font-mono">20ft GP (28 CBM) / 40ft HQ (68 CBM)</span>
                </div>
              </div>
            </div>

            {/* Air Cargo */}
            <div className="p-7 border border-[#E5E5E5] bg-[#F2F2F2] space-y-4">
              <div className="w-10 h-10 bg-white border border-[#111111] flex items-center justify-center">
                <Plane className="w-5 h-5 text-[#111111]" />
              </div>
              <h3 className="text-sm font-bold tracking-[0.15em] uppercase text-[#111111]">
                Air Cargo (Urgent Orders & Samples)
              </h3>
              <p className="text-xs text-[#555555] leading-relaxed">
                Ideal for high-value Nakshi Kantha textiles, brass decorative centerpieces, sample sets,
                and urgent seasonal restocking runs. Flown out of Hazrat Shahjalal International Airport
                (DAC), Dhaka.
              </p>
              <div className="pt-3 border-t border-[#DDDDDD] space-y-1.5 text-xs text-[#444444]">
                <div className="flex justify-between">
                  <span className="text-[#777777]">Transit to Frankfurt / Amsterdam / CDG:</span>
                  <span className="font-mono font-medium">[REPLACE: 4–7 days]</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#777777]">Courier Sample Transit (DHL / FedEx):</span>
                  <span className="font-mono font-medium">[REPLACE: 3–5 days]</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#777777]">Consolidation:</span>
                  <span className="font-mono">Direct airway bill (MAWB / HAWB)</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: European Trade & Customs Compliance */}
        <section id="compliance" className="border-t border-[#E5E5E5] pt-16 space-y-8">
          <div>
            <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#777777] block">
              REGULATORY COMPLIANCE
            </span>
            <h2 className="text-xl sm:text-2xl font-bold tracking-[0.15em] uppercase text-[#111111] mt-1">
              Documentation & European Import Standards
            </h2>
            <div className="w-12 h-px bg-[#111111] mt-3" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {SITE_CONFIG.complianceHighlights.map((comp) => (
              <div key={comp.title} className="p-6 border border-[#E5E5E5] bg-white space-y-2">
                <div className="flex items-center space-x-2">
                  <FileCheck className="w-4 h-4 text-[#111111]" />
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#111111]">
                    {comp.title}
                  </h3>
                </div>
                <p className="text-xs text-[#555555] leading-relaxed">{comp.detail}</p>
              </div>
            ))}
          </div>

          <div className="p-6 bg-[#FAFAFA] border border-[#E5E5E5] space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#111111]">
              Standard European Export Document Suite Included with Every Consignment:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs text-[#444444]">
              <div className="p-2.5 bg-white border border-[#E5E5E5]">
                <strong className="block text-[#111111]">1. Commercial Invoice</strong>
                <span className="text-[11px] text-[#777777]">Detailed HS codes & CIF amounts</span>
              </div>
              <div className="p-2.5 bg-white border border-[#E5E5E5]">
                <strong className="block text-[#111111]">2. Packing List</strong>
                <span className="text-[11px] text-[#777777]">Net/gross weights & cubic meters</span>
              </div>
              <div className="p-2.5 bg-white border border-[#E5E5E5]">
                <strong className="block text-[#111111]">3. Certificate of Origin</strong>
                <span className="text-[11px] text-[#777777]">EPB issued REX / GSP Form A</span>
              </div>
              <div className="p-2.5 bg-white border border-[#E5E5E5]">
                <strong className="block text-[#111111]">4. Phytosanitary Certificate</strong>
                <span className="text-[11px] text-[#777777]">Official Plant Quarantine Station</span>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Export Packaging & Moisture Control */}
        <section className="border-t border-[#E5E5E5] pt-16 space-y-8">
          <div>
            <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#777777] block">
              PACKAGING INTEGRITY
            </span>
            <h2 className="text-xl sm:text-2xl font-bold tracking-[0.15em] uppercase text-[#111111] mt-1">
              Moisture Protection & Sustainable Packaging
            </h2>
            <div className="w-12 h-px bg-[#111111] mt-3" />
          </div>

          <div className="space-y-4 text-xs sm:text-sm text-[#555555] leading-relaxed">
            <p>
              Natural fibers (such as seagrass, raw jute, and bamboo) absorb humidity during tropical
              monsoons and trans-oceanic passage across the Indian Ocean and Red Sea / Cape route.
            </p>
            <p>
              To ensure pristine condition upon arrival in European warehouses, our export protocol enforces:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-xs text-[#444444]">
              <li>
                <strong>Calibrated Moisture Verification:</strong> Fibers must test below 12% moisture
                content using electronic wood/fiber hygrometers before carton sealing.
              </li>
              <li>
                <strong>Heavy-Duty Outer Cartons:</strong> 5-ply or 7-ply double-wall corrugated cartons
                with edge crush test (ECT) ratings suitable for container stacking without deformation.
              </li>
              <li>
                <strong>Eco-Friendly Inner Wrap:</strong> Unbleached kraft paper and biodegradable inner
                wrapping (strict conformity with EU Packaging Directive 94/62/EC).
              </li>
              <li>
                <strong>Transit Desiccants:</strong> High-adsorption container desiccant poles and food-safe
                clay/silica packs in every carton to prevent mold growth during ocean condensation cycles.
              </li>
            </ul>
          </div>
        </section>

        {/* CTA Bar */}
        <div className="bg-[#111111] text-white p-8 sm:p-12 text-center space-y-4">
          <h3 className="text-lg font-bold tracking-[0.2em] uppercase text-white">
            Ready to Request European CIF Quotations?
          </h3>
          <p className="text-xs text-[#AAAAAA] max-w-lg mx-auto leading-relaxed">
            Send us your item selections and delivery port (Hamburg, Rotterdam, Le Havre, Antwerp, etc.)
            to receive an itemized quotation including estimated container CBM.
          </p>
          <div className="pt-2 flex justify-center gap-4">
            <Link
              href="/collections"
              className="px-6 py-3 bg-white text-[#111111] text-xs uppercase tracking-[0.15em] font-medium hover:bg-neutral-200 transition-colors"
            >
              Browse Export Catalog
            </Link>
            <Link
              href="/contact"
              className="px-6 py-3 border border-white text-white text-xs uppercase tracking-[0.15em] font-medium hover:bg-white hover:text-black transition-colors"
            >
              Contact Export Desk
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
