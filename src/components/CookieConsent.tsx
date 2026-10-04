"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { SITE_CONFIG } from "@/data/site";

const CONSENT_KEY = "bangladesh_handicrafts_cookie_ack";

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    try {
      const acknowledged = localStorage.getItem(CONSENT_KEY);
      if (!acknowledged) {
        setIsVisible(true);
      }
    } catch {
      // Storage unavailable
    }
  }, []);

  const handleAcknowledge = () => {
    try {
      localStorage.setItem(CONSENT_KEY, "true");
    } catch {
      // Ignore
    }
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div
      role="region"
      aria-label="Cookie and Privacy Notice"
      className="fixed bottom-0 inset-x-0 z-40 bg-white border-t border-[#E5E5E5] p-4 sm:px-8 shadow-xl"
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs text-[#555555] leading-relaxed max-w-4xl">
          {SITE_CONFIG.i18n.en.footer.cookieNotice}{" "}
          <Link
            href="/privacy"
            className="text-[#111111] underline underline-offset-2 hover:no-underline font-medium"
          >
            Learn more in our Privacy Policy
          </Link>
          .
        </p>
        <button
          onClick={handleAcknowledge}
          className="flex-shrink-0 px-6 py-2.5 bg-[#111111] text-white text-xs uppercase tracking-[0.15em] font-medium hover:bg-black transition-colors"
        >
          {SITE_CONFIG.i18n.en.footer.acceptCookies}
        </button>
      </div>
    </div>
  );
}
