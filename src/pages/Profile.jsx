import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { signInSuccess } from "../redux/user/userSlice";
import { Link } from "react-router-dom";
import axios from "axios";
import "../styles/Profile.css";

const Profile = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const [user, setUser] = useState(currentUser || null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const authToken = localStorage.getItem("authToken");
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/users/${currentUser?.id}`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });

        if (response.data) {
          dispatch(signInSuccess(response.data)); // Update Redux state
          setUser(response.data); // Update component state
          localStorage.setItem("userProfile", JSON.stringify(response.data)); // Persist latest data
        }
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };

    fetchUser(); // Fetch fresh user data when the component loads
  }, [dispatch, currentUser?.id]);

  if (!user) {
    return <p>Please log in to view your profile.</p>;
  }

  return (
    <div className="profile-container">
      <h1 className="profile-title">Welcome, {user.first_name || "User"}!</h1>
      <div className="profile-card">
        <div className="profile-image-section">
          <img src={user.profileImage || "/images/default-avatar.png"} alt="Profile" className="profile-image" />
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
