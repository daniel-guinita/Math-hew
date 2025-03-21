import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signoutSuccess, signInSuccess } from "../redux/user/userSlice";
import { useInView } from "react-intersection-observer";
import "../styles/Header.css";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [headerRef, headerInView] = useInView({ triggerOnce: true, threshold: 0.5 });

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      dispatch(signInSuccess(JSON.parse(userData)));
    }
  }, [dispatch]);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("role");
    localStorage.removeItem("user");
    dispatch(signoutSuccess());
    setDropdownOpen(false);
    navigate("/sign-in");
  };

  const handleScrollTo = (id) => {
    if (location.pathname === "/") {
      const section = document.getElementById(id);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      navigate("/");
      setTimeout(() => {
        const section = document.getElementById(id);
        if (section) {
          section.scrollIntoView({ behavior: "smooth" });
        }
      }, 500);
    }
  };

  const handleScrollToTop = () => {
    if (location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate("/");
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 500);
    }
  };

  const getMenuItems = () => {
    return [
      { label: "Home", action: handleScrollToTop },
      { label: "About Us", action: () => handleScrollTo("about-us") },
      { label: "Contact Us", action: () => handleScrollTo("contact-us") },
    ];
  };

  const menuItems = getMenuItems();

  useEffect(() => {
    if (!currentUser && window.location.pathname === "/main-page") {
      navigate("/");
    }
  }, [currentUser, navigate]);

  return (
    <header ref={headerRef} className={`header ${headerInView ? "fade-in" : ""}`}>
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
          {menuItems.map((item, index) => (
            <span
              key={index}
              className="header-nav-link"
              onClick={() => {
                setMenuOpen(false);
                item.action();
              }}
            >
              {item.label}
            </span>
          ))}
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
