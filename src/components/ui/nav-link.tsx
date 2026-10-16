import Link from "next/link";
import { cn } from "@/lib/cn";

type NavLinkProps = {
  item: { href: string; label: string; ready: boolean };
  className?: string;
};

/** A nav entry; pages that aren't built yet render as plain text that does nothing on click. */
export function NavLink({ item, className }: NavLinkProps) {
  if (!item.ready) {
    return (
      <span aria-disabled="true" className={cn(className, "cursor-default")}>
        {item.label}
      </span>
    );
  }
  return (
    <Link href={item.href} className={className}>
      {item.label}
    </Link>
  );
}
