import { useContext } from "react";
import { AuthContext } from "../Context/AuthProvider";

export default function useAuthId() {
  // return useContext(AuthContext);
  const authState = useContext(AuthContext);
  if (!authState) {
    throw Error("using AuthId outside AuthProvider");
  }
  return authState;
}
