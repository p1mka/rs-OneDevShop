const convertDate = require("./convert-date");

module.exports = function (user) {
  return {
    id: user?._id,
    login: user?.login,
    email: user?.email,
    roleId: user?.role_id,
    registeredAt: convertDate(user?.createdAt),
  };
};
