import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateSuccess } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom"; // Import the navigate function
import "../styles/EditProfile.css";

const EditProfile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    firstName: currentUser?.firstName || "",
    lastName: currentUser?.lastName || "",
    email: currentUser?.email || "",
    password: "",
    profileImage: currentUser?.profileImage || "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize the navigate function

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, profileImage: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Only include fields that are not empty in the updated data
    const updatedData = {};
    if (formData.firstName) updatedData.firstName = formData.firstName;
    if (formData.lastName) updatedData.lastName = formData.lastName;
    if (formData.email) updatedData.email = formData.email;
    if (formData.password) updatedData.password = formData.password;
    if (formData.profileImage) updatedData.profileImage = formData.profileImage;
  
    // Check if at least one field has been updated
    if (Object.keys(updatedData).length === 0) {
      alert("Please update at least one field!");
      return;
    }
  
    dispatch(updateSuccess({ ...currentUser, ...updatedData })); // Merge the current user data with the updated data
    alert("Profile updated successfully!");
    navigate("/profile"); // Redirect to the Profile page
  };
  

  return (
    <div className="edit-profile-container">
      <h1 className="edit-profile-title">🎨 Personalize Your Profile! 🎉</h1>
      <div className="edit-profile-card">
        {/* Profile Image Section */}
        <div className="profile-image-container">
          <img
            src={formData.profileImage || "/images/default-avatar.png"}
            alt="Profile"
            className="profile-image"
          />
          <label htmlFor="profileImage" className="profile-image-label">
            📸 Change Profile Pic
          </label>
          <input
            type="file"
            id="profileImage"
            accept="image/*"
            onChange={handleImageUpload}
            className="profile-image-input"
          />
        </div>

        {/* Form Section */}
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
            <label htmlFor="password">Password *</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter new password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          {/* Submit Button */}
          <button type="submit" className="edit-profile-button">
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
