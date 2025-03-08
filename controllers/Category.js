import Category from "../models/Category.js";
import errorHandler from "../utils/errorhandler.js";

const createCategory = async (req, res) => {
  try {
    const newCategory = new Category(req.body);
    await newCategory.save();
    res.status(201).json({
      message: "Category created successfully!",
      product: newCategory,
    });
  } catch (error) {
    errorHandler(error, res);
  }
};

const fetchCategories = async (req, res) => {
  try {
    const categories = await Category.find({}).exec();
    res.status(200).json(categories);
  } catch (error) {
    errorHandler(error, res);
  }
};

export { fetchCategories, createCategory };
