import { createFileRoute } from "@tanstack/react-router";
import { Shell, Border, PageTitle, Field } from "@/components/site";
import { InquiryForm, selectCls } from "@/components/InquiryForm";

export const Route = createFileRoute("/classes")({
  head: () => ({
    meta: [
      { title: "Crochet Classes — Kalatri by Gayatri" },
      { name: "description", content: "Learn crochet with Gayatri of Kalatri. Beginner-friendly online and in-person classes in Kanpur." },
      { property: "og:title", content: "Crochet Classes with Kalatri" },
      { property: "og:description", content: "Beginner-friendly crochet classes. Send an inquiry to join." },
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
      <PageTitle eyebrow="सीखिए · Learn" title="Crochet classes" sub="Patient, unhurried lessons with Gayatri. No experience needed — just curiosity and a ball of yarn." />
      <Border />
      <section className="mx-auto grid max-w-6xl gap-10 px-6 py-16 md:grid-cols-3">
        {steps.map(([n, t, d]) => (
          <div key={n} className="border-t border-foreground/20 pt-6">
            <p className="font-display text-4xl text-primary">{n}</p>
            <h3 className="mt-3 text-xl font-medium">{t}</h3>
            <p className="mt-2 text-muted-foreground">{d}</p>
          </div>
        ))}
      </section>
      <section className="mx-auto max-w-3xl px-6">
        <h2 className="mb-2 text-center font-display text-4xl">Class inquiry</h2>
        <p className="mb-8 text-center text-muted-foreground">Share a few details and we'll send batch timings and fees.</p>
        <InquiryForm kind="class" detailKeys={["mode", "level"]} messageLabel="Anything you'd like to learn? (optional)" cta="Send class inquiry"
          extra={<>
            <Field label="Mode">
              <select name="mode" className={selectCls} defaultValue="Online">{["Online", "In person (Kanpur)", "Either"].map((o) => <option key={o}>{o}</option>)}</select>
            </Field>
            <Field label="Your level">
              <select name="level" className={selectCls} defaultValue="Complete beginner">{["Complete beginner", "Know the basics", "Intermediate"].map((o) => <option key={o}>{o}</option>)}</select>
            </Field>
          </>} />
      </section>
    </Shell>
  );
}
