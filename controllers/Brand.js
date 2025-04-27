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

const updateBrand = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedBrand = await Brand.findByIdAndUpdate(id, req.body, {
      new: true, // return updated document
      runValidators: true, // validate fields like enum, required, etc
    });

    if (!updatedBrand) {
      return res.status(404).json({ message: "Brand not found" });
    }

    res.status(200).json({
      message: "Brand updated successfully!",
      brand: updatedBrand,
    });
  } catch (error) {
    errorHandler(error, res);
  }
};

// ✅ Delete a Brand by ID
const deleteBrand = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedBrand = await Brand.findByIdAndDelete(id);

    if (!deletedBrand) {
      return res.status(404).json({ message: "Brand not found" });
    }

    res.status(200).json({
      message: "Brand deleted successfully!",
      brand: deletedBrand,
    });
  } catch (error) {
    errorHandler(error, res);
  }
};
export { fetchBrands, createBrand, deleteBrand, updateBrand };
