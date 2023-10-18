import React from "react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Header.css";
const Header = () => {
  const [active, setActive] = useState("Home");
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/") {
      setActive("Home");
    } else if (location.pathname === "/add") {
      setActive("Add");
    } else if (location.pathname === "/about") {
      setActive("About");
    }
  }, [location]);
  return (
    <div className="header">
      <p className="logo">Contact App</p>
      <div className="header-right">
        <Link to="/">
          <p
            className={`${active === "Home" ? "active" : ""}`}
            onClick={() => setActive("Home")}
          >
            Home
          </p>
        </Link>
        <Link to="/add">
          <p
            className={`${active === "Add" ? "active" : ""}`}
            onClick={() => setActive("Add")}
          >
            Add User
          </p>
        </Link>
        <Link to="/about">
          <p
            className={`${active === "About" ? "active" : ""}`}
            onClick={() => setActive("About")}
          >
            About
          </p>
        </Link>
      </div>
    </div>
  );
};

export default Header;
