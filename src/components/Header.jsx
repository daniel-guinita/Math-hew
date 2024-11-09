import { Avatar, Button, Dropdown, Navbar } from "flowbite-react";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { signoutSuccess } from "../redux/user/userSlice";

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
    <Navbar className="border-b-2">
      <div className="flex justify-between items-center w-full px-4 max-w-7xl mx-auto">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img
            src="/images/icon.png"
            className="mr-2 h-6 sm:h-9"
            alt="Math-hew Logo"
          />
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            Math-hew
          </span>
        </Link>

        {/* Centered Navigation Links */}
        <div className="flex space-x-8">
          <Link
            to="/"
            className={`text-lg font-medium ${
              path === "/" ? "text-white" : "text-gray-400"
            } hover:text-white`}
          >
            Home
          </Link>
          <Link
            to="/about-us"
            className={`text-lg font-medium ${
              path === "/about-us" ? "text-white" : "text-gray-400"
            } hover:text-white`}
          >
            About Us
          </Link>
          <Link
            to="/features"
            className={`text-lg font-medium ${
              path === "/features" ? "text-white" : "text-gray-400"
            } hover:text-white`}
          >
            Features
          </Link>
          <Link
            to="/contact-us"
            className={`text-lg font-medium ${
              path === "/contact-us" ? "text-white" : "text-gray-400"
            } hover:text-white`}
          >
            Contact Us
          </Link>
        </div>

        {/* User Account Dropdown */}
        <div className="flex items-center gap-2">
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
            <Link to="/sign-in">
              <Button gradientMonochrome="failure" outline>
                Sign In
              </Button>
            </Link>
          )}
        </div>
      </div>
    </Navbar>
  );
}
