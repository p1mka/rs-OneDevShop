require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const auth = require("./middlewares/auth");
const ROLES = require("./constants/roles");
const hasRole = require("./middlewares/has-role");
const path = require("path");

const {
  login,
  register,
  editUser,
  getUsersList,
  getRoles,
} = require("./controllers/user");
const {
  addProduct,
  getProducts,
  getProductById,
  editProduct,
  searchProducts,
  deleteProduct,
  addReview,
  deleteReview,
} = require("./controllers/product");
const {
  addOrder,
  getOrdersByUserId,
  editOrder,
  getStatuses,
} = require("./controllers/order");
const {
  getCategories,
  addCategory,
  editCategory,
} = require("./controllers/category");

const mapProduct = require("./helpers/map-product");
const mapProducts = require("./helpers/map-products");
const mapUser = require("./helpers/map-user");
const mapUsers = require("./helpers/map-users");
const mapReview = require("./helpers/map-review");
const mapOrders = require("./helpers/map-orders");
const mapOrder = require("./helpers/map-order");
const mapCategories = require("./helpers/map-categories");

const User = require("./models/user");
const Category = require("./models/category");
const Order = require("./models/order");

const port = 3090;
const app = express();

app.set("views", "pages");
app.use(express.static(path.join(__dirname, "../client/build")));
// app.use(express.static("../client/build"));
app.use(express.json());
app.use(cookieParser());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get("/products/categories", async (req, res) => {
  const categories = await getCategories();
  res.send({ error: null, data: mapCategories(categories) });
});

app.get("/products", async (req, res) => {
  try {
    const { productsList, productsLength } = await getProducts({
      search: req?.query?.search,
      filter: req.query.filter,
      categoryId: req.query.category,
      page: req.query.page,
      limit: req.query.limit,
    });

    res.send({
      error: null,
      data: mapProducts(productsList),
      count: productsLength,
    });
  } catch (e) {
    res.send({ error: e.message, data: null });
  }
});

app.post("/register", async (req, res) => {
  try {
    const { user, token } = await register(
      req.body.email,
      req.body.login,
      req.body.password
    );
    res
      .cookie("token", token, { httpOnly: true })
      .send({ error: null, data: mapUser(user) });
    console.log(`Пользователь ${user.login} зарегистрирован!`);
  } catch (e) {
    if (e.code === 11000 && e.keyPattern.login) {
      res.send({ error: `Этот логин уже занят...`, data: null });
    }
    if (e.code === 11000 && e.keyPattern.email) {
      res.send({ error: `Этот e-mail уже зарегистрирован...`, data: null });
    }
  }
});

app.post("/login", async (req, res) => {
  try {
    const { user, token } = await login(req.body.login, req.body.password);

    res
      .cookie("token", token, { httpOnly: true })
      .send({ error: null, data: mapUser(user) });
    console.log(`Пользователь ${user.login} залогинен!`);
  } catch (e) {
    res.send({ error: e.message || "Что-то пошло не так... ", data: null });
  }
});

app.post("/logout", async (req, res) => {
  res.cookie("token", "", { httpOnly: true }).send({ error: null });
});

app.get(`/products/:id`, async (req, res) => {
  const product = await getProductById(req.params.id);

  res.send({ error: null, data: mapProduct(product) });
});

app.get("//*", (req, res) => {
  res.sendFile(
    path.join(__dirname, "../client/build/index.html"),
    (err) => err && res.status(500).send(err)
  );
});

app.use(auth);

app.post("/products", hasRole([ROLES.ADMIN]), async (req, res) => {
  const updatedProducts = await addProduct(req.body.updatedProduct);

  res.send({ error: null, data: mapProducts(updatedProducts) });
});

app.post(`/products/:id/reviews`, async (req, res) => {
  const { newReview, newRating } = await addReview(req.params.id, {
    content: req.body.reviewText,
    author: req.user.login,
    reviewRating: req.body.reviewRating,
  });
  res.send({
    error: null,
    data: { newReview: mapReview(newReview), newRating },
  });
});

app.patch("/products/:id", hasRole([ROLES.ADMIN]), async (req, res) => {
  try {
    const updatedProducts = await editProduct({
      productId: req.params.id,
      updatedProduct: req.body.updatedProduct,
    });

    res.send({ error: null, data: mapProducts(updatedProducts) });
  } catch (e) {
    console.log(e);
    res.send({ error: e, data: null });
  }
});

