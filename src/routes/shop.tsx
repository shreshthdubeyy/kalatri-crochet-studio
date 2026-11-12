import { createFileRoute, Link } from "@tanstack/react-router";
import { z } from "zod";
import { Shell, PageTitle } from "@/components/site";
import { ProductCard } from "@/components/ProductCard";
import { CATEGORIES, PRODUCTS } from "@/lib/products";

export const Route = createFileRoute("/shop")({
  validateSearch: z.object({ c: z.string().optional() }),
  head: () => ({
    meta: [
      { title: "Shop Handmade Crochet — Kalatri by Gayatri" },
      { name: "description", content: "Shop crochet toys, bags, wearables, fidgets and flowers, handmade in Kanpur and shipped across India." },
      { property: "og:title", content: "Shop — Kalatri by Gayatri" },
      { property: "og:description", content: "Handmade crochet toys, bags, wearables and fidgets." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Shop,
});

function Shop() {
  const { c } = Route.useSearch();
  const list = c ? PRODUCTS.filter((p) => p.category === c) : PRODUCTS;
  const chip = "rounded-full border px-4 py-1.5 text-sm transition";
  return (
    <Shell>
      <PageTitle eyebrow="दुकान · Shop" title="The collection" sub="Every piece is made by hand, one loop at a time. Want a different colour? Add a note at checkout." />
      <div className="mx-auto flex max-w-6xl flex-wrap justify-center gap-2 px-6">
        <Link to="/shop" search={{ c: undefined }} className={`${chip} ${!c ? "border-primary bg-primary text-primary-foreground" : "border-border hover:border-primary"}`}>All</Link>
        {CATEGORIES.map((cat) => (
          <Link key={cat} to="/shop" search={{ c: cat }} className={`${chip} ${c === cat ? "border-primary bg-primary text-primary-foreground" : "border-border hover:border-primary"}`}>{cat}</Link>
        ))}
      </div>
      <section className="mx-auto grid max-w-6xl gap-x-8 gap-y-14 px-6 py-14 sm:grid-cols-2 lg:grid-cols-4">
        {list.map((p) => <ProductCard key={p.slug} p={p} />)}
      </section>
    </Shell>
  );
}
