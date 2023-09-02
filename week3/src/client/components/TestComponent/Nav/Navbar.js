import React from "react";
import "./Navbar.css";

export const Navbar = () => {
  return (
    <div>
      <div id="main-navbar" className="navbar">
        <img
          src="Users/hackyourfuturedk/Downloads/logo.webp"
          alt="logo"
          className="logo"
        />
        <h2 className="logo">MealSharing App</h2>
        <nav>
          <ul>
            <li>
              <a href="/">Home</a>
            </li>

            <li>
              <a href="/meal">Meals</a>
            </li>
            <li>
              <a href="/review">Reviews</a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};
