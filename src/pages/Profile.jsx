import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { signInSuccess } from "../redux/user/userSlice";
import { Link } from "react-router-dom";
import "../styles/Profile.css";

const Profile = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    // Force Redux to rehydrate from localStorage
    const savedUser = localStorage.getItem("userProfile");
    if (savedUser && !currentUser) {
      console.log("Rehydrating user from localStorage:", savedUser);
      dispatch(signInSuccess(JSON.parse(savedUser)));
    }
  }, [dispatch, currentUser]);

  if (!currentUser) {
    return <p>Please log in to view your profile.</p>;
  }

  return (
    <div className="profile-container">
      <h1 className="profile-title">
        Welcome, {currentUser.first_name || "User"}!
      </h1>
      <div className="profile-card">
        <div className="profile-image-section">
          <img
            src={currentUser.profileImage || "/images/default-avatar.png"}
            alt="Profile"
            className="profile-image"
          />
        </div>

        <div className="profile-info">
          <p><strong>First Name:</strong> {currentUser.first_name}</p>
          <p><strong>Last Name:</strong> {currentUser.last_name}</p>
          <p><strong>Email:</strong> {currentUser.email}</p>
          <p><strong>Role:</strong> {currentUser.role}</p>
          <p><strong>School ID:</strong> {currentUser.school_id}</p>
        </div>

        <Link to="/edit-profile" className="edit-profile-button">
          Edit Your Profile
        </Link>
      </div>
    </div>
  );
};

export default Profile;
