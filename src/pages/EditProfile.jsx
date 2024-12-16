import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateStart, updateSuccess, updateFailure } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/EditProfile.css";

const EditProfile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    firstName: currentUser?.first_name || "",
    lastName: currentUser?.last_name || "",
    email: currentUser?.email || "",
    password: "",
    profileImage: currentUser?.profileImage || "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Handle text input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, profileImage: reader.result }); // Store Base64 image in formData
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(updateStart());
  
    try {
      const updatedData = {
        first_name: formData.firstName || currentUser.first_name,
        last_name: formData.lastName || currentUser.last_name,
        email: formData.email || currentUser.email,
        profileImage: formData.profileImage || currentUser.profileImage,
        ...(formData.password && { password: formData.password }),
      };
  
      // Send update to backend
      const response = await axios.patch(
        `${process.env.REACT_APP_API_URL}/users/${currentUser.id}`,
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken") || currentUser.token}`,
          },
        }
      );
  
      // Update Redux and localStorage
      const updatedUser = response.data;
      dispatch(updateSuccess(updatedUser));
      localStorage.setItem("userProfile", JSON.stringify(updatedUser));
      alert("Profile updated successfully!");
      navigate("/profile");
    } catch (error) {
      console.error("Error updating profile:", error);
      dispatch(updateFailure(error.response?.data?.message || "Failed to update profile"));
      alert("Failed to update profile. Please try again later.");
    }
  };
  
  
  return (
    <div className="edit-profile-container">
      <h1 className="edit-profile-title">🎨 Edit Your Profile</h1>
      <div className="edit-profile-card">
        <div className="profile-image-container">
          <img
            src={formData.profileImage || "/images/default-avatar.png"}
            alt="Profile"
            className="profile-image"
          />
          <label htmlFor="profileImage" className="profile-image-label">
            📸 Change Profile Picture
          </label>
          <input
            type="file"
            id="profileImage"
            accept="image/*"
            onChange={handleImageUpload}
            className="profile-image-input"
          />
        </div>
        <form onSubmit={handleSubmit} className="edit-profile-form">
          <div className="form-group">
            <label htmlFor="firstName">First Name *</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Last Name *</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Leave blank to keep current password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="edit-profile-button">
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
