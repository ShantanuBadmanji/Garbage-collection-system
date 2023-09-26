import { Router } from "express";
const router = Router();
import { db } from "../db/connect_db.js";
import crypto from "crypto";

router.all("/", (req, res, next) => next());

router.get("/", async (req, res, next) => {
  try {
    const [result, fields] = await db.execute(`select * from USER`);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { id = crypto.randomUUID(), name, password = null } = req.body;
    try {
      const [result, fields] = await db.execute(
        `INSERT INTO USER (id,name,password) VALUES (?,?,?);`,
        [id, name, password]
      );
      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  } catch (error) {
    error.status = 400;
    next(error);
  }
});

export default router;
