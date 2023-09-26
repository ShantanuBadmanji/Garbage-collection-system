import { config } from "dotenv";
config();
import express from "express";
import userRouter from "./routes/users.js";
import complaintRouter from "./routes/complaints.js";
import bodyParser from "body-parser";
import { internalServerError } from "./middleware/error_handlers.js";
const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/users", userRouter);
app.use("/api/complaints", complaintRouter);

app.use(internalServerError);
// app.use((req, res, next) => res.status(404).send("wrong gateway"));

app.listen(3000, () => console.log("server live on 3000"));
