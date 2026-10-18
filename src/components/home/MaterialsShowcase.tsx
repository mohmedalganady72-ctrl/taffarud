import Image from "next/image";

const materials = [{ name: "جلد نباتي", copy: "ملمس فاخر بخيار ألطف على البيئة." }, { name: "قطن عضوي", copy: "خفيف، عملي، ومريح للاستخدام اليومي." }, { name: "سدو تراثي", copy: "نسيج أصيل يضيف هوية لا تشبه سواها." }];

export function MaterialsShowcase() {
  return <section className="bg-sand-200"><div className="grid lg:grid-cols-2"><div className="relative min-h-[430px] lg:min-h-[720px]"><Image src="/images/home/materials.png" alt="جلد نباتي وقطن عضوي ونسيج سدو" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" /></div><div className="flex items-center px-5 py-16 sm:px-12 lg:px-[10%]"><div><h2 className="display text-[clamp(2rem,4vw,3.25rem)] font-semibold">خامات تُروى باللمس</h2><p className="mt-4 max-w-xl text-stone-600">اخترنا خامات تجمع بين الجمال والوظيفة، وتحمل في تفاصيلها قصة أصالة واستدامة.</p><div className="mt-12 space-y-8">{materials.map((m, i) => <div key={m.name} className="grid grid-cols-[48px_1fr] gap-5 border-t border-taupe-400 pt-6"><span className="display text-2xl text-gold-700">0{i + 1}</span><div><h3 className="text-xl font-semibold">{m.name}</h3><p className="mt-1 text-sm text-stone-600">{m.copy}</p></div></div>)}</div></div></div></div></section>;
}
