export const getSummaryCountOfProducts = (products) =>
  products.reduce((acc, product) => (acc += product.productCount), 0);
