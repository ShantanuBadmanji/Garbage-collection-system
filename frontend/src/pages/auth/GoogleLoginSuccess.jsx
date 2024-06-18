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
          login(user);
          console.log("user: ", authID);
          switch (authID.role) {
            case "user":
              navigate(`/users/dashboard`);
              break;
            case "employee":
              navigate("/employees/dashboard");
              break;
            case "admin":
              navigate("/admins/dashboard");
              break;

            default:
              navigate("/auth/login");
              break;
          }
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
