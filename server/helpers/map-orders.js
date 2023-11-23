const convertDate = require("./convert-date");
const mapProduct = require("./map-product");
const mapUser = require("./map-user");

module.exports = function (orders) {
  return orders.map((item) => {
    return {
      id: item.id,
      userLogin: item.userId?.login,
      userPhone: item?.owner?.phone,
      products: item.products.map((product) => {
        return {
          id: product?.product?._id,
          title: product?.product?.title,
          totalPrice: product?.product?.totalPrice,
          img: product?.product?.img_src,
          productCount: product?.productCount,
        };
      }),
      totalPrice: item.totalPrice,
      status: item.status,
      createdAt: convertDate(item.createdAt),
    };
  });
};
