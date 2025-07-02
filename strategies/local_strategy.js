import passport from "passport";
import { Strategy } from "passport-local";
import { sanitizeUser } from "../utils/common.js";
import { Strategy as JwtStrategy } from "passport-jwt";
import cookie from "cookie";

import User from "../models/User.js";
import crypto from "crypto";

passport.use(
  new Strategy({ usernameField: "email" }, async (email, password, done) => {
  

    try {
      const findUser = await User.findOne({ email: email });

      if (!findUser) {
        return done(null, false, {
          message: "User does not exist",
        });
      }
      const storedSalt = Buffer.from(findUser.salt, "hex");
      const storedPassword = Buffer.from(findUser.password, "hex");
      // Hash the entered password using the stored salt
      const hashedPassword = crypto.pbkdf2Sync(
        password,
        storedSalt,
        1000,
        64,
        "sha256"
      );
  
      // Compare the hashed password (Buffer) with the stored password (Buffer)
      if (!crypto.timingSafeEqual(storedPassword, hashedPassword)) {
        return done(null, false, {
          message: "Password does not match",
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
  let token = null;
  if (req && req.headers && req.headers.cookie) {
    const cookies = cookie.parse(req.headers.cookie);
    token = cookies.auth_token;
  }

  return token;
};

const jwtOptions = {
  jwtFromRequest: cookieExtractor,
  secretOrKey: process.env.JWT_SECRET,
};

passport.use(
  new JwtStrategy(jwtOptions, async (jwtPayload, done) => {
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
