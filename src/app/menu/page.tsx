import type { Metadata } from "next";
import { MenuNav } from "@/components/menu/menu-nav";
import { MenuSection, PriceList } from "@/components/menu/menu-section";
import { SpiceIndicator } from "@/components/ui/badges";
import { ButtonLink } from "@/components/ui/button";
import { Container, Heading } from "@/components/ui/layout";
import { images } from "@/data/images.generated";
import { allergens, allergyNotice, dietaryLists, extras, menu, spiceLabels } from "@/data/menu";
import { site } from "@/data/site";

const hasAiImages = Object.values(images).some((img) => "aiGenerated" in img);

export const metadata: Metadata = {
  title: "Menu",
  description:
    "The full Im Aim Thai Cuisine menu: appetizers, tom yum and tom kha, curries, wok dishes, sizzling plates, Thai salads, rice and noodles, signature dishes and more.",
};

const sections = [...menu.map((c) => ({ id: c.id, label: c.title })), { id: "dietary", label: "Vegan & Gluten Free" }];

export default function MenuPage() {
  return (
    <>
      <header className="pt-32 pb-10 sm:pt-40 sm:pb-14">
        <Container wide>
          <Heading as="h1" size="lg">
            Our Menu
          </Heading>
          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
            <span className="text-sm font-semibold uppercase tracking-[0.14em] text-cream-400">Hot level</span>
            {(["mild", "medium", "hot", "extra-hot"] as const).map((level) => (
              <SpiceIndicator key={level} levels={[level]} label={spiceLabels[level]} className="text-sm" />
            ))}
          </div>
          <p className="mt-4 max-w-2xl text-base text-cream-300">{allergyNotice}</p>
        </Container>
      </header>

      <MenuNav sections={sections} />

      <Container wide className="pb-24">
        {menu.map((category) => (
          <MenuSection key={category.id} category={category}>
            {category.id === "signature" && <PriceList title="Extra" options={extras} />}
          </MenuSection>
        ))}

        <DietarySection />

        <div className="mt-20 border-t border-gold-500/25 pt-8 text-cream-400">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-gold-400">Food allergy · may contain</p>
          <p className="mt-2 text-base text-cream-100">{allergens.join(" · ")}</p>
          <p className="mt-2 text-base">{allergyNotice}</p>
          {hasAiImages && (
            <p className="mt-4 text-sm text-cream-500">
              Dishes we have not photographed yet are shown with AI-generated illustrations. Presentation may vary.
            </p>
          )}
        </div>
      </Container>

      <section className="border-t border-gold-500/15 bg-ink-900 py-20">
        <Container className="flex flex-col items-center gap-5 text-center">
          <Heading size="md">Skip the queue</Heading>
          <p className="max-w-md text-base leading-relaxed text-cream-300">
            Order faster, enjoy sooner. Scan the QR code on your table, then order, pay and enjoy, all from your phone.
          </p>
          <ButtonLink href={site.orderUrl} size="lg" className="mt-2">
            Order Online
          </ButtonLink>
        </Container>
      </section>
    </>
  );
}

function DietarySection() {
  return (
    <section id="dietary" className="scroll-mt-40 pt-16 sm:pt-24">
      <header className="border-b border-gold-500/25 pb-5">
        <h2 className="font-display text-4xl font-medium text-cream-50 sm:text-5xl">Vegan &amp; Gluten Free</h2>
      </header>
      <div className="mt-8 grid gap-5 sm:gap-6 md:grid-cols-2">
        {Object.values(dietaryLists).map((list) => (
          <div key={list.title} className="bg-ink-900 p-6 ring-1 ring-cream-50/[0.06] sm:p-8">
            <h3 className="font-display text-3xl font-medium text-cream-50">{list.title}</h3>
            <p className="mt-2 text-sm font-semibold text-gold-400">{list.note}</p>
            <ul className="mt-5 divide-y divide-cream-50/[0.06]">
              {list.items.map((item) => (
                <li key={item} className="py-3 text-base text-cream-100">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
