import Brand from "../models/Brand.js";
import errorHandler from "../utils/errorhandler.js";

const createBrand = async (req, res) => {
  try {
    const newBrand = new Brand(req.body);
    await newBrand.save();
    res.status(201).json({
      message: "Brand created successfully!",
      product: newBrand,
    });
  } catch (error) {
    errorHandler(error, res);
  }
};

const fetchBrands = async (req, res) => {
  try {
    const Brands = await Brand.find({}).exec();
    res.status(200).json(Brands);
  } catch (error) {
    errorHandler(error, res);
  }
};

export { fetchBrands, createBrand };
