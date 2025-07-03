import Cart from "../models/Cart.js";
import errorHandler from "../utils/errorhandler.js";

const createCart = async (req, res) => {
  try {
    const { product, quantity, size } = req.body;
    console.log("product to add to cart", product)
    const user = req.user.id;
  

    const existingCart = await Cart.findOne({ user, product, size });

    if (existingCart) {
      existingCart.quantity += quantity;

      await existingCart.save();
      console.log("existingcart", existingCart)
      return res.status(200).json({
        success: true,
        message: "Cart updated successfully",
        cart: existingCart,
      });
    } else {
      const cart = new Cart({ quantity, product, user, size });
      await cart.save();
       console.log("cart", cart)
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
   
    const { cartId, quantity } = req.body;
   
    const updatedCart = await Cart.findByIdAndUpdate(
      cartId,
      { quantity },
      { new: true }
    );

    res.status(200).json({
      success: true,
      cart: updatedCart,
    });
  } catch (error) {
    errorHandler(error, res);
  }
};

const deleteAllCarts = async (req, res) => {
  console.log("remove carts")
   const user = req.user.id;
  try {
   if (req.query.all === "true") {
     const carts = await Cart.deleteMany({ user });
     console.log("deleted carts", carts)
      return res.status(200).json({ success: true, message: "All cart items removed" });
    }
    
    return res.status(400).json({ success: false, message: "Missing 'all' flag or cart ID" });
  } catch (error) {
    errorHandler(error, res);
  }
};

export { fetchCartByUserId, createCart, deleteCartById, updateCartById , deleteAllCarts};
