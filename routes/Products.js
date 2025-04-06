import express from "express";
import {
  createProduct,
  fecthProductsById,
  fetchAllProducts,
  updateProductById,
  fetchRecentProducts,
  deleteProductById,
} from "../controllers/Products.js";

const router = express.Router();

router
  .post("/", createProduct)
  .get("/", fetchAllProducts)
  .get("/recents", fetchRecentProducts)
  .get("/:id", fecthProductsById)
  .patch("/:id", updateProductById)
  .delete("/:id", deleteProductById);

export default router;
