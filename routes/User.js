import express from "express";
import { createUser } from "../controllers/Auth.js";

import {
  fecthUserById,
  fetchAllUser,
  updateUserById,
  deleteUser,
} from "../controllers/User.js";

const router = express.Router();

router
  .post("/", createUser)
  .get("/", fetchAllUser)
  .get("/profile", fecthUserById)
  .patch("/update", updateUserById)
  .delete("/:id", deleteUser);

export default router;
