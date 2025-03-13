import express from "express";
import {
  createCart,
  fetchCartByUserId,
  deleteCartById,
  updateCartById,
} from "../controllers/Cart.js";

const router = express.Router();

router
  .get("/", fetchCartByUserId)
  .post("/", createCart)
  .delete("/:id", deleteCartById)
  .put("/:id", updateCartById);

export default router;
