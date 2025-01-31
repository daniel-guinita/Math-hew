/* eslint-disable no-unused-vars */
import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signoutSuccess, signInSuccess } from "../redux/user/userSlice";
import "../styles/Header.css";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false); // State to track scroll
  const dropdownRef = useRef(null);
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      dispatch(signInSuccess(JSON.parse(userData))); // Update Redux store
    }
  }, [dispatch]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("role");
    localStorage.removeItem("user");
    dispatch(signoutSuccess());
    setDropdownOpen(false);
    navigate("/sign-in");
  };

  const getMenuItems = () => {
    const role = localStorage.getItem("role"); // Fetch the role from localStorage

    if (!currentUser) {
      return [
        { label: "Home", path: "/" },
        { label: "About Us", path: "/about-us" },
        { label: "Features", path: "/features" },
        { label: "Contact Us", path: "/contact-us" },
      ];
    }

    if (role === "admin") {
      return [
        { label: "Manage Users", path: "/admin/admin-users" },
        { label: "Quiz Management", path: "/teacherAdmin-quiz" },
        { label: "Lessons Management", path: "/lessons-page" },
        { label: "Leaderboard", path: "/admin/admin-leaderboard" },
      ];
    }

    if (role === "teacher") {
      return [
        { label: "Manage Quizzes", path: "/teacherAdmin-quiz" },
        { label: "Teacher Dashboard", path: "/TeacherAdminPage" },
        { label: "Lessons & Resources", path: "/lessons-page" },
        { label: "View Leaderboards", path: "/admin/admin-leaderboard" },
      ];
    }

    return [
      { label: "Home", path: "main-page" },
      { label: "About Us", path: "/about-us" },
      { label: "Features", path: "/features" },
      { label: "Contact Us", path: "/contact-us" },
    ];
  };

  const menuItems = getMenuItems();

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (!currentUser && window.location.pathname === "/main-page") {
      navigate("/");
    }
  }, [currentUser, navigate]);

  return (
    <header className={`header ${isScrolled ? "header-transparent" : ""}`}>
      <div className="header-container">
        <Link to="/" className="header-logo">
          <img src="/images/icon.png" alt="Math-hew Logo" className="header-logo-img" />
          <span className="header-logo-text">Math-hew</span>
        </Link>

        <button
          className="header-menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle Navigation Menu"
        >
          ☰
        </button>

        <nav className={`header-nav ${menuOpen ? "header-nav-open" : ""}`}>
          {menuItems.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className="header-nav-link"
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="header-account">
          {!currentUser ? (
            <button
              className="header-signin-button"
              onClick={() => navigate("/sign-in")}
            >
              Sign In
            </button>
          ) : (
            <div className="header-actions" ref={dropdownRef}>
              <button
                className="header-dropdown-button"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                aria-label="Toggle Account Menu"
              >
                👤 {currentUser.username || currentUser.email}
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
