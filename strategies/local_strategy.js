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
    try {
      const findUser = await User.findOne({ email: email });
      if (!findUser) throw new Error("User not found");
      crypto.pbkdf2Sync(password, findUser.salt, 1000, 64, "sha256"),
        async function (err, password) {
          if (!crypto.timingSafeEqual(findUser.password, password)) {
            return done(null, false, { message: "invalid cradentails" });
          }
        };
      done(null, sanitizeUser(findUser));
    } catch (err) {
      done(err, null);
    }
  })
);
