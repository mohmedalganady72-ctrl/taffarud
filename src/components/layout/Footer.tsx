import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-espresso-900 text-ivory-100">
      <div className="container-page grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr]">
        <div><div className="display text-4xl">تَفرّد</div><p className="mt-4 max-w-sm text-sm leading-7 text-ivory-100/70">حقائب تُصمّم بعناية، لأن كل تفصيلة فيكِ تستحق أن تتفرّد.</p></div>
        <div><h3 className="font-semibold text-gold-300">تسوّقي</h3><div className="mt-4 flex flex-col gap-2 text-sm text-ivory-100/70"><Link href="/shop">القطع الجاهزة</Link><Link href="/design">صمّمي حقيبتك</Link><Link href="/orders">طلباتي</Link></div></div>
        <div><h3 className="font-semibold text-gold-300">تَفرّد</h3><div className="mt-4 flex flex-col gap-2 text-sm text-ivory-100/70"><Link href="/about">من نحن</Link><Link href="/faq">الأسئلة الشائعة</Link><Link href="/contact">تواصلي معنا</Link></div></div>
      </div>
      <div className="sadu-pattern h-9 border-t border-white/10" aria-hidden="true" />
      <div className="container-page flex flex-col gap-2 border-t border-white/10 py-5 text-xs text-ivory-100/55 sm:flex-row sm:justify-between"><span>© 2026 تَفرّد. جميع الحقوق محفوظة.</span><div className="flex gap-5"><Link href="/privacy">الخصوصية</Link><Link href="/terms">الشروط والأحكام</Link></div></div>
    </footer>
  );
}
