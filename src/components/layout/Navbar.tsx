"use client";

import Link from "next/link";
import { Menu, ShoppingBag, UserRound, X } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/hooks/useCart";

const links = [
  ["الرئيسية", "/"], ["المتجر", "/shop"], ["صمّم شنطتك", "/design"], ["من نحن", "/about"]
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { itemCount, hydrated } = useCart();

  return (
    <header className="sticky top-0 z-50 border-b border-sand-300/80 bg-ivory-100/90 backdrop-blur-xl">
      <nav className="container-page flex h-16 items-center justify-between md:h-[76px]" aria-label="التنقل الرئيسي">
        <Link href="/" className="display text-3xl font-semibold leading-none" aria-label="تَفرّد، الرئيسية">تَفرّد</Link>
        <div className="hidden items-center gap-8 text-sm lg:flex">
          {links.map(([label, href]) => <Link key={href} href={href} className="transition hover:text-gold-700">{label}</Link>)}
        </div>
        <div className="flex items-center gap-2">
          <Link href="/cart" className="relative grid size-11 place-items-center rounded-full transition hover:bg-sand-200" aria-label={`السلة${itemCount ? `، ${itemCount} منتجات` : ""}`}><ShoppingBag size={20} strokeWidth={1.6} />{hydrated && itemCount > 0 ? <span className="absolute -left-0.5 -top-0.5 grid min-h-5 min-w-5 place-items-center rounded-full bg-gold-500 px-1 text-[10px] font-bold text-espresso-900" aria-hidden="true">{itemCount}</span> : null}</Link>
          <Link href="/auth/login" className="hidden min-h-11 items-center gap-2 rounded-full border border-sand-300 px-4 text-sm transition hover:border-gold-500 sm:flex"><UserRound size={18} strokeWidth={1.6} /> تسجيل الدخول</Link>
          <button className="grid size-11 place-items-center rounded-full lg:hidden" onClick={() => setOpen((v) => !v)} aria-expanded={open} aria-label={open ? "إغلاق القائمة" : "فتح القائمة"}>{open ? <X /> : <Menu />}</button>
        </div>
      </nav>
      {open ? (
        <div className="border-t border-sand-300 bg-ivory-50 px-5 py-5 lg:hidden">
          <div className="container-page flex flex-col gap-1">
            {links.map(([label, href]) => <Link key={href} href={href} onClick={() => setOpen(false)} className="min-h-12 rounded-xl px-3 py-2 hover:bg-sand-200">{label}</Link>)}
            <Link href="/auth/login" className="mt-2 min-h-12 rounded-xl bg-espresso-900 px-4 py-2 text-center text-ivory-100">تسجيل الدخول</Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}
