export const FREE_SHIPPING_MIN = 1499;
export const SHIPPING_FEE = 99;
export function shippingFor(subtotal: number) {
  if (subtotal <= 0) return 0;
  return subtotal >= FREE_SHIPPING_MIN ? 0 : SHIPPING_FEE;
}
export const inr = (n: number) => "₹" + n.toLocaleString("en-IN");
