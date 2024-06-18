import { db } from "../connect_db.js";

//  User Table
const getUsers = async () => {
  const query = "SELECT * FROM USER";
  return await db.execute(query);
};

const getUserById = async (userId) => {
  const query = "SELECT * FROM USER WHERE username = ?";
  return await db.execute(query, [userId]);
};

const postUser = async (id, name = null, password = null) => {
  const query = "INSERT INTO USER (username,name,password) VALUES (?,?,?);";
  const result = await db.execute(query, [id, name, password]);
  console.log("ok: ", result);
};
export { getUserById, getUsers, postUser };
