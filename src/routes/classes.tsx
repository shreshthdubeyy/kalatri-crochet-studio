import { createFileRoute } from "@tanstack/react-router";
import { Shell, Border, DmButton } from "@/components/site";

export const Route = createFileRoute("/classes")({
  head: () => ({
    meta: [
      { title: "Crochet Classes — Kalatri by Gayatri" },
      { name: "description", content: "Learn crochet with Gayatri of Kalatri. Beginner-friendly classes — DM on Instagram to join." },
      { property: "og:title", content: "Crochet Classes with Kalatri" },
      { property: "og:description", content: "Beginner-friendly crochet classes. DM @kalatri__ to join." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Classes,
});

const steps = [
  ["01", "First loops", "Holding the hook, chains, single & double crochet."],
  ["02", "Shapes", "Working in rounds, increases, decreases — the basis of every toy."],
  ["03", "Your first piece", "Finish a small project you can keep or gift."],
];

function Classes() {
  return (
    <Shell>
      <section className="mx-auto max-w-4xl px-6 py-20 text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-primary">सीखिए · Learn</p>
        <h1 className="mt-4 font-display text-5xl md:text-7xl">Crochet classes</h1>
        <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">Patient, unhurried lessons with Gayatri. No experience needed — just curiosity and a ball of yarn.</p>
        <div className="mt-8"><DmButton>DM for classes</DmButton></div>
      </section>
      <Border />
      <section className="mx-auto grid max-w-6xl gap-10 px-6 py-20 md:grid-cols-3">
        {steps.map(([n, t, d]) => (
          <div key={n} className="border-t border-foreground/20 pt-6">
            <p className="font-display text-4xl text-primary">{n}</p>
            <h3 className="mt-3 text-xl font-medium">{t}</h3>
            <p className="mt-2 text-muted-foreground">{d}</p>
          </div>
        ))}
      </section>
      <p className="px-6 text-center text-sm text-muted-foreground">Batch timings, format and fees are shared over DM.</p>
    </Shell>
  );
}
