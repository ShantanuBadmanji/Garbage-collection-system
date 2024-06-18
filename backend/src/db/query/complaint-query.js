import { db } from "../connect_db.js";

//Complaint Table
const getComplaints = async ({ id, role }) => {
  let query;
  switch (role) {
    case "user":
      query = "";
      break;

    case "employee":
      query = "call show_employee_complaints(?);";
      return await db.execute(query, [id]);
      break;

    case "admin":
      query =
        "SELECT \
  G.city, \
  COUNT(CASE WHEN C.wastetype_id = 81 THEN 1 END) AS Ewaste_count, \
  COUNT(CASE WHEN C.wastetype_id = 82 THEN 1 END) AS Biowaste_count, \
  COUNT(CASE WHEN C.wastetype_id = 83 THEN 1 END) AS Biomedical_count, \
  COUNT(CASE WHEN C.wastetype_id = 84 THEN 1 END) AS Constructionwaste_count, \
  COUNT(CASE WHEN C.wastetype_id = 85 THEN 1 END) AS Hazardouswaste_count \
FROM `GPS_LOCATION` G \
JOIN `COMPLAINT` C ON G.complaint_id = C.id \
GROUP BY G.city;";
      break;

    default:
      break;
  }

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
    wasteType,
    beforeImage = [],
    location,
    userId = null,
    complaintId,
  } = reqBody;
  const {
    city = null,
    longitute = null,
    latitude = null,
    displayAddress = null,
  } = location;

  const complaintQuery = "call post_new_complaint(?,?,?,?,?,?,?,?)";
  const response = await db.execute(complaintQuery, [
    complaintId,
    wasteType,
    userId,
    displayAddress,
    city,
    latitude,
    longitute,
    beforeImage.toString(),
  ]);
  console.log(response);
  return response;
};

const deleteComplaintById = async (complaintId) => {
  const query = "DELETE FROM COMPLAINT WHERE id = ?";
  return await db.execute(query, [complaintId]);
};
const patchComplaintById = async ({ complaintToken, afterImage }) => {
  const query = "call post_completed_status(?,?)";
  return await db.execute(query, [complaintToken, afterImage.toString()]);
};

export {
  getComplaints,
  getComplaintById,
  postComplaint,
  deleteComplaintById,
  patchComplaintById,
};
