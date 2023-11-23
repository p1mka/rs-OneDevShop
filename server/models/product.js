const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema(
  {
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    img_src: {
      type: String,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      // required: true,
    },
    price: {
      type: Number || String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
      default: 0,
    },
    amount: {
      type: Number || String,
      default: 0,
    },
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
