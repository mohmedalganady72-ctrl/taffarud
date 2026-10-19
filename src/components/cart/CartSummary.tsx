import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { formatPrice } from "@/lib/utils/format-price";

export function CartSummary({ subtotal }: { subtotal: number }) {
  return <aside className="rounded-card border border-sand-300 bg-ivory-50 p-6 lg:sticky lg:top-28">
    <h2 className="text-xl font-semibold">ملخص الطلب</h2>
    <div className="mt-6 flex justify-between border-b border-sand-300 pb-4 text-sm"><span className="text-stone-600">المجموع</span><span className="font-semibold tabular-nums">{formatPrice(subtotal)}</span></div>
    <div className="flex justify-between border-b border-sand-300 py-4 text-sm"><span className="text-stone-600">التوصيل</span><span className="font-semibold text-forest-800">مشمول</span></div>
    <div className="flex justify-between pt-5 text-lg font-semibold"><span>الإجمالي</span><span className="tabular-nums">{formatPrice(subtotal)}</span></div>
    <Link href="/checkout" className="mt-6 inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-full bg-gold-500 px-6 font-semibold transition hover:bg-gold-700 hover:text-white">متابعة الدفع <ArrowLeft size={18} /></Link>
    <p className="mt-4 text-center text-xs leading-6 text-stone-600">السعر النهائي شامل التوصيل، دون رسوم مخفية.</p>
  </aside>;
}
