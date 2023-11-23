import { Router } from "express";
import { isAuthenticated } from "../../middleware/auth-middleware.js";

const router = Router();

router.get("/login", (req, res, next) => {
  console.log(req.query);
  const { strategy } = req.query;

  if (strategy && strategy.toLowerCase().trim() === "google") {
    res.status(300).redirect("/api/auth/google");
  } else {
    res.send("hello");
  }
});

router.get("/user", isAuthenticated, (req, res, next) => {
  console.log("req.user: ", req.user);
  res.set();
  res.status(200).json({ user: req.user });
});

router.post("/signout", isAuthenticated, (req, res, next) => {
  const user = { ...req.user };
  req.logOut((error) => {
    error
      ? console.log("logout error: ", error)
      : res.status(200).json({ message: "Logged Out", user });
  });
});

export default router;
