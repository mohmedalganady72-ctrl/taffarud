"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { formatPrice } from "@/lib/utils/format-price";
import type { CartItemData } from "@/context/CartProvider";

export function CartItem({ item }: { item: CartItemData }) {
  const { updateQuantity, removeItem } = useCart();
  const { product, quantity } = item;

  return <article className="grid grid-cols-[96px_1fr] gap-4 border-b border-sand-300 py-6 sm:grid-cols-[128px_1fr_auto] sm:gap-6">
    <Link href={`/shop/${product.slug}`} className="relative aspect-[4/5] overflow-hidden rounded-xl bg-sand-200">
      <Image src={product.images[0]} alt={product.name} fill unoptimized={product.images[0].startsWith("http")} sizes="128px" className="object-cover" />
    </Link>
    <div>
      <p className="text-xs text-stone-600">{product.bagTypeName} · {product.size === "small" ? "صغير" : "كبير"}</p>
      <Link href={`/shop/${product.slug}`} className="mt-1 block font-semibold hover:text-gold-700">{product.name}</Link>
      <p className="mt-2 text-sm font-semibold tabular-nums">{formatPrice(product.price)}</p>
      <div className="mt-4 inline-flex items-center rounded-full border border-sand-300 bg-ivory-50">
        <button onClick={() => updateQuantity(product.id, quantity - 1)} disabled={quantity <= 1} className="grid size-10 place-items-center disabled:opacity-35" aria-label="تقليل الكمية"><Minus size={15} /></button>
        <span className="min-w-8 text-center text-sm tabular-nums" aria-live="polite">{quantity}</span>
        <button onClick={() => updateQuantity(product.id, quantity + 1)} disabled={quantity >= product.stock} className="grid size-10 place-items-center disabled:opacity-35" aria-label="زيادة الكمية"><Plus size={15} /></button>
      </div>
    </div>
    <button onClick={() => removeItem(product.id)} className="col-start-2 inline-flex min-h-11 items-center gap-2 self-end justify-self-start text-sm text-red-800 hover:underline sm:col-start-3 sm:row-start-1 sm:self-center" aria-label={`حذف ${product.name} من السلة`}><Trash2 size={17} /> حذف</button>
  </article>;
}
