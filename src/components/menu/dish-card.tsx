import { SpiceIndicator } from "@/components/ui/badges";
import { DishImage } from "@/components/ui/dish-image";
import { dishImage, formatPrice, startingPrice } from "@/data/menu";
import type { MenuCategory, MenuItem } from "@/data/types";
import { cn } from "@/lib/cn";

type DishCardProps = {
  item: MenuItem;
  category: MenuCategory;
  className?: string;
};

export function DishCard({ item, category, className }: DishCardProps) {
  const price = startingPrice(item, category);
  const fromPrice = item.price === undefined;
  const meta = [category.showCodes !== false && item.code, item.serving].filter(Boolean).join(" · ");

  return (
    <article className={cn("group flex flex-col overflow-hidden bg-ink-900 ring-1 ring-cream-50/[0.06]", className)}>
      <div className="relative aspect-[4/3] overflow-hidden bg-ink-800">
        <DishImage
          slug={dishImage(item)}
          name={item.name}
          sizes="(min-width: 1536px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="transition-transform duration-[1.4s] ease-luxe group-hover:scale-[1.03]"
        />
      </div>

      <div className="flex flex-1 flex-col gap-2 p-5 sm:p-6">
        {meta && <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold-500">{meta}</p>}
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-display text-[1.65rem] font-medium leading-tight text-cream-50">{item.name}</h3>
          <p className="shrink-0 pt-1 text-lg font-semibold tabular-nums text-gold-300">
            {fromPrice && <span className="mr-1 text-xs font-medium text-cream-500">from</span>}
            {formatPrice(price)}
          </p>
        </div>
        {item.description && <p className="text-[0.95rem] leading-relaxed text-cream-300">{item.description}</p>}
        {item.note && <p className="text-sm italic text-gold-400">{item.note}</p>}
        {item.spice && <SpiceIndicator levels={item.spice} className="mt-auto pt-2 text-sm" />}
      </div>
    </article>
  );
}
