import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signoutSuccess } from "../redux/user/userSlice";
import "../styles/HeaderTeacher.css";

const HeaderTeacher = () => {
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
    <header className="header-teacher">
      <div className="header-container-t">
        {/* Logo Section */}
        <Link to="/" className="header-logo">
          <img src="/images/icon.png" alt="Math-hew Logo" className="header-logo-img" />
          <span className="header-logo-text">Math-hew Teacher</span>
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
            to="/teacher-quiz"
            className="header-nav-link"
            onClick={() => setMenuOpen(false)}
          >
            Manage Quizzes
          </Link>
          <Link
            to="/TeacherAdminPage"
            className="header-nav-link"
            onClick={() => setMenuOpen(false)}
          >
            Teacher Dashboard
          </Link>
          <Link
            to="/teacher-lessons"
            className="header-nav-link"
            onClick={() => setMenuOpen(false)}
          >
            Lessons & Resources
          </Link>
          <Link
            to="/leaderboards"
            className="header-nav-link"
            onClick={() => setMenuOpen(false)}
          >
             View Leaderboards
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
                <Link
                  to="/sign-in"
                  className="header-dropdown-item"
                  onClick={() => setDropdownOpen(false)}
                >
                  Log In
                </Link>
                <Link
                  to="/register"
                  className="header-dropdown-item"
                  onClick={() => setDropdownOpen(false)}
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <>
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
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderTeacher;
