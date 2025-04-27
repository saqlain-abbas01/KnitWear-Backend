import express from "express";
import {
  createBrand,
  fetchBrands,
  updateBrand,
  deleteBrand,
} from "../controllers/Brand.js";

const router = express.Router();

router
  .get("/", fetchBrands)
  .post("/", createBrand)
  .put("/:id", updateBrand)
  .delete("/:id", deleteBrand);

export default router;
