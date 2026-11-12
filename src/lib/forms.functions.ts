import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { PRODUCTS } from "./products";
import { shippingFor } from "./pricing";

const phone = z.string().trim().regex(/^[+0-9 \-]{10,15}$/, "Enter a valid phone number");
const email = z.string().trim().email().max(255).optional().or(z.literal(""));

export const orderSchema = z.object({
  name: z.string().trim().min(2).max(100),
  phone, email,
  address: z.string().trim().min(5).max(300),
  city: z.string().trim().min(2).max(80),
  state: z.string().trim().min(2).max(80),
  pincode: z.string().trim().regex(/^[1-9][0-9]{5}$/, "Enter a 6-digit PIN code"),
  notes: z.string().trim().max(1000).optional(),
  items: z.array(z.object({ slug: z.string().max(80), qty: z.number().int().min(1).max(10) })).min(1).max(30),
});

export const placeOrder = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => orderSchema.parse(d))
  .handler(async ({ data }) => {
    const items = data.items.map((i) => {
      const p = PRODUCTS.find((x) => x.slug === i.slug);
      if (!p) throw new Error("Unknown product");
      return { slug: p.slug, name: p.name, price: p.price, qty: i.qty };
    });
    const subtotal = items.reduce((a, i) => a + i.price * i.qty, 0);
    const shipping = shippingFor(subtotal);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: row, error } = await supabaseAdmin.from("orders").insert({
      customer_name: data.name, phone: data.phone, email: data.email || null,
      address: data.address, city: data.city, state: data.state, pincode: data.pincode,
      notes: data.notes || null, items, subtotal, shipping, total: subtotal + shipping,
    }).select("id").single();
    if (error) { console.error(error); throw new Error("Could not place order"); }
    return { id: row.id as string, total: subtotal + shipping };
  });

export const inquirySchema = z.object({
  kind: z.enum(["class", "custom"]),
  name: z.string().trim().min(2).max(100),
  phone, email,
  city: z.string().trim().max(80).optional(),
  details: z.record(z.string().max(200)).optional(),
  message: z.string().trim().max(1500).optional(),
});

export const submitInquiry = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => inquirySchema.parse(d))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("inquiries").insert({
      kind: data.kind, name: data.name, phone: data.phone, email: data.email || null,
      city: data.city || null, details: data.details ?? {}, message: data.message || null,
    });
    if (error) { console.error(error); throw new Error("Could not send"); }
    return { ok: true };
  });
