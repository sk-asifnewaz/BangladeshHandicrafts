import React from "react";
import Link from "next/link";
import { ArrowUpRight, Mail, Phone, MapPin, Globe } from "lucide-react";
import { SITE_CONFIG } from "@/data/site";
import { CATEGORIES } from "@/data/categories";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#111111] text-white border-t border-[#222222]">
      {/* Top Export Notice Bar */}
      <div className="border-b border-[#222222] py-4 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#888888] gap-2">
          <div className="flex items-center space-x-2">
            <span className="w-1.5 h-1.5 bg-white inline-block" />
            <span className="tracking-widest uppercase font-mono text-[#CCCCCC]">
              B2B WHOLESALE & EXPORT PLATFORM
            </span>
          </div>
          <p className="tracking-wider">
            Direct consignment dispatch to European ports (Hamburg · Rotterdam · Antwerp · Le Havre)
          </p>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4 pr-0 lg:pr-8">
            <Link
              href="/"
              className="text-base font-bold tracking-[0.2em] uppercase text-white block"
            >
              {SITE_CONFIG.name}
            </Link>
            <p className="text-xs text-[#999999] leading-relaxed max-w-sm">
              {SITE_CONFIG.i18n.en.footer.aboutCompany}
            </p>
            <div className="pt-2 space-y-2 text-xs text-[#AAAAAA]">
              <div className="flex items-start space-x-2.5">
                <MapPin className="w-4 h-4 text-[#777777] flex-shrink-0 mt-0.5" />
                <span>{SITE_CONFIG.contact.address}</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <Mail className="w-4 h-4 text-[#777777] flex-shrink-0" />
                <a
                  href={`mailto:${SITE_CONFIG.contact.email}`}
                  className="hover:text-white transition-colors underline-offset-4 hover:underline"
                >
                  {SITE_CONFIG.contact.email}
                </a>
              </div>
              <div className="flex items-center space-x-2.5">
                <Globe className="w-4 h-4 text-[#777777] flex-shrink-0" />
                <span>{SITE_CONFIG.contact.portOfLoading}</span>
              </div>
            </div>
          </div>

          {/* Column 1: Collections */}
          <div>
            <h3 className="text-xs font-semibold tracking-[0.18em] uppercase text-white mb-4">
              {SITE_CONFIG.i18n.en.footer.categories}
            </h3>
            <ul className="space-y-2.5 text-xs text-[#AAAAAA]">
              {CATEGORIES.slice(0, 6).map((cat) => (
                <li key={cat.id}>
                  <Link
                    href={`/collections/${cat.slug}`}
                    className="hover:text-white transition-colors uppercase tracking-wider block"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Export & Services */}
          <div>
            <h3 className="text-xs font-semibold tracking-[0.18em] uppercase text-white mb-4">
              Export Desk
            </h3>
            <ul className="space-y-2.5 text-xs text-[#AAAAAA]">
              <li>
                <Link
                  href="/export-europe"
                  className="hover:text-white transition-colors uppercase tracking-wider block"
                >
                  Export to Europe
                </Link>
              </li>
              <li>
                <Link
                  href="/export-europe#shipping"
                  className="hover:text-white transition-colors uppercase tracking-wider block"
                >
                  Freight & Transit
                </Link>
              </li>
              <li>
                <Link
                  href="/export-europe#compliance"
                  className="hover:text-white transition-colors uppercase tracking-wider block"
                >
                  EU Standards & REX
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-white transition-colors uppercase tracking-wider block"
                >
                  Our Artisan Clusters
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-white transition-colors uppercase tracking-wider block"
                >
                  Request CIF Quotation
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Legal & Standards */}
          <div>
            <h3 className="text-xs font-semibold tracking-[0.18em] uppercase text-white mb-4">
              Trade Compliance
            </h3>
            <ul className="space-y-2.5 text-xs text-[#AAAAAA]">
              <li>
                <Link
                  href="/privacy"
                  className="hover:text-white transition-colors uppercase tracking-wider block"
                >
                  Privacy Policy (GDPR)
                </Link>
              </li>
              <li className="text-[11px] text-[#777777] pt-2 leading-relaxed">
                Registered in Dhaka, Bangladesh. Exporting strictly under authorized Bangladesh Export
                Promotion Bureau (EPB) and customs regulations.
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Hairline & Copyright */}
        <div className="border-t border-[#222222] mt-14 pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#777777] gap-4">
          <p className="font-mono">
            {SITE_CONFIG.i18n.en.footer.copyright.replace("{year}", currentYear.toString())}
          </p>
          <p className="tracking-wider uppercase">
            {SITE_CONFIG.i18n.en.footer.disclaimer}
          </p>
        </div>
      </div>
    </footer>
  );
}
