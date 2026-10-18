import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const products = [
  { name: "حقيبة وادي", material: "جلد نباتي", price: 168, image: "/images/home/category-handbag.png" },
  { name: "حقيبة هدوء", material: "جلد نباتي", price: 176, image: "/images/home/product-black.png" },
  { name: "حقيبة رمل", material: "قطن عضوي", price: 149, image: "/images/home/category-tote.png" },
  { name: "حقيبة نجد", material: "جلد نباتي", price: 185, image: "/images/home/product-chestnut.png" },
];

export function FeaturedProducts() {
  return <section className="section-space"><div className="container-page"><div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"><div><h2 className="display text-[clamp(2rem,4vw,3.25rem)] font-semibold">قطع جاهزة، بتفاصيل استثنائية</h2><p className="mt-3 text-stone-600">تشكيلة منتقاة لمن تريد حقيبتها الآن.</p></div><Link href="/shop" className="inline-flex items-center gap-2 text-sm text-gold-700">عرض كل القطع <ArrowLeft size={16} /></Link></div><div className="mt-12 grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4 lg:gap-7">{products.map((p) => <Link href="/shop" key={p.name} className="group"><div className="relative aspect-[4/5] overflow-hidden rounded-card bg-sand-200"><Image src={p.image} alt={p.name} fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover transition duration-500 group-hover:scale-[1.04]" /></div><h3 className="mt-4 font-semibold">{p.name}</h3><div className="mt-1 flex flex-col text-sm text-stone-600 sm:flex-row sm:justify-between"><span>{p.material}</span><span className="font-semibold tabular-nums text-espresso-900">{p.price} ر.س</span></div></Link>)}</div></div></section>;
}
