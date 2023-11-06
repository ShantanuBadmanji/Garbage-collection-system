(await import("dotenv")).config();
import passport from "passport";
import { Router } from "express";
import { getUserById, postUser } from "../../db/query/user-query.js";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";

const googleOptions = {
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.LOCAL_URL + "/api/auth" + "/google/callback",
  passReqToCallback: true,
};
const googleVerify = async (req, accessT, refreshT, profile, done) => {
  try {
    console.log("profile", profile._json);
    const { id, displayName: name } = profile;
    const [result] = await getUserById(id);

    result.length == 0 && (await postUser(id, name));

    return done(null, { id, name });
  } catch (error) {
    return done(error, null);
  }
};

// Google 2.0 OAuth strategy
passport.use(new GoogleStrategy(googleOptions, googleVerify));

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
router.get(
  "/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "/google/success",
    failureRedirect: "/google/failure",
  })
);
router.get("/google/success", (req, res, next) => {
  const user = req.user;
  res.status(201).json({ message: "authenticated successfully", user });
});

router.get("/google/failure", (req, res, next) => {
  res.status(401).send({ message: "authentication unsucessful" });
});

export default router;
