import { Router } from "express";
import {
  deleteComplaintById,
  getAllComplaints,
  getComplaintById,
  postComplaint,
} from "../middleware/complaint_request_handlers.js";

const router = Router();

// router.all("/", (req, res, next) => next());
router.get("/", getAllComplaints);
router.post("/", postComplaint);

// router.all("/:complaintId", (req, res, next) => next());
router.get("/:complaintId", getComplaintById);
router.delete("/:complaintId", deleteComplaintById);

// router
//   .route("/")
//   .all((req, res, next) => next())
//   .get(getAllComplaints)
//   .post(postComplaint);

export default router;
