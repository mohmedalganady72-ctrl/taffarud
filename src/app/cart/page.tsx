"use client";

import Link from "next/link";
import { ArrowRight, ShoppingBag } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CartItem } from "@/components/cart/CartItem";
import { CartSummary } from "@/components/cart/CartSummary";
import { useCart } from "@/hooks/useCart";

export default function CartPage() {
  const { items, subtotal, hydrated } = useCart();

  return <><Navbar /><main className="container-page section-space pt-12"><h1 className="display text-[clamp(2.5rem,5vw,4rem)] font-semibold">سلتك</h1>{!hydrated ? <div className="skeleton mt-10 h-72 rounded-card" /> : items.length ? <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_360px]"><section aria-label="منتجات السلة">{items.map((item) => <CartItem key={item.product.id} item={item} />)}</section><CartSummary subtotal={subtotal} /></div> : <div className="grid min-h-[50svh] place-items-center text-center"><div><ShoppingBag className="mx-auto text-gold-700" size={48} strokeWidth={1.2} /><h2 className="display mt-5 text-3xl font-semibold">سلتك فارغة</h2><p className="mt-3 text-stone-600">اكتشفي القطع الجاهزة واختاري ما يشبهك.</p><Link href="/shop" className="mt-7 inline-flex min-h-12 items-center gap-2 rounded-full bg-espresso-900 px-7 font-semibold text-ivory-100"><ArrowRight size={18} /> تصفحي المتجر</Link></div></div>}</main><Footer /></>;
}
