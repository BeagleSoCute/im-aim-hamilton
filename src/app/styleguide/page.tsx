import type { Metadata } from "next";
import { DishCard } from "@/components/menu/dish-card";
import { SpiceIndicator } from "@/components/ui/badges";
import { ButtonLink } from "@/components/ui/button";
import { Container, Eyebrow, Heading, Ornament, Section, SectionHeader } from "@/components/ui/layout";
import { Wordmark } from "@/components/ui/logo";
import { findItem } from "@/data/menu";

export const metadata: Metadata = {
  title: "Style guide",
  robots: { index: false },
};

const swatches = [
  { group: "Ink", tokens: ["ink-950", "ink-900", "ink-850", "ink-800", "ink-700", "ink-600"] },
  { group: "Gold", tokens: ["gold-200", "gold-300", "gold-400", "gold-500", "gold-600", "gold-700"] },
  { group: "Cream", tokens: ["cream-50", "cream-100", "cream-300", "cream-400", "cream-500"] },
  { group: "Chilli", tokens: ["chili-400", "chili-500"] },
];

const sampleCards = ["W1", "A6", "WS11"].map(findItem);

export default function StyleguidePage() {
  return (
    <div className="pt-20">
      <Section>
        <Container className="flex flex-col gap-24">
          <SectionHeader
            eyebrow="Design system"
            title="Im Aim style guide"
            intro="Internal reference for the tokens and components every page is built from. Not linked from the site."
            align="left"
          />

          <div className="grid gap-12">
            <Eyebrow>Colour</Eyebrow>
            {swatches.map(({ group, tokens }) => (
              <div key={group}>
                <p className="mb-4 font-display text-xl text-cream-100">{group}</p>
                <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
                  {tokens.map((t) => (
                    <div key={t} className="flex flex-col gap-2">
                      <div
                        className="aspect-[3/2] border border-cream-50/10"
                        style={{ background: `var(--color-${t})` }}
                      />
                      <code className="text-xs text-cream-400">{t}</code>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="grid gap-8">
            <Eyebrow>Typography</Eyebrow>
            <Heading as="h2" size="xl">
              Display XL
            </Heading>
            <Heading as="h2" size="lg">
              Display large, <em className="text-gold-foil">with gold italic</em>
            </Heading>
            <Heading as="h3" size="md">
              Display medium for sub-sections
            </Heading>
            <p className="max-w-2xl text-lg leading-relaxed text-cream-300">
              Body copy is Manrope. Headings are Cormorant Garamond. Gold is kept for small accents (rules, eyebrows,
              prices and the one primary action per view) so it stays special.
            </p>
            <Ornament className="w-56" />
          </div>

          <div className="grid gap-8">
            <Eyebrow>Buttons</Eyebrow>
            <div className="flex flex-wrap items-center gap-4">
              <ButtonLink href="#" size="lg">
                Order Online
              </ButtonLink>
              <ButtonLink href="#" variant="outline" size="lg">
                View Menu
              </ButtonLink>
              <ButtonLink href="#">Primary</ButtonLink>
              <ButtonLink href="#" variant="outline">
                Outline
              </ButtonLink>
              <ButtonLink href="#" variant="ghost">
                Ghost link →
              </ButtonLink>
            </div>
          </div>

          <div className="grid gap-6">
            <Eyebrow>Spice levels</Eyebrow>
            <div className="flex flex-wrap items-center gap-6">
              <SpiceIndicator levels={["mild"]} />
              <SpiceIndicator levels={["mild", "medium"]} />
              <SpiceIndicator levels={["medium"]} />
              <SpiceIndicator levels={["medium", "hot"]} />
              <SpiceIndicator levels={["extra-hot"]} />
            </div>
          </div>

          <div className="grid gap-8">
            <Eyebrow>Dish cards</Eyebrow>
            <div className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
              {sampleCards.map(({ item, category }) => (
                <DishCard key={item.code} item={item} category={category} />
              ))}
            </div>
          </div>

          <div className="grid gap-8">
            <Eyebrow>Logo (temporary, extracted from sign)</Eyebrow>
            <Wordmark className="max-w-md" />
          </div>
        </Container>
      </Section>
    </div>
  );
}
