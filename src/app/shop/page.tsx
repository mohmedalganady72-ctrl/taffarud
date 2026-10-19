import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ProductGrid } from "@/components/shop/ProductGrid";

export const metadata: Metadata = { title: "المتجر" };

export default function ShopPage() {
  return <><Navbar /><main className="container-page section-space pt-12"><header className="max-w-3xl"><h1 className="display text-[clamp(2.5rem,5vw,4rem)] font-semibold">قطع جاهزة، اختيرت بعناية</h1><p className="mt-4 leading-8 text-stone-600">تشكيلة محدودة من الحقائب الجاهزة بتفاصيل هادئة وخامات عملية. السعر الظاهر شامل التوصيل.</p></header><div className="mt-12"><ProductGrid /></div></main><Footer /></>;
}
