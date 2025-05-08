import passport from "../strategies/local_strategy.js";

const sanitizeUser = (user) => {
  return { id: user.id, role: user.role };
};

const isAuth = () => {
  console.log("isAuth runs");
  return passport.authenticate("jwt", { session: false });
};

export { sanitizeUser, isAuth };
