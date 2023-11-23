(await import("dotenv")).config();
import express from "express";
import session from "express-session";
// import session from "cookie-session";
import passport from "passport";
import bodyParser from "body-parser";
import userRouter from "./routes/users.js";
import complaintRouter from "./routes/complaints.js";
import googleAuthRouter from "./lib/auth/Oauth.js";
import authRouter from "./routes/auth/login-logout.js";
import { internalServerError } from "./middleware/error_handlers.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import { sessionStore } from "./db/connect_db.js";

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
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/complaints", complaintRouter);

app.use((req, res, next) => res.status(404).send("wrong gateway"));
app.use(internalServerError);

app.listen(3000, () => console.log("server live on 3000"));
