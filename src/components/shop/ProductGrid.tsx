"use client";

import { useMemo, useState } from "react";
import { PackageOpen } from "lucide-react";
import { useCatalog } from "@/hooks/useCatalog";
import { ProductCard } from "@/components/shop/ProductCard";
import { ProductFilters } from "@/components/shop/ProductFilters";
import type { CatalogFilters } from "@/types/catalog";

const initialFilters: CatalogFilters = { bagType: "all", size: "all", maxPrice: 350 };

export function ProductGrid() {
  const { products, loading, source } = useCatalog();
  const [filters, setFilters] = useState(initialFilters);

  const filteredProducts = useMemo(() => products.filter((product) =>
    (filters.bagType === "all" || product.bagType === filters.bagType) &&
    (filters.size === "all" || product.size === filters.size) &&
    product.price <= filters.maxPrice
  ), [products, filters]);

  return <>
    <ProductFilters filters={filters} resultCount={filteredProducts.length} onChange={setFilters} />
    {source === "demo" && !loading ? <p className="mt-5 text-xs text-stone-600">تُعرض حاليًا تشكيلة تجريبية إلى أن يتم ربط كتالوج Supabase.</p> : null}
    {loading ? <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">{Array.from({ length: 4 }, (_, index) => <div key={index}><div className="skeleton aspect-[4/5] rounded-card" /><div className="skeleton mt-4 h-5 w-2/3 rounded" /></div>)}</div> : filteredProducts.length ? <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-12 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-7">{filteredProducts.map((product) => <ProductCard key={product.id} product={product} />)}</div> : <div className="grid min-h-80 place-items-center text-center"><div><PackageOpen className="mx-auto text-gold-700" size={40} strokeWidth={1.25} /><h2 className="mt-4 text-xl font-semibold">لا توجد قطع بهذه الخيارات</h2><button onClick={() => setFilters(initialFilters)} className="mt-4 text-sm text-gold-700 underline underline-offset-4">إعادة ضبط الفلاتر</button></div></div>}
  </>;
}
