export const SITE_CONFIG = {
  name: "BANGLADESH HANDICRAFTS",
  domain: "bangladeshhandicrafts.shop",
  tagline: "Exquisite Handmade Handicrafts for European Importers & Retailers",
  description:
    "B2B export catalog connecting artisan craft clusters in Bangladesh with wholesale buyers, interior brands, and department stores across Germany, France, the Netherlands, Scandinavia, and all of Europe.",
  baseUrl: "https://bangladeshhandicrafts.shop",
  showPrices: false, // SHOW_PRICES flag (default false) -> shows "Price on request"

  contact: {
    email: "zahir.ahmed@bangladeshhandicrafts.shop",
    phone: "[REPLACE: +880 1700-000000]",
    whatsapp: "[REPLACE: +880 1700-000000]",
    whatsappClean: "8801700000000",
    address: "[REPLACE: Export Display Suite & Head Office, Gulshan-2, Dhaka 1212, Bangladesh]",
    portOfLoading: "Chittagong Port (Sea Freight) / Hazrat Shahjalal International Airport, Dhaka (Air Cargo)",
    workingHours: "Sunday – Thursday: 09:00 – 18:00 (GMT+6)",
  },

  socials: {
    linkedin: "https://linkedin.com/company/[REPLACE: bangladesh-handicrafts]",
    instagram: "https://instagram.com/[REPLACE: bangladeshhandicrafts]",
    whatsapp: "https://wa.me/8801700000000",
  },

  // Centralized strings for future i18n localization (English, German, French)
  i18n: {
    en: {
      siteName: "BANGLADESH HANDICRAFTS",
      nav: {
        home: "HOME",
        collections: "COLLECTIONS",
        about: "ABOUT US",
        exportToEurope: "EXPORT TO EUROPE",
        contact: "CONTACT",
        allCategories: "ALL CATEGORIES",
      },
      catalog: {
        shopByCategory: "SHOP BY CATEGORY",
        featuredCollection: "FEATURED EXPORT COLLECTIONS",
        allProducts: "ALL EXPORT PRODUCTS",
        filterByMaterial: "FILTER BY MATERIAL",
        filterByType: "FILTER BY PRODUCT TYPE",
        showingResults: "Showing {start} to {end} of {total} products",
        sortBy: "Sort by",
        sortDefault: "Featured",
        sortAZ: "Name (A to Z)",
        sortZA: "Name (Z to A)",
        sortMaterial: "Material",
        priceOnRequest: "Price on request",
        addToEnquiry: "Add to Enquiry List",
        addedToEnquiry: "In Enquiry List",
        requestQuote: "Request a Quote",
        viewDetails: "View Details",
        noResultsFound: "No products match the selected filters.",
        clearFilters: "Clear all filters",
        backToCatalog: "Back to Catalog",
        specsTitle: "Export Specifications",
        dimensions: "Dimensions",
        material: "Material",
        moq: "Minimum Order Quantity (MOQ)",
        leadTime: "Standard Lead Time",
        packaging: "Export Packaging",
        hsCode: "Harmonized System (HS) Code",
        origin: "Origin",
        tags: "Classification",
        youMayAlsoLike: "YOU MAY ALSO LIKE",
      },
      enquiryDrawer: {
        title: "EXPORT ENQUIRY LIST",
        emptySubtitle: "Your enquiry list is currently empty.",
        emptyHint: "Browse the catalog to add items for wholesale quotation.",
        browseCatalog: "Browse Collections",
        itemCount: "{count} product(s) selected",
        quantity: "Qty (units)",
        remove: "Remove",
        formHeading: "Request Wholesale Quotation",
        formIntro: "Submit this list directly to our export sourcing desk for CIF/FOB European port quotations and sample availability.",
        nameLabel: "Contact Name",
        emailLabel: "Business Email",
        companyLabel: "Company Name / Organization",
        countryLabel: "Destination Country",
        notesLabel: "Special Sourcing Notes / Target Port",
        submitButton: "Send Wholesale Enquiry",
        submitting: "Submitting Enquiry...",
        successTitle: "Enquiry Sent Successfully",
        successMessage: "Thank you for contacting Bangladesh Handicrafts. Our export coordinator will review your requested items and send an official quote within 24-48 business hours.",
      },
      exportSection: {
        title: "EXPORTING TO EUROPE",
        subtitle: "DIRECT PROVENANCE FROM BANGLADESHI ARTISAN HUBS TO EUROPEAN RETAIL PORTS",
        description: "We work directly with artisan cooperatives and heritage clusters across rural Bangladesh, bringing sustainably harvested plant fibers, hand-beaten brass, and master terracotta to department stores, concept shops, and ethical homeware brands across the European Union.",
        countriesTitle: "Primary European Destinations Served",
        complianceTitle: "European Trade & Compliance Standards",
        stepsTitle: "OUR FOUR-STAGE EXPORT PROCESS",
      },
      brandStatement: {
        heading: "HERITAGE FIBERS. ETHICAL HARVESTS. HONEST CRAFT.",
        body: "Every basket, planter, brass vessel, and hand-embroidered textile is shaped entirely by hand using ancient Bangladeshi craft traditions. By sourcing raw sea grass, date palm, natural jute, and river cane directly from agricultural villages, we foster equitable livelihoods for rural craftswomen while supplying European buyers with authentic, zero-plastic artisanal homeware.",
      },
      footer: {
        aboutCompany: "Bangladesh Handicrafts is a dedicated B2B wholesale and export platform facilitating ethical trade between rural Bangladeshi master artisans and European importers, retailers, and interior designers.",
        quickLinks: "Quick Navigation",
        categories: "Craft Materials",
        legal: "Legal & Trade",
        copyright: "© {year} Bangladesh Handicrafts. All rights reserved.",
        disclaimer: "Strictly B2B Wholesale & Custom Export Production. Retail purchasing not offered.",
        cookieNotice: "We use essential cookies solely to remember your enquiry list and preferences. No third-party tracking or advertising cookies are utilized.",
        acceptCookies: "Acknowledge",
      },
    },
  },

  // Target European countries served
  europeanDestinations: [
    { name: "Germany", code: "DE", mainPorts: "Hamburg, Bremen, Frankfurt (Air)" },
    { name: "France", code: "FR", mainPorts: "Le Havre, Marseille, Paris CDG (Air)" },
    { name: "Netherlands", code: "NL", mainPorts: "Rotterdam, Amsterdam Schiphol (Air)" },
    { name: "Belgium", code: "BE", mainPorts: "Antwerp, Brussels (Air)" },
    { name: "Denmark", code: "DK", mainPorts: "Copenhagen, Aarhus" },
    { name: "Sweden", code: "SE", mainPorts: "Gothenburg, Stockholm" },
    { name: "Italy", code: "IT", mainPorts: "Genoa, La Spezia, Milan (Air)" },
    { name: "Spain", code: "ES", mainPorts: "Valencia, Barcelona" },
    { name: "Austria", code: "AT", mainPorts: "Vienna (via Hamburg / Koper rail link)" },
    { name: "Switzerland", code: "CH", mainPorts: "Basel / Zurich" },
    { name: "United Kingdom", code: "GB", mainPorts: "Felixstowe, Southampton, London (Air)" },
    { name: "Norway", code: "NO", mainPorts: "Oslo" },
  ],

  // 4-stage export process
  processSteps: [
    {
      step: "01",
      title: "ARTISAN HANDCRAFTING",
      description:
        "Harvested natural fibers—jute, sea grass, rattan, and clay—are processed and hand-formed by skilled village artisans following generational techniques.",
    },
    {
      step: "02",
      title: "QUALITY INSPECTION",
      description:
        "Every production run undergoes strict dimensional checks, moisture-level testing (sub-12% for European transit), weaving tension checks, and defect elimination.",
    },
    {
      step: "03",
      title: "EXPORT PACKAGING",
      description:
        "Products are wrapped in biodegradable protective layers, packed into 5-ply or 7-ply heavy-duty master export cartons with silica gel packs to prevent transit humidity.",
    },
    {
      step: "04",
      title: "PORT DISPATCH & SEA FREIGHT",
      description:
        "Consignments are loaded at Chittagong Port (FCL / LCL) or airfreighted from Dhaka, backed by full European customs documentation: GSP Form A / REX, Phytosanitary, and Bill of Lading.",
    },
  ],

  complianceHighlights: [
    {
      title: "Phytosanitary Certification",
      detail: "All plant fiber goods (seagrass, jute, cane, bamboo) are fumigated and accompanied by official government plant quarantine inspection certificates.",
    },
    {
      title: "EU GSP / Preferential Origin",
      detail: "Shipments include Registered Exporter (REX) system documentation providing duty-free or preferential tariff entry into EU member states.",
    },
    {
      title: "EU Packaging Waste Conformity",
      detail: "Cartons, labels, and strapping are designed in accordance with Directive 94/62/EC for recyclability and minimal environmental footprint.",
    },
    {
      title: "Strict Moisture & Mold Prevention",
      detail: "Kiln-dried and natural sun-cured materials monitored with calibrated pin-less moisture meters prior to carton sealing.",
    },
  ],
};
