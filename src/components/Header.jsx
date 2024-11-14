import { Avatar, Button, Dropdown, Navbar } from "flowbite-react";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { signoutSuccess } from "../redux/user/userSlice";
import '../styles/Header.css';

export default function Header() {
  const path = useLocation().pathname;
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const [showSignoutModal, setShowSignoutModal] = useState(false);

  const handleSignout = () => {
    dispatch(signoutSuccess());
    setShowSignoutModal(false); // Close the modal after simulated sign out
  };

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
          <span className="logo-text">
            Math-hew
          </span>
        </Link>

        {/* Centered Navigation Links */}
        <div className="nav-links">
          <Link
            to="/"
            className={`nav-link ${path === "/" ? "nav-link-active" : "nav-link-inactive"} nav-link-hover`}
          >
            Home
          </Link>
          <Link
            to="/about-us"
            className={`nav-link ${path === "/about-us" ? "nav-link-active" : "nav-link-inactive"} nav-link-hover`}
          >
            About Us
          </Link>
          <Link
            to="/features"
            className={`nav-link ${path === "/features" ? "nav-link-active" : "nav-link-inactive"} nav-link-hover`}
          >
            Features
          </Link>
          <Link
            to="/contact-us"
            className={`nav-link ${path === "/contact-us" ? "nav-link-active" : "nav-link-inactive"} nav-link-hover`}
          >
            Contact Us
          </Link>
        </div>

        {/* User Account Dropdown */}
        <div className="user-actions">
          {currentUser ? (
            <Dropdown
              arrowIcon={false}
              inline
              label={
                <Avatar alt="user" img={currentUser.profilePicture} rounded />
              }
            >
              <Dropdown.Header>
                <span className="block text-sm">@{currentUser.username}</span>
                <span className="block text-sm font-medium truncate">
                  {currentUser.email}
                </span>
              </Dropdown.Header>
              <Link to={"/dashboard?tab=analytics"}>
                <Dropdown.Item>Dashboard</Dropdown.Item>
              </Link>
              <Link to={"/dashboard?tab=profile"}>
                <Dropdown.Item>Profile</Dropdown.Item>
              </Link>
              <Dropdown.Divider />
              <Dropdown.Item onClick={() => setShowSignoutModal(true)}>
                Sign out
              </Dropdown.Item>
            </Dropdown>
          ) : (
            <>
              <Link to="/register">
                <Button className="register-button">
                  Register
                </Button>
              </Link>
              <Link to="/sign-in">
                <Button className="signin-button">
                  Sign In
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </Navbar>
  );
}
