import passport from "passport";
import { Strategy } from "passport-local";
import { sanitizeUser } from "../utils/common.js";
import { Strategy as JwtStrategy } from "passport-jwt";
import cookie from "cookie";

import User from "../models/User.js";
import crypto from "crypto";

// passport.serializeUser((user, done) => {
//   done(null, user.id);
// });

// passport.deserializeUser(async (user, done) => {
//   console.log("call deserializer:", user);
//   try {
//     const findUser = await User.findOne({ id: user.id });
//     if (!findUser) throw new Error("user not found");
//     done(null, sanitizeUser(findUser));
//   } catch (err) {
//     done(err, null);
//   }
// });

passport.use(
  new Strategy({ usernameField: "email" }, async (email, password, done) => {
    console.log("email:", email, "password:", password);
    console.log("auth user");

    try {
      const findUser = await User.findOne({ email: email });
      console.log("user", findUser);
      if (!findUser) {
        return done("user does not exist", false, {
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
      console.log("check password");
      // Compare the hashed password (Buffer) with the stored password (Buffer)
      if (!crypto.timingSafeEqual(findUser.password, hashedPassword)) {
        return done(null, false, {
          message: "Email or password does not match",
        });
      }
      console.log("logged in");
      return done(null, sanitizeUser(findUser));
    } catch (err) {
      return done(err);
    }
  })
);

const cookieExtractor = function (req) {
  console.log("this runs", req.headers);
  let token = null;
  if (req && req.headers && req.headers.cookie) {
    const cookies = cookie.parse(req.headers.cookie);
    token = cookies.auth_token;
  }
  console.log("extract cookie", token);
  return token;
};

const jwtOptions = {
  jwtFromRequest: cookieExtractor,
  secretOrKey: process.env.JWT_SECRET,
};

passport.use(
  new JwtStrategy(jwtOptions, async (jwtPayload, done) => {
    console.log("jwtpayload", jwtPayload);
    try {
      const user = await User.findById(jwtPayload.id);
      if (!user) {
        return done(null, false);
      }
      return done(null, sanitizeUser(user));
    } catch (err) {
      return done(err, false);
    }
  })
);

export default passport;
