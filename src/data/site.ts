// Business details used across the site, metadata and structured data.
// Anything marked TODO(owner) is a placeholder until the restaurant confirms it.

export const site = {
  name: "Im Aim Thai Cuisine",
  shortName: "Im Aim",
  tagline: "Authentic Thai, cooked to order in the heart of Hamilton",
  description:
    "Im Aim Thai Cuisine serves home-made Thai curries, wok dishes, sizzling plates and fresh yum salads on Hood Street, Hamilton. Dine in or take away.",
  // The printed menu says im-aim-thai-cuisine.co.nz, but that domain does not exist.
  url: "https://www.im-aim-thaicuisine.co.nz",

  phone: { display: "022 413 9274", href: "tel:+64224139274" },
  email: "im.aim.thaicuisine@gmail.com",

  address: {
    street: "18 Hood Street",
    suburb: "Hamilton Central",
    city: "Hamilton",
    postcode: "3204",
    country: "NZ",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=18+Hood+Street+Hamilton+3204",
  },

  hours: [
    { days: "Monday", time: "Closed" },
    { days: "Tuesday – Sunday", time: "10:30am – 3:00pm · 4:30pm – 9:00pm" },
  ],
  hoursConfirmed: true,

  dineIn: "Dine in for up to 28 guests · BYO wine only",

  // TODO(owner): the "Skip the Queue" QR ordering link. Buttons do nothing until this is set.
  orderUrl: null as string | null,

  social: [
    { label: "Facebook", href: "https://www.facebook.com/people/Im-Aim-thai-cuisine/100089756144796/" },
    { label: "YouTube", href: "https://www.youtube.com/@Im-AimThaicuisine" },
    // TODO(owner): Instagram (the link on Facebook is broken) and Google Business profile.
  ],
} as const;

// `ready: false` items are shown but do nothing when clicked until the page is built.
export const nav = [
  { href: "/menu", label: "Menu", ready: true },
  { href: "/about", label: "Our Story", ready: false },
  { href: "/gallery", label: "Gallery", ready: false },
  { href: "/contact", label: "Visit", ready: false },
] as const;
