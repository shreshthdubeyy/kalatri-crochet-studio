import { Link } from "@tanstack/react-router";
import { ShoppingBag } from "lucide-react";
import type { ReactNode } from "react";
import { useCart } from "@/lib/cart";
export const IG = "https://instagram.com/kalatri__";
export const DM = "https://ig.me/m/kalatri__";

const nav = [
  { to: "/shop", label: "Shop" },
  { to: "/custom", label: "Custom order" },
  { to: "/classes", label: "Classes" },
  { to: "/shipping", label: "Shipping & FAQ" },
] as const;

export function Shell({ children }: { children: ReactNode }) {
  const { count } = useCart();
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="bg-primary py-2 text-center text-xs tracking-wide text-primary-foreground">
        Free shipping across India on orders above ₹1,499 · Handmade in Kanpur
      </div>
      <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
          <Link to="/" className="font-display text-2xl tracking-wide">Kalatri<span className="text-primary">.</span></Link>
          <nav className="hidden gap-6 text-sm md:flex">
            {nav.map((n) => (
              <Link key={n.to} to={n.to} className="hover:text-primary" activeProps={{ className: "text-primary" }}>{n.label}</Link>
            ))}
          </nav>
          <Link to="/cart" className="relative inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm hover:border-primary" aria-label="Cart">
            <ShoppingBag className="h-4 w-4" /> Cart
            {count > 0 && <span className="rounded-full bg-primary px-2 text-xs text-primary-foreground">{count}</span>}
          </Link>
        </div>
        <nav className="flex gap-5 overflow-x-auto px-6 pb-3 text-sm md:hidden">
          {nav.map((n) => (
            <Link key={n.to} to={n.to} className="whitespace-nowrap" activeProps={{ className: "text-primary" }}>{n.label}</Link>
          ))}
        </nav>
      </header>
      {children}
      <footer className="mt-24 border-t border-border bg-secondary">
        <div className="mx-auto grid max-w-6xl gap-8 px-6 py-12 text-sm md:grid-cols-3">
          <div>
            <p className="font-display text-2xl">Kalatri by Gayatri</p>
            <p className="mt-2 text-muted-foreground">Sustainable · Handmade · Custom crochet from Kanpur. Shipping pan India.</p>
          </div>
          <div className="flex flex-col gap-2">
            <Link to="/shop" className="hover:text-primary">Shop all</Link>
            <Link to="/custom" className="hover:text-primary">Custom orders</Link>
            <Link to="/classes" className="hover:text-primary">Crochet classes</Link>
            <Link to="/shipping" className="hover:text-primary">Shipping & FAQ</Link>
          </div>
          <div className="flex flex-col gap-2 text-muted-foreground">
            <a href={IG} target="_blank" rel="noreferrer" className="text-primary hover:underline">Instagram @kalatri__</a>
            <span>📍 Kanpur, Uttar Pradesh</span>
            <span>💌 DM to order</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export function Border() { return <div aria-hidden className="motif h-3 w-full" />; }

export function DmButton({ children = "DM to order" }: { children?: ReactNode }) {
  return (
    <a href={DM} target="_blank" rel="noreferrer"
      className="inline-flex items-center gap-2 rounded-full border border-foreground/20 px-6 py-3 text-sm hover:border-primary hover:text-primary">
      {children} →
    </a>
  );
}

export function PageTitle({ eyebrow, title, sub }: { eyebrow: string; title: string; sub?: string }) {
  return (
    <section className="mx-auto max-w-4xl px-6 pb-10 pt-16 text-center">
      <p className="text-sm uppercase tracking-wide text-primary">{eyebrow}</p>
      <h1 className="mt-3 font-display text-5xl md:text-6xl">{title}</h1>
      {sub && <p className="mx-auto mt-4 max-w-xl text-muted-foreground">{sub}</p>}
    </section>
  );
}

export function Field({ label, error, children }: { label: string; error?: string | undefined; children: ReactNode }) {
  return (
    <label className="block text-sm">
      <span className="mb-1.5 block font-medium">{label}</span>
      {children}
      {error && <span className="mt-1 block text-xs text-destructive">{error}</span>}
    </label>
  );
}
