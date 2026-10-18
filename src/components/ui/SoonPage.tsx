import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export function SoonPage({ title }: { title: string }) {
  return <><Navbar /><main className="container-page grid min-h-[65svh] place-items-center py-20 text-center"><div><span className="display text-7xl text-gold-300">ت</span><h1 className="display mt-5 text-4xl font-semibold md:text-5xl">{title}</h1><p className="mx-auto mt-4 max-w-md text-stone-600">هذه الصفحة ضمن المرحلة التالية من البناء. جهّزنا مسارها ونظامها البصري وسيتم ربط وظائفها تباعًا.</p><Link href="/" className="mt-8 inline-flex min-h-12 items-center gap-2 rounded-full border border-espresso-900 px-6 font-semibold transition hover:bg-espresso-900 hover:text-ivory-100"><ArrowRight size={18} /> العودة للرئيسية</Link></div></main><Footer /></>;
}
