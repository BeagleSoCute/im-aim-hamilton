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
    <nav aria-label="Menu categories" className="sticky top-20 z-40 border-y border-cream-50/[0.06] bg-ink-950/95 backdrop-blur-md">
      <ul
        ref={listRef}
        className="mx-auto flex max-w-[100rem] gap-1.5 overflow-x-auto px-4 py-3 [scrollbar-width:none] sm:px-8 lg:px-12 [&::-webkit-scrollbar]:hidden"
      >
        {sections.map(({ id, label }) => (
          <li key={id} className="shrink-0">
            <a
              href={`#${id}`}
              data-id={id}
              aria-current={active === id ? "true" : undefined}
              className={cn(
                "block whitespace-nowrap rounded-full px-4 py-2 text-[0.95rem] font-medium transition-colors duration-300",
                active === id ? "bg-gold-400 text-ink-950" : "text-cream-300 hover:bg-cream-50/[0.06] hover:text-cream-50",
              )}
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
