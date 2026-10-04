import type { Metadata } from "next";
import { Jost } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { EnquiryDrawer } from "@/components/EnquiryDrawer";
import { CookieConsent } from "@/components/CookieConsent";
import { EnquiryProvider } from "@/context/EnquiryContext";
import { SITE_CONFIG } from "@/data/site";

const jost = Jost({
  subsets: ["latin"],
  variable: "--font-jost",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.baseUrl),
  title: {
    default: "Bangladesh Handicrafts | Handmade Export Catalog & Portfolio",
    template: "%s | Bangladesh Handicrafts",
  },
  description:
    "Exquisite handmade handicrafts for European importers and retailers. Ethically crafted sea grass, rattan, natural jute, brass, terracotta, and Nakshi Kantha textiles direct from rural artisan clusters in Bangladesh.",
  keywords: [
    "Bangladesh Handicrafts",
    "Handmade Export Catalog",
    "Jute Baskets Europe",
    "Seagrass Planters Wholesale",
    "Rattan Furniture Export",
    "Dhokra Brass Castings",
    "Terracotta Urns Europe",
    "Nakshi Kantha Quilt",
    "B2B Wholesale Handicrafts",
    "bangladeshhandicrafts.shop",
  ],
  authors: [{ name: "Bangladesh Handicrafts" }],
  creator: "Bangladesh Handicrafts",
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: SITE_CONFIG.baseUrl,
    siteName: "Bangladesh Handicrafts",
    title: "Bangladesh Handicrafts | Export Catalog for European Buyers",
    description:
      "Direct artisan manufacturing: sustainable sea grass, jute, brass, terracotta, and heritage textiles for European retailers.",
    images: [
      {
        url: "/hero/slide-1.jpg",
        width: 1680,
        height: 720,
        alt: "Bangladesh Handicrafts Export Collections",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bangladesh Handicrafts | Export Catalog",
    description: "Handcrafted natural homeware for European importers.",
    images: ["/hero/slide-1.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.baseUrl,
    logo: `${SITE_CONFIG.baseUrl}/hero/slide-1.jpg`,
    description: SITE_CONFIG.description,
    address: {
      "@type": "PostalAddress",
      streetAddress: "[REPLACE: Gulshan-2]",
      addressLocality: "Dhaka",
      postalCode: "1212",
      addressCountry: "BD",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: SITE_CONFIG.contact.phone,
      contactType: "wholesale export sales",
      email: SITE_CONFIG.contact.email,
      availableLanguage: ["English", "German", "French"],
    },
  };

  return (
    <html lang="en" className={`${jost.variable} h-full scroll-smooth antialiased`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-white text-[#111111]">
        <EnquiryProvider>
          {/* Two-tier sticky header */}
          <Header />

          {/* Main page content */}
          <main className="flex-1">{children}</main>

          {/* Footer */}
          <Footer />

          {/* Global slide-out enquiry list drawer */}
          <EnquiryDrawer />

          {/* EU Cookie Notice */}
          <CookieConsent />
        </EnquiryProvider>
      </body>
    </html>
  );
}
