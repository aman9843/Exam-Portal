const asyncHandler = require("express-async-handler");
const db = require("../models");
const Category = db.Categories;
const User = db.Users;

// Create a New Categories

const createCategory = asyncHandler(async (req, res) => {
  const user = await User.findByPk(req.user.id);
  const { title, description} = req.body;
  
  const category = new Category({
    title,
    description,
    UserId:user.id
   
  });

  const createdCategory = await category.save();
  if (createCategory) {
    res.status(201).json(createdCategory);
  } else {
    res.status(404);
    throw new Error("Validation Failed");
  }
});

// get Category details
const getAllCategory = asyncHandler(async (req, res) => {
  const category = await Category.findAll({});
  res.json(category);
});

// get Category By Id

const getCategoryById = asyncHandler(async (req, res) => {
  const category = await Category.findByPk(req.params.id);
  if (category) {
    res.json(category);
  } else {
    res.status(404);
    throw new Error("Category Not Found");
  }
});

// delete a Category
const deleteCategory = asyncHandler(async (req, res) => {
  const category = await Category.findByPk(req.params.id);
  if (category) {
    await category.destroy();
    res.json({ message: "Category Deleted" });
  } else {
    res.status(404);
    throw new Error("Error in Deletin");
  }
});

// Update a Category

const updateCategory = asyncHandler(async (req, res) => {
  const category = await Category.findByPk(req.params.id);

  if (category) {
    category.title = req.body.title || category.title;
    category.description = req.body.description || category.description;
  }

  const updateCategory = await category.save();
  res.json({
    id: updateCategory.id,
    title: updateCategory.title,
    description: updateCategory.description,
  });
});

module.exports = {
  createCategory,
  getAllCategory,
  getCategoryById,
  deleteCategory,
  updateCategory,
};
