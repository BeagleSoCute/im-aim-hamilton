import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { Container, Eyebrow, Ornament } from "@/components/ui/layout";
import { Wordmark } from "@/components/ui/logo";
import { NavLink } from "@/components/ui/nav-link";
import { allergyNotice } from "@/data/menu";
import { nav, site } from "@/data/site";

export function SiteFooter() {
  return (
    <footer className="grain border-t border-gold-500/15 bg-ink-900 pt-20 pb-10">
      <Container>
        <div className="grid gap-14 md:grid-cols-[1.3fr_1fr_1fr]">
          <div className="max-w-xs">
            <Wordmark className="max-w-60" sizes="240px" />
            <p className="mt-6 text-sm leading-relaxed text-cream-400">{site.tagline}.</p>
            <ul className="mt-6 flex gap-6">
              {site.social.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-gold-400 hover:text-gold-200"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-4 text-sm text-cream-300">
            <Eyebrow>Visit</Eyebrow>
            <a href={site.address.mapsUrl} target="_blank" rel="noopener noreferrer" className="flex gap-3 hover:text-gold-300">
              <MapPin className="mt-0.5 size-4 shrink-0 text-gold-500" aria-hidden />
              <span>
                {site.address.street}
                <br />
                {site.address.city} {site.address.postcode}
              </span>
            </a>
            <a href={site.phone.href} className="flex gap-3 hover:text-gold-300">
              <Phone className="mt-0.5 size-4 shrink-0 text-gold-500" aria-hidden />
              {site.phone.display}
            </a>
            <a href={`mailto:${site.email}`} className="flex gap-3 break-all hover:text-gold-300">
              <Mail className="mt-0.5 size-4 shrink-0 text-gold-500" aria-hidden />
              {site.email}
            </a>
          </div>

          <div className="flex flex-col gap-4 text-sm text-cream-300">
            <Eyebrow>Hours</Eyebrow>
            <ul className="flex flex-col gap-2.5">
              {site.hours.map((h) => (
                <li key={h.days} className="flex gap-3">
                  <Clock className="mt-0.5 size-4 shrink-0 text-gold-500" aria-hidden />
                  <span>
                    <span className="text-cream-100">{h.days}</span>
                    <br />
                    <span className="text-cream-400">{h.time}</span>
                  </span>
                </li>
              ))}
            </ul>
            {!site.hoursConfirmed && <p className="text-xs text-chili-400">Sample hours, awaiting confirmation</p>}
            <p className="text-xs text-cream-500">{site.dineIn}</p>
          </div>
        </div>

        <Ornament className="mx-auto mt-16 w-56" />

        <div className="mt-10 flex flex-col items-center justify-between gap-6 text-xs text-cream-500 md:flex-row">
          <nav aria-label="Footer" className="flex flex-wrap justify-center gap-x-8 gap-y-2">
            {nav.map((item) => (
              <NavLink key={item.href} item={item} className="uppercase tracking-[0.2em] hover:text-gold-300" />
            ))}
          </nav>
          <p className="max-w-md text-center md:text-right">{allergyNotice}</p>
        </div>
      </Container>
    </footer>
  );
}
