import User from "../models/User.js";
import { sanitizeUser } from "../utils/common.js";
import errorHandler from "../utils/errorhandler.js";
import crypto from "crypto";
import passport from "../strategies/local_strategy.js";
import jwt from "jsonwebtoken";

const createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Hash password function
    const hashPassword = (password) => {
      const salt = crypto.randomBytes(16); // Generate a 16-byte salt (Buffer type)
      const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, "sha256"); // Resulting hash is also a Buffer
      return { salt, hash };
    };

    const { salt, hash } = hashPassword(password);

    let newUser = "";
    if (role) {
      newUser = new User({
        name,
        email,
        role,
        password: hash, // Store the hashed password as a Buffer
        salt: salt, // Store the salt as a Buffer
      });
    } else {
      newUser = new User({
        name,
        email,
        role,
        password: hash, // Store the hashed password as a Buffer
        salt: salt, // Store the salt as a Buffer
      });
    }

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

const logInUser = (req, res, next) => {
  passport.authenticate("local", { session: false }, (err, user, info) => {
    if (err) {
      return res.status(500).json({ success: false, message: "Server error" });
    }

    if (!user) {
      return res.status(401).json({
        success: false,
        message: info?.message || "Invalid credentials",
      });
    }

    // If authentication succeeded
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.cookie("auth_token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 2 * 24 * 60 * 60 * 1000,
    });

    return res.json({ success: true, user });
  })(req, res, next);
};

const logInAdmin = (req, res, next) => {
  passport.authenticate("local", { session: false }, (err, user) => {
    if (err) {
      return res.status(500).json({ success: false, message: "Server error" });
    }

    if (!user || user.role !== "admin") {
      return res.status(401).json({
        success: false,
        message: "Only admin users can log in here.",
      });
    }

    // If authentication succeeded and user is admin
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.cookie("admin_token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 2 * 24 * 60 * 60 * 1000,
    });

    return res.json({ success: true, user });
  })(req, res, next);
};

const googleAuth = (req, res) => {
  // Generate JWT and set cookie

  const token = jwt.sign({ id: req.user.id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  res.cookie("auth_token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 2 * 24 * 60 * 60 * 1000,
  });
  console.log(process.env.NODE_ENV);

  // Redirect to frontend with token in cookie
  res.redirect("https://knit-wear.vercel.app"); // or your app dashboard
};

const isAuthUser = (req, res) => {
  req.body;
  return res.json({ user: req.body });
};

export { createUser, logInUser, isAuthUser, googleAuth, logInAdmin };
