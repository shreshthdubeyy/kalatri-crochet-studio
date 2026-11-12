import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, X } from "lucide-react";
import { Shell, PageTitle } from "@/components/site";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart";
import { getProduct } from "@/lib/products";
import { FREE_SHIPPING_MIN, inr, shippingFor } from "@/lib/pricing";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Your Cart — Kalatri by Gayatri" },
      { name: "description", content: "Review the handmade crochet pieces in your cart." },
      { property: "og:title", content: "Cart — Kalatri" },
      { property: "og:description", content: "Your Kalatri cart." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: CartPage,
});

export function Summary({ subtotal }: { subtotal: number }) {
  const ship = shippingFor(subtotal);
  return (
    <div className="space-y-2 text-sm">
      <div className="flex justify-between"><span>Subtotal</span><span>{inr(subtotal)}</span></div>
      <div className="flex justify-between"><span>Shipping</span><span>{ship === 0 ? "Free" : inr(ship)}</span></div>
      {ship > 0 && <p className="text-xs text-muted-foreground">Add {inr(FREE_SHIPPING_MIN - subtotal)} more for free shipping.</p>}
      <div className="flex justify-between border-t border-border pt-3 text-base font-medium"><span>Total</span><span>{inr(subtotal + ship)}</span></div>
    </div>
  );
}

function CartPage() {
  const { lines, setQty, remove, subtotal } = useCart();
  return (
    <Shell>
      <PageTitle eyebrow="झोला · Cart" title="Your cart" />
      {lines.length === 0 ? (
        <div className="text-center">
          <p className="text-muted-foreground">Your cart is empty.</p>
          <Button asChild className="mt-6 rounded-full"><Link to="/shop" search={{ c: undefined }}>Browse the shop</Link></Button>
        </div>
      ) : (
        <div className="mx-auto grid max-w-5xl gap-10 px-6 md:grid-cols-[1fr_320px]">
          <ul className="divide-y divide-border border-y border-border">
            {lines.map((l) => {
              const p = getProduct(l.slug)!;
              return (
                <li key={l.slug} className="flex gap-4 py-5">
                  <img src={p.image} alt={p.name} className="h-24 w-20 rounded-md object-cover" />
                  <div className="flex-1">
                    <Link to="/product/$slug" params={{ slug: p.slug }} className="font-display text-xl hover:text-primary">{p.name}</Link>
                    <p className="text-sm text-muted-foreground">{inr(p.price)}</p>
                    <div className="mt-2 inline-flex items-center rounded-full border border-border">
                      <button aria-label="Decrease" className="p-2" onClick={() => setQty(l.slug, l.qty - 1)}><Minus className="h-3 w-3" /></button>
                      <span className="w-6 text-center text-sm">{l.qty}</span>
                      <button aria-label="Increase" className="p-2" onClick={() => setQty(l.slug, l.qty + 1)}><Plus className="h-3 w-3" /></button>
                    </div>
                  </div>
                  <div className="flex flex-col items-end justify-between">
                    <button aria-label="Remove" onClick={() => remove(l.slug)} className="text-muted-foreground hover:text-destructive"><X className="h-4 w-4" /></button>
                    <span className="font-medium">{inr(p.price * l.qty)}</span>
                  </div>
                </li>
              );
            })}
          </ul>
          <aside className="h-fit rounded-lg bg-secondary p-6">
            <Summary subtotal={subtotal} />
            <Button asChild size="lg" className="mt-6 w-full rounded-full"><Link to="/checkout">Checkout</Link></Button>
            <Link to="/shop" search={{ c: undefined }} className="mt-3 block text-center text-sm text-primary">Continue shopping</Link>
          </aside>
        </div>
      )}
    </Shell>
  );
}
