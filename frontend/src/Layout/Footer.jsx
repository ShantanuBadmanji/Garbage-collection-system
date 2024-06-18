import { useEffect } from "react";

function Footer() {
  useEffect(() => {
    console.log("footer");
  });

  return (
    <footer style={{ backgroundColor: "blue" }}>
      <h1>Footer</h1>;
    </footer>
  );
}

export default Footer;
