import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
export const IG = "https://instagram.com/kalatri__";
export const DM = "https://ig.me/m/kalatri__";

export function Shell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <Link to="/" className="font-display text-2xl tracking-wide">Kalatri<span className="text-primary">.</span></Link>
          <nav className="flex gap-6 text-sm">
            <Link to="/" className="hover:text-primary" activeProps={{ className: "text-primary" }} activeOptions={{ exact: true }}>Home</Link>
            <Link to="/classes" className="hover:text-primary" activeProps={{ className: "text-primary" }}>Classes</Link>
            <a href={IG} target="_blank" rel="noreferrer" className="hover:text-primary">Instagram</a>
          </nav>
        </div>
      </header>
      {children}
      <footer className="mt-24 border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-6 py-10 text-sm text-muted-foreground md:flex-row md:justify-between">
          <p className="font-display text-lg text-foreground">Kalatri by Gayatri</p>
          <p>Kanpur · Shipping Pan India · <a href={IG} className="text-primary underline-offset-4 hover:underline">@kalatri__</a></p>
        </div>
      </footer>
    </div>
  );
}

export function Border() {
  return <div aria-hidden className="motif h-3 w-full" />;
}

export function DmButton({ children = "DM to order" }: { children?: ReactNode }) {
  return (
    <a href={DM} target="_blank" rel="noreferrer"
      className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition hover:opacity-90">
      {children} →
    </a>
  );
}
