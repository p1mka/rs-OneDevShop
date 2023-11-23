const { verify } = require("../helpers/token");

const User = require("../models/user");

module.exports = async function auth(req, res, next) {
  try {
    const token = verify(req.cookies.token);

    const user = await User.findOne({ _id: token.id });

    if (!user) {
      res.send({ error: "Пользователь не найден!" });
      return;
    }
    req.user = user;

    next();
  } catch (error) {
    console.error(error.message);
  }
};
