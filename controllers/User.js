import User from "../models/User.js";
import errorHandler from "../utils/errorhandler.js";

const fetchAllUser = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    console.error("Error fetching product:", error);
    errorHandler(error, res);
  }
};

const fecthUserById = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    const user = await User.findById(id, "name email id").exec();
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    errorHandler(error, res);
  }
};

const updateUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedUser = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json({
      success: true,
      updatedUser,
    });
  } catch (error) {
    errorHandler(error, res);
  }
};

export { fecthUserById, updateUserById, fetchAllUser };
