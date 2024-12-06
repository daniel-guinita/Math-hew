import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signoutSuccess } from "../redux/user/userSlice";
import "../styles/Header.css";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    dispatch(signoutSuccess());
    setDropdownOpen(false);
    navigate("/sign-in");
  };

  return (
    <header className="header">
      <div className="header-container">
        {/* Logo Section */}
        <Link to="/" className="header-logo">
          <img src="/images/icon.png" alt="Math-hew Logo" className="header-logo-img" />
          <span className="header-logo-text">Math-hew</span>
        </Link>

        {/* Hamburger Menu */}
        <button
          className="header-menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle Navigation Menu"
        >
          ☰
        </button>

        {/* Navigation Menu */}
        <nav className={`header-nav ${menuOpen ? "header-nav-open" : ""}`}>
          <Link
            to={currentUser ? "/main-page" : "/"}
            className="header-nav-link"
            onClick={() => {
              setMenuOpen(false);
              navigate(currentUser ? "/main-page" : "/");
            }}
          >
            🏠 Home
          </Link>
          <Link to="/about-us" className="header-nav-link" onClick={() => setMenuOpen(false)}>
            🧑‍🏫 About Us
          </Link>
          <Link to="/features" className="header-nav-link" onClick={() => setMenuOpen(false)}>
            ✨ Features
          </Link>
          <Link to="/contact-us" className="header-nav-link" onClick={() => setMenuOpen(false)}>
            📩 Contact Us
          </Link>
        </nav>

        {/* Account Section */}
        <div className="header-account">
          {!currentUser ? (
            <button
              className="header-signin-button"
              onClick={() => navigate("/sign-in")}
            >
              👤 Sign In
            </button>
          ) : (
            <div className="header-actions" ref={dropdownRef}>
              <button
                className="header-dropdown-button"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                aria-label="Toggle Account Menu"
              >
                👤 {currentUser.name}
              </button>
              <div
                className={`header-dropdown-menu ${
                  dropdownOpen ? "dropdown-open" : ""
                }`}
              >
                <Link
                  to="/profile"
                  className="header-dropdown-item"
                  onClick={() => setDropdownOpen(false)}
                >
                  Profile
                </Link>
                <button className="header-dropdown-item" onClick={handleLogout}>
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
