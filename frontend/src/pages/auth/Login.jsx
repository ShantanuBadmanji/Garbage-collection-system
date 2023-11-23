import GoogleButton from "react-google-button";
import { redirect } from "react-router-dom";
import { createURIQuery } from "../../utils/customize-url";

function Login() {
  async function handleGoogleLogin(e) {
    e.preventDefault();

    window.open(
      createURIQuery(`${import.meta.env.VITE_BACKEND_API_URI}/auth/login`, {
        strategy: "google",
      }),
      "_self"
    );
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
      <GoogleButton type="light" onClick={handleGoogleLogin} />
      <button onClick={handleSignout}>Logout</button>
    </>
  );
}

export default Login;
