const sanitizeUser = (user) => {
  return { id: user.id, role: user.role };
};

const isAuth = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.send("user not authorized");
  }
};

export { sanitizeUser, isAuth };
