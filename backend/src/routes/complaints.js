import { Router } from "express";
import crypto from "crypto";
import {
  deleteComplaintById,
  getComplaintById,
  getComplaints,
  postComplaint,
  patchComplaintById,
} from "../db/query/complaint-query.js";

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const [result] = await getComplaints({ ...req.user });
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});
router.post("/", async (req, res, next) => {
  console.log(req.body);
  const userId = req.user.id;
  const body = { ...req.body };
  try {
    const complaintId = crypto.randomUUID();
    await postComplaint({ ...body, complaintId, userId }, next);
    res.status(200).json({
      message: "complaint submitted successfully.",
      data: { complaintId },
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

// router.all("/:complaintId", (req, res, next) => next());
router.get("/:complaintId", async (req, res, next) => {
  const { complaintId } = req.params;

  try {
    const [[resultedComplaint]] = await getComplaintById(complaintId);
    res.status(200).json(resultedComplaint);
  } catch (error) {
    next(error);
  }
});
router.patch("/:complaintId", async (req, res, next) => {
  const { complaintId } = req.params;
  console.log(req.body);
  try {
    const [[resultedComplaint]] = await patchComplaintById({ ...req.body });
    res.status(200).json(resultedComplaint);
  } catch (error) {
    res.status(500).json(error);
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

export default router;
