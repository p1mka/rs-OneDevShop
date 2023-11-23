import { getPriceWithDiscount } from "../../../utils";

export const getVariablePrice = (products) => {
  const summaryPrice = products.reduce((acc, product) => {
    return (acc +=
      Number(getPriceWithDiscount(product.price, product.discount)) *
      product.productCount);
  }, 0);

  const summaryDiscount = products.reduce((acc, product) => {
    const discountAmount =
      (Math.floor(
        (Number(product.price) / 100) * Number(product.discount) * 100
      ) /
        100) *
      product.productCount;
    return (acc += discountAmount);
  }, 0);

  const priceWithoutDiscount = products.reduce(
    (acc, product) => (acc + Number(product.price)) * product.productCount,
    0
  );

  return { summaryPrice, summaryDiscount, priceWithoutDiscount };
};
