import { NavLink } from "react-router-dom";

function Home() {
  return (
    <div>
      <NavLink to="/auth/login">login</NavLink>
    </div>
  );
}

export default Home;
