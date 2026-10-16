import Image from "next/image";
import Link from "next/link";
import { site } from "@/data/site";
import { cn } from "@/lib/cn";

/** Compact lockup for the header: cat emblem + typeset name. */
export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn("group flex items-center gap-3", className)} aria-label={`${site.name}, home`}>
      <Image src="/brand/cat.png" alt="" width={36} height={36} className="h-9 w-9 transition-transform duration-500 ease-luxe group-hover:-translate-y-0.5" />
      <span className="flex flex-col whitespace-nowrap leading-none">
        <span className="font-display text-[1.45rem] font-semibold tracking-[0.12em] text-gold-300">IM AIM</span>
        <span className="mt-1 text-[0.55rem] font-semibold uppercase tracking-[0.42em] text-cream-400">Thai Cuisine</span>
      </span>
    </Link>
  );
}

/** Full sign wordmark, for hero and footer. */
export function Wordmark({
  className,
  preload,
  sizes = "(min-width: 640px) 28rem, 80vw",
}: {
  className?: string;
  preload?: boolean;
  sizes?: string;
}) {
  return (
    <Image
      src="/brand/wordmark.png"
      alt={site.name}
      width={2461}
      height={1230}
      sizes={sizes}
      preload={preload}
      className={cn("h-auto w-full", className)}
    />
  );
}
