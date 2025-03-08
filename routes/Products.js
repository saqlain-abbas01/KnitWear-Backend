import express from "express";
import {
  createProduct,
  fecthProductsById,
  fetchAllProducts,
} from "../controllers/Products.js";

const router = express.Router();

router
  .post("/", createProduct)
  .get("/", fetchAllProducts)
  .get("/:id", fecthProductsById);

export default router;
