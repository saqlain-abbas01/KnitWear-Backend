import passport from "passport";
import { Strategy } from "passport-local";
import User from "../models/User.js";
import crypto from "crypto";
import { sanitizeUser } from "../utils/common.js";

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (user, done) => {
  console.log("call deserializer:", user);
  try {
    const findUser = await User.findOne({ id: user.id });
    if (!findUser) throw new Error("user not found");
    done(null, sanitizeUser(findUser));
  } catch (err) {
    done(err, null);
  }
});

export default passport.use(
  new Strategy({ usernameField: "email" }, async (email, password, done) => {
    console.log("email:", email, "password:", password);
    console.log("auth user");

    try {
      const findUser = await User.findOne({ email: email });
      if (!findUser) {
        return done(null, false, {
          message: "Email or password does not match",
        });
      }

      // Hash the entered password using the stored salt
      const hashedPassword = crypto.pbkdf2Sync(
        password,
        findUser.salt,
        1000,
        64,
        "sha256"
      );

      // Compare the hashed password (Buffer) with the stored password (Buffer)
      if (!crypto.timingSafeEqual(findUser.password, hashedPassword)) {
        return done(null, false, {
          message: "Email or password does not match",
        });
      }
      console.log("logged in");
      return done(null, sanitizeUser(findUser));
    } catch (err) {
      return done(err, null);
    }
  })
);
