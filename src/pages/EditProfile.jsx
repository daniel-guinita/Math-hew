import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateSuccess } from "../redux/user/userSlice";
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
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
      alert("Please fill in all fields!");
      return;
    }
    dispatch(updateSuccess(formData));
    alert("Profile updated successfully!");
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
