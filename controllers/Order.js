import Order from "../models/Orders.js";
import { sendEmail } from "../utils/mailer.js";

import errorHandler from "../utils/errorhandler.js";

const createOrder = async (req, res) => {
  console.log("create order", req.body);
  const email = req.user.email;
  console.log("email", email);
  try {
    const newOrder = new Order(req.body);
    await newOrder.save();

    await sendEmail({
      from: "admin@gmail.com",
      to: "asaqlain228@gmail.com",
      subject: "Order Confirmation",
      html: `<p>Hello, your order with ID <b>${newOrder._id}</b> has been successfully created!</p>`,
    });

    res.status(201).json({
      success: true,
      order: newOrder,
    });
  } catch (error) {
    errorHandler(error, res);
  }
};

const deleteOrderById = async (req, res) => {
  const { orderId } = req.params;
  try {
    const deletedOrder = await Order.deleteOne({ id: orderId });
    res.status(200).json({
      success: true,
      cart: deletedOrder,
    });
  } catch (error) {
    errorHandler(error, res);
  }
};

const fetchAllOrders = async (req, res) => {
  try {
    const allOrders = await Order.find({}).populate({
      path: "user",
      select: "name email",
      options: { lean: true },
    });

    res.status(200).json({
      success: true,
      order: allOrders,
    });
  } catch (error) {
    errorHandler(error);
  }
};

const fetchOrderByUserId = async (req, res) => {
  try {
    const userId = req.params.id;
    const orderItem = await Order.find({ user: userId }).populate("user");

    res.status(200).json({
      success: true,
      order: orderItem,
    });
  } catch (error) {
    errorHandler(error, res);
  }
};

const updateOrderById = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedOrder = await Order.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json({
      success: true,
      order: updatedOrder,
    });
  } catch (error) {
    errorHandler(error, res);
  }
};

export {
  fetchOrderByUserId,
  createOrder,
  deleteOrderById,
  updateOrderById,
  fetchAllOrders,
};
