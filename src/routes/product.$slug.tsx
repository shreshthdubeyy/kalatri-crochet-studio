import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Minus, Plus } from "lucide-react";
import { Shell, DmButton } from "@/components/site";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { getProduct, PRODUCTS } from "@/lib/products";
import { inr } from "@/lib/pricing";
import { useCart } from "@/lib/cart";

export const Route = createFileRoute("/product/$slug")({
  loader: ({ params }) => {
    const p = getProduct(params.slug);
    if (!p) throw notFound();
    return { slug: p.slug };
  },
  head: ({ loaderData }) => {
    const p = loaderData ? getProduct(loaderData.slug) : undefined;
    if (!p) return { meta: [{ title: "Product not found — Kalatri" }, { name: "robots", content: "noindex" }] };
    return {
      meta: [
        { title: `${p.name} — Kalatri by Gayatri` },
        { name: "description", content: p.short },
        { property: "og:title", content: `${p.name} — Kalatri` },
        { property: "og:description", content: p.short },
        { property: "og:type", content: "product" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  notFoundComponent: () => (
    <Shell><div className="py-32 text-center"><h1 className="font-display text-4xl">Product not found</h1><Link to="/shop" search={{ c: undefined }} className="mt-4 inline-block text-primary">Back to shop</Link></div></Shell>
  ),
  component: ProductPage,
});

function ProductPage() {
  const { slug } = Route.useLoaderData();
  const p = getProduct(slug)!;
  const { add } = useCart();
  const nav = useNavigate();
  const [qty, setQty] = useState(1);
  const related = PRODUCTS.filter((x) => x.category === p.category && x.slug !== p.slug).concat(PRODUCTS.filter((x) => x.category !== p.category)).slice(0, 4);
  return (
    <Shell>
      <section className="mx-auto grid max-w-6xl gap-12 px-6 py-14 md:grid-cols-2">
        <img src={p.image} alt={p.name} width={800} height={1008} className="aspect-[4/5] w-full rounded-t-[999px] object-cover" />
        <div className="md:pt-10">
          <Link to="/shop" search={{ c: p.category }} className="text-xs uppercase tracking-widest text-primary">{p.category}</Link>
          <h1 className="mt-2 font-display text-5xl">{p.name}</h1>
          <p className="mt-3 text-2xl">{inr(p.price)}</p>
          <p className="mt-6 text-muted-foreground">{p.description}</p>
          <ul className="mt-6 space-y-1 text-sm">{p.details.map((d) => <li key={d}>✿ {d}</li>)}</ul>
          <p className="mt-4 text-sm text-primary">{p.leadTime} · Ships pan India</p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <div className="flex items-center rounded-full border border-border">
              <button aria-label="Decrease" className="p-3" onClick={() => setQty((q) => Math.max(1, q - 1))}><Minus className="h-4 w-4" /></button>
              <span className="w-8 text-center">{qty}</span>
              <button aria-label="Increase" className="p-3" onClick={() => setQty((q) => Math.min(10, q + 1))}><Plus className="h-4 w-4" /></button>
            </div>
            <Button className="rounded-full px-8" size="lg" onClick={() => { add(p.slug, qty); toast.success("Added to cart"); }}>Add to cart</Button>
            <Button variant="outline" className="rounded-full" size="lg" onClick={() => { add(p.slug, qty); nav({ to: "/checkout" }); }}>Buy now</Button>
          </div>
          <div className="mt-6"><DmButton>Want it in other colours? DM us</DmButton></div>
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-6 py-10">
        <h2 className="font-display text-3xl">You may also love</h2>
        <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">{related.map((r) => <ProductCard key={r.slug} p={r} />)}</div>
      </section>
    </Shell>
  );
}
