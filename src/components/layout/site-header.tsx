import { Menu, X } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/layout";
import { Logo } from "@/components/ui/logo";
import { NavLink } from "@/components/ui/nav-link";
import { nav, site } from "@/data/site";

export function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-gold-500/10 bg-ink-950/75 backdrop-blur-md">
      <Container className="flex h-20 items-center justify-between gap-6">
        <Logo />

        <nav aria-label="Main" className="hidden items-center gap-10 lg:flex">
          {nav.map((item) => (
            <NavLink
              key={item.href}
              item={item}
              className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-cream-300 transition-colors hover:text-gold-300"
            />
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden sm:block">
            <ButtonLink href={site.orderUrl}>Order Online</ButtonLink>
          </div>

          {/* No-JS mobile menu */}
          <details className="group relative lg:hidden">
            <summary className="flex size-11 cursor-pointer list-none items-center justify-center text-cream-100 [&::-webkit-details-marker]:hidden">
              <Menu className="size-6 group-open:hidden" aria-hidden />
              <X className="hidden size-6 group-open:block" aria-hidden />
              <span className="sr-only">Menu</span>
            </summary>
            <nav
              aria-label="Mobile"
              className="fixed inset-x-0 top-20 flex flex-col gap-1 border-b border-gold-500/15 bg-ink-950/95 px-5 pb-8 pt-4 backdrop-blur-md"
            >
              {nav.map((item) => (
                <NavLink
                  key={item.href}
                  item={item}
                  className="border-b border-ink-700 py-4 font-display text-2xl text-cream-100"
                />
              ))}
              <ButtonLink href={site.orderUrl} size="lg" className="mt-6">
                Order Online
              </ButtonLink>
            </nav>
          </details>
        </div>
      </Container>
    </header>
  );
}
