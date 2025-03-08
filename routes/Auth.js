import express from "express";
import { createUser } from "../controllers/Auth.js";

const router = express.Router();

router.post("/signUp", createUser);

export default router;
