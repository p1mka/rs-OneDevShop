const convertDate = require("./convert-date");
const mapProduct = require("./map-product");
const mapUser = require("./map-user");

module.exports = function (order) {
  return {
    id: order.id,
    userLogin: order.userId?.login,
    userPhone: order?.owner?.phone,
    products: order.products.map((product) => {
      return {
        id: product?.product?._id,
        title: product?.product?.title,
        totalPrice: product?.product?.totalPrice,
        img: product?.product?.img_src,
        productCount: product?.productCount,
      };
    }),
    totalPrice: order.totalPrice,
    createdAt: convertDate(order.createdAt),
  };
};
