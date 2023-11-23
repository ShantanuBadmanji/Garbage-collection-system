import { createContext, useState } from "react";

const AuthContext = createContext();

/* eslint-disable react/prop-types */
function AuthProvider({ children }) {
  const [authID, setAuthID] = useState(null);

  const login = (userID) => setAuthID(userID);
  const logout = () => setAuthID(null);

  return (
    <AuthContext.Provider value={{ authID, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider};
