import express from "express";
import {
  getMessages,
  getUsersForSidebar,
  sendMessage,
} from "../controllers/Messages.js";

const router = express.Router();

router.get("/users", getUsersForSidebar);
router.get("/:id", getMessages);

router.post("/send/:id", sendMessage);

export default router;
