import Link from "next/link";
import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "outline" | "ghost";
type Size = "md" | "lg";

const base =
  "group inline-flex items-center justify-center gap-2.5 whitespace-nowrap font-sans font-semibold uppercase tracking-[0.18em] transition-colors duration-300 ease-luxe disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary: "bg-gold-400 text-ink-950 hover:bg-gold-300",
  outline: "border border-gold-500/60 text-gold-300 hover:border-gold-300 hover:bg-gold-400/10 hover:text-gold-200",
  ghost: "text-cream-100 hover:text-gold-300",
};

const sizes: Record<Size, string> = {
  md: "h-11 px-6 text-[0.7rem]",
  lg: "h-14 px-9 text-xs",
};

type Common = { variant?: Variant; size?: Size; className?: string };

export function buttonClasses({ variant = "primary", size = "md", className }: Common = {}) {
  return cn(base, variants[variant], sizes[size], variant === "ghost" && "h-auto px-0", className);
}

type ButtonLinkProps = Common &
  Omit<ComponentProps<typeof Link>, "href"> & {
    /** null renders an inert button, for destinations that don't exist yet. */
    href: ComponentProps<typeof Link>["href"] | null;
  };

/** Internal routes use next/link; external, tel: and mailto: links fall back to <a>. */
export function ButtonLink({ variant, size, className, href, children, ...props }: ButtonLinkProps) {
  const classes = buttonClasses({ variant, size, className });
  if (href === null) {
    return (
      <button type="button" aria-disabled="true" className={cn(classes, "cursor-default")}>
        {children}
      </button>
    );
  }
  const isExternal = typeof href === "string" && /^(https?:|tel:|mailto:|#)/.test(href);
  if (isExternal) {
    const external = typeof href === "string" && href.startsWith("http");
    return (
      <a
        href={href}
        className={classes}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...(props as ComponentProps<"a">)}
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={classes} {...props}>
      {children}
    </Link>
  );
}

export function Button({ variant, size, className, ...props }: Common & ComponentProps<"button">) {
  return <button className={buttonClasses({ variant, size, className })} {...props} />;
}
