import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signoutSuccess, signInSuccess } from "../redux/user/userSlice";
import { getUserRole } from "../utils/auth"; // Import function to get the user role
import "../styles/Header.css";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const dropdownRef = useRef(null);
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      dispatch(signInSuccess(JSON.parse(userData)));
    }
  }, [dispatch]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
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

  const userRole = getUserRole(); // Get user role dynamically

  // Define Home Path Based on Role
  const homePath = userRole === "student" ? "/main-page" : "/";

  // Function to scroll to top when clicking "Home"
  const handleScrollToHome = () => {
    if (location.pathname === "/") {
      // If already on home page, scroll to top
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      // Navigate to home page first, then scroll to top after a short delay
      navigate("/");
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 500);
    }
  };

  // Smooth scroll function for About Us & Contact Us
  const handleScrollTo = (id) => {
    if (location.pathname === "/") {
      // If already on Home page, scroll to the section
      const section = document.getElementById(id);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      // Navigate to Home first, then scroll after a short delay
      navigate("/");
      setTimeout(() => {
        const section = document.getElementById(id);
        if (section) {
          section.scrollIntoView({ behavior: "smooth" });
        }
      }, 500);
    }
  };

  const getMenuItems = () => {
    if (userRole === "admin") {
      return [
        { label: "Home", action: handleScrollToHome },
        { label: "User Management", path: "/admin/admin-users" },
        { label: "Lessons", path: "/lessons-page" },
        { label: "Leaderboard", path: "/leaderboard" },
        
      ];
    } else if (userRole === "teacher") {
      return [
        { label: "Home", action: handleScrollToHome },
        { label: "Student List", path: "/TeacherAdminPage" },
        { label: "Recent Scores", path: "/progress-tracking" },
        { label: "Leaderboard", path: "/leaderboard" },
        { label: "Lessons", path: "/lessons-page" },
        
      ];
    } else if (userRole === "student") {
      return [
        { label: "Home", path: "/main-page" }, // Redirects students to main-page
        { label: "Leaderboard", path: "/leaderboard" },
        { label: "About Us", action: () => handleScrollTo("about-us") },
        { label: "Contact Us", action: () => handleScrollTo("contact-us") },
      ];
    } else {
      // Default for non-logged-in users
      return [
        { label: "Home", action: handleScrollToHome }, // Scroll to homepage for non-users
        { label: "About Us", action: () => handleScrollTo("about-us") },
        { label: "Contact Us", action: () => handleScrollTo("contact-us") },
      ];
    }
  };

  const menuItems = getMenuItems();

  return (
    <header className={`header ${isScrolled ? "header-transparent" : ""}`}>
      <div className="header-container">
        <div className="header-logo">
          <img src="/images/icon.png" alt="Math-hew Logo" className="header-logo-img" />
          <span className="header-logo-text">Math-hew</span>
        </div>

        <button
          className="header-menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle Navigation Menu"
        >
          ☰
        </button>

        <nav className={`header-nav ${menuOpen ? "header-nav-open" : ""}`}>
          {menuItems.map((item, index) =>
            item.path ? (
              <Link key={index} to={item.path} className="header-nav-link" onClick={() => setMenuOpen(false)}>
                {item.label}
              </Link>
            ) : (
              <span
                key={index}
                className="header-nav-link"
                onClick={() => {
                  setMenuOpen(false);
                  item.action(); // Scroll to section or home
                }}
              >
                {item.label}
              </span>
            )
          )}
        </nav>

        <div className="header-account">
          {!currentUser ? (
            <button className="header-signin-button" onClick={() => navigate("/sign-in")}>
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
              <div className={`header-dropdown-menu ${dropdownOpen ? "dropdown-open" : ""}`}>
                <Link to="/profile" className="header-dropdown-item" onClick={() => setDropdownOpen(false)}>
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
