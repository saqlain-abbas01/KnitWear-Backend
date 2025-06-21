import express from "express";
import { createUser, logInUser, googleAuth } from "../controllers/Auth.js";
import passport from "passport";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/signUp", createUser);
// router.post(
//   "/signIn",
//   passport.authenticate("local", {
//     session: false,
//     failureMessage: true,
//   }),
//   logInUser
// );
router.post("/signIn",  logInUser);

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
