import Order from "../models/Orders.js";
import User from "../models/User.js";
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

const fetchAllOrders = async (req, res) => {
  try {
    const allOrders = await Order.find({}).lean();
    console.log("allorders", allOrders);
    const userIds = [
      ...new Set(allOrders.map((order) => order.user.toString())),
    ];
    console.log("user ids:", userIds);
    const users = await User.find({ _id: { $in: userIds } });

    console.log("users:", users);
    const userMap = users.reduce((map, user) => {
      map[user.id.toString()] = {
        id: user.id.toString(), // Use virtual 'id' if set, or _id directly
        name: user.name,
        email: user.email,
      };
      return map;
    }, {});
    console.log("usermap", userMap);
    const ordersWithUserDetails = allOrders.map((order) => ({
      ...order,
      user: userMap[order.user.toString()] || null, // Fallback to null if no match
    }));
    console.log("orders", ordersWithUserDetails);
    res.status(200).json({
      success: true,
      order: ordersWithUserDetails,
    });
  } catch (error) {
    errorHandler(error);
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

export {
  fetchOrderByUserId,
  createOrder,
  deleteOrderById,
  updateOrderById,
  fetchAllOrders,
};
