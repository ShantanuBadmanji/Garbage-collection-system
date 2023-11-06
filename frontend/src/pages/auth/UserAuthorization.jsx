/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

function UserAuthorization({ children }) {
  const [isUser, setIsUser] = useState(true);
    useEffect(() => setIsUser((p) => !p), []);
  if (isUser) {
    return <div>{children}</div>;
  } else {
    return <h1>un-authorised</h1>;
  }
}

export default UserAuthorization;
