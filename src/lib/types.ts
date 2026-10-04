export interface Category {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  captionTitle: string; // e.g. "WOVEN LIVING", "NATURAL SEAGRASS"
  bannerImage: string;
  tileImage: string;
  featured: boolean;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  categorySlug: string;
  categoryName: string;
  material: string; // e.g. "Sea Grass", "Rattan", "Jute", "Brass", "Terracotta", "Date Leaf", "Bamboo", "Nakshi Kantha Cotton"
  productType: string; // e.g. "Planter", "Basket", "Vase", "Wall Hanging", "Tableware", "Storage", "Throw", "Candle Stand"
  shortDescription: string;
  description: string;
  craftDetails: string;
  dimensions: string; // e.g. "[REPLACE: 35cm (D) x 40cm (H)]"
  moq: string; // e.g. "[REPLACE: 100 units]"
  leadTime: string; // e.g. "[REPLACE: 30-45 days]"
  exportPackaging: string; // e.g. "[REPLACE: Nested in master export cartons, biodegradable inner wraps]"
  hsCode: string; // e.g. "[REPLACE: 4602.19]"
  origin: string; // e.g. "Handcrafted in Bangladesh (Fair Trade Artisan Clusters)"
  tags: string[]; // e.g. ["New", "Best seller"]
  images: string[];
  isFeatured: boolean;
  price?: number; // Optional numerical price if SHOW_PRICES is true
}

export interface EnquiryItem {
  product: Product;
  quantity: number;
  notes?: string;
}

export interface FilterState {
  category: string;
  materials: string[];
  productTypes: string[];
  searchQuery: string;
  sortBy: "default" | "name-asc" | "name-desc" | "material";
  page: number;
}
