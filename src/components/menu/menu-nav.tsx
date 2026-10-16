"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

type MenuNavProps = {
  sections: { id: string; label: string }[];
};

/** Sticky category bar that follows the reader down the page. */
export function MenuNav({ sections }: MenuNavProps) {
  const [active, setActive] = useState(sections[0]?.id);
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    // The current section is the last one whose top has passed just below the sticky bars.
    // Works at any viewport height, unlike a fixed IntersectionObserver band.
    let frame = 0;
    const update = () => {
      frame = 0;
      let current = sections[0]?.id;
      for (const { id } of sections) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 170) current = id;
      }
      setActive(current);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [sections]);

  // Keep the active tab in view inside the horizontally scrolling bar.
  useEffect(() => {
    const list = listRef.current;
    const link = list?.querySelector<HTMLElement>(`[data-id="${active}"]`);
    if (!list || !link) return;
    const target = link.offsetLeft - list.clientWidth / 2 + link.clientWidth / 2;
    list.scrollTo({ left: target, behavior: "smooth" });
  }, [active]);

  return (
    <nav
      aria-label="Menu categories"
      className="sticky top-20 z-40 border-y border-gold-500/15 bg-ink-950/90 backdrop-blur-md"
    >
      <ul
        ref={listRef}
        className="mx-auto flex max-w-7xl gap-1 overflow-x-auto px-3 [scrollbar-width:none] sm:px-6 lg:px-10 [&::-webkit-scrollbar]:hidden"
      >
        {sections.map(({ id, label }) => (
          <li key={id} className="shrink-0 first:ml-auto last:mr-auto last:pr-3">
            <a
              href={`#${id}`}
              data-id={id}
              aria-current={active === id ? "true" : undefined}
              className={cn(
                "relative block px-3.5 py-4 text-[0.65rem] font-semibold uppercase tracking-[0.2em] transition-colors duration-300",
                active === id ? "text-gold-300" : "text-cream-400 hover:text-cream-100",
              )}
            >
              {label}
              <span
                className={cn(
                  "absolute inset-x-3.5 bottom-0 h-px origin-center bg-gold-400 transition-transform duration-500 ease-luxe",
                  active === id ? "scale-x-100" : "scale-x-0",
                )}
              />
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
