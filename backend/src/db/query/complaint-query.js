import { db } from "../connect_db.js";

//Complaint Table
const getComplaints = async () => {
  const query =
    "SELECT \
      c.id as complaint_id, bi.url as bi_url,  ai.url as ai_url, gps.* \
      FROM `COMPLAINT`  AS c  \
      LEFT JOIN `GPS_LOCATION` AS gps ON c.id = gps.complaint_id \
      LEFT JOIN `BEFORE_IMAGE` AS bi ON c.id=bi.complaint_id \
      LEFT JOIN `AFTER_IMAGE` AS ai ON c.id=ai.complaint_id;";

  return await db.execute(query);
};

const getComplaintById = async (complaintId) => {
  const query =
    "SELECT \
    u.name as user_name, e.name as emp_name, c.id as complaint_id, bi.url as bi_url,  ai.url as ai_url, gps.* \
    FROM `COMPLAINT`  AS c  \
    LEFT JOIN `USER` as u ON u.id = c.user_id \
    LEFT JOIN `EMPLOYEE` as e ON e.id = c.emp_id \
    LEFT JOIN `BEFORE_IMAGE` AS bi ON c.id = bi.complaint_id \
    LEFT JOIN `AFTER_IMAGE` AS ai ON c.id = ai.complaint_id \
    LEFT JOIN `GPS_LOCATION` AS gps ON c.id = gps.complaint_id \
    where c.id = ?;";

  return await db.execute(query, [complaintId]);
};

const postComplaint = async (reqBody, next) => {
  const {
    wasteType = null,
    beforeURIs,
    location,
    userId = null,
    complaintId,
  } = reqBody;

  const complaintQuery =
    "INSERT INTO COMPLAINT (id,user_id,type) values(?,?,?);";
  await db.execute(complaintQuery, [complaintId, userId, wasteType]);

  const b4ImgQuery =
    "INSERT INTO BEFORE_IMAGE (id, complaint_id, url) values(?,?,?);";
  beforeURIs.forEach(async (imgURI, index) => {
    try {
      await db.execute(b4ImgQuery, [index + 1, complaintId, imgURI]);
    } catch (error) {
      next(error);
    }
  });

  const {
    city = null,
    longitute = null,
    latitude = null,
    displayAddress = null,
  } = location;
  const gpsQuery =
    "INSERT INTO GPS_LOCATION (complaint_id,city,longitude,latitude) values(?,?,?,?);";
  await db.execute(gpsQuery, [complaintId, city, longitute, latitude]);
};

const deleteComplaintById = async (complaintId) => {
  const query = "DELETE FROM COMPLAINT WHERE id = ?";
  return await db.execute(query, [complaintId]);
};

export { getComplaints, getComplaintById, postComplaint, deleteComplaintById };
