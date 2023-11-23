const convertDate = require("./convert-date");
const mapCategory = require("./map-category");

module.exports = function (products) {
  return products.map((item) => {
    return {
      id: item.id,
      title: item.title,
      description: item.description,
      category: mapCategory(item.category),
      img: item.img_src,
      price: item.price,
      rating: item.rating,
      discount: item.discount,
      amount: item.amount,
      reviewsCount: item.reviews.length,
      updatedAt: convertDate(item.updatedAt),
    };
  });
};
