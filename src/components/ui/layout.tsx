import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Container({ wide, className, ...props }: ComponentProps<"div"> & { wide?: boolean }) {
  return (
    <div
      className={cn("mx-auto w-full px-4 sm:px-8 lg:px-12", wide ? "max-w-[100rem]" : "max-w-7xl", className)}
      {...props}
    />
  );
}

type SectionProps = ComponentProps<"section"> & {
  tone?: "base" | "raised";
};

export function Section({ tone = "base", className, ...props }: SectionProps) {
  return (
    <section
      className={cn(
        "grain py-24 sm:py-32",
        tone === "raised" && "bg-ink-900",
        className,
      )}
      {...props}
    />
  );
}

export function Eyebrow({ className, ...props }: ComponentProps<"p">) {
  return (
    <p
      className={cn("font-sans text-[0.7rem] font-semibold uppercase tracking-eyebrow text-gold-400", className)}
      {...props}
    />
  );
}

type HeadingProps = {
  as?: "h1" | "h2" | "h3";
  size?: "xl" | "lg" | "md";
  className?: string;
  children: ReactNode;
};

const headingSizes = {
  xl: "text-display-xl",
  lg: "text-display-lg",
  md: "text-display-md",
};

export function Heading({ as: Tag = "h2", size = "lg", className, children }: HeadingProps) {
  return (
    <Tag className={cn("font-display font-medium tracking-[-0.01em] text-cream-50 text-balance", headingSizes[size], className)}>
      {children}
    </Tag>
  );
}

type SectionHeaderProps = {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeader({ eyebrow, title, intro, align = "center", className }: SectionHeaderProps) {
  const centered = align === "center";
  return (
    <header className={cn("flex flex-col gap-5", centered && "items-center text-center", className)}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <Heading>{title}</Heading>
      <Ornament className={cn("w-40", !centered && "-ml-1")} />
      {intro && <p className="max-w-xl text-base leading-relaxed text-cream-400 sm:text-lg">{intro}</p>}
    </header>
  );
}

/** The fine rule with a centre diamond, lifted from the logo's divider. */
export function Ornament({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 240 12" fill="none" aria-hidden className={cn("h-3 text-gold-500", className)}>
      <path d="M0 6h104" stroke="currentColor" strokeWidth="0.75" />
      <path d="M136 6h104" stroke="currentColor" strokeWidth="0.75" />
      <path d="M104 6l6-2v4z M136 6l-6-2v4z" fill="currentColor" />
      <rect x="115.5" y="1.5" width="6.4" height="6.4" transform="rotate(45 118.7 4.7)" stroke="currentColor" strokeWidth="0.9" />
    </svg>
  );
}
