import Link from "next/link";
export default function NotFound() {
  return <main className="grid min-h-svh place-items-center bg-ivory-100 p-6 text-center"><div><p className="display text-8xl text-gold-300">404</p><h1 className="display mt-4 text-4xl font-semibold">الصفحة غير موجودة</h1><Link href="/" className="mt-8 inline-block rounded-full bg-espresso-900 px-6 py-3 text-ivory-100">العودة للرئيسية</Link></div></main>;
}
