import Order from "../models/Orders.js";
import errorHandler from "../utils/errorhandler.js";

const createOrder = async (req, res) => {
  try {
    console.log("order:", req.body);
    const newOrder = new Order(req.body);
    await newOrder.save();

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

const fetchOrderByUserId = async (req, res) => {
  try {
    const userId = req.params.id;
    console.log("id", userId);
    const orderItem = await Order.find({ user: userId }).populate("user");
    console.log("order items", orderItem);
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
    const id = req.param.id;
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

export { fetchOrderByUserId, createOrder, deleteOrderById, updateOrderById };
