import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { signInSuccess } from "../redux/user/userSlice";
import { Link } from "react-router-dom";
import "../styles/Profile.css";

const Profile = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const [user, setUser] = useState(currentUser || JSON.parse(localStorage.getItem("userProfile")));

  useEffect(() => {
    const savedUser = localStorage.getItem("userProfile");
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      dispatch(signInSuccess(parsedUser)); // Update Redux state
      setUser(parsedUser); // Update component state
    }
  }, [dispatch]);
  

  if (!user) {
    return <p>Please log in to view your profile.</p>;
  }

  return (
    <div className="profile-container">
      <h1 className="profile-title">Welcome, {user.first_name || "User"}!</h1>
      <div className="profile-card">
        <div className="profile-image-section">
          <img
            src={user.profileImage || "/images/default-avatar.png"}
            alt="Profile"
            className="profile-image"
          />
        </div>
        <div className="profile-info">
          <p><strong>First Name:</strong> {user.first_name}</p>
          <p><strong>Last Name:</strong> {user.last_name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Role:</strong> {user.role}</p>
          <p><strong>School ID:</strong> {user.school_id}</p>
        </div>
        <Link to="/edit-profile" className="edit-profile-button">Edit Your Profile</Link>
      </div>
    </div>
  );
};

export default Profile;
