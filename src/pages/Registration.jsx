import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Registration.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function Register() {
  const [formData, setFormData] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;

    // Automatically set role based on schoolId
    if (id === "schoolId") {
      let role = "";
      if (/^\d{2}-\d{4}-\d{3}$/.test(value)) {
        role = "Student";
      } else if (/^\d{4}$/.test(value)) {
        role = "Teacher";
      } else if (/^\d{5}$/.test(value)) {
        role = "Admin";
      }

      setFormData({ ...formData, [id]: value.trim(), role });
    } else {
      setFormData({ ...formData, [id]: value.trim() });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailRegex = /^[a-zA-Z0-9._%+-]+@cit\.edu$/; // Only emails ending with @cit.edu
    if (!formData.email || !formData.password || !formData.schoolId) {
      setErrorMessage("Please fill all the fields.");
      return;
    }

    if (!emailRegex.test(formData.email)) {
      setErrorMessage("Email must be in the format: example@cit.edu");
      return;
    }

    setLoading(true);
    setErrorMessage("");

    const userData = {
      username: formData.username,
      password: formData.password,
      email: formData.email,
      role: formData.role, // Assign role dynamically
      user_type: formData.role, // Set user_type to match role
      first_name: formData.firstName,
      last_name: formData.lastName,
      school_id: formData.schoolId,
    };

    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/users/register`, userData);
      alert("Registration successful!");
      navigate("/sign-in");
    } catch (error) {
      setErrorMessage("Registration failed. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <div className="register-container">
      <div className="register-card">
        <div className="register-header">
          <Link to="/" className="register-logo">
            Math-hew
          </Link>
          <p className="register-subtext">Join the math adventure!</p>
        </div>
        <div className="register-form">
          <form className="form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div>
                <label htmlFor="schoolId">School ID</label>
                <input
                  type="text"
                  placeholder="00-1234-567"
                  id="schoolId"
                  value={formData.schoolId || ""}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  placeholder="First name"
                  id="firstName"
                  value={formData.firstName || ""}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  placeholder="Last name"
                  id="lastName"
                  value={formData.lastName || ""}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-row">
              <div>
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  placeholder="Username!"
                  id="username"
                  value={formData.username || ""}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="email">Institutional Email</label>
                <input
                  type="email"
                  placeholder="example@cit.edu"
                  id="email"
                  value={formData.email || ""}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="role">Role</label>
                <input
                  type="text"
                  id="role"
                  value={formData.role || "Automatically determined by School ID"}
                  readOnly
                  disabled
                />
              </div>
            </div>

            <div className="form-row">
              <div className="password-container">
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={formData.password || ""}
                  onChange={handleChange}
                />
                <div className="password-toggle" onClick={togglePasswordVisibility}>
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </div>
              </div>
            </div>

            <div className="button-container">
              <button type="submit" disabled={loading} className="register-button">
                {loading ? "Registering..." : "Join Now!"}
              </button>
            </div>
          </form>
          {errorMessage && <div className="error-container">{errorMessage}</div>}
          <p className="signin-prompt">
            Already have an account? <Link to="/sign-in" className="signin-link">Click here to Sign In!</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
