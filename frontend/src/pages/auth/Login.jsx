import GoogleButton from "react-google-button";
import { redirect, useNavigate } from "react-router-dom";
import { createURIQuery } from "../../utils/customize-url";
import { useRef } from "react";
import customFetch from "../../utils/custom-fetch";

const customStyle = {
  height: "100px",
  width: "100%",
  padding: "50px",
  gap: "5px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
};
const Login = () => {
  const usernameRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();

  async function handleGoogleLogin(e) {
    e.preventDefault();

    window.open(
      createURIQuery(`${import.meta.env.VITE_BACKEND_API_URI}/auth/login`, {
        strategy: "google",
      }),
      "_self"
    );
  }
  async function handleLocalLogin(person) {
    console.log(usernameRef.current.value, passwordRef.current.value);
    const payload = {
      username: usernameRef.current.value,
      password: passwordRef.current.value,
    };

    try {
      const response = await customFetch(
        `${import.meta.env.VITE_BACKEND_API_URI}/auth/login?role=${person}`,
        {
          method: "POST",
          body: JSON.stringify(payload),
        }
      );
      console.log(response);
      navigate("/auth/login/success");
    } catch (error) {
      console.log("e", error);
    }
  }

  async function handleLocalSignUp(person) {
    console.log(usernameRef.current.value, passwordRef.current.value);
    const payload = {
      username: usernameRef.current.value,
      password: passwordRef.current.value,
    };

    try {
      const response = await customFetch(
        `${import.meta.env.VITE_BACKEND_API_URI}/auth/signup?role=${person}`,
        {
          method: "POST",
          body: JSON.stringify(payload),
        }
      );
      console.log(response);
      navigate("/auth/login/success");
    } catch (error) {
      console.log("e", error);
    }
  }

  async function handleSignout(e) {
    e.preventDefault();

    await fetch(import.meta.env.VITE_BACKEND_API_URI + "/auth/signout", {
      method: "POST",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((res) => console.log("res: ", res))
      .catch((err) => console.log("Error in logging out: ", err))
      .finally(() => redirect("/"));
  }

  return (
    <>
      <h3>Login</h3>
      <div style={{ ...customStyle, flexDirection: "row" }}>
        <form style={customStyle} onSubmit={(e) => e.preventDefault()}>
          <input
            ref={usernameRef}
            type="text"
            placeholder="username"
            required
          />
          <input
            ref={passwordRef}
            type="password"
            placeholder="password"
            required
          />
          <button onClick={() => handleLocalLogin("user")}>
            Login as User
          </button>
          <button onClick={() => handleLocalLogin("employee")}>
            Login as Employee
          </button>
          <button onClick={() => handleLocalLogin("admin")}>
            Login as Admin
          </button>
          <button onClick={() => handleLocalSignUp("user")}>
            signup as User
          </button>
          <button onClick={() => handleLocalSignUp("employee")}>
            signup as Employee
          </button>
          <button onClick={() => handleLocalSignUp("admin")}>
            signup as Admin
          </button>
        </form>
        <div style={customStyle}>
          <GoogleButton type="light" onClick={handleGoogleLogin} />
          <button onClick={handleSignout}>Logout</button>
        </div>
      </div>
    </>
  );
};

export default Login;
