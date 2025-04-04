import User from "../models/User.js";
import { sanitizeUser } from "../utils/common.js";
import errorHandler from "../utils/errorhandler.js";
import crypto from "crypto";

const createUser = async (req, res) => {
  try {
    const { name, email, password, role, address, orders } = req.body;
    const hashPassword = (password) => {
      const salt = crypto.randomBytes(16).toString("hex"); // Generate a 16-byte salt and convert to hex
      const hash = crypto
        .pbkdf2Sync(password, salt, 1000, 64, "sha256")
        .toString("hex"); // Hash password using PBKDF2
      return { salt, hash };
    };
    const { salt, hash } = hashPassword(password);

    const newUser = new User({
      name,
      email,
      password: hash, 
      salt, 
      role,
      address,
      orders,
    });
    await newUser.save();
    res.status(201).json({
      message: "User created successfully!",
      user: sanitizeUser(newUser),
    });
  } catch (error) {
    console.error("Error creating user:", error);
    errorHandler(error);
  }
};

const logInUser = (req, res) => {
  res.send(sanitizeUser(req.user));
};



export { createUser, logInUser };
