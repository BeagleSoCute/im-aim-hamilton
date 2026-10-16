import { aiImageByCode, type ImageSlug } from "./images.generated";
import type { MenuCategory, MenuItem, ProteinOption } from "./types";

// Source: "menu EDIT.pdf" (Oct 2026). Prices in NZD.
// Order, names and descriptions follow the printed menu; only spelling is tidied.
// Anything marked TODO(owner) needs confirming.

const curryAndWokProteins: ProteinOption[] = [
  { name: "Chicken", price: 24.9 },
  { name: "Beef", price: 24.9 },
  { name: "Pork", price: 24.9 },
  { name: "Duck", price: 26.9 },
  { name: "Fish fillets or squid", price: 26.9 },
  { name: "Mixed seafood", price: 26.9 },
  { name: "Prawn cutlets", price: 26.9 },
  { name: "Vegetable", price: 23.0 },
  { name: "Vegetable & tofu", price: 23.9 },
];

export const menu: MenuCategory[] = [
  {
    id: "appetizers",
    title: "Appetizers",
    items: [
      {
        code: "A1",
        name: "Spring Rolls",
        serving: "4 pcs · home-made",
        description: "Vegetables and rice vermicelli.",
        price: 12.5,
        dietary: ["vegan"],
        image: "spring-roll",
      },
      {
        code: "A2",
        name: "Deep Fried Tofu",
        serving: "Fresh tofu",
        description: "Tofu with satay sauce and crushed peanuts.",
        price: 12.5,
        dietary: ["vegan", "gluten-free"],
        image: "deep-fry-tofu",
      },
      {
        code: "A3",
        name: "Prawn Pastry",
        serving: "4 pcs · home-made",
        description: "Deep fried prawn pastry with sweet chilli sauce.",
        price: 13.5,
      },
      {
        code: "A4",
        name: "Curry Puffs",
        serving: "4 pcs · home-made",
        description: "Minced chicken with curry paste, potato and onion.",
        price: 14,
      },
      {
        code: "A5",
        name: "Satay Chicken",
        serving: "4 sticks · home-made sauce",
        description: "Thai BBQ chicken with satay sauce.",
        price: 14,
        dietary: ["gluten-free"],
        image: "satay-chicken",
      },
      {
        code: "A6",
        name: "Money Bags",
        serving: "5 pcs · home-made",
        description: "Deep fried wonton pastry filled with minced chicken, mixed vegetables and onion.",
        price: 13.5,
        image: "money-bag",
      },
      {
        code: "A7",
        name: "Chicken Wings",
        serving: "6 pcs",
        description: "With BBQ sauce.",
        price: 18,
        image: "chicken-wing",
      },
      {
        code: "A8",
        name: "Mixed Appetizers",
        serving: "5 pcs",
        description: "One each of A1, A3, A4, A5 and A6.",
        price: 16.5,
        image: "mixed-appetizers",
      },
    ],
  },
  {
    id: "soup",
    title: "Soup",
    servedWith: "No rice",
    proteins: [
      { name: "Chicken", price: 17.9 },
      { name: "Vegetable", price: 15.9 },
      { name: "Vegetable & tofu", price: 16.9 },
      { name: "Mixed seafood", price: 18.9 },
      { name: "Prawns", price: 18.9 },
    ],
    items: [
      {
        code: "S1",
        name: "Tom Yum",
        description:
          "Thai hot and sour soup with tomato, mushroom, chilli, lemongrass, galangal, coriander, spring onion and red onion.",
        spice: ["medium"],
        image: "tom-yum",
      },
      {
        code: "S2",
        name: "Tom Kha",
        description:
          "Coconut milk soup with galangal, lemongrass, spring onion, mushroom, coriander, cabbage and red onion.",
        spice: ["mild", "medium"],
        image: "tom-kha",
      },
    ],
  },
  {
    id: "curries",
    title: "Curries",
    servedWith: "Served with rice",
    proteins: curryAndWokProteins,
    items: [
      {
        code: "C1",
        name: "Green Curry",
        description: "Green curry paste and coconut milk with bamboo shoots, beans, chilli and mixed vegetables.",
        dietary: ["vegan"],
        image: "green-curry",
      },
      {
        code: "C2",
        name: "Red Curry",
        description: "Red curry paste cooked with coconut milk, bamboo shoots, beans and mixed vegetables.",
        dietary: ["vegan"],
        image: "red-curry",
      },
      {
        code: "C3",
        name: "Panang Curry",
        description: "Panang paste cooked with coconut milk and crushed peanuts, beans, pumpkin and mixed vegetables.",
        dietary: ["vegan"],
        image: "panang-curry",
      },
      {
        code: "C4",
        name: "Massaman Beef",
        description: "Sweet red curry with beef, potato, onion, peanuts, carrot and coconut milk.",
        // TODO(owner): the printed menu shows no separate price; assumed beef price.
        price: 24.9,
        spice: ["medium"],
        image: "massaman",
      },
    ],
  },
  {
    id: "wok",
    title: "Wok",
    servedWith: "On rice for dine-in · rice in a separate box for takeaway",
    proteins: [
      ...curryAndWokProteins.slice(0, 5),
      { name: "Pork belly", price: 26.9 },
      ...curryAndWokProteins.slice(5),
    ],
    items: [
      {
        code: "W1",
        name: "Pad Kra Pao",
        description: "Stir fried basil with chilli and garlic, beans, baby corn and capsicum.",
        spice: ["medium"],
        dietary: ["vegan"],
        image: "pad-kra-pao",
      },
      {
        code: "W2",
        name: "Stir Fried Cashew Nut",
        description: "Mushroom, onion, baby corn, vegetables and cashew nuts with chilli soybean sauce.",
        spice: ["mild", "medium"],
        dietary: ["vegan", "gluten-free"],
        image: "cashew-nut",
      },
      {
        code: "W3",
        name: "Sweet and Sour",
        description: "Stir fried vegetables with tomato, pineapple and onion in sweet and sour sauce.",
        spice: ["mild"],
        dietary: ["vegan"],
      },
      {
        code: "W4",
        name: "Pad Pak Satay",
        description: "Stir fried vegetables topped with peanut sauce.",
        spice: ["mild"],
        dietary: ["vegan", "gluten-free"],
      },
      {
        code: "W5",
        name: "Stir Fried Ginger",
        description: "Mushroom, onion, celery, capsicum and vegetables with ginger.",
        spice: ["mild", "medium"],
        dietary: ["vegan", "gluten-free"],
        image: "stir-fried-ginger",
      },
      {
        code: "W6",
        name: "Pad Prik Pao",
        description: "Stir fried green beans, onion, mushroom, spring onion and capsicum with chilli soybean oil.",
        spice: ["mild", "medium"],
        dietary: ["vegan"],
        image: "pad-prik-pao",
      },
    ],
  },
  {
    id: "sizzling",
    title: "Sizzling",
    servedWith: "Served with rice",
    proteins: [
      { name: "Chicken", price: 25.9 },
      { name: "Beef", price: 25.9 },
      { name: "Pork", price: 25.9 },
      { name: "Duck", price: 27.9 },
      { name: "Seafood", price: 27.9 },
      { name: "Prawn", price: 27.9 },
    ],
    items: [
      {
        code: "SZ1",
        name: "Sizzling Meat",
        description: "Vegetables and meat with oyster sauce.",
        spice: ["mild"],
        dietary: ["gluten-free"],
        image: "sizzling-meat",
      },
      {
        code: "SZ2",
        name: "Sizzling Garlic & Pepper",
        description: "Stir fried garlic and pepper with meat and vegetables.",
        spice: ["medium"],
        dietary: ["gluten-free"],
        image: "sizzling-garlic-pepper",
      },
      {
        code: "SZ3",
        name: "Sizzling Pad Cha",
        description:
          "Stir fried chilli and garlic with Thai herb krachai, whole green peppercorns, beans, mushroom, capsicum and baby corn.",
        spice: ["hot"],
        dietary: ["gluten-free"],
        image: "sizzling-pad-cha",
      },
      {
        code: "SZ4",
        name: "Sizzling Vegetables with Cashew Nut",
        serving: "Vegetables only, no meat",
        description: "Stir fried chilli soybean oil with vegetables, onion, mushroom, capsicum, baby corn and cashew nuts.",
        price: 23,
        dietary: ["vegan", "gluten-free"],
        image: "sizzling-vege-cashew",
      },
    ],
  },
  {
    id: "salads",
    title: "Thai Salad",
    items: [
      {
        code: "T1",
        name: "Yum Gai Zab",
        description:
          "Deep fried chicken with red onion, lemon juice, coriander, spring onion, tomato, chilli powder and cashew nuts.",
        price: 25.9,
        image: "yum-gai-zab",
      },
      {
        code: "T2",
        name: "Yum Tofu",
        description:
          "Deep fried tofu with red onion, chilli, garlic, lemon juice, coriander, spring onion, tomato and bean sprouts.",
        price: 23.9,
        dietary: ["gluten-free"],
        image: "yum-tofu",
      },
      {
        code: "T3",
        name: "Yum Gai Yang",
        serving: "Thigh",
        description:
          "Chicken thigh marinated with Thai sauce, red onion, lemon juice, coriander, spring onion, tomato, cucumber, fresh chilli and fresh garlic.",
        price: 25.9,
        image: "yum-gai-yang",
      },
      {
        code: "T4",
        name: "Deep Fried Prawn Salad",
        description: "Deep fried prawns with tomato, cucumber and red onion salad, salad dressing and Thai chilli sauce.",
        price: 25.9,
        image: "deep-fry-prawn-salad",
      },
      {
        code: "T5",
        name: "Yum Beef Salad",
        description:
          "Beef with yum sauce of lemon juice, chilli and garlic, red onion, spring onion, coriander and tomato.",
        price: 24.9,
        image: "yum-beef",
      },
      {
        code: "T6",
        name: "Yum Pork Belly",
        description:
          "Pork belly with chilli, garlic, yum sauce, salad dressing, red onion, coriander, tomato, cucumber and spring onion.",
        price: 26.9,
        dietary: ["gluten-free"],
        image: "yum-pork-belly",
      },
      {
        code: "T7",
        name: "Yum Fresh Salmon",
        description:
          "Fresh salmon with chilli, garlic, yum sauce, red onion, coriander, spring onion, tomato, carrot and fresh salad.",
        price: 30,
        spice: ["medium", "hot"],
        image: "yum-salmon",
      },
    ],
  },
  {
    id: "rice-noodles",
    title: "Rice & Noodle",
    proteins: [
      { name: "Chicken", price: 23.5 },
      { name: "Beef", price: 23.5 },
      { name: "Pork", price: 23.5 },
      { name: "Vegetable & tofu", price: 22.5 },
      { name: "Pork belly", price: 25.9 },
      { name: "Prawn", price: 25.9 },
    ],
    items: [
      {
        code: "R1",
        name: "Thai Fried Rice",
        description: "Egg, onion, beans and vegetables.",
        spice: ["mild"],
        dietary: ["vegan", "gluten-free"],
        image: "thai-fried-rice",
      },
      {
        code: "R2",
        name: "Tom Yum Fried Rice",
        description: "Onion, tomato, vegetables and mushroom, with the flavours of tom yum.",
        spice: ["mild", "medium"],
        dietary: ["vegan"],
        image: "tom-yum-fried-rice",
      },
      {
        code: "R3",
        name: "Basil Thai Fried Rice",
        description: "Beans, baby corn, capsicum, chilli and basil paste.",
        spice: ["medium"],
        dietary: ["vegan"],
      },
      {
        code: "R4",
        name: "Pineapple Fried Rice",
        description: "Pineapple, egg, onion, curry powder, capsicum, cashew nuts and mixed vegetables.",
        spice: ["mild"],
        dietary: ["vegan"],
        image: "pineapple-fried-rice",
      },
      {
        code: "N1",
        name: "Pad Thai",
        description: "Thailand's famous dish: flat thin rice noodles with egg, peanuts, bean sprouts, tofu and chives.",
        image: "pad-thai",
      },
      {
        code: "N2",
        name: "Pad See Ew",
        description: "Stir fried flat rice noodles with egg, vegetables and soybean paste.",
        // TODO(owner): printed menu lists Pad See Ew as gluten-free; soy sauce usually contains wheat. Confirm.
        dietary: ["vegan", "gluten-free"],
      },
      {
        code: "N3",
        name: "Tom Yum Noodle Soup",
        description: "Hokkien noodles with tom yum soup.",
        spice: ["medium"],
        image: "tom-yum-noodle",
      },
      {
        code: "N4",
        name: "Hokkien Noodles with Curry",
        description: "Choice of green curry or red curry with hokkien noodles.",
        dietary: ["vegan"],
      },
      {
        code: "N5",
        name: "Hokkien Noodles",
        description: "Stir fried vegetables with the Thai chef's special home-made sauce.",
        image: "hokkien-noodle",
      },
      {
        code: "N6",
        name: "Drunken Noodles",
        description:
          "Hokkien noodles with hot chilli, basil, krachai, baby corn, mushroom, capsicum, beans, chilli and garlic.",
        spice: ["medium", "hot"],
        dietary: ["vegan"],
        image: "drunken-noodle",
      },
    ],
  },
  {
    id: "signature",
    title: "Signature Dishes",
    items: [
      {
        code: "SP1",
        name: "Green Curry Salmon",
        serving: "With rice",
        description: "Green curry with salmon, vegetables, bamboo shoots, capsicum, beans and mixed vegetables.",
        price: 30.9,
        image: "green-curry-salmon",
      },
      {
        code: "SP2",
        name: "Deep Fried Chicken with Garlic & Pepper Sauce",
        serving: "With rice",
        description: "Deep fried chicken with garlic and black pepper sauce and vegetables.",
        price: 26.9,
        image: "garlic-pepper-chicken",
      },
      {
        code: "SP3",
        name: "Grilled Salmon with Basil Sauce",
        serving: "With rice",
        description: "Grilled salmon topped with basil sauce on a base of vegetables.",
        price: 30.9,
        image: "salmon-basil",
      },
      {
        code: "SP4",
        name: "Duck on Rice with Vegetables",
        description: "Duck on rice topped with Thai special sauce, with vegetables.",
        price: 26.9,
        image: "duck-on-rice",
      },
      {
        code: "SP5",
        name: "Pork Belly on Rice with Vegetables",
        description: "Pork belly on rice topped with Thai special sauce, with vegetables on the side.",
        price: 26.9,
      },
    ],
  },
  {
    id: "kids",
    title: "Kids",
    items: [
      {
        code: "K1",
        name: "Nuggets with Chips",
        description: "8 chicken nuggets with chips and tomato sauce.",
        price: 12,
      },
      {
        code: "K2",
        name: "Chicken Sticks with Chips",
        description: "6 chicken sticks with chips and tomato sauce.",
        price: 14,
      },
      {
        code: "K3",
        name: "Thai Fried Rice, Chicken with Butter",
        description: "Kids' portion with chicken, mixed vegetables, onion and butter.",
        price: 16.5,
      },
      {
        code: "K4",
        name: "Deep Fried Chicken with Chips",
        description: "Deep fried chicken pieces with some salad, chips and tomato sauce.",
        price: 18,
      },
      {
        code: "K5",
        name: "Kids Fish with Chips",
        description: "Kids' size deep fried fish fillet with some salad and chips.",
        price: 18,
      },
      {
        code: "K6",
        name: "Chicken Wings with Chips",
        description: "Chicken wings with some salad and chips, sweet and sour sauce on the side.",
        price: 18,
      },
      {
        code: "K7",
        name: "Deep Fried Prawn Salad",
        description: "Kids' size deep fried prawns with salad, topped with dressing.",
        price: 18,
      },
    ],
  },
  {
    id: "asian-special",
    title: "Asian Special",
    showCodes: false,
    items: [
      {
        code: "AS1",
        name: "Chicken Teriyaki",
        serving: "Thigh",
        description: "Chicken teriyaki and vegetables with rice.",
        price: 25.9,
      },
      {
        code: "AS2",
        name: "Sizzling Salmon Teriyaki",
        description: "With rice.",
        price: 30,
        image: "sizzling-salmon-teriyaki",
      },
      {
        code: "AS3",
        name: "Japanese Curry",
        description: "Pork belly or deep fried prawns.",
        price: 26.9,
      },
      {
        code: "AS4",
        name: "Rice Bowl Salad · Chicken Teriyaki",
        serving: "Thigh",
        price: 25.9,
        image: "rice-bowl-teriyaki",
      },
      {
        code: "AS5",
        name: "Rice Bowl Salad · Chicken Satay",
        description: "With satay sauce dressing.",
        price: 25.9,
        image: "rice-bowl-satay",
      },
      {
        code: "AS6",
        name: "Rice Bowl Salad · Deep Fried Prawn",
        description: "With dressing and chilli sauce.",
        price: 25.9,
        image: "rice-bowl-prawn",
      },
    ],
  },
  {
    id: "western",
    title: "Western Special",
    showCodes: false,
    items: [
      { code: "WS1", name: "Chips", price: 7 },
      { code: "WS2", name: "Garlic Bread", price: 9, image: "garlic-bread" },
      { code: "WS3", name: "Wedges", description: "With BBQ sauce and sour cream.", price: 12 },
      { code: "WS4", name: "Calamari", price: 16.5 },
      { code: "WS5", name: "BBQ Chicken Wings", price: 18 },
      { code: "WS6", name: "Gambas", description: "Chilli and garlic prawns with garlic bread.", price: 20 },
      { code: "WS7", name: "Sizzling Beef with Chips", price: 25.9 },
      { code: "WS8", name: "Pork Belly with Chips", price: 26.9 },
      { code: "WS9", name: "BBQ Pork Ribs with Wedges", price: 29.9, image: "bbq-pork-rib" },
      {
        code: "WS10",
        name: "Lamb Shank",
        description: "With massaman curry or gravy.",
        price: 32.9,
        note: "Ask for availability",
      },
      {
        code: "WS11",
        name: "Chicken with Gravy & Chips",
        serving: "Thigh",
        description: "Chicken and vegetables topped with gravy sauce, with chips.",
        price: 25.9,
      },
    ],
  },
];

