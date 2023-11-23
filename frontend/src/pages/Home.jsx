import { NavLink } from "react-router-dom";

function Home() {
  return (
    <div>
      <button>track the complaint</button>
      <NavLink to="/auth/login">login</NavLink>
    </div>
  );
}

export default Home;
