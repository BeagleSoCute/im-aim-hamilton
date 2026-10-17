import type { ReactNode } from "react";
import { DishCard } from "@/components/menu/dish-card";
import { formatPrice } from "@/data/menu";
import type { MenuCategory, ProteinOption } from "@/data/types";

type MenuSectionProps = {
  category: MenuCategory;
  children?: ReactNode;
};

export function MenuSection({ category, children }: MenuSectionProps) {
  return (
    <section id={category.id} className="scroll-mt-40 pt-16 sm:pt-24">
      <header className="border-b border-gold-500/25 pb-5">
        <h2 className="font-display text-4xl font-medium text-cream-50 sm:text-5xl">{category.title}</h2>
        {category.servedWith && <p className="mt-2 text-base text-cream-400">{category.servedWith}</p>}
      </header>

      {category.proteins && <PriceList title="Choice of meat" options={category.proteins} />}

      <div className="mt-8 grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 2xl:grid-cols-4">
        {category.items.map((item) => (
          <DishCard key={item.code} item={item} category={category} />
        ))}
      </div>

      {children}
    </section>
  );
}

/** Options with prices as easy-to-scan pills, e.g. the "choice of meat" table. */
export function PriceList({ title, options }: { title: string; options: ProteinOption[] }) {
  return (
    <div className="mt-6">
      <p className="text-sm font-semibold uppercase tracking-[0.14em] text-gold-400">{title}</p>
      <ul className="mt-3 grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:gap-2.5">
        {options.map((o) => (
          <li
            key={o.name}
            className="flex items-baseline justify-between gap-2 rounded-lg border border-cream-50/10 bg-ink-900 px-3.5 py-2 text-sm sm:justify-start sm:rounded-full sm:px-4 sm:text-[0.95rem]"
          >
            <span className="text-cream-100">{o.name}</span>
            <span className="font-semibold tabular-nums text-gold-300">{formatPrice(o.price)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
