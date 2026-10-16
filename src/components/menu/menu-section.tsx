import type { ReactNode } from "react";
import { DietaryBadge, SpiceIndicator } from "@/components/ui/badges";
import { DishImage } from "@/components/ui/dish-image";
import { Eyebrow, Ornament } from "@/components/ui/layout";
import { dishImage, formatPrice } from "@/data/menu";
import type { MenuCategory, MenuItem, ProteinOption } from "@/data/types";

type MenuSectionProps = {
  category: MenuCategory;
  index: number;
  children?: ReactNode;
};

export function MenuSection({ category, index, children }: MenuSectionProps) {
  // Thumbnails only where most dishes have a photo; text-only lists read cleaner otherwise.
  const withImages = category.items.filter((i) => dishImage(i)).length >= category.items.length / 2;
  const fromPrice = category.proteins ? Math.min(...category.proteins.map((p) => p.price)) : undefined;

  return (
    <section id={category.id} className="scroll-mt-40 border-t border-gold-500/10 py-20 first:border-t-0 sm:py-24">
      <header className="flex flex-col items-center gap-4 text-center">
        <Eyebrow>{String(index + 1).padStart(2, "0")}</Eyebrow>
        <h2 className="font-display text-display-md font-medium text-cream-50">{category.title}</h2>
        <Ornament className="w-32" />
        {category.servedWith && <p className="font-display text-lg italic text-cream-400">{category.servedWith}</p>}
      </header>

      {category.proteins && <ProteinTable proteins={category.proteins} />}

      <ul className="mt-14 grid gap-x-16 gap-y-10 lg:grid-cols-2">
        {category.items.map((item) => (
          <MenuItemRow
            key={item.code}
            item={item}
            showCode={category.showCodes !== false}
            withImage={withImages}
            fromPrice={fromPrice}
          />
        ))}
      </ul>

      {children}
    </section>
  );
}

function ProteinTable({ proteins }: { proteins: ProteinOption[] }) {
  return (
    <div className="mx-auto mt-10 max-w-4xl border border-gold-500/20 bg-ink-900/60 px-5 py-5 sm:px-8">
      <p className="mb-3 text-center text-[0.65rem] font-semibold uppercase tracking-eyebrow text-gold-400">
        Choice of meat
      </p>
      <dl className="grid grid-cols-1 gap-x-8 min-[420px]:grid-cols-2 md:grid-cols-3">
        {proteins.map((p) => (
          <div key={p.name} className="flex items-baseline justify-between gap-3 border-b border-ink-700 py-2.5">
            <dt className="text-sm text-cream-300">{p.name}</dt>
            <dd className="text-sm font-semibold tabular-nums text-gold-300">{formatPrice(p.price)}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

type MenuItemRowProps = {
  item: MenuItem;
  showCode: boolean;
  withImage: boolean;
  fromPrice?: number;
};

function MenuItemRow({ item, showCode, withImage, fromPrice }: MenuItemRowProps) {
  const price = item.price ?? fromPrice;

  return (
    <li className="flex gap-5">
      {withImage && (
        <div className="relative size-20 shrink-0 overflow-hidden bg-ink-800 sm:size-28">
          <DishImage slug={dishImage(item)} name={item.name} sizes="112px" />
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col gap-1.5">
        <div className="flex items-baseline gap-3">
          <h3 className="font-display text-[1.35rem] font-medium leading-tight text-cream-50">
            {showCode && (
              <span className="mr-2 align-[0.15em] font-sans text-[0.65rem] font-semibold tracking-[0.15em] text-gold-500">
                {item.code}
              </span>
            )}
            {item.name}
          </h3>
          <span aria-hidden className="mb-1.5 hidden min-w-6 flex-1 border-b border-dotted border-cream-500/40 sm:block" />
          {price !== undefined && (
            <p className="ml-auto shrink-0 text-sm font-semibold tabular-nums text-gold-300 sm:ml-0">
              {item.price === undefined && (
                <span className="mr-1 text-[0.6rem] font-medium uppercase tracking-wider text-cream-500">from</span>
              )}
              {formatPrice(price)}
            </p>
          )}
        </div>

        {item.serving && <p className="text-[0.65rem] uppercase tracking-[0.18em] text-cream-500">{item.serving}</p>}
        {item.description && <p className="text-sm leading-relaxed text-cream-400">{item.description}</p>}
        {item.note && <p className="text-xs italic text-gold-400">{item.note}</p>}

        {(item.spice || item.dietary) && (
          <div className="mt-1 flex flex-wrap items-center gap-2.5">
            {item.spice && <SpiceIndicator levels={item.spice} />}
            {item.dietary?.map((d) => <DietaryBadge key={d} option={d} />)}
          </div>
        )}
      </div>
    </li>
  );
}
