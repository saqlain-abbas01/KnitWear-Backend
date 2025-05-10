import Cart from "../models/Cart.js";
import errorHandler from "../utils/errorhandler.js";

const createCart = async (req, res) => {
  try {
    const { product, quantity, size } = req.body;
    const user = req.user.id;
    console.log("user:", req.body, "id", user);

    const existingCart = await Cart.findOne({ user, product, size });

    if (existingCart) {
      existingCart.quantity += quantity;

      await existingCart.save();

      return res.status(200).json({
        success: true,
        message: "Cart updated successfully",
        cart: existingCart,
      });
    } else {
      const cart = new Cart({ quantity, product, user, size });
      await cart.save();

      return res.status(201).json({
        success: true,
        message: "Product added to cart successfully",
        cart: cart,
      });
    }
  } catch (error) {
    errorHandler(error, res);
  }
};

const deleteCartById = async (req, res) => {
  const { id } = req.params;
  console.log("cart to remove:", id);
  try {
    const deletedCart = await Cart.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      cart: deletedCart,
    });
  } catch (error) {
    errorHandler(error, res);
  }
};

const fetchCartByUserId = async (req, res) => {
  const id = req.user.id;
  console.log("id", id);
  try {
    const cartItem = await Cart.find({ user: id }).populate("product");
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
    console.log("body", req.body);
    const { cartId, quantity } = req.body;
    console.log("product to update", cartId, "quantity", quantity);
    const updatedCart = await Cart.findByIdAndUpdate(
      cartId,
      { quantity },
      { new: true }
    );
    console.log("updated cart", updatedCart);
    res.status(200).json({
      success: true,
      cart: updatedCart,
    });
  } catch (error) {
    errorHandler(error, res);
  }
};

export { fetchCartByUserId, createCart, deleteCartById, updateCartById };
