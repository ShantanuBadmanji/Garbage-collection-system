const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.status(401).send("user not Authenticated");
  }
};
export { isAuthenticated };
