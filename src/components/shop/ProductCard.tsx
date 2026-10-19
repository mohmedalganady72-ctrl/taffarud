"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/hooks/useCart";
import { formatPrice } from "@/lib/utils/format-price";
import type { CatalogProduct } from "@/types/catalog";

export function ProductCard({ product }: { product: CatalogProduct }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);
  const soldOut = product.stock < 1;

  function handleAdd() {
    addItem(product);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1600);
  }

  return <article className="group">
    <Link href={`/shop/${product.slug}`} className="block">
      <div className="relative aspect-[4/5] overflow-hidden rounded-card bg-sand-200">
        <Image src={product.images[0]} alt={product.name} fill unoptimized={product.images[0].startsWith("http")} sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw" className="object-cover transition duration-500 group-hover:scale-[1.04]" />
        {soldOut ? <span className="absolute inset-x-3 bottom-3 rounded-full bg-espresso-900/90 px-3 py-2 text-center text-xs text-ivory-100">نفدت الكمية</span> : null}
      </div>
      <p className="mt-4 text-xs text-stone-600">{product.bagTypeName} · {product.size === "small" ? "صغير" : "كبير"}</p>
      <h2 className="mt-1 font-semibold transition group-hover:text-gold-700">{product.name}</h2>
    </Link>
    <div className="mt-3 flex items-center justify-between gap-2">
      <span className="font-semibold tabular-nums">{formatPrice(product.price)}</span>
      <button onClick={handleAdd} disabled={soldOut} className="inline-flex min-h-11 items-center gap-2 rounded-full border border-sand-300 px-4 text-xs font-semibold transition hover:border-gold-500 hover:bg-gold-300 disabled:cursor-not-allowed disabled:opacity-40" aria-label={`أضيفي ${product.name} إلى السلة`}><ShoppingBag size={16} /> {added ? "تمت الإضافة" : "أضيفي للسلة"}</button>
    </div>
  </article>;
}
