import type { ImageSlug } from "./images.generated";

export type SiteImage = {
  src: string;
  width: number;
  height: number;
  alt: string;
  blurDataURL: string;
  /** AI-generated stand-in (from ../gen_ai), shown until a real photo exists. */
  aiGenerated?: boolean;
};

export type SpiceLevel = "mild" | "medium" | "hot" | "extra-hot";

/** Available on request; guests must tell staff when ordering. */
export type DietaryOption = "vegan" | "gluten-free";

export type ProteinOption = {
  name: string;
  price: number;
};

export type MenuItem = {
  code: string;
  name: string;
  /** Short serving detail shown next to the name, e.g. "4 pcs". */
  serving?: string;
  description?: string;
  /** Fixed price. When omitted, the category's protein table sets the price. */
  price?: number;
  /** Levels the kitchen offers for this dish. A single entry means "this level only". */
  spice?: SpiceLevel[];
  dietary?: DietaryOption[];
  image?: ImageSlug;
  note?: string;
};

export type MenuCategory = {
  id: string;
  title: string;
  /** Thai or descriptive subtitle shown under the title. */
  subtitle?: string;
  /** e.g. "Served with jasmine rice". */
  servedWith?: string;
  proteins?: ProteinOption[];
  /** Set false where the printed menu has no item codes (Asian & Western specials). */
  showCodes?: boolean;
  items: MenuItem[];
  coverImage?: ImageSlug;
};
