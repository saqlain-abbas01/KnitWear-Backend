import express from "express";
import {
  createProduct,
  fecthProductsById,
  fetchAllProducts,
  updateProductById,
} from "../controllers/Products.js";

const router = express.Router();

router
  .post("/", createProduct)
  .get("/", fetchAllProducts)
  .get("/:id", fecthProductsById)
  .patch("/:id", updateProductById);

export default router;
