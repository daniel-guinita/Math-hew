import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "../styles/Profile.css";

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);

  if (!currentUser) {
    return <p>Please log in to view your profile.</p>;
  }

  return (
    <div className="profile-container">
      <h1 className="profile-title">Welcome, {currentUser.first_Name || "User"}! 👨‍🎓</h1>
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
