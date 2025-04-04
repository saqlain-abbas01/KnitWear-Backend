import express from "express";
import { createUser, logInUser } from "../controllers/Auth.js";
import passport from "passport";

const router = express.Router();

router.post("/signUp", createUser);
router.post("/signin", passport.authenticate("local"), logInUser);

export default router;
