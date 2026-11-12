import { describe, expect, it } from "vitest";
import { shippingFor } from "./pricing";
describe("shipping", () => {
  it("charges ₹99 below ₹1499", () => expect(shippingFor(899)).toBe(99));
  it("is free at ₹1499 and above", () => expect(shippingFor(1499)).toBe(0));
});