app.delete("/products/:productId", hasRole([ROLES.ADMIN]), async (req, res) => {
  const updatedProducts = await deleteProduct(req.params.productId);

  res.send({ error: null, data: mapProducts(updatedProducts) });
});

app.delete("/products/:productId/reviews/:reviewId", async (req, res) => {
  const newRating = await deleteReview(
    req.params.productId,
    req.params.reviewId,
    req.user.login
  );
  res.send({ error: null, data: newRating });
});

app.post("/products/categories", hasRole([ROLES.ADMIN]), async (req, res) => {
  const updatedCategories = await addCategory(req.body.newCategoryName);
  res.send({ error: null, data: mapCategories(updatedCategories) });
});

app.patch(
  "/products/categories/:id",
  hasRole([ROLES.ADMIN]),
  async (req, res) => {
    const updatedCategories = await editCategory({
      categoryId: req.params.id,
      newCategoryName: req.body.newCategoryName,
    });
    res.send({ error: null, data: mapCategories(updatedCategories) });
  }
);

app.delete(
  "/products/categories/:id",
  hasRole([ROLES.ADMIN]),
  async (req, res) => {
    try {
      await Category.deleteOne({ _id: req.params.id });
      res.send({ error: null });
    } catch (e) {
      res.send({ error: e, data: null });
    }
  }
);

app.get("/orderslist", hasRole([ROLES.ADMIN]), async (req, res) => {
  const ordersList = await Order.find().populate("userId");

  res.send({ error: null, data: mapOrders(ordersList) });
});

app.get("/orders/statuses", hasRole([ROLES.ADMIN]), async (req, res) => {
  const statuses = await getStatuses();
  res.send({ error: null, data: statuses });
});

app.get("/orders/:id", async (req, res) => {
  const ordersList = await getOrdersByUserId(req.user.id);

  res.send({ error: null, data: mapOrders(ordersList) });
});

app.post("/orders", async (req, res) => {
  const newOrder = await addOrder({
    userId: req.user.id,
    products: req.body.products,
    owner: req.body.owner,
    totalPrice: req.body.totalPrice,
  });

  const ordersList = await getOrdersByUserId(req.user.id);
  res.send({ error: null, data: mapOrders(ordersList) });
});

app.patch("/orders/:id", async (req, res) => {
  try {
    const updatedOrder = await editOrder(req.params.id, req.body.newOrderData);
    const ordersList = await getOrdersByUserId(req.user.id);
    res.send({ error: null, data: mapOrders(ordersList) });
  } catch (e) {
    res.send({ error: e, data: null });
  }
});

app.delete("/orders/:id", hasRole([ROLES.ADMIN]), async (req, res) => {
  try {
    await Order.deleteOne({ _id: req.params.id });
    res.send({ error: null });
  } catch (e) {
    res.send({ error: e, data: null });
  }
});

app.get("/users", hasRole([ROLES.ADMIN]), async (req, res) => {
  const usersList = await getUsersList();
  res.send({ error: null, data: mapUsers(usersList) });
});

app.get("/users/roles", hasRole([ROLES.ADMIN]), async (req, res) => {
  const roles = await getRoles();
  res.send({ error: null, data: roles });
});

app.patch("/users/:id", async (req, res) => {
  try {
    const updatedUser = await editUser(req.params.id, req.body.newUserData);

    res.send({ error: null, data: mapUser(updatedUser) });
  } catch (e) {
    res.send({ error: e, data: null });
  }
});

app.delete("/users/:id", hasRole([ROLES.ADMIN]), async (req, res) => {
  try {
    await User.deleteOne({ _id: req.params.id });
    res.send({ error: null });
  } catch (e) {
    res.send({ error: e, data: null });
  }
});

app.get("/*", (req, res) => {
  res.sendFile(
    path.join(__dirname, "../client/build/index.html"),
    (err) => err && res.status(500).send(err)
  );
});

mongoose
  .connect(process.env.DB_CONNECTION_STRING)
  .then(() =>
    app.listen(port, () => console.log(`Сервер запущен на порту ${port}`))
  );
