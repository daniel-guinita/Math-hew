import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signoutSuccess, signInSuccess } from "../redux/user/userSlice";
import { useInView } from "react-intersection-observer";
import "../styles/Header.css";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef(null);
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
    setDropdownOpen(null);
    navigate("/sign-in");
  };

  const handleScrollTo = (id) => {
    if (location.pathname === "/") {
      const section = document.getElementById(id);
      if (section) section.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/");
      setTimeout(() => {
        const section = document.getElementById(id);
        if (section) section.scrollIntoView({ behavior: "smooth" });
      }, 500);
    }
  };

  const handleScrollToTop = () => {
    if (location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate("/");
      setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 500);
    }
  };

  const isMobile = window.innerWidth <= 768;

  const toggleDropdown = (type) => {
    setDropdownOpen((prev) => (prev === type ? null : type));
  };

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

        {/* Navigation */}
        <nav className={`header-nav ${menuOpen ? "header-nav-open" : ""}`}>
          {/* Home: dropdown for student/teacher, plain links for guest */}
          {(currentUser?.role === "student" || currentUser?.role === "teacher") ? (
            <div
              className={`header-nav-link dropdown-parent ${dropdownOpen === "home" ? "open" : ""}`}
              onMouseEnter={() => !isMobile && setDropdownOpen("home")}
              onMouseLeave={() => !isMobile && setDropdownOpen(null)}
              onClick={() => toggleDropdown("home")}
            >
              <span>Home ▾</span>
              <div className="dropdown-menu">
                <span className="dropdown-item" onClick={handleScrollToTop}>Home</span>
                <span className="dropdown-item" onClick={() => handleScrollTo("about-us")}>About Us</span>
                <span className="dropdown-item" onClick={() => handleScrollTo("contact-us")}>Contact Us</span>
              </div>
            </div>
          ) : (
            <>
              <span className="header-nav-link" onClick={handleScrollToTop}>Home</span>
              <span className="header-nav-link" onClick={() => handleScrollTo("about-us")}>About Us</span>
              <span className="header-nav-link" onClick={() => handleScrollTo("contact-us")}>Contact Us</span>
            </>
          )}

          {/* Teacher only */}
          {currentUser?.role === "teacher" && (
            <Link to="/main-page" className="header-nav-link">Dashboard</Link>
          )}

          {/* Recent Scores dropdown */}
          {(currentUser?.role === "student" || currentUser?.role === "teacher") && (
            <div
              className={`header-nav-link dropdown-parent ${dropdownOpen === "recent" ? "open" : ""}`}
              onMouseEnter={() => !isMobile && setDropdownOpen("recent")}
              onMouseLeave={() => !isMobile && setDropdownOpen(null)}
              onClick={() => toggleDropdown("recent")}
            >
              <span>Recent Scores ▾</span>
              <div className="dropdown-menu">
                <Link to="/recent-scores" className="dropdown-item">Recent Scores</Link>
                <Link to="/leaderboard" className="dropdown-item">Leaderboard</Link>
              </div>
            </div>
          )}

          {/* Admin only */}
          {currentUser?.role === "admin" && (
            <>
              <Link to="/admin" className="header-nav-link">Dashboard</Link>
              <Link to="/lessons-page" className="header-nav-link">Lessons</Link>
              <Link to="/leaderboard" className="header-nav-link">Leaderboard</Link>
            </>
          )}

          {/* Student and Teacher */}
          {(currentUser?.role === "student" || currentUser?.role === "teacher") && (
            <Link to="/lessons-page" className="header-nav-link">Lessons</Link>
          )}

          {/* Student only */}
          {currentUser?.role === "student" && (
            <Link to="/game" className="header-nav-link">Game</Link>
          )}
        </nav>

        {/* Account Menu */}
        <div className="header-account">
          {!currentUser ? (
            <button className="header-signin-button" onClick={() => navigate("/sign-in")}>
              Sign In
            </button>
          ) : (
            <div className="header-actions" ref={dropdownRef}>
              <button
                className="header-dropdown-button"
                onClick={() => toggleDropdown("account")}
                aria-label="Toggle Account Menu"
              >
                👤 {currentUser.username || currentUser.email}
              </button>
              <div className={`header-dropdown-menu ${dropdownOpen === "account" ? "dropdown-open" : ""}`}>
                <Link to="/profile" className="header-dropdown-item" onClick={() => setDropdownOpen(null)}>
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
