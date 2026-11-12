import { createFileRoute } from "@tanstack/react-router";
import { Shell, PageTitle, DmButton } from "@/components/site";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const Route = createFileRoute("/shipping")({
  head: () => ({
    meta: [
      { title: "Shipping & FAQ — Kalatri by Gayatri" },
      { name: "description", content: "Shipping charges, delivery times, payments, care and custom order FAQs for Kalatri crochet." },
      { property: "og:title", content: "Shipping & FAQ — Kalatri" },
      { property: "og:description", content: "Everything about shipping, payments and care." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Shipping,
});

const faqs: [string, string][] = [
  ["Do you ship across India?", "Yes! We ship pan India from Kanpur via trusted courier partners. You'll get a tracking link once your parcel is out."],
  ["How much is shipping?", "Flat ₹99 on orders below ₹1,499. Orders of ₹1,499 and above ship free."],
  ["How long will my order take?", "Each piece is handmade, so most items are ready in 3–14 days (see the product page). Delivery then takes about 3–7 working days depending on your city."],
  ["How do I pay?", "After you place an order, we'll call or WhatsApp you to confirm and share UPI / bank transfer details. Your order is made once payment is received."],
  ["Can I change colours or sizes?", "Absolutely — add a note at checkout, or send a custom order inquiry for something fully personalised."],
  ["Do you accept returns?", "Since every piece is handmade (often to order), we don't accept returns for change of mind. If your parcel arrives damaged, send us an unboxing video within 48 hours and we'll make it right."],
  ["How do I care for crochet?", "Hand wash gently in cold water with mild soap, don't wring, and dry flat in shade. Toys are best spot cleaned."],
  ["Do you take bulk or gifting orders?", "Yes — weddings, baby showers, corporate gifting and return gifts. Use the custom order form or DM us."],
];

function Shipping() {
  return (
    <Shell>
      <PageTitle eyebrow="सवाल-जवाब · FAQ" title="Shipping & FAQ" />
      <section className="mx-auto grid max-w-4xl gap-4 px-6 pb-10 sm:grid-cols-3">
        {[["🚛", "Pan India shipping"], ["₹99", "Free above ₹1,499"], ["3–7 days", "Delivery after dispatch"]].map(([a, b]) => (
          <div key={b} className="rounded-lg bg-secondary p-6 text-center"><p className="font-display text-3xl text-primary">{a}</p><p className="mt-1 text-sm">{b}</p></div>
        ))}
      </section>
      <section className="mx-auto max-w-3xl px-6">
        <Accordion type="single" collapsible>
          {faqs.map(([q, a], i) => (
            <AccordionItem key={q} value={`q${i}`}>
              <AccordionTrigger className="text-left font-display text-xl">{q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        <div className="mt-10 text-center"><p className="mb-4 text-muted-foreground">Still have a question?</p><DmButton>Ask us on Instagram</DmButton></div>
      </section>
    </Shell>
  );
}
