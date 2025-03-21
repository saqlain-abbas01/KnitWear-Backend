import express from "express";
import { createUser } from "../controllers/Auth.js";
import {
  fecthUserById,
  fetchAllUser,
  updateUserById,
} from "../controllers/User.js";

const router = express.Router();

router
  .get("/", fetchAllUser)
  .get("/:id", fecthUserById)
  .patch("/:id", updateUserById);

export default router;
