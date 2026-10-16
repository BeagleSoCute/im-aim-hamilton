import type { Metadata } from "next";
import { MenuNav } from "@/components/menu/menu-nav";
import { MenuSection } from "@/components/menu/menu-section";
import { DietaryBadge, SpiceIndicator } from "@/components/ui/badges";
import { ButtonLink } from "@/components/ui/button";
import { Container, Eyebrow, Heading, Ornament } from "@/components/ui/layout";
import { allergens, allergyNotice, dietaryLists, extras, formatPrice, menu, spiceLabels } from "@/data/menu";
import { images } from "@/data/images.generated";
import { site } from "@/data/site";

const hasAiImages = Object.values(images).some((img) => "aiGenerated" in img);

export const metadata: Metadata = {
  title: "Menu",
  description:
    "The full Im Aim Thai Cuisine menu: appetizers, tom yum and tom kha, curries, wok dishes, sizzling plates, Thai salads, rice and noodles, signature dishes and more.",
};

const sections = [
  ...menu.map((c) => ({ id: c.id, label: c.title })),
  { id: "dietary", label: "Vegan & GF" },
];

export default function MenuPage() {
  return (
    <>
      <header className="grain relative overflow-hidden pt-40 pb-16 sm:pt-48 sm:pb-20">
        <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[32rem] bg-[radial-gradient(ellipse_at_top,color-mix(in_oklab,var(--color-gold-500)_14%,transparent),transparent_65%)]" />
        <Container className="flex flex-col items-center gap-6 text-center">
          <Eyebrow>Dine in · Takeaway</Eyebrow>
          <Heading as="h1" size="xl">
            Our <em className="text-gold-foil">Menu</em>
          </Heading>
          <Ornament className="w-48" />
          <Legend />
        </Container>
      </header>

      <MenuNav sections={sections} />

      <Container>
        {menu.map((category, i) => (
          <MenuSection key={category.id} category={category} index={i}>
            {category.id === "signature" && <Extras />}
          </MenuSection>
        ))}
        <DietarySection index={menu.length} />
      </Container>

      <SkipTheQueue />
    </>
  );
}

function Legend() {
  return (
    <div className="mt-4 flex flex-col items-center gap-5">
      <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
        <span className="text-[0.65rem] font-semibold uppercase tracking-eyebrow text-cream-500">Hot level</span>
        {(["mild", "medium", "hot", "extra-hot"] as const).map((level) => (
          <SpiceIndicator key={level} levels={[level]} label={spiceLabels[level]} />
        ))}
      </div>
      <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs text-cream-400">
        <span className="inline-flex items-center gap-2">
          <DietaryBadge option="vegan" /> Vegan on request
        </span>
        <span className="inline-flex items-center gap-2">
          <DietaryBadge option="gluten-free" /> Gluten-free on request
        </span>
      </div>
      <p className="max-w-md text-sm text-cream-400">{allergyNotice}</p>
      {hasAiImages && (
        <p className="max-w-md text-xs text-cream-500">
          Dishes we have not photographed yet are shown with AI-generated illustrations. Presentation may vary.
        </p>
      )}
    </div>
  );
}

function Extras() {
  return (
    <div className="mx-auto mt-16 max-w-2xl border border-gold-500/20 bg-ink-900/60 px-6 py-8 sm:px-10">
      <h3 className="text-center font-display text-3xl text-cream-50">Extra</h3>
      <Ornament className="mx-auto mt-3 w-24" />
      <dl className="mt-6 grid gap-x-10 sm:grid-cols-2">
        {extras.map((e) => (
          <div key={e.name} className="flex items-baseline justify-between gap-3 border-b border-ink-700 py-2.5">
            <dt className="text-sm text-cream-300">{e.name}</dt>
            <dd className="text-sm font-semibold tabular-nums text-gold-300">{formatPrice(e.price)}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

function DietarySection({ index }: { index: number }) {
  return (
    <section id="dietary" className="scroll-mt-40 border-t border-gold-500/10 py-20 sm:py-24">
      <header className="flex flex-col items-center gap-4 text-center">
        <Eyebrow>{String(index + 1).padStart(2, "0")}</Eyebrow>
        <h2 className="font-display text-display-md font-medium text-cream-50">Vegan &amp; Gluten Free</h2>
        <Ornament className="w-32" />
      </header>

      <div className="mx-auto mt-14 grid max-w-4xl gap-6 md:grid-cols-2">
        {(["vegan", "gluten-free"] as const).map((key) => {
          const list = dietaryLists[key];
          return (
            <div key={key} className="border border-gold-500/20 bg-ink-900/60 px-6 py-8 sm:px-8">
              <div className="flex items-center gap-3">
                <DietaryBadge option={key} />
                <h3 className="font-display text-2xl text-cream-50">{list.title}</h3>
              </div>
              <p className="mt-2 text-xs uppercase tracking-[0.14em] text-gold-400">{list.note}</p>
              <ul className="mt-6 flex flex-col">
                {list.items.map((item) => (
                  <li key={item} className="border-b border-ink-700 py-2.5 text-sm text-cream-300">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      <div className="mx-auto mt-10 max-w-4xl text-center">
        <p className="text-[0.65rem] font-semibold uppercase tracking-eyebrow text-cream-500">Food allergy · may contain</p>
        <ul className="mt-4 flex flex-wrap justify-center gap-2">
          {allergens.map((a) => (
            <li key={a} className="border border-cream-500/25 px-3 py-1.5 text-xs text-cream-300">
              {a}
            </li>
          ))}
        </ul>
        <p className="mt-6 text-sm text-cream-400">{allergyNotice}</p>
      </div>
    </section>
  );
}

function SkipTheQueue() {
  return (
    <section className="grain border-t border-gold-500/15 bg-ink-900 py-24">
      <Container className="flex flex-col items-center gap-6 text-center">
        <Eyebrow>Good Thai food, less waiting</Eyebrow>
        <Heading size="lg">
          Skip the <em className="text-gold-foil">queue</em>
        </Heading>
        <Ornament className="w-40" />
        <p className="max-w-md text-base leading-relaxed text-cream-300">
          Order faster, enjoy sooner. Scan the QR code on your table, then order, pay and enjoy, all from your phone.
        </p>
        <ButtonLink href={site.orderUrl} size="lg" className="mt-2">
          Order Online
        </ButtonLink>
      </Container>
    </section>
  );
}
