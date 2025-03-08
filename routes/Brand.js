import express from "express";
import { createBrand, fetchBrands } from "../controllers/Brand.js";

const router = express.Router();

router.get("/", fetchBrands).post("/", createBrand);

export default router;
