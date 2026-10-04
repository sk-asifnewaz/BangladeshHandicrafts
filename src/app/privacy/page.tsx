import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { SITE_CONFIG } from "@/data/site";

export const metadata: Metadata = {
  title: "Privacy & Data Protection Policy | Bangladesh Handicrafts",
  description:
    "Privacy and data protection commitment for European B2B buyers under the EU General Data Protection Regulation (GDPR).",
};

export default function PrivacyPage() {
  return (
    <div className="bg-white min-h-screen">
      <div className="border-b border-[#E5E5E5] bg-[#F2F2F2] py-14 sm:py-18 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#777777] block mb-2">
            LEGAL COMPLIANCE
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-[0.2em] uppercase text-[#111111] mb-2">
            Privacy & Data Policy
          </h1>
          <p className="text-xs text-[#555555]">
            Last updated: October 2026 · Compliant with EU General Data Protection Regulation (GDPR)
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="prose prose-sm max-w-none text-xs sm:text-sm text-[#444444] space-y-8 leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-sm font-bold uppercase tracking-wider text-[#111111]">
              1. Overview & Commitment to Zero Unnecessary Tracking
            </h2>
            <p>
              Bangladesh Handicrafts operates as an export catalog and portfolio website connecting
              Bangladeshi master artisans with wholesale importers, interior designers, and retail clients worldwide.
              We welcome inquiries for both volume wholesale orders and individual retail purchases. We do not operate
              programmatic behavioral ad tracking networks, third-party analytics beacons, or user tracking scripts.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-sm font-bold uppercase tracking-wider text-[#111111]">
              2. Cookies & Local Storage Usage
            </h2>
            <p>
              Our website uses strictly essential client-side browser storage (such as <code>localStorage</code>)
              for functional conveniences requested by the user:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs text-[#555555]">
              <li>
                <strong>Export Enquiry List:</strong> Storing the SKUs and quantities of handcrafted items
                you have selected during your browsing session so your inquiry list persists across page visits.
              </li>
              <li>
                <strong>Cookie Notice Acknowledgment:</strong> Storing your confirmation that you have read
                our notice.
              </li>
            </ul>
            <p>
              We do not place tracking cookies, advertising identifiers, or cross-domain tracking pixels on your device.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-sm font-bold uppercase tracking-wider text-[#111111]">
              3. Data Collected Through Wholesale Inquiries
            </h2>
            <p>
              When you voluntarily submit an Export Enquiry or contact form, we collect the following business
              contact details provided by you:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs text-[#555555]">
              <li>Your name and job title / role</li>
              <li>Company / brand name and registered jurisdiction</li>
              <li>Business email address and telephone/WhatsApp number</li>
              <li>Delivery country, target port, and selected product specifications</li>
            </ul>
            <p>
              This data is processed solely for the legitimate business purpose of calculating CIF/FOB pricing,
              validating Minimum Order Quantities (MOQ), and preparing export documentation.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-sm font-bold uppercase tracking-wider text-[#111111]">
              4. Data Sharing & Retention
            </h2>
            <p>
              Your commercial data is never sold, leased, or distributed to third parties for marketing purposes.
              Data is disclosed only to licensed freight forwarders, customs brokers, and plant quarantine
              authorities strictly necessary to execute international export consignments.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-sm font-bold uppercase tracking-wider text-[#111111]">
              5. Your Rights Under GDPR
            </h2>
            <p>
              If you represent an entity located within the European Economic Area (EEA), you possess the right to:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs text-[#555555]">
              <li>Request access to commercial records containing your personal business contact details.</li>
              <li>Request rectification or erasure of obsolete communications records.</li>
              <li>Object to any direct email follow-up regarding new seasonal catalog line sheets.</li>
            </ul>
          </section>

          <section className="space-y-3 pt-4 border-t border-[#E5E5E5]">
            <h2 className="text-sm font-bold uppercase tracking-wider text-[#111111]">
              6. Data Controller Inquiries
            </h2>
            <p>
              For any questions regarding our data practices or to request data removal, please contact our
              export compliance officer at:
            </p>
            <p className="font-mono text-xs text-[#111111]">
              Email: {SITE_CONFIG.contact.email}
              <br />
              Office: {SITE_CONFIG.contact.address}
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
