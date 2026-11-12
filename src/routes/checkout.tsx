import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState, type FormEvent } from "react";
import { CheckCircle2 } from "lucide-react";
import { Shell, PageTitle, Field, DmButton } from "@/components/site";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useCart } from "@/lib/cart";
import { getProduct } from "@/lib/products";
import { inr } from "@/lib/pricing";
import { orderSchema, placeOrder } from "@/lib/forms.functions";
import { Summary } from "./cart";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout — Kalatri by Gayatri" },
      { name: "description", content: "Place your order for handmade crochet. Ships across India." },
      { property: "og:title", content: "Checkout — Kalatri" },
      { property: "og:description", content: "Place your Kalatri order." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Checkout,
});

function Checkout() {
  const { lines, subtotal, clear } = useCart();
  const submit = useServerFn(placeOrder);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState<{ id: string; total: number } | null>(null);
  const [failed, setFailed] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    const parsed = orderSchema.safeParse({ ...f, items: lines });
    if (!parsed.success) {
      setErrors(Object.fromEntries(parsed.error.issues.map((i) => [String(i.path[0]), i.message])));
      return;
    }
    setErrors({}); setBusy(true); setFailed(false);
    try { const r = await submit({ data: parsed.data }); clear(); setDone(r); }
    catch { setFailed(true); } finally { setBusy(false); }
  }

  if (done) return (
    <Shell>
      <div className="mx-auto max-w-xl px-6 py-24 text-center">
        <CheckCircle2 className="mx-auto h-12 w-12 text-primary" />
        <h1 className="mt-4 font-display text-5xl">Dhanyavaad!</h1>
        <p className="mt-4 text-muted-foreground">Your order request (#{done.id.slice(0, 8).toUpperCase()}) for {inr(done.total)} has been received. Gayatri will contact you on your phone to confirm and share payment details.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button asChild className="rounded-full"><Link to="/shop" search={{ c: undefined }}>Keep shopping</Link></Button>
          <DmButton>Message us on Instagram</DmButton>
        </div>
      </div>
    </Shell>
  );

  if (lines.length === 0) return (
    <Shell><PageTitle eyebrow="Checkout" title="Your cart is empty" />
      <div className="text-center"><Button asChild className="rounded-full"><Link to="/shop" search={{ c: undefined }}>Browse the shop</Link></Button></div>
    </Shell>
  );

  return (
    <Shell>
      <PageTitle eyebrow="Checkout" title="Almost there" sub="Fill in your delivery details. No online payment now — we'll confirm your order and share UPI / bank details on call or WhatsApp." />
      <form onSubmit={onSubmit} noValidate className="mx-auto grid max-w-5xl gap-10 px-6 md:grid-cols-[1fr_340px]">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2"><Field label="Full name" error={errors["name"]}><Input name="name" autoComplete="name" /></Field></div>
          <Field label="Phone (WhatsApp)" error={errors["phone"]}><Input name="phone" type="tel" autoComplete="tel" /></Field>
          <Field label="Email (optional)" error={errors["email"]}><Input name="email" type="email" autoComplete="email" /></Field>
          <div className="sm:col-span-2"><Field label="Address" error={errors["address"]}><Textarea name="address" rows={3} autoComplete="street-address" /></Field></div>
          <Field label="City" error={errors["city"]}><Input name="city" autoComplete="address-level2" /></Field>
          <Field label="State" error={errors["state"]}><Input name="state" autoComplete="address-level1" /></Field>
          <Field label="PIN code" error={errors["pincode"]}><Input name="pincode" inputMode="numeric" maxLength={6} autoComplete="postal-code" /></Field>
          <div className="sm:col-span-2"><Field label="Notes — colours, gift message, needed-by date (optional)" error={errors["notes"]}><Textarea name="notes" rows={3} /></Field></div>
        </div>
        <aside className="h-fit rounded-lg bg-secondary p-6">
          <h2 className="font-display text-2xl">Order summary</h2>
          <ul className="my-4 space-y-2 text-sm">
            {lines.map((l) => { const p = getProduct(l.slug)!; return (
              <li key={l.slug} className="flex justify-between gap-2"><span>{p.name} × {l.qty}</span><span>{inr(p.price * l.qty)}</span></li>
            ); })}
          </ul>
          <Summary subtotal={subtotal} />
          <Button type="submit" size="lg" disabled={busy} className="mt-6 w-full rounded-full">{busy ? "Placing order…" : "Place order"}</Button>
          {failed && <p className="mt-3 text-sm text-destructive">Something went wrong. Please try again or DM us on Instagram.</p>}
        </aside>
      </form>
    </Shell>
  );
}
