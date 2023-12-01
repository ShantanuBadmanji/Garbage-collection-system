import { Router } from "express";
import { isAuthenticated } from "../../middleware/auth-middleware.js";
import { postUser } from "../../db/query/user-query.js";
import { postEmployee } from "../../db/query/emp-query.js";
import passport from "passport";

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

router.post("/login", (req, res, next) => {
  console.log(req.query, req.body);
  const { role } = req.query;
  switch (role && role.toLowerCase().trim()) {
    case "user":
      passport.authenticate("local-user", (err, user, info) => {
        if (err) console.log(err);
        if (!user) return res.json({ err: "user doesnt exist" });
        req.logIn(user, (err) => {
          if (err) console.log(err);
          res.json({ success: "auth successful" });
        });
      })(req, res, next);
      break;
    case "employee":
      passport.authenticate("local-employee", (err, user, info) => {
        if (err) console.log(err);
        if (!user) return res.json({ err: "user doesnt exist" });
        req.logIn(user, (err) => {
          if (err) console.log(err);
          res.json({ success: "auth successful" });
        });
      })(req, res, next);

      break;
    case "admin":
      passport.authenticate("local-admin", (err, user, info) => {
        if (err) console.log(err);
        if (!user) return res.json({ err: "user doesnt exist" });
        req.logIn(user, (err) => {
          if (err) console.log(err);
          res.json({ success: "auth successful" });
        });
      })(req, res, next);

      break;

    default:
      return res.send("role doesn't match");
  }
});

router.post("/signup", async (req, res, next) => {
  console.log(req.query, req.body);
  const { role } = req.query;
  const { username, name = null, password } = req.body;
  try {
    switch (role && role.toLowerCase().trim()) {
      case "user":
        await postUser(username, name, password);
        break;
      case "employee":
        await postEmployee(username, name, password);
        break;
      case "admin":
        await postAdmin(username, name, password);
        break;

      default:
        return res.send("role doesn't match");
    }

    req.logIn(username, (err) => {
      if (err) next(err);
      else res.status(300).redirect("/api/auth/user");
    });
  } catch (error) {
    res.status(500).json({ error });
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
router.get("/success", (req, res, next) => {
  const user = req.user;
  res.redirect(process.env.FRONTEND_URL + "/auth/login/success");
});

router.get("/failure", (req, res, next) => {
  res.status(401).send({ message: "authentication unsucessful" });
});

export default router;
