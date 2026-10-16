import { DietaryBadge, SpiceIndicator } from "@/components/ui/badges";
import { DishImage } from "@/components/ui/dish-image";
import { images } from "@/data/images.generated";
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
  const slug = dishImage(item);
  const isAi = slug !== undefined && "aiGenerated" in images[slug];

  return (
    <article className={cn("group flex flex-col", className)}>
      <div className="relative aspect-[4/5] overflow-hidden bg-ink-800">
        <DishImage
          slug={slug}
          name={item.name}
          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
          className="transition-transform duration-[1.4s] ease-luxe group-hover:scale-[1.04]"
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink-950/70 to-transparent" />
        {isAi && (
          <span className="absolute bottom-3 right-3 text-[0.55rem] uppercase tracking-[0.18em] text-cream-300/80">
            AI illustration
          </span>
        )}
        {category.showCodes !== false && (
          <span className="absolute left-4 top-4 bg-ink-950/60 px-2 py-1 font-sans text-[0.6rem] font-semibold tracking-[0.2em] text-cream-100 backdrop-blur-sm">
            {item.code}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 pt-6">
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="font-display text-2xl font-medium leading-tight text-cream-50">{item.name}</h3>
          <p className="shrink-0 font-sans text-sm font-semibold tabular-nums text-gold-300">
            {fromPrice && <span className="mr-1 text-[0.65rem] font-medium uppercase tracking-wider text-cream-500">from</span>}
            {formatPrice(price)}
          </p>
        </div>
        {item.serving && <p className="-mt-1 text-xs uppercase tracking-[0.16em] text-cream-500">{item.serving}</p>}
        {item.description && <p className="text-sm leading-relaxed text-cream-400">{item.description}</p>}
        {(item.spice || item.dietary) && (
          <div className="mt-auto flex flex-wrap items-center gap-3 pt-1">
            {item.spice && <SpiceIndicator levels={item.spice} />}
            {item.dietary?.map((d) => <DietaryBadge key={d} option={d} />)}
          </div>
        )}
      </div>
    </article>
  );
}
