import express from "express";
import { createProduct, fetchAllProducts } from "../controllers/Products.js";

const router = express.Router();

router.post("/", createProduct).get("/", fetchAllProducts);

export default router;
