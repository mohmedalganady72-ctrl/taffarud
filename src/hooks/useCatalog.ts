"use client";

import { useEffect, useState } from "react";
import { DEMO_PRODUCTS } from "@/lib/catalog/data";
import { hasSupabasePublicEnv } from "@/lib/env";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import type { BagTypeRow, ReadyProductRow } from "@/types/database";
import type { BagTypeSlug, CatalogProduct } from "@/types/catalog";

type CatalogState = {
  products: CatalogProduct[];
  loading: boolean;
  source: "demo" | "supabase";
};

function mapProduct(
  row: ReadyProductRow,
  bagTypes: Map<number, BagTypeRow>,
  imageUrl: (path: string) => string
): CatalogProduct | null {
  const bagType = bagTypes.get(row.bag_type_id);
  if (!bagType) return null;

  return {
    id: String(row.id),
    slug: row.slug,
    name: row.name,
    description: row.description ?? "قطعة جاهزة صُنعت بعناية لترافق تفاصيل يومك.",
    bagType: bagType.slug as BagTypeSlug,
    bagTypeName: bagType.name,
    size: row.size,
    price: Number(row.price),
    images: row.image_paths.map(imageUrl),
    stock: row.stock,
    isFeatured: row.is_featured,
  };
}

export function useCatalog() {
  const [state, setState] = useState<CatalogState>({
    products: DEMO_PRODUCTS,
    loading: hasSupabasePublicEnv(),
    source: "demo",
  });

  useEffect(() => {
    if (!hasSupabasePublicEnv()) return;

    let active = true;
    const supabase = getSupabaseBrowserClient();

    async function loadCatalog() {
      const [productsResult, typesResult] = await Promise.all([
        supabase.from("ready_products").select("*").eq("is_active", true).order("created_at", { ascending: false }),
        supabase.from("bag_types").select("*").eq("is_active", true).order("sort_order"),
      ]);

      if (!active) return;

      if (productsResult.error || typesResult.error || !productsResult.data?.length) {
        setState({ products: DEMO_PRODUCTS, loading: false, source: "demo" });
        return;
      }

      const bagTypes = new Map(typesResult.data.map((type) => [type.id, type]));
      const imageUrl = (path: string) =>
        supabase.storage.from("catalog-images").getPublicUrl(path).data.publicUrl;
      const products = productsResult.data.flatMap((row) => {
        const product = mapProduct(row, bagTypes, imageUrl);
        return product ? [product] : [];
      });

      setState({ products, loading: false, source: "supabase" });
    }

    void loadCatalog();
    return () => { active = false; };
  }, []);

  return state;
}
