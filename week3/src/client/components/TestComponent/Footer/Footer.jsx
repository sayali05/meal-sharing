import React from "react";
import ReactDOM from "react-dom";
import "./footer.css";
function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="footer">
      <p>Copyright © {currentYear}</p>
    </footer>
  );
}

export default Footer;