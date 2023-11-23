const Category = require("../models/category");

const getCategories = async () => {
  const categories = await Category.find({});
  return categories;
};

const addCategory = async (categoryName) => {
  const newCategory = await Category.create({ name: categoryName });
  const categories = getCategories();
  return categories;
};

const editCategory = async ({ categoryId, newCategoryName }) => {
  await Category.findByIdAndUpdate(
    { _id: categoryId },
    { name: newCategoryName }
  );
  return await Category.find({});
};

module.exports = { getCategories, addCategory, editCategory };
