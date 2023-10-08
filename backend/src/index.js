(await import("dotenv")).config();
import express from "express";
import session from "express-session";
import passport from "passport";
import bodyParser from "body-parser";
import userRouter from "./routes/users.js";
import complaintRouter from "./routes/complaints.js";
import authRouter from "./lib/auth/Oauth.js";
import { internalServerError } from "./middleware/error_handlers.js";
import cors from "cors";
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
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// routes
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/complaints", complaintRouter);

app.use((req, res, next) => res.status(404).send("wrong gateway"));
app.use(internalServerError);

app.listen(3000, () => console.log("server live on 3000"));
