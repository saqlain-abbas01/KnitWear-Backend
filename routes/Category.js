import express from "express";
import { createCategory, fetchCategories } from "../controllers/Category.js";

const router = express.Router();

router.get("/", fetchCategories).post("/", createCategory);

export default router;
