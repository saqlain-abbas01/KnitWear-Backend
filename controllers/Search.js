import errorHandler from "../utils/errorhandler.js";
import Product from "../models/Product.js";

function escapeRegex(string) {
  return string.replace(/[.^$*+?()|[\]{}\\]/g, "\\$&");
}

const fetchSearchProduct = async (req, res) => {
  try {
    const { q } = req.query; // Query parameter for search term

    // Validate search query
    if (!q || typeof q !== "string" || q.trim().length < 2) {
      return res.status(400).json({
        success: false,
        message: "Search query must be a string with at least 2 characters",
      });
    }

    // Sanitize and prepare search term
    const searchTerm = q.trim();
    const safeSearchTerm = escapeRegex(searchTerm);
    const regexPattern = `\\b${safeSearchTerm}\\w*`; // Match words starting with searchTerm
    console.log("regexpattern", regexPattern);
    // Perform regex search
    const products = await Product.find({
      title: { $regex: regexPattern, $options: "i" }, // Case-insensitive regex search
      deleted: false, // Exclude deleted products
    })
      .select("_id title") // Select only _id and title
      .limit(20); // Limit results for performance

    res.status(200).json({
      success: true,
      data: products,
      count: products.length,
    });
  } catch (error) {
    console.error("Search error:", error);
    errorHandler(error);
  }
};

export default fetchSearchProduct;
