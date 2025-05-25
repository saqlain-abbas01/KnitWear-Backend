import express from "express";
import { createUser } from "../controllers/Auth.js";

import {
  fecthUserById,
  fetchAllUser,
  updateUserById,
  deleteUser,
  changePassword,
  resetPassword,
  userLogout,
} from "../controllers/User.js";

const router = express.Router();

router
  .post("/", createUser)
  .post("/changePassword", changePassword)
  .post("/resetPassword", resetPassword)
  .post("/logout", userLogout)
  .get("/", fetchAllUser)
  .get("/profile", fecthUserById)
  .patch("/update", updateUserById)
  .delete("/:id", deleteUser);

export default router;
