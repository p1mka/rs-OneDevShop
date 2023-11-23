const Order = require("../models/order");
const User = require("../models/user");
const Product = require("../models/product");

const getStatuses = () => {
  return [
    { id: 0, title: "В обработке" },
    { id: 1, title: "Отправлен" },
    { id: 2, title: "Доставлен" },
    { id: 3, title: "Отменён" },
    { id: 4, title: "Выполнен" },
  ];
};

const getOrdersByUserId = async (userId) => {
  const orders = await Order.find({ userId: userId }).populate({
    path: "products.product",
    model: "Product",
  });
  return orders;
};

const addOrder = async ({ userId, products, owner, totalPrice }) => {
  const newOrder = await Order.create({ userId, products, owner, totalPrice });
  await User.findByIdAndUpdate(userId, { $push: { orders: newOrder } });

  try {
    for (const item of products) {
      const product = await Product.findById(item.product);
      if (product) {
        product.amount -= item.productCount;
        await product.save();
      }
    }
  } catch (error) {
    console.error("Ошибка при обновлении количества продуктов:", error);
    return res
      .status(500)
      .json({ error: "Ошибка при обновлении количества продуктов" });
  }

  return newOrder;
};

const editOrder = async (orderId, newOrderData) => {
  const updatedOrder = await Order.findByIdAndUpdate(
    { _id: orderId },
    { status: newOrderData.statusId },
    { returnDocument: "after" }
  );

  try {
    for (const item of updatedOrder.products) {
      const product = await Product.findById(item.product);
      if (product) {
        product.amount += item.productCount;
        await product.save();
      }
    }
  } catch (error) {
    console.error("Ошибка при обновлении количества продуктов:", error);
    return res
      .status(500)
      .json({ error: "Ошибка при обновлении количества продуктов" });
  }

  return updatedOrder;
};

module.exports = { addOrder, getOrdersByUserId, editOrder, getStatuses };
