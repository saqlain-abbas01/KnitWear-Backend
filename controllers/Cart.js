import Cart from "../models/Cart.js";
import errorHandler from "../utils/errorhandler.js";

const createCart = async (req, res) => {
  try {
    const { product, quantity, size } = req.body;
    const user = req.user.id;
    console.log("user:", req.body, "id", user);

    const cart = new Cart({ quantity, product, user, size });
    await cart.save();

    res.status(201).json({
      success: true,
      cart: cart,
    });
  } catch (error) {
    errorHandler(error, res);
  }
};

const deleteCartById = async (req, res) => {
  const { cartId } = req.params;
  try {
    const deletedCart = await Cart.deleteOne({ id: cartId });
    res.status(200).json({
      success: true,
      cart: deletedCart,
    });
  } catch (error) {
    errorHandler(error, res);
  }
};

const fetchCartByUserId = async (req, res) => {
  try {
    const { user } = req.query;
    const cartItem = await Cart.findById(user)
      .populate("user")
      .populate("product");
    res.status(200).json({
      success: true,
      cart: cartItem,
    });
  } catch (error) {
    errorHandler(error, res);
  }
};

const updateCartById = async (req, res) => {
  try {
    const id = req.param.id;
    const updatedCart = await Cart.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json({
      success: true,
      cart: updatedCart,
    });
  } catch (error) {
    errorHandler(error, res);
  }
};

export { fetchCartByUserId, createCart, deleteCartById, updateCartById };
