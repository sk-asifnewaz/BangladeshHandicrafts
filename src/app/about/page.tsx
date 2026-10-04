import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Users, HeartHandshake, Leaf, ShieldCheck } from "lucide-react";
import { SITE_CONFIG } from "@/data/site";

export const metadata: Metadata = {
  title: "About Our Artisans & Heritage | Bangladesh Handicrafts",
  description:
    "Discover how Bangladesh Handicrafts unites rural artisan clusters across Bangladesh with ethical wholesale buyers and importers in Europe.",
};

export default function AboutPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Editorial Header */}
      <div className="border-b border-[#E5E5E5] bg-[#F2F2F2] py-14 sm:py-20 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#777777] block mb-2">
            HERITAGE & PROVENANCE
          </span>
          <h1 className="text-2xl sm:text-4xl font-bold tracking-[0.2em] uppercase text-[#111111] mb-4">
            Honest Craft, Direct from Bengal
          </h1>
          <p className="text-xs sm:text-sm text-[#555555] max-w-2xl mx-auto leading-relaxed">
            Bridging rural artisan cooperatives across Bangladesh with conscientious retail brands,
            department stores, and interior architects throughout Europe.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 space-y-16 sm:space-y-24">
        {/* Section 1: The Company Story */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="space-y-4">
            <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#777777] block">
              OUR MISSION
            </span>
            <h2 className="text-xl sm:text-2xl font-bold tracking-[0.15em] uppercase text-[#111111]">
              Preserving Living Heritage Through Ethical Trade
            </h2>
            <div className="w-12 h-px bg-[#111111]" />
            <p className="text-xs sm:text-sm leading-relaxed text-[#555555]">
              Bangladesh Handicrafts was established to provide direct global market access for master
              craftsmen and rural women artisans across Bangladesh. Generational techniques—such as
              delta seagrass braiding, Dhokra lost-wax brass casting, and Nakshi Kantha needlework—risk
              extinction when artisans are disconnected from sustainable economic livelihoods.
            </p>
            <p className="text-xs sm:text-sm leading-relaxed text-[#555555]">
              By partnering directly with village producer clusters, we eliminate multi-tier intermediary
              markups, ensure fair living wages, and supply European wholesale buyers with certified,
              plastic-free home collections.
            </p>
          </div>

          <div className="relative aspect-square bg-[#F2F2F2] border border-[#E5E5E5] overflow-hidden">
            <Image
              src="/hero/slide-1.jpg"
              alt="Rural Bangladeshi master artisan handcrafting natural jute goods"
              fill
              className="object-cover"
            />
            <div className="absolute bottom-3 left-3 bg-white/95 px-2.5 py-1 text-[10px] font-mono uppercase tracking-widest text-[#444444]">
              ARTISAN VILLAGE HUB · JESSORE
            </div>
          </div>
        </div>

        {/* Section 2: Core Values Grid */}
        <div className="border-t border-b border-[#E5E5E5] py-14">
          <div className="text-center mb-10">
            <h3 className="text-sm font-bold tracking-[0.2em] uppercase text-[#111111]">
              Our Guiding Principles
            </h3>
            <div className="w-8 h-px bg-[#111111] mx-auto mt-2" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-2 text-center md:text-left">
              <div className="w-10 h-10 border border-[#111111] flex items-center justify-center mx-auto md:mx-0 mb-3">
                <Leaf className="w-5 h-5 text-[#111111]" />
              </div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#111111]">
                100% Rapidly Renewable Fibers
              </h4>
              <p className="text-xs text-[#555555] leading-relaxed">
                Raw materials are harvested along riverbanks and agricultural fallow lands: golden jute,
                wild delta sea grass, borak bamboo, and date palm fronds. Zero petrochemical filaments or
                synthetic glues.
              </p>
            </div>

            <div className="space-y-2 text-center md:text-left">
              <div className="w-10 h-10 border border-[#111111] flex items-center justify-center mx-auto md:mx-0 mb-3">
                <HeartHandshake className="w-5 h-5 text-[#111111]" />
              </div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#111111]">
                Equitable Living Wages
              </h4>
              <p className="text-xs text-[#555555] leading-relaxed">
                Over [REPLACE: 85%] of our artisan partners are rural women working in cooperative
                clusters. Earnings provide financial autonomy, child healthcare, and educational
                advancement in agricultural regions.
              </p>
            </div>

            <div className="space-y-2 text-center md:text-left">
              <div className="w-10 h-10 border border-[#111111] flex items-center justify-center mx-auto md:mx-0 mb-3">
                <ShieldCheck className="w-5 h-5 text-[#111111]" />
              </div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#111111]">
                European Commercial Standards
              </h4>
              <p className="text-xs text-[#555555] leading-relaxed">
                We combine village authenticity with industrial-grade export discipline: rigorous
                sub-12% moisture control, phytosanitary fumigation, REACH chemical compliance, and
                standardized master carton packaging.
              </p>
            </div>
          </div>
        </div>

        {/* Section 3: Artisan Clusters Map & Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="relative aspect-[4/3] bg-[#F2F2F2] border border-[#E5E5E5] overflow-hidden order-2 md:order-1">
            <Image
              src="/hero/slide-2.jpg"
              alt="Artisan cluster weaving brass and natural materials"
              fill
              className="object-cover"
            />
            <div className="absolute bottom-3 left-3 bg-white/95 px-2.5 py-1 text-[10px] font-mono uppercase tracking-widest text-[#444444]">
              TRADITIONAL BRASS FORGE · DHAMRAI
            </div>
          </div>

          <div className="space-y-4 order-1 md:order-2">
            <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#777777] block">
              REGIONAL SPECIALIZATIONS
            </span>
            <h2 className="text-xl sm:text-2xl font-bold tracking-[0.15em] uppercase text-[#111111]">
              Key Artisan Clusters Across Bangladesh
            </h2>
            <div className="w-12 h-px bg-[#111111]" />
            <div className="space-y-3 text-xs leading-relaxed text-[#555555]">
              <p>
                <strong className="text-[#111111] uppercase tracking-wider block">
                  Dhamrai & Tangail (Bell-Metal & Brass):
                </strong>
                Generational brass casters practicing ancient lost-wax casting and hand-beaten vessel
                spinning dating back four centuries.
              </p>
              <p>
                <strong className="text-[#111111] uppercase tracking-wider block">
                  Barishal & Noakhali (Delta Seagrass & Hogla):
                </strong>
                Coastal weaving communities converting harvested tidal reed marsh grasses into
                resilient laundry baskets, trays, and floor totes.
              </p>
              <p>
                <strong className="text-[#111111] uppercase tracking-wider block">
                  Jessore & Jamalpur (Nakshi Kantha Needlecraft):
                </strong>
                Generations of women artisans practicing traditional narrative running stitches on
                pure cotton voiles.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Strip */}
        <div className="bg-[#F2F2F2] p-8 sm:p-12 text-center border border-[#E5E5E5] space-y-4">
          <h3 className="text-base sm:text-lg font-bold tracking-[0.15em] uppercase text-[#111111]">
            Partner with Our Artisan Network
          </h3>
          <p className="text-xs text-[#555555] max-w-lg mx-auto leading-relaxed">
            We welcome custom OEM specifications, private label branding, and bulk sampling for
            European retail chains and interior projects.
          </p>
          <div className="pt-2 flex justify-center gap-4">
            <Link
              href="/collections"
              className="px-6 py-3 bg-[#111111] text-white text-xs uppercase tracking-[0.15em] hover:bg-black transition-colors"
            >
              Browse Catalog
            </Link>
            <Link
              href="/contact"
              className="px-6 py-3 border border-[#111111] text-[#111111] text-xs uppercase tracking-[0.15em] hover:bg-[#111111] hover:text-white transition-colors"
            >
              Contact Export Desk
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
