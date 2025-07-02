import WishList from "../models/WishList.js";
import errorHandler from "../utils/errorhandler.js";

const addWishList = async (req, res) => {

  const { productId } = req.body;
  const userId = req.user.id;

  try {
    let userWishList = await WishList.findOne({ user: userId });
   

    let alreadyExists = false;

    if (!userWishList) {
      userWishList = new WishList({
        user: userId,
        products: [productId],
      });
    } else {
      alreadyExists = userWishList.products.some(
        (product) => product.toString() === productId
      );

      if (alreadyExists) {
        userWishList.products = userWishList.products.filter(
          (product) => product.toString() !== productId
        );
      } else {
        userWishList.products.push(productId);
      }
    }

    await userWishList.save();

    res.json({
      message: alreadyExists
        ? "Product removed from wishlist successfully"
        : "Product added to wishlist",
      data: userWishList,
    });
  } catch (error) {
    errorHandler(error, req, res);
  }
};

const fecthUserWishtList = async (req, res) => {
  const userId = req.user.id;
  try {
    const wishlist = await WishList.findOne({ user: userId }).populate(
      "products"
    );
    if (!wishlist)
      return res.status(404).json({ message: "Wishlist not found" });
    res.json({ message: true, data: wishlist.products });
  } catch (error) {
    errorHandler(error);
  }
};

export { addWishList, fecthUserWishtList };
