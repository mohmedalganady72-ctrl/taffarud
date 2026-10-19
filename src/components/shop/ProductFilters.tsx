"use client";

import type { CatalogFilters } from "@/types/catalog";

type Props = {
  filters: CatalogFilters;
  resultCount: number;
  onChange: (filters: CatalogFilters) => void;
};

const fieldClass = "min-h-12 rounded-xl border border-sand-300 bg-ivory-50 px-4 text-sm outline-none transition focus:border-gold-500";

export function ProductFilters({ filters, resultCount, onChange }: Props) {
  return <div className="border-y border-sand-300 py-5">
    <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-[1fr_1fr_1.2fr_auto] lg:items-end">
      <label className="grid gap-2 text-sm font-semibold">النوع
        <select className={fieldClass} value={filters.bagType} onChange={(event) => onChange({ ...filters, bagType: event.target.value as CatalogFilters["bagType"] })}>
          <option value="all">كل الأنواع</option><option value="handbag">شنطة يد</option><option value="tote">توت باق</option><option value="pouch">باوتش</option>
        </select>
      </label>
      <label className="grid gap-2 text-sm font-semibold">الحجم
        <select className={fieldClass} value={filters.size} onChange={(event) => onChange({ ...filters, size: event.target.value as CatalogFilters["size"] })}>
          <option value="all">كل الأحجام</option><option value="small">صغير</option><option value="large">كبير</option>
        </select>
      </label>
      <label className="grid gap-2 text-sm font-semibold">السعر حتى <span className="font-normal text-stone-600">{filters.maxPrice} ر.س</span>
        <input type="range" min="100" max="350" step="10" value={filters.maxPrice} onChange={(event) => onChange({ ...filters, maxPrice: Number(event.target.value) })} className="h-12 accent-gold-700" />
      </label>
      <p className="text-sm text-stone-600 sm:col-span-3 lg:col-span-1 lg:pb-3">{resultCount} قطع</p>
    </div>
  </div>;
}
