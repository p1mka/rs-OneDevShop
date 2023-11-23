const mapUser = require("./map-user");

module.exports = function (users) {
  return users.map((user) => mapUser(user));
};
