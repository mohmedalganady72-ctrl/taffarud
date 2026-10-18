"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const items = [
  ["كم يستغرق تنفيذ الطلب المخصص؟", "يستغرق التنفيذ عادة من 7 إلى 10 أيام عمل بعد تأكيد التصميم والدفع، ونطلعك على كل تحديث في صفحة طلباتك."],
  ["هل الصورة المولّدة هي شكل المنتج النهائي؟", "الصورة تقريبية لتوضيح اللون والخامة. المرجع الفعلي للتصنيع هو اختياراتك المسجلة في الطلب."],
  ["هل السعر يشمل التوصيل؟", "نعم، السعر الظاهر هو السعر النهائي ويشمل التوصيل داخل المملكة."],
  ["هل يمكنني تعديل التصميم بعد الدفع؟", "تواصلي معنا سريعًا. يمكن التعديل قبل اعتماد الطلب للتصنيع بحسب حالة الطلب."],
];

export function FaqSection() {
  const [open, setOpen] = useState(0);
  return <section className="section-space"><div className="container-page grid gap-14 lg:grid-cols-[1.5fr_.7fr]"><div><h2 className="display text-[clamp(2rem,4vw,3.25rem)] font-semibold">أسئلة تتكرر، وإجابات واضحة</h2><div className="mt-10 divide-y divide-sand-300 border-y border-sand-300">{items.map(([q, a], i) => <div key={q}><button onClick={() => setOpen(open === i ? -1 : i)} className="flex min-h-16 w-full items-center justify-between gap-5 py-4 text-right font-semibold" aria-expanded={open === i}><span>{q}</span><ChevronDown className={`shrink-0 transition ${open === i ? "rotate-180" : ""}`} size={20} /></button>{open === i ? <p className="pb-6 text-sm leading-7 text-stone-600">{a}</p> : null}</div>)}</div></div><aside className="rounded-image bg-forest-800 p-8 text-ivory-100 lg:self-end"><p className="text-sm text-gold-300">نحن هنا من أجلكِ</p><h3 className="display mt-4 text-3xl font-semibold">تحتاجين مساعدة؟</h3><p className="mt-4 text-sm leading-7 text-ivory-100/70">فريقنا يجيب عن استفساراتك ويساعدك في كل خطوة.</p><a href="/contact" className="mt-8 inline-flex min-h-12 items-center rounded-full bg-ivory-100 px-6 font-semibold text-forest-800">تواصلي معنا</a></aside></div></section>;
}
