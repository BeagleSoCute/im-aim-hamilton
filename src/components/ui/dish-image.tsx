import Image from "next/image";
import { images, type ImageSlug } from "@/data/images.generated";
import { cn } from "@/lib/cn";

type DishImageProps = {
  slug?: ImageSlug;
  /** Used as alt text for the placeholder when no photo exists yet. */
  name: string;
  sizes: string;
  className?: string;
  preload?: boolean;
};

/**
 * Fills its (positioned, sized) parent. Falls back to a branded placeholder
 * for dishes still waiting on a photo, so a missing image never looks broken.
 */
export function DishImage({ slug, name, sizes, className, preload }: DishImageProps) {
  if (!slug) return <DishPlaceholder name={name} className={className} />;
  const img = images[slug];
  return (
    <Image
      src={img.src}
      alt={img.alt}
      fill
      sizes={sizes}
      placeholder="blur"
      blurDataURL={img.blurDataURL}
      preload={preload}
      className={cn("object-cover", className)}
    />
  );
}

export function DishPlaceholder({ name, className }: { name: string; className?: string }) {
  return (
    <div
      role="img"
      aria-label={`${name} (photo coming soon)`}
      className={cn(
        "absolute inset-0 flex items-center justify-center bg-[radial-gradient(ellipse_at_center,var(--color-ink-700),var(--color-ink-900)_70%)]",
        className,
      )}
    >
      <div className="absolute inset-3 border border-gold-500/15" />
      <Image src="/brand/cat.png" alt="" width={72} height={72} className="h-auto w-[22%] max-w-20 opacity-25" />
    </div>
  );
}
