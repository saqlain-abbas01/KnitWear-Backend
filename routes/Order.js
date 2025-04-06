import express from "express";
import {
  createOrder,
  deleteOrderById,
  fetchAllOrders,
  fetchOrderByUserId,
  updateOrderById,
} from "../controllers/Order.js";

const router = express.Router();

router
  .get("/", fetchAllOrders)
  .get("/:id", fetchOrderByUserId)
  .post("/", createOrder)
  .delete("/:id", deleteOrderById)
  .put("/:id", updateOrderById);

export default router;
