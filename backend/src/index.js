(await import("dotenv")).config();
import express from "express";
import session from "express-session";
// import session from "cookie-session";
import passport from "passport";
import bodyParser from "body-parser";
import userRouter from "./routes/users.js";
import complaintRouter from "./routes/complaints.js";
import googleAuthRouter from "./lib/auth/google.js";
import authRouter from "./routes/auth/login-logout.js";
import { internalServerError } from "./middleware/error_handlers.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import { db, sessionStore } from "./db/connect_db.js";
import localAuthRouter from "./lib/auth/local.js";
import { isAuthenticated } from "./middleware/auth-middleware.js";

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);

// passport-session
app.use(cookieParser());
app.use(
  session({
    key: "sessionKey",
    store: sessionStore,
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

// routes
app.use("/api/auth/google", googleAuthRouter);
app.use("/api/auth/local", localAuthRouter);
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/complaints", isAuthenticated, complaintRouter);

app.get("/string-to-array/:val", async (req, res) => {
  try {
    const response = await db.query("call p(?)", [+req.params.val]);
    res.json({ response });
  } catch (error) {
    res.json({ error });
  }
});

app.use((req, res, next) => res.status(404).send("wrong gateway"));
app.use(internalServerError);

app.listen(3000, () => console.log("server live on 3000"));
