"use client";

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <main className="grid min-h-svh place-items-center bg-ivory-100 p-6 text-center"><div><p className="display text-7xl text-gold-300">ت</p><h1 className="display mt-4 text-4xl font-semibold">حدث خطأ غير متوقع</h1><p className="mt-3 text-stone-600">نعتذر، تعذّر إكمال العملية الآن.</p><button onClick={reset} className="mt-8 rounded-full bg-espresso-900 px-6 py-3 font-semibold text-ivory-100">حاولي مرة أخرى</button></div></main>;
}
