import express from "express";
import { createUser, logInUser } from "../controllers/Auth.js";
import passport from "passport";

const router = express.Router();

router.post("/signUp", createUser);
router.post(
  "/signIn",
  passport.authenticate("local", {
    session: false,
    failureMessage: true,
  }),
  logInUser
);

export default router;
