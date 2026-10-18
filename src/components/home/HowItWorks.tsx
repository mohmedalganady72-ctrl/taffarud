import { PackageCheck, SlidersHorizontal, ShoppingBag } from "lucide-react";

const steps = [
  { n: "01", title: "اختاري الموديل", copy: "ابدئي بالشكل والحجم الأقرب ليومك.", icon: ShoppingBag },
  { n: "02", title: "خصّصي التفاصيل", copy: "حددي الخامة واللون والاسم الذي تريدينه.", icon: SlidersHorizontal },
  { n: "03", title: "استلمي حقيبتك", copy: "ننفّذها بعناية ونوصّلها إلى بابك.", icon: PackageCheck },
];

export function HowItWorks() {
  return <section className="section-space"><div className="container-page"><div className="text-center"><h2 className="display text-[clamp(2rem,4vw,3.25rem)] font-semibold">كيف تعمل؟</h2><p className="mt-3 text-stone-600">من فكرتك إلى حقيبة تعبّر عنك، بثلاث خطوات واضحة.</p></div><div className="mt-16 grid gap-12 md:grid-cols-3">{steps.map(({ n, title, copy, icon: Icon }, i) => <article key={n} className="relative border-t border-sand-300 pt-8"><div className="flex items-center justify-between"><span className="display text-5xl text-gold-500">{n}</span><Icon size={30} strokeWidth={1.25} className="text-gold-700" /></div><h3 className="mt-8 text-xl font-semibold">{title}</h3><p className="mt-2 text-sm leading-7 text-stone-600">{copy}</p>{i < 2 ? <span className="absolute -left-6 top-0 hidden h-px w-6 bg-gold-500 md:block" /> : null}</article>)}</div></div></section>;
}
