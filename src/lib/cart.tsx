import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { getProduct } from "./products";

export interface CartLine { slug: string; qty: number }
interface Ctx {
  lines: CartLine[]; count: number; subtotal: number;
  add: (slug: string, qty?: number) => void; setQty: (slug: string, qty: number) => void;
  remove: (slug: string) => void; clear: () => void;
}
const CartCtx = createContext<Ctx | null>(null);
const KEY = "kalatri-cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    try { setLines(JSON.parse(localStorage.getItem(KEY) || "[]")); } catch { /* ignore */ }
    setReady(true);
  }, []);
  useEffect(() => { if (ready) localStorage.setItem(KEY, JSON.stringify(lines)); }, [lines, ready]);

  const valid = lines.filter((l) => getProduct(l.slug));
  const value: Ctx = {
    lines: valid,
    count: valid.reduce((a, l) => a + l.qty, 0),
    subtotal: valid.reduce((a, l) => a + l.qty * (getProduct(l.slug)?.price ?? 0), 0),
    add: (slug, qty = 1) => setLines((ls) => {
      const f = ls.find((l) => l.slug === slug);
      return f ? ls.map((l) => (l.slug === slug ? { ...l, qty: Math.min(10, l.qty + qty) } : l)) : [...ls, { slug, qty }];
    }),
    setQty: (slug, qty) => setLines((ls) => qty <= 0 ? ls.filter((l) => l.slug !== slug) : ls.map((l) => (l.slug === slug ? { ...l, qty: Math.min(10, qty) } : l))),
    remove: (slug) => setLines((ls) => ls.filter((l) => l.slug !== slug)),
    clear: () => setLines([]),
  };
  return <CartCtx.Provider value={value}>{children}</CartCtx.Provider>;
}
export function useCart() {
  const c = useContext(CartCtx);
  if (!c) throw new Error("useCart outside CartProvider");
  return c;
}
