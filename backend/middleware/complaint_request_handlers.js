import { db } from "../db/connect_db.js";
import crypto from "crypto";

const getAllComplaints = async (req, res, next) => {
  try {
    const getComplaintsQuery =
      "SELECT \
      c.id as complaint_id, bi.url as bi_url,  ai.url as ai_url, gps.*\
      FROM `COMPLAINT`  AS c  \
      LEFT JOIN `GPS_LOCATION` AS gps ON c.id = gps.complaint_id \
      LEFT JOIN `BEFORE_IMAGE` AS bi ON c.id=bi.complaint_id \
      LEFT JOIN `AFTER_IMAGE` AS ai ON c.id=ai.complaint_id;";

    const [result] = await db.execute(getComplaintsQuery);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const getComplaintById = async (req, res, next) => {
  const { complaintId } = req.params;

  try {
    const getComplaintsQuery =
      "SELECT \
    u.name as user_name, e.name as emp_name, c.id as complaint_id, bi.url as bi_url,  ai.url as ai_url, gps.*\
    FROM `COMPLAINT`  AS c  \
    LEFT JOIN `USER` as u ON u.id = c.user_id \
    LEFT JOIN `EMPLOYEE` as e ON e.id = c.emp_id \
    LEFT JOIN `BEFORE_IMAGE` AS bi ON c.id = bi.complaint_id \
    LEFT JOIN `AFTER_IMAGE` AS ai ON c.id = ai.complaint_id \
    LEFT JOIN `GPS_LOCATION` AS gps ON c.id = gps.complaint_id \
    where c.id = ?;";

    const [result] = await db.execute(getComplaintsQuery, [complaintId]);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const postComplaint = async (req, res, next) => {
  try {
    const {
      complaint: { type = null },
      beforeURIs,
      Gps,
      userId = null,
    } = req.body;
    const { city = null, longitute = null, latitude = null } = Gps;
    const complaintId = crypto.randomUUID();

    await db.execute(`INSERT INTO COMPLAINT (id,user_id,type) values(?,?,?);`, [
      complaintId,
      userId,
      type,
    ]);

    beforeURIs.forEach(async (imgURI, index) => {
      try {
        await db.execute(
          `INSERT INTO BEFORE_IMAGE (id, complaint_id, url) values(?,?,?);`,
          [index + 1, complaintId, imgURI]
        );
      } catch (error) {
        next(error);
      }
    });

    await db.execute(
      `INSERT INTO GPS_LOCATION (complaint_id,city,longitude,latitude) values(?,?,?,?);`,
      [complaintId, city, longitute, latitude]
    );
    res.status(200).json({
      message: "complaint submitted successfully.",
      data: { complaintId },
    });
  } catch (error) {
    error.status = 400;
    next(error);
  }
};

const deleteComplaintById = async (req, res, next) => {
  const { complaintId } = req.params;
  try {
    await db.execute(`DELETE FROM COMPLAINT WHERE id = ?`, [complaintId]);

    res.status(200).json({
      message: "complaint submitted successfully.",
      data: { complaintId },
    });
  } catch (error) {
    next(error);
  }
};

export {
  getAllComplaints,
  getComplaintById,
  postComplaint,
  deleteComplaintById,
};
