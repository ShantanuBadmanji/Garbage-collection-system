import { Router } from "express";
import crypto from "crypto";
import { deleteComplaintById, getComplaintById, getComplaints, postComplaint } from "../db/query/complaint-query.js";

const router = Router();

// router.all("/", (req, res, next) => next());
router.get("/", async (req, res, next) => {
  try {
    const [result] = await getComplaints();
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});
router.post("/", async (req, res, next) => {
  try {
    const complaintId = crypto.randomUUID();
    await postComplaint({ ...req.body, complaintId }, next);
    res.status(200).json({
      message: "complaint submitted successfully.",
      data: { complaintId },
    });
  } catch (error) {
    error.status = 400;
    next(error);
  }
});

// router.all("/:complaintId", (req, res, next) => next());
router.get("/:complaintId", async (req, res, next) => {
  const { complaintId } = req.params;

  try {
    const [result] = await getComplaintById(complaintId);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});
router.delete("/:complaintId", async (req, res, next) => {
  const { complaintId } = req.params;
  try {
    await deleteComplaintById(complaintId);

    res.status(200).json({
      message: "complaint submitted successfully.",
      data: { complaintId },
    });
  } catch (error) {
    next(error);
  }
});

// router
//   .route("/")
//   .all((req, res, next) => next())
//   .get(getAllComplaints)
//   .post(postComplaint);

export default router;
