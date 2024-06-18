import { useContext } from "react";
import { ProfileContext } from "../Context/ProfileProvider";

export default function useProfile() {
  return useContext(ProfileContext);
}
