import User from "../models/User.js";
import errorHandler from "../utils/errorhandler.js";

const createUser = async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json({
      message: "User created successfully!",
      user: newUser,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    errorHandler(error, res);
  }
};

export { createUser };
