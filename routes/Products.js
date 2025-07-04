import express from "express";
import {
  createProduct,
  fecthProductsById,
  fetchFilterProducts,
  updateProductById,
  fetchRecentProducts,
  deleteProductById,
  fetchDiscountProducts,
} from "../controllers/Products.js";

const router = express.Router();

router
  .post("/", createProduct)
  .get("/", fetchFilterProducts)
  .get("/recents", fetchRecentProducts)
  .get("/discounts", fetchDiscountProducts)
  .get("/:id", fecthProductsById)
  .patch("/:id", updateProductById)
  .delete("/:id", deleteProductById);

export default router;
