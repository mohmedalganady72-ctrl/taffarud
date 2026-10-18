import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function Hero() {
  return (
    <section className="overflow-hidden border-b border-sand-300">
      <div className="grid min-h-[calc(100svh-64px)] lg:min-h-[720px] lg:grid-cols-2">
        <div className="container-page flex items-center py-16 lg:mr-auto lg:w-full lg:max-w-[600px] lg:pl-14">
          <div>
            <h1 className="display max-w-xl text-[clamp(2.4rem,5vw,4.5rem)] font-semibold leading-[1.35]">حقيبة تشبهك،<br />بتفاصيل تختارينها</h1>
            <p className="mt-6 max-w-lg text-base leading-8 text-stone-600 md:text-lg">اختاري الموديل والخامة واللون، وأضيفي لمستك الخاصة. نريكِ التصميم قبل أن نصنعه لكِ بعناية.</p>
            <div className="mt-9 flex flex-wrap gap-3"><Button href="/design" variant="accent">صمّمي شنطتك <ArrowLeft className="mr-2" size={18} /></Button><Button href="/shop" variant="secondary">تسوّقي الجاهز</Button></div>
            <p className="mt-8 text-sm text-stone-600">السعر شامل التوصيل · تنفيذ الطلب المخصص خلال 7–10 أيام</p>
          </div>
        </div>
        <div className="relative min-h-[460px] overflow-hidden bg-sand-200 lg:min-h-full">
          <Image src="/images/home/hero-bag.png" alt="حقيبة يد بيج من الجلد النباتي" fill priority sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
        </div>
      </div>
    </section>
  );
}
