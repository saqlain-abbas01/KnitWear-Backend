import User from "../models/User.js";
import errorHandler from "../utils/errorhandler.js";
import { sendEmail } from "../utils/mailer.js";
import crypto from "crypto";

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
    const id = req.user.id;
    const user = await User.findById(id, "name email address image")
      .populate("orders")
      .exec();
    res.status(200).json({
      success: true,
      user: user,
    });
  } catch (error) {
    errorHandler(error, res);
  }
};

const updateUserById = async (req, res) => {
  console.log("update user", req.body.image);
  try {
    const id = req.user.id;
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

const changePassword = async (req, res) => {
  console.log("body", req.body);
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  const resetLink = `http://localhost:3000/auth/resetpassword?email=${encodeURIComponent(email)}`;

  try {
    const info = await sendEmail({
      from: "Admin <admin@gmail.com>",
      to: email,
      subject: "Reset your password",
      text: `Click the following link to reset your password: ${resetLink}`,
      html: `<p>Click the link below to reset your password:</p><a href="${resetLink}">${resetLink}</a>`,
    });

    res.status(200).json({ message: "Password reset email sent", info });
  } catch (error) {
    console.error("Error sending reset email:", error);
    res.status(500).json({
      message: "Failed to send password reset email",
      error: error.message,
    });
  }
};

const resetPassword = async (req, res) => {
  try {
    const id = req.user.id;
    const { password } = req.body;

    console.log("Resetting password for user:", id);

    const hashPassword = (password) => {
      const salt = crypto.randomBytes(16); // Generate a 16-byte salt (Buffer type)
      const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, "sha256"); // Resulting hash is also a Buffer
      return { salt, hash };
    };

    const { salt, hash } = hashPassword(password);

    // Update user in the database
    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        password: hash,
        salt: salt,
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json({ message: "Password reset successful." });
  } catch (error) {
    console.error("Error in resetPassword:", error);
    res.status(500).json({ message: "Failed to reset password." });
  }
};

export {
  fecthUserById,
  updateUserById,
  fetchAllUser,
  deleteUser,
  changePassword,
  resetPassword,
};
