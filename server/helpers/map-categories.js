module.exports = function (categories) {
  return categories.map((item) => {
    return {
      id: item.id,
      name: item.name,
    };
  });
};
