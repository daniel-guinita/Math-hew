import { Avatar, Button, Navbar } from "flowbite-react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import "../styles/Header.css";

export default function Header() {
  const path = useLocation().pathname;
  const { currentUser } = useSelector((state) => state.user);

  return (
    <Navbar className="navbar">
      <div className="header-container">
        {/* Logo */}
        <Link to="/" className="logo-link">
          <img
            src="/images/icon.png"
            className="logo-img"
            alt="Math-hew Logo"
          />
          <span className="logo-text">Math-hew</span>
        </Link>

        {/* Navigation Links */}
        <div className="nav-links">
          <Link
            to="/"
            className={`nav-link ${
              path === "/" ? "nav-link-active" : ""
            }`}
          >
            🏠 Home
          </Link>
          <Link
            to="/about-us"
            className={`nav-link ${
              path === "/about-us" ? "nav-link-active" : ""
            }`}
          >
            🧑‍🏫 About Us
          </Link>
          <Link
            to="/features"
            className={`nav-link ${
              path === "/features" ? "nav-link-active" : ""
            }`}
          >
            🌟 Features
          </Link>
          <Link
            to="/contact-us"
            className={`nav-link ${
              path === "/contact-us" ? "nav-link-active" : ""
            }`}
          >
            📩 Contact Us
          </Link>
        </div>

        {/* User Actions */}
        <div className="user-actions">
          {!currentUser ? (
            <>
              <Link to="/register">
                <Button className="register-button">Sign Up</Button>
              </Link>
              <Link to="/sign-in">
                <Button className="signin-button">Log In</Button>
              </Link>
            </>
          ) : (
            <Avatar alt="User" img={currentUser.profilePicture} rounded />
          )}
        </div>
      </div>
    </Navbar>
  );
}
