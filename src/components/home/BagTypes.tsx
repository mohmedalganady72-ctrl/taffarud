import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const types = [
  { name: "شنطة يد", copy: "أناقة يومية بتكوين واضح وتفاصيل خالدة.", image: "/images/home/category-handbag.png", href: "/shop?type=handbag" },
  { name: "توت باق", copy: "مساحة رحبة وخفة تناسب يومك الطويل.", image: "/images/home/category-tote.png", href: "/shop?type=tote" },
  { name: "باوتش", copy: "حجم صغير يحمل لمستك الخاصة.", image: "/images/home/category-pouch.png", href: "/shop?type=pouch" },
];

export function BagTypes() {
  return <section className="section-space bg-ivory-50"><div className="container-page"><div className="max-w-2xl"><h2 className="display text-[clamp(2rem,4vw,3.25rem)] font-semibold">اختاري نوع حقيبتك</h2><p className="mt-3 text-stone-600">كل قصة تبدأ من شكل. اختاري النوع الذي يشبه يومك ثم اجعليه لكِ.</p></div><div className="mt-14 grid gap-8 md:grid-cols-3">{types.map((type, index) => <article key={type.name} className={index === 1 ? "md:mt-16" : ""}><Link href={type.href} className="group block"><div className={`relative aspect-[4/5] overflow-hidden bg-sand-200 ${index === 0 ? "rounded-[80px_20px_20px_20px]" : index === 2 ? "rounded-[20px_20px_80px_20px]" : "rounded-image"}`}><Image src={type.image} alt={type.name} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover transition duration-500 group-hover:scale-[1.04]" /></div><h3 className="mt-6 text-2xl font-semibold">{type.name}</h3><p className="mt-1 text-sm text-stone-600">{type.copy}</p><span className="mt-4 inline-flex items-center gap-2 text-sm text-gold-700">اكتشفيها <ArrowLeft size={16} /></span></Link></article>)}</div></div></section>;
}
