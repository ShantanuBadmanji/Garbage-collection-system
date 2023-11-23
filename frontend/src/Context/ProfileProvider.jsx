import { createContext, useCallback, useEffect, useState } from "react";
import useAuthId from "../hooks/useAuthId";

const ProfileContext = createContext();

// eslint-disable-next-line react/prop-types
function ProfileProvider({ children }) {
  const { authID } = useAuthId();
  const [profile, setProfile] = useState(null);

  const handleUpdateProfile = useCallback(() => {
    if (!authID) {
      setProfile(null);
      return;
    }
    fetch(`${import.meta.env.VITE_BACKEND_API_URI}/users/${authID}`, {
      credentials: "include",
    })
      .then((response) => {
        if (response.ok) {
          response
            .json()
            .then(({ id, name }) => setProfile({ name, id }))
            .catch((error) => console.log(error));
        }
      })
      .catch((error) => console.log(error));
  }, [authID]);

  useEffect(() => {
    handleUpdateProfile();
  }, [authID, handleUpdateProfile]);

  useEffect(() => console.log("profile: ", profile), [profile]);

  return (
    <ProfileContext.Provider value={{ profile }}>
      {children}
    </ProfileContext.Provider>
  );
}

export { ProfileProvider, ProfileContext };
