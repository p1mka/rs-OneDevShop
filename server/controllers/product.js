const Product = require("../models/product");
const Review = require("../models/review");

const getProducts = async ({ search, filter, categoryId, page = 1, limit }) => {
  const tenDaysAgo = new Date();
  tenDaysAgo.setDate(tenDaysAgo.getDate() - 10);

  let query = {};

  if (search) {
    query.title = { $regex: search, $options: "i" };
  } else if (filter === "best") {
    query.rating = { $gt: 2 };
  } else if (filter === "discounts") {
    query.discount = { $gt: 0 };
  } else if (filter === "newest") {
    query.updatedAt = { $gte: tenDaysAgo };
  } else if (categoryId) {
    query.category = categoryId;
  }
  const productsLength = await Product.find(query).countDocuments();

  const productsList = await Product.find(query)
    .populate("category")
    .skip((page - 1) * limit)
    .limit(limit);
  return { productsList, productsLength };
};

const searchProducts = async (search) => {
  return await Product.find({ title: { $regex: search, $options: "i" } });
};

const addProduct = async (updatedProduct) => {
  await Product.create({
    title: updatedProduct.title,
    category: updatedProduct.category.id,
    description: updatedProduct.description,
    img_src: updatedProduct.img,
    price: updatedProduct.price,
    rating: updatedProduct.rating,
    discount: updatedProduct.discount,
    amount: updatedProduct.amount,
  });
  return await Product.find({}).populate("category");
};

const getProductById = async (id) => {
  const product = await Product.findOne({ _id: id })
    .populate("category")
    .populate({
      path: "reviews",
      populate: "author",
    });

  return product;
};

const editProduct = async ({ productId, updatedProduct }) => {
  await Product.findByIdAndUpdate(
    { _id: productId },
    {
      title: updatedProduct.title,
      category: updatedProduct.category.id,
      description: updatedProduct.description,
      img_src: updatedProduct.img,
      price: updatedProduct.price,
      discount: updatedProduct.discount,
      amount: updatedProduct.amount,
    }
  );
  const updatedProducts = await Product.find({}).populate("category");
  return updatedProducts;
};

const deleteProduct = async (productId) => {
  try {
    const product = await Product.findById(productId);

    if (!product) {
      throw new Error("Товар не найден");
    }
    const reviewIds = product.reviews;

    await Review.deleteMany({ _id: { $in: reviewIds } });

    await Product.deleteOne({ _id: productId });
    return Product.find({}).populate("category");
  } catch (error) {
    console.error(
      "Произошла ошибка при удалении товара и связанных отзывов:",
      error.message
    );
  }
};

const addReview = async (productId, content) => {
  const newReview = await Review.create(content);
  await Product.findByIdAndUpdate(productId, { $push: { reviews: newReview } });

  const product = await Product.findOne({ _id: productId }).populate("reviews");
  const summaryRating = product.reviews.reduce(
    (acc, review) => acc + review.reviewRating,
    0
  );
  const reviewsCount = product.reviews.length;
  const newRating = summaryRating / reviewsCount;
  await Product.findByIdAndUpdate(productId, { $set: { rating: newRating } });

  await newReview.populate("author");
  return { newReview, newRating };
};

const deleteReview = async (productId, reviewId, owner) => {
  await Review.deleteOne({ _id: reviewId, owner });
  await Product.findByIdAndUpdate(productId, { $pull: { reviews: reviewId } });

  const product = await Product.findOne({ _id: productId }).populate("reviews");

  const summaryRating = product.reviews.reduce(
    (acc, review) => acc + review.reviewRating,
    0
  );

  const reviewsCount = product.reviews.length;

  const newRating = reviewsCount === 0 ? 0 : summaryRating / reviewsCount;

  await Product.findByIdAndUpdate(productId, { $set: { rating: newRating } });

  return newRating;
};

module.exports = {
  addProduct,
  getProducts,
  getProductById,
  editProduct,
  searchProducts,
  deleteProduct,
  addReview,
  deleteReview,
};
