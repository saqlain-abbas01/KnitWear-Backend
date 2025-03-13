import express from "express";
import {
  createOrder,
  deleteOrderById,
  fetchOrderByUserId,
  updateOrderById,
} from "../controllers/Order.js";

const router = express.Router();

router
  .get("/:id", fetchOrderByUserId)
  .post("/", createOrder)
  .delete("/:id", deleteOrderById)
  .put("/:id", updateOrderById);

export default router;
