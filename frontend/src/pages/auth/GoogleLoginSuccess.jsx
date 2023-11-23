import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuthId from "../../hooks/useAuthId.js";

export default function GoogleLoginSuccess() {
  const { authID, login } = useAuthId();
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(async () => {
      try {
        const response = await fetch(
          import.meta.env.VITE_BACKEND_API_URI + "/auth/user",
          { credentials: "include" }
        );
        if (response.ok) {
          const { user } = await response.json();
          login(user.id);
          console.log("user: ", authID);
          navigate("/users/dashboard");
        } else {
          navigate("/auth/login");
        }
      } catch (error) {
        console.log(error);
      }
    }, 500);
  });

  return <div>GoogleLoginSuccess</div>;
}
