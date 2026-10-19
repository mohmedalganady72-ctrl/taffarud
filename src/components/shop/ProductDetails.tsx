"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, PackageCheck, ShieldCheck, ShoppingBag } from "lucide-react";
import { useState } from "react";
import { useCatalog } from "@/hooks/useCatalog";
import { useCart } from "@/hooks/useCart";
import { formatPrice } from "@/lib/utils/format-price";

export function ProductDetails({ slug }: { slug: string }) {
  const { products, loading } = useCatalog();
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);
  const product = products.find((item) => item.slug === slug);

  if (loading && !product) return <div className="container-page section-space"><div className="skeleton min-h-[560px] rounded-image" /></div>;
  if (!product) return <div className="container-page grid min-h-[60svh] place-items-center text-center"><div><h1 className="display text-4xl font-semibold">القطعة غير موجودة</h1><Link href="/shop" className="mt-6 inline-flex items-center gap-2 text-gold-700"><ArrowRight size={18} /> العودة للمتجر</Link></div></div>;

  const selectedProduct = product;
  const soldOut = selectedProduct.stock < 1;
  function handleAdd() {
    addItem(selectedProduct);
    setAdded(true);
  }

  return <main className="container-page section-space pt-10">
    <Link href="/shop" className="inline-flex min-h-11 items-center gap-2 text-sm text-stone-600 hover:text-gold-700"><ArrowRight size={17} /> العودة للمتجر</Link>
    <div className="mt-6 grid gap-10 lg:grid-cols-2 lg:gap-16">
      <div className="relative aspect-[4/5] overflow-hidden rounded-image bg-sand-200"><Image src={selectedProduct.images[0]} alt={selectedProduct.name} fill priority unoptimized={selectedProduct.images[0].startsWith("http")} sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" /></div>
      <div className="lg:sticky lg:top-28 lg:self-start">
        <p className="text-sm text-gold-700">{selectedProduct.bagTypeName} · {selectedProduct.size === "small" ? "حجم صغير" : "حجم كبير"}</p>
        <h1 className="display mt-3 text-[clamp(2.25rem,4vw,3.75rem)] font-semibold">{selectedProduct.name}</h1>
        <p className="mt-5 text-2xl font-semibold tabular-nums">{formatPrice(selectedProduct.price)}</p>
        <p className="mt-7 max-w-xl leading-8 text-stone-600">{selectedProduct.description}</p>
        <ul className="mt-8 space-y-3 text-sm"><li className="flex items-center gap-3"><Check size={18} className="text-forest-800" /> جاهزة للشحن</li><li className="flex items-center gap-3"><PackageCheck size={18} className="text-forest-800" /> التوصيل مشمول في السعر</li><li className="flex items-center gap-3"><ShieldCheck size={18} className="text-forest-800" /> فحص جودة قبل الشحن</li></ul>
        <button onClick={handleAdd} disabled={soldOut} className="mt-10 inline-flex min-h-[54px] w-full items-center justify-center gap-3 rounded-full bg-gold-500 px-8 font-semibold transition hover:bg-gold-700 hover:text-white disabled:cursor-not-allowed disabled:bg-sand-300 disabled:text-stone-600"><ShoppingBag size={20} /> {soldOut ? "نفدت الكمية" : added ? "تمت الإضافة إلى السلة" : "أضيفي إلى السلة"}</button>
        {added ? <Link href="/cart" className="mt-4 block text-center text-sm text-gold-700 underline underline-offset-4">عرض السلة</Link> : null}
        <p className="mt-5 text-center text-xs text-stone-600">متوفر حاليًا: {selectedProduct.stock} قطع</p>
      </div>
    </div>
  </main>;
}
