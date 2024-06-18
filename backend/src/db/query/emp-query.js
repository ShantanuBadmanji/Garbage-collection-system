import { db } from "../connect_db.js";


//  EMPLOYEE Table
const getEmployees = async () => {
  const query = "SELECT * FROM EMPLOYEE";
  return await db.execute(query);
};

const getEmployeeById = async (userId) => {
  const query = "SELECT * FROM EMPLOYEE WHERE username = ?";
  return await db.execute(query, [userId]);
};

const postEmployee = async (id, name = null, password = null) => {
  const query = "INSERT INTO EMPLOYEE (id,name,password) VALUES (?,?,?);";
  const result = await db.execute(query, [id, name, password]);
  console.log("ok: ", result);
};
export { getEmployeeById, getEmployees, postEmployee };
