import teddy from "@/assets/p-teddy.jpg";
import bunny from "@/assets/p-bunny.jpg";
import tote from "@/assets/p-tote.jpg";
import sling from "@/assets/p-sling.jpg";
import top from "@/assets/p-top.jpg";
import hair from "@/assets/p-hair.jpg";
import fidget from "@/assets/p-fidget.jpg";
import flowers from "@/assets/p-flowers.jpg";

export type Category = "Toys" | "Bags" | "Wearables" | "Fidgets & more";
export const CATEGORIES: Category[] = ["Toys", "Bags", "Wearables", "Fidgets & more"];

export interface Product {
  slug: string; name: string; price: number; category: Category; image: string;
  short: string; description: string; details: string[]; leadTime: string;
}

export const PRODUCTS: Product[] = [
  { slug: "bholu-teddy", name: "Bholu the Teddy", price: 899, category: "Toys", image: teddy,
    short: "A soft amigurumi bear with a pink scarf.",
    description: "Bholu is stitched in soft milk-cotton yarn with safety eyes and a hand-tied scarf. Perfect for little ones and grown-ups who still love teddies.",
    details: ["Approx. 20 cm tall", "Milk-cotton yarn, polyfill stuffing", "Safety eyes", "Spot clean only"], leadTime: "Ready in 5–7 days" },
  { slug: "khargosh-bunny", name: "Khargosh Bunny", price: 999, category: "Toys", image: bunny,
    short: "Long-eared bunny in sage overalls.",
    description: "A gentle bunny with removable-look overalls and wooden buttons, made to be hugged for years.",
    details: ["Approx. 24 cm tall", "Cotton yarn", "Wooden buttons", "Spot clean only"], leadTime: "Ready in 5–7 days" },
  { slug: "phool-tote", name: "Phool Tote", price: 1499, category: "Bags", image: tote,
    short: "Cream tote with terracotta flowers.",
    description: "A sturdy everyday tote in cream cotton with tiny terracotta blossoms and comfy shoulder handles.",
    details: ["Approx. 35 × 30 cm", "Thick cotton yarn", "Fits a laptop sleeve", "Hand wash cold"], leadTime: "Ready in 7–10 days" },
  { slug: "haldi-sling", name: "Haldi Bucket Sling", price: 1199, category: "Bags", image: sling,
    short: "Mustard drawstring sling with tassel.",
    description: "A little bucket bag in turmeric-yellow with a drawstring top and long crossbody strap.",
    details: ["Approx. 22 × 15 cm", "Cotton yarn", "Drawstring closure", "Hand wash cold"], leadTime: "Ready in 7–10 days" },
  { slug: "granny-square-top", name: "Granny Square Top", price: 1899, category: "Wearables", image: top,
    short: "Off-white crop top with terracotta & sage.",
    description: "Made to your measurements, this breezy top is perfect for summer days and festive brunches alike.",
    details: ["Made to measure (we'll ask over DM)", "100% cotton", "Hand wash, dry flat"], leadTime: "Ready in 10–14 days" },
  { slug: "scrunchie-set", name: "Scrunchie & Bow Set", price: 449, category: "Wearables", image: hair,
    short: "Three scrunchies and a bow clip.",
    description: "A pastel set of three ruffle scrunchies and a matching bow hair clip. A lovely gift.",
    details: ["Set of 4 pieces", "Cotton yarn", "Gentle on hair"], leadTime: "Ready in 3–5 days" },
  { slug: "fidget-trio", name: "Fidget Trio", price: 599, category: "Fidgets & more", image: fidget,
    short: "Mini octopus, strawberry keychain & squish ball.",
    description: "Three small joys for busy hands — great for desks, bags and gifting.",
    details: ["Octopus approx. 8 cm", "Keychain with metal ring", "Cotton yarn"], leadTime: "Ready in 3–5 days" },
  { slug: "genda-bouquet", name: "Genda Bouquet", price: 1299, category: "Fidgets & more", image: flowers,
    short: "Marigold and pink blooms that never wilt.",
    description: "A forever bouquet of crochet marigolds and pink blossoms tied with jute — for pooja corners, gifts and weddings.",
    details: ["Approx. 30 cm tall", "9 flowers + buds", "Wire stems"], leadTime: "Ready in 7–10 days" },
];

export const getProduct = (slug: string) => PRODUCTS.find((p) => p.slug === slug);
