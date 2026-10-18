import Image from "next/image";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/home/Hero";
import { HowItWorks } from "@/components/home/HowItWorks";
import { BagTypes } from "@/components/home/BagTypes";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { MaterialsShowcase } from "@/components/home/MaterialsShowcase";
import { FaqSection } from "@/components/home/FaqSection";
import { Button } from "@/components/ui/Button";

export default function HomePage() {
  return <><Navbar /><main><Hero /><HowItWorks /><BagTypes /><FeaturedProducts /><MaterialsShowcase /><section className="section-space bg-ivory-50"><div className="container-page"><div className="grid items-center gap-10 lg:grid-cols-[.72fr_1.28fr]"><div><h2 className="display text-[clamp(2rem,4vw,3.25rem)] font-semibold">صُمّمت لتُشبه صاحبتها</h2><p className="mt-4 text-stone-600">ألوان وخامات وتفاصيل صغيرة؛ كل اختيار يصنع قصة مختلفة.</p><Button href="/design" variant="secondary" className="mt-8">ابدئي تصميمك</Button></div><div className="relative aspect-video overflow-hidden rounded-image bg-sand-200"><Image src="/images/home/personalized-gallery.png" alt="ثلاث حقائب مخصصة بألوان مختلفة" fill sizes="(min-width: 1024px) 65vw, 100vw" className="object-cover" /></div></div></div></section><FaqSection /></main><Footer /></>;
}
