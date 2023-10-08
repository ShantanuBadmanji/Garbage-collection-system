import { useState } from "react";
import GoogleButton from "react-google-button";

function Home() {
  const [authWindow, setAuthWindow] = useState(false);

  async function handleGoogleLogin(e) {
    e.preventDefault();
    console.log("backend-api: ", import.meta.env.VITE_BACKEND_API_URI);
    const result = await fetch(import.meta.env.VITE_BACKEND_API_URI + "/auth/google",{
      mode:"no-cors"
    });
    console.log("result: ", await result);
  }
  return (
    <div>
      <button>track the complaint</button>
      <button>login</button>
      <GoogleButton type="light" onClick={handleGoogleLogin} />
    </div>
  );
}

export default Home;
