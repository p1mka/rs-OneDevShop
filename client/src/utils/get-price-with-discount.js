export const getPriceWithDiscount = (price, discount) => {
  const discountAmount =
    Math.floor((Number(price) / 100) * Number(discount) * 100) / 100;

  const currentPrice = Number(price) - discountAmount;

  return currentPrice;
};
