import { dietaryLabels, spiceLabels } from "@/data/menu";
import type { DietaryOption, SpiceLevel } from "@/data/types";
import { cn } from "@/lib/cn";

const chilliCount: Record<SpiceLevel, number> = { mild: 0, medium: 1, hot: 2, "extra-hot": 3 };

function Chilli({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" aria-hidden className={cn("size-3.5", className)}>
      <path
        d="M11.6 2.2c.3-.5.9-.7 1.3-.4.2.2.2.5 0 .7-.4.3-.6.7-.6 1.1 1 .6 1.5 1.8 1.1 3.1C12.3 10.4 8 14 3 14.2c-.8 0-1.2-.9-.6-1.4 2.6-2 4.3-4.6 5.4-7.3.6-1.4 2-2.2 3.4-2-.1-.5.1-1 .4-1.3Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** Shows the hottest available level as chillies, with all options as text. */
export function SpiceIndicator({
  levels,
  label,
  className,
}: {
  levels: SpiceLevel[];
  /** Overrides the generated text, e.g. for a legend. */
  label?: string;
  className?: string;
}) {
  label ??= levels.length === 1 ? `${spiceLabels[levels[0]]} only` : levels.map((l) => spiceLabels[l]).join(" or ");
  const hottest = Math.max(...levels.map((l) => chilliCount[l]));
  return (
    <span className={cn("inline-flex items-center gap-1.5 text-xs text-cream-400", className)}>
      {hottest > 0 && (
        <span className="flex text-chili-400">
          {Array.from({ length: hottest }, (_, i) => (
            <Chilli key={i} />
          ))}
        </span>
      )}
      <span>{label}</span>
    </span>
  );
}

export function DietaryBadge({ option }: { option: DietaryOption }) {
  const { short, long } = dietaryLabels[option];
  return (
    <abbr
      title={long}
      className="inline-flex h-5 min-w-5 items-center justify-center rounded-full border border-gold-500/40 px-1.5 text-[0.6rem] font-bold tracking-wider text-gold-300 no-underline"
    >
      {short}
    </abbr>
  );
}
