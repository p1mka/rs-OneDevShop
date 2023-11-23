const mapReviews = require("./map-reviews");
const mapCategory = require("./map-category");
const convertDate = require("./convert-date");

module.exports = function (product) {
  return {
    id: product.id,
    title: product.title,
    description: product.description,
    category: mapCategory(product.category),
    img: product.img_src,
    price: product.price,
    rating: Math.floor(product.rating),
    discount: product.discount,
    amount: product.amount,
    // createdAt: convertDate(product.createdAt),
    reviews: mapReviews(product.reviews),
  };
};