export const extras: ProteinOption[] = [
  { name: "Jasmine rice", price: 4 },
  { name: "Roti", price: 4 },
  { name: "Peanut sauce", price: 4 },
  { name: "Meat (chicken, beef, pork)", price: 5 },
  { name: "Combination meat", price: 7 },
  { name: "Prawn", price: 7 },
  { name: "Vegetable", price: 4 },
  { name: "Cashew nuts on top", price: 4 },
];

/** The printed menu's gluten-free and vegan page, reproduced as listed. */
export const dietaryLists = {
  "gluten-free": {
    title: "Gluten Free",
    note: "All gluten-free orders must be mentioned to our front staff.",
    items: [
      "Deep fried tofu with satay sauce",
      "Satay chicken entrée (4 sticks)",
      "Satay chicken salad (main)",
      "Stir fried ginger",
      "Stir fried cashew nut",
      "Pad pak satay",
      "Thai fried rice",
      "Yum tofu",
      "Yum duck",
      "Yum pork belly",
      "Sizzling dishes",
      "Pad see ew noodles",
    ],
  },
  vegan: {
    title: "Vegan",
    note: "All vegan orders must be mentioned to our front staff.",
    items: [
      "Spring rolls",
      "Deep fried tofu with satay sauce",
      "All wok dishes",
      "All curries",
      "All fried rice",
      "Sizzling vegetables with cashew nut",
      "Pad see ew, hokkien curry noodles, drunken noodles",
    ],
  },
} as const;

export const spiceLabels = {
  mild: "Mild",
  medium: "Medium",
  hot: "Hot",
  "extra-hot": "Extremely hot",
} as const;

export const dietaryLabels = {
  vegan: { short: "V", long: "Vegan on request" },
  "gluten-free": { short: "GF", long: "Gluten-free on request" },
} as const;

export const allergyNotice = "All food allergies, please mention to our front staff.";

export const allergens = ["Dairy", "Egg", "Soy", "Peanut", "Seafood", "Gluten", "Shellfish", "Sesame"] as const;

export function formatPrice(value: number) {
  return `$${value.toFixed(2)}`;
}

/** Lowest price for an item, for "from $x" labels. */
export function startingPrice(item: { price?: number }, category: MenuCategory) {
  if (item.price !== undefined) return item.price;
  return Math.min(...(category.proteins ?? []).map((p) => p.price));
}

/** A real photo when there is one, otherwise an AI stand-in if generated. */
export function dishImage(item: MenuItem): ImageSlug | undefined {
  return item.image ?? aiImageByCode[item.code];
}

export function findItem(code: string) {
  for (const category of menu) {
    const item = category.items.find((i) => i.code === code);
    if (item) return { item, category };
  }
  throw new Error(`Unknown menu item ${code}`);
}
