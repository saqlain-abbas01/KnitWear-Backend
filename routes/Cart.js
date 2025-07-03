import express from "express";
import {
  createCart,
  fetchCartByUserId,
  deleteCartById,
  updateCartById,
  deleteAllCarts
} from "../controllers/Cart.js";

const router = express.Router();

router
  .get("/", fetchCartByUserId)
  .post("/", createCart)
  .delete("/:id", deleteCartById)
  .delete("/", deleteAllCarts)
  .put("/:id", updateCartById)


export default router;
