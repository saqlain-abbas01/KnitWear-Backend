import Order from "../models/Orders.js";
import { sendEmail } from "../utils/mailer.js";

import errorHandler from "../utils/errorhandler.js";

const createOrder = async (req, res) => {

  const email = req.user.email;
 
  try {
    const newOrder = new Order(req.body);
    await newOrder.save();

    await sendEmail({
      from: "admin@gmail.com",
      to: email,
      subject: "Order Confirmation",
    html: `
     <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
    <h2 style="color: #4CAF50;">Thank You for Your Order!</h2>
    <p>Hello,</p>
    <p>Your order has been successfully created. Below are the details:</p>
    <table style="border-collapse: collapse; width: 100%; margin: 20px 0;">
      <tr>
        <td style="padding: 10px; border: 1px solid #ddd;"><strong>Order ID:</strong></td>
        <td style="padding: 10px; border: 1px solid #ddd;">${newOrder._id}</td>
      </tr>
    </table>
    <p>We'll notify you once your order is shipped.</p>
    <p style="margin-top: 30px;">Best regards,<br><strong>Knitwear Team</strong></p>
  </div>
`
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
    const orderItem = await Order.find({ user: userId }).populate("user").populate({
        path: "items.product", 
        model: "Product",
      });;
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
