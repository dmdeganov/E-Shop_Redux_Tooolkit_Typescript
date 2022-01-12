export const formatPrice = (number: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(+number.toFixed(2));
