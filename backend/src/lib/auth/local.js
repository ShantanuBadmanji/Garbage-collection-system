(await import("dotenv")).config();
import passport from "passport";
import { Router } from "express";
import { Strategy as LocalStrategy } from "passport-local";
import { getEmployeeById } from "../../db/query/emp-query.js";
import { getUserById } from "../../db/query/user-query.js";
import { getAdminById } from "../../db/query/admin-query.js";
const verify = (getPersonById, role) => async (username, password, done) => {
  console.log("arrived:", username, password);
  try {
    const [[user]] = await getPersonById(username);

    if (!user) return done(null, false);
    if (!(user.password == password)) return done(null, false);
    return done(null, { id: user.username, role });
  } catch (error) {
    console.log(error.message);
    return done(error, null);
  }
};

//local strategy
passport.use(
  "local-employee",
  new LocalStrategy(verify(getEmployeeById, "employee"))
);

passport.use("local-admin", new LocalStrategy(verify(getAdminById, "admin")));
passport.use("local-user", new LocalStrategy(verify(getUserById, "user")));

passport.serializeUser(function (user, cb) {
  process.nextTick(function () {
    cb(null, user);
  });
});

passport.deserializeUser(function (user, cb) {
  // console.log("deserialize: ", user);
  process.nextTick(function () {
    return cb(null, user);
  });
});

const router = Router();

router.post("/users", (req, res, next) => {
  console.logs("entered");
  console.log(req.body);

  passport.authenticate("local-user", (err, user, info) => {
    if (err) console.log(err);
    if (!user) return res.json({ err: "user doesnt exist" });
    req.logIn(user, (err) => {
      if (err) console.log(err);
      res.json({ success: "auth successful" });
    });
  })(req, res, next);
});
router.post(
  "/employees",
  passport.authenticate("local-employee", (err, user, info) => {
    if (err) console.log(err);
    if (!user) return res.json({ err: "user doesnt exist" });
    req.logIn(user, (err) => {
      if (err) console.log(err);
      res.json({ success: "auth successful" });
    });
  })
);
router.post(
  "/admins",
  passport.authenticate("local-admin", {
    successRedirect: "/api/auth/success",
    failureRedirect: "/api/auth/failure",
  })
);
export default router;
