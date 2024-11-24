import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signoutSuccess } from "../redux/user/userSlice"; // Import the Redux action
import "../styles/Header.css";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { currentUser } = useSelector((state) => state.user); // Check logged-in user
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle Sign Out
  const handleLogout = () => {
    dispatch(signoutSuccess()); // Clear the logged-in user state
    navigate("/sign-in"); // Redirect to the login page
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
          <Link to="/" className="header-nav-link" onClick={() => setMenuOpen(false)}>
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

        {/* User Actions */}
        <div className="header-actions" ref={dropdownRef}>
          <button
            className="header-dropdown-button"
            onClick={() => setDropdownOpen(!dropdownOpen)}
            aria-label="Toggle Account Menu"
          >
            👤 Account
          </button>
          <div className={`header-dropdown-menu ${dropdownOpen ? "dropdown-open" : ""}`}>
            {!currentUser ? (
              <>
                <Link to="/sign-in" className="header-dropdown-item" onClick={() => setDropdownOpen(false)}>
                  Log In
                </Link>
                <Link to="/register" className="header-dropdown-item" onClick={() => setDropdownOpen(false)}>
                  Sign Up
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/edit-profile"
                  className="header-dropdown-item"
                  onClick={() => setDropdownOpen(false)}
                >
                  Edit Profile
                </Link>
                <button className="header-dropdown-item" onClick={handleLogout}>
                  Sign Out
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
