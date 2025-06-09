import passport from "../strategies/local_strategy.js";
import User from "../models/User.js";

const sanitizeUser = (user) => {
  return { id: user.id, role: user.role };
};

const isAuth = () => {
  console.log("isAuth runs");
  return passport.authenticate("jwt", { session: false });
};

const googleAuth = async (profile) => {
  console.log("gooogle profile", profile.emails?.[0]?.value);
  const email = profile.emails?.[0]?.value;

  if (!email) {
    throw new Error("Google profile does not contain an email.");
  }

  // Check if user already exists by email
  let user = await User.findOne({ email });
  console.log("found user", user);
  if (user) {
    // If user exists but doesn't have a googleId, link it
    if (!user.googleId) {
      user.googleId = profile.id;
      await user.save();
    }
    return user;
  }

  // Otherwise, create a new user with Google profile
  user = new User({
    googleId: profile.id,
    name: profile.displayName,
    email,
  });
  console.log("created user", user);
  await user.save();
  console.log("return user", user);
  return user;
};

export { sanitizeUser, isAuth, googleAuth };
