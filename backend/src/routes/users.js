import { Router } from "express";
import crypto from "crypto";
import { getUserById, getUsers, postUser } from "../db/query/user-query.js";
import { isAuthenticated } from "../middleware/auth-middleware.js";

const router = Router();

router.all("/", isAuthenticated);

router.get("/", async (req, res, next) => {
  try {
    const [result] = await getUsers();
    console.log(result);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.get("/:userId", async (req, res, next) => {
  try {
    const { userId } = req.params;
    const [result] = await getUserById(userId);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { id = crypto.randomUUID(), name = null, password = null } = req.body;
    try {
      await postUser(id, name, password);
      res.status(201).json({
        message: "user created successfully.",
        data: { userId: id },
      });
    } catch (error) {
      next(error);
    }
  } catch (error) {
    error.status = 400;
    next(error);
  }
});

export default router;
