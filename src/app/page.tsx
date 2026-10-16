import Image from "next/image";
import { DishCard } from "@/components/menu/dish-card";
import { ButtonLink } from "@/components/ui/button";
import { Container, Eyebrow, Ornament, Section, SectionHeader } from "@/components/ui/layout";
import { images } from "@/data/images.generated";
import { findItem } from "@/data/menu";
import { site } from "@/data/site";

// First pass of the home page, built to exercise the design system.
// Full home page (story, gallery, reviews, map) comes in phase 3.

const featured = ["SP1", "N1", "SZ3"].map(findItem);

export default function HomePage() {
  const hero = images["pad-thai"];

  return (
    <>
      <section className="relative isolate flex min-h-[100svh] items-end overflow-hidden pb-20 pt-32 sm:items-center sm:pb-0">
        <Image
          src={hero.src}
          alt={hero.alt}
          fill
          preload
          sizes="100vw"
          placeholder="blur"
          blurDataURL={hero.blurDataURL}
          className="-z-20 object-cover object-[70%_center]"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink-950 via-ink-950/85 to-ink-950/20" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink-950 via-transparent to-ink-950/40" />

        <Container>
          <div className="max-w-2xl animate-rise">
            <Eyebrow>Hood Street · Hamilton</Eyebrow>
            <h1 className="mt-6 font-display text-display-xl font-medium text-cream-50">
              Thai flavour,
              <br />
              <em className="text-gold-foil font-normal">made by hand.</em>
            </h1>
            <Ornament className="mt-8 w-48 -ml-1" />
            <p className="mt-8 max-w-md text-base leading-relaxed text-cream-300 sm:text-lg">
              Home-made starters, rich coconut curries, noodles tossed over a roaring wok and sizzling plates brought
              straight to your table.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <ButtonLink href={site.orderUrl} size="lg">
                Order Online
              </ButtonLink>
              <ButtonLink href="/menu" variant="outline" size="lg">
                View Menu
              </ButtonLink>
            </div>
          </div>
        </Container>
      </section>

      <Section tone="raised">
        <Container>
          <SectionHeader
            eyebrow="From our kitchen"
            title="Signature dishes"
            intro="A few of the dishes we are proudest of, each cooked to order with the heat you choose."
          />
          <div className="mt-16 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map(({ item, category }) => (
              <DishCard key={item.code} item={item} category={category} />
            ))}
          </div>
          <div className="mt-16 flex justify-center">
            <ButtonLink href="/menu" variant="outline">
              See the full menu
            </ButtonLink>
          </div>
        </Container>
      </Section>
    </>
  );
}
