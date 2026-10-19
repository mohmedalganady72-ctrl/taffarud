import type { BagSize } from "@/types/database";

export type BagTypeSlug = "handbag" | "tote" | "pouch";

export type CatalogProduct = {
  id: string;
  slug: string;
  name: string;
  description: string;
  bagType: BagTypeSlug;
  bagTypeName: string;
  size: BagSize;
  price: number;
  images: string[];
  stock: number;
  isFeatured: boolean;
};

export type CatalogFilters = {
  bagType: BagTypeSlug | "all";
  size: BagSize | "all";
  maxPrice: number;
};
