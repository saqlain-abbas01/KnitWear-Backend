import express from "express";
import {
  createUser,
  logInUser,
  googleAuth,
  logInAdmin,
} from "../controllers/Auth.js";
import passport from "passport";

const router = express.Router();

router.post("/signUp", createUser);

router.post("/signIn", logInUser);

router.post("/adminSignIn", logInAdmin);

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "/login",
  }),
  googleAuth
);

export default router;
