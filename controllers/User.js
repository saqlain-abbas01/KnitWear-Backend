import User from "../models/User.js";
import errorHandler from "../utils/errorhandler.js";

const fetchAllUser = async (req, res) => {
  try {
    const users = await User.find({}).populate("orders");
    res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
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

const deleteUser = async (req, res) => {
  const id = req.params.id;
  console.log("delete user", id);
  try {
    const deleteUser = await User.findByIdAndDelete({ _id: id });
    res.status(200).json({
      status: true,
      data: deleteUser,
    });
  } catch (error) {
    errorHandler(error);
  }
};

export { fecthUserById, updateUserById, fetchAllUser, deleteUser };
