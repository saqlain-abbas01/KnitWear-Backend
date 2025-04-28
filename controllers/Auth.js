import User from "../models/User.js";
import { sanitizeUser } from "../utils/common.js";
import errorHandler from "../utils/errorhandler.js";
import crypto from "crypto";

const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Hash password function
    const hashPassword = (password) => {
      const salt = crypto.randomBytes(16); // Generate a 16-byte salt (Buffer type)
      const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, "sha256"); // Resulting hash is also a Buffer
      return { salt, hash };
    };

    const { salt, hash } = hashPassword(password);

    const newUser = new User({
      name,
      email,
      password: hash, // Store the hashed password as a Buffer
      salt: salt, // Store the salt as a Buffer
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
