import { useServerFn } from "@tanstack/react-start";
import { useState, type FormEvent, type ReactNode } from "react";
import { CheckCircle2 } from "lucide-react";
import { Field } from "@/components/site";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { inquirySchema, submitInquiry } from "@/lib/forms.functions";

export function InquiryForm({ kind, extra, detailKeys, messageLabel, cta }: {
  kind: "class" | "custom"; extra: ReactNode; detailKeys: string[]; messageLabel: string; cta: string;
}) {
  const send = useServerFn(submitInquiry);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [state, setState] = useState<"idle" | "busy" | "done" | "fail">("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    const details = Object.fromEntries(detailKeys.map((k) => [k, f[k] ?? ""]));
    const parsed = inquirySchema.safeParse({ kind, name: f["name"], phone: f["phone"], email: f["email"], city: f["city"], message: f["message"], details });
    if (!parsed.success) { setErrors(Object.fromEntries(parsed.error.issues.map((i) => [String(i.path[0]), i.message]))); return; }
    setErrors({}); setState("busy");
    try { await send({ data: parsed.data }); setState("done"); } catch { setState("fail"); }
  }

  if (state === "done") return (
    <div className="rounded-lg bg-secondary p-10 text-center">
      <CheckCircle2 className="mx-auto h-10 w-10 text-primary" />
      <p className="mt-3 font-display text-3xl">Thank you!</p>
      <p className="mt-2 text-muted-foreground">We've got your message and will reach out on your phone soon.</p>
    </div>
  );

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-4 rounded-lg bg-secondary p-6 sm:grid-cols-2 md:p-8">
      <Field label="Name" error={errors["name"]}><Input name="name" /></Field>
      <Field label="Phone (WhatsApp)" error={errors["phone"]}><Input name="phone" type="tel" /></Field>
      <Field label="Email (optional)" error={errors["email"]}><Input name="email" type="email" /></Field>
      <Field label="City" error={errors["city"]}><Input name="city" /></Field>
      {extra}
      <div className="sm:col-span-2"><Field label={messageLabel} error={errors["message"]}><Textarea name="message" rows={4} /></Field></div>
      <div className="sm:col-span-2">
        <Button type="submit" size="lg" disabled={state === "busy"} className="rounded-full px-8">{state === "busy" ? "Sending…" : cta}</Button>
        {state === "fail" && <p className="mt-3 text-sm text-destructive">Couldn't send. Please try again or DM @kalatri__.</p>}
      </div>
    </form>
  );
}

export const selectCls = "flex h-9 w-full rounded-md border border-input bg-background px-3 text-sm";
