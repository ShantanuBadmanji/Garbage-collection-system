import { db } from "../connect_db.js";

//  User Table
const getAdmins = async () => {
  const query = "SELECT * FROM ADMIN";
  return await db.execute(query);
};

const getAdminById = async (userId) => {
  const query = "SELECT * FROM ADMIN WHERE username = ?";
  return await db.execute(query, [userId]);
};

const postAdmin = async (id, name = null, password = null) => {
  const query = "INSERT INTO ADMIN (username,name,password) VALUES (?,?,?);";
  const result = await db.execute(query, [id, name, password]);
  console.log("ok: ", result);
};
export { getAdminById, getAdmins, postAdmin };
