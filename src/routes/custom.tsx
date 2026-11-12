import { createFileRoute } from "@tanstack/react-router";
import { Shell, PageTitle, Field } from "@/components/site";
import { InquiryForm, selectCls } from "@/components/InquiryForm";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/custom")({
  head: () => ({
    meta: [
      { title: "Custom Crochet Orders — Kalatri by Gayatri" },
      { name: "description", content: "Request a custom crochet toy, bag, wearable or gift in your colours. Handmade in Kanpur." },
      { property: "og:title", content: "Custom orders — Kalatri" },
      { property: "og:description", content: "Your idea, your colours — stitched by hand." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Custom,
});

function Custom() {
  return (
    <Shell>
      <PageTitle eyebrow="आपके लिए · Made for you" title="Custom orders" sub="Tell us what you're dreaming of — a toy that looks like your pet, a bag in wedding colours, return gifts. We'll reply with a quote." />
      <div className="mx-auto max-w-3xl px-6">
        <InquiryForm kind="custom" detailKeys={["item", "budget", "needed_by"]} messageLabel="Describe your idea (colours, size, reference)" cta="Send inquiry"
          extra={<>
            <Field label="What would you like?">
              <select name="item" className={selectCls} defaultValue="Toy">
                {["Toy", "Bag", "Wearable", "Fidget / keychain", "Flowers / bouquet", "Bulk / return gifts", "Other"].map((o) => <option key={o}>{o}</option>)}
              </select>
            </Field>
            <Field label="Budget">
              <select name="budget" className={selectCls} defaultValue="₹500 – ₹1,000">
                {["Under ₹500", "₹500 – ₹1,000", "₹1,000 – ₹2,500", "₹2,500+"].map((o) => <option key={o}>{o}</option>)}
              </select>
            </Field>
            <div className="sm:col-span-2"><Field label="Needed by (optional)"><Input name="needed_by" type="date" /></Field></div>
          </>} />
      </div>
    </Shell>
  );
}
