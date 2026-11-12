import { createFileRoute } from "@tanstack/react-router";
import hero from "@/assets/hero.jpg";
import { Link } from "@tanstack/react-router";
import { Shell, Border, DmButton } from "@/components/site";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { PRODUCTS } from "@/lib/products";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Kalatri by Gayatri — Handmade Crochet from Kanpur" },
      { name: "description", content: "Sustainable, handmade, custom crochet toys, bags, wearables and fidgets. Made in Kanpur, shipped pan India." },
      { property: "og:title", content: "Kalatri by Gayatri — Handmade Crochet" },
      { property: "og:description", content: "Sustainable · Handmade · Custom crochet from Kanpur. DM to order." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const items = [
  { t: "Toys" as const, h: "खिलौने", d: "Soft amigurumi friends, stitched to be hugged for years." },
  { t: "Bags" as const, h: "थैले", d: "Totes, pouches and sling bags in breathable cotton yarn." },
  { t: "Wearables" as const, h: "पहनावा", d: "Tops, scrunchies, hair clips and little adornments." },
  { t: "Fidgets & more" as const, h: "और भी", d: "Keychains, flowers that never wilt, and tiny joys." },
];
const values = [
  ["Sustainable", "Natural cotton yarns, minimal waste, plastic-free packing."],
  ["Handmade", "Every loop is worked by hand by Gayatri, one piece at a time."],
  ["Custom", "Your colours, your idea — made just for you."],
];

function Index() {
  return (
    <Shell>
      <section className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-16 md:grid-cols-[1fr_1.2fr] md:py-24">
        <div>
          <p className="mb-4 text-sm uppercase tracking-wide text-primary">कला · हाथ से बनी</p>
          <h1 className="font-display text-5xl leading-[1.05] md:text-7xl">Slow-made crochet, with love from Kanpur.</h1>
          <p className="mt-6 max-w-md text-lg text-muted-foreground">Toys, bags, wearables and fidgets — sustainable, handmade and custom. Shipping pan India.</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button asChild size="lg" className="rounded-full px-8"><Link to="/shop" search={{ c: undefined }}>Shop the collection</Link></Button>
            <DmButton />
          </div>
        </div>
        <div className="relative">
          <div className="absolute -inset-3 rounded-t-full border border-primary/40" aria-hidden />
          <img src={hero} width={1600} height={1104} alt="Handmade crochet bag, bunny, teddy and rainbow on cotton cloth with marigolds"
            className="relative aspect-[4/5] w-full rounded-t-full object-cover" />
        </div>
      </section>
      <Border />
      <section className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="font-display text-4xl">What we make</h2>
        <div className="mt-10 grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {items.map((i) => (
            <Link key={i.t} to="/shop" search={{ c: i.t }} className="bg-card p-8 transition hover:bg-secondary">
              <p className="font-display text-3xl text-primary/70">{i.h}</p>
              <h3 className="mt-4 text-lg font-medium">{i.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{i.d}</p>
            </Link>
          ))}
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="flex items-end justify-between">
          <h2 className="font-display text-4xl">Bestsellers</h2>
          <Link to="/shop" search={{ c: undefined }} className="text-sm text-primary">View all →</Link>
        </div>
        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {PRODUCTS.slice(0, 4).map((p) => <ProductCard key={p.slug} p={p} />)}
        </div>
      </section>
      <section className="bg-secondary">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-20 md:grid-cols-3">
          {values.map(([t, d]) => (
            <div key={t}>
              <span className="text-2xl text-accent">✿</span>
              <h3 className="mt-2 font-display text-2xl">{t}</h3>
              <p className="mt-2 text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="mx-auto max-w-3xl px-6 py-24 text-center">
        <h2 className="font-display text-4xl md:text-5xl">Have something in mind?</h2>
        <p className="mx-auto mt-4 max-w-lg text-muted-foreground">Tell us your idea, colours and timeline. We'll stitch it up and ship it anywhere in India.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button asChild size="lg" className="rounded-full px-8"><Link to="/custom">Request a custom piece</Link></Button>
          <Button asChild size="lg" variant="outline" className="rounded-full px-8"><Link to="/classes">Join a crochet class</Link></Button>
        </div>
      </section>
    </Shell>
  );
}
