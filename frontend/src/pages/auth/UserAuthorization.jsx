/* eslint-disable react/prop-types */
import useAuthId from "../../hooks/useAuthId";

function UserAuthorization({ children }) {
  const { authID } = useAuthId();
  if (authID) {
    return <div>{children}</div>;
  } else {
    return <h1>un-authorised</h1>;
  }
}

export default UserAuthorization;
