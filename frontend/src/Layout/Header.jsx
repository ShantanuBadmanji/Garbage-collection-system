import { useEffect } from "react";
import { NavLink } from "react-router-dom";

function Header() {
  useEffect(() => {
    console.log("header");
  });

  return (
    <header style={{ background: "red" }}>
      <h1>Header</h1>
      <div className="navbar">
        <NavLink to="/">Home page</NavLink>
        <NavLink to="/about-us">About Us page</NavLink>
      </div>
    </header>
  );
}

export default Header;
