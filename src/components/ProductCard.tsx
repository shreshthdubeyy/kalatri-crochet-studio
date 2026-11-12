import { Link } from "@tanstack/react-router";
import { toast } from "sonner";
import type { Product } from "@/lib/products";
import { inr } from "@/lib/pricing";
import { useCart } from "@/lib/cart";
import { Button } from "@/components/ui/button";

export function ProductCard({ p }: { p: Product }) {
  const { add } = useCart();
  return (
    <div className="group flex flex-col">
      <Link to="/product/$slug" params={{ slug: p.slug }} className="block overflow-hidden rounded-t-[999px] bg-secondary">
        <img src={p.image} alt={p.name} loading="lazy" width={800} height={1008} className="aspect-[4/5] w-full object-cover transition duration-500 group-hover:scale-105" />
      </Link>
      <div className="mt-4 flex items-start justify-between gap-2">
        <div>
          <p className="text-xs uppercase tracking-widest text-muted-foreground">{p.category}</p>
          <Link to="/product/$slug" params={{ slug: p.slug }} className="font-display text-xl hover:text-primary">{p.name}</Link>
        </div>
        <p className="font-medium">{inr(p.price)}</p>
      </div>
      <Button variant="outline" className="mt-3 rounded-full" onClick={() => { add(p.slug); toast.success(`${p.name} added to cart`); }}>Add to cart</Button>
    </div>
  );
}
