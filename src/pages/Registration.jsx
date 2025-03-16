import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import "../styles/Registration.css";

export default function Register() {
  const [formData, setFormData] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailRegex = /^[a-zA-Z0-9._%+-]+@cit\.edu$/; // Must be an institutional email
    const passwordRegex = /^(?=.*[0-9]).{8,}$/; // At least 8 characters and 1 number

    if (!formData.email || !formData.password || !formData.schoolId || !formData.username || !formData.role) {
      setErrorMessage("Please fill all the fields.");
      return;
    }

    if (!emailRegex.test(formData.email)) {
      setErrorMessage("Email must be in the format: example@cit.edu");
      return;
    }

    if (!passwordRegex.test(formData.password)) {
      setErrorMessage("Password must be at least 8 characters long and contain at least one number.");
      return;
    }

    setLoading(true);
    setErrorMessage("");

    try {
      // Check if the username, email, or school ID already exists
      const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/users/check-existence`, {
        params: { username: formData.username, email: formData.email, school_id: formData.schoolId },
      });

      if (data.exists) {
        setErrorMessage("Username, Email, or School ID is already registered.");
        setLoading(false);
        return;
      }

      // Proceed with registration
      const userData = {
        username: formData.username,
        password: formData.password,
        email: formData.email,
        role: formData.role,
        user_type: formData.role,
        first_name: formData.firstName,
        last_name: formData.lastName,
        school_id: formData.schoolId,
      };

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
          <Link to="/" className="register-logo">Math-hew</Link>
          <p className="register-subtext">Join the math adventure!</p>
        </div>
        <div className="register-form">
          <form className="form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div>
                <label htmlFor="schoolId">School ID</label>
                <input type="text" placeholder="00-1234-567" id="schoolId" value={formData.schoolId || ""} onChange={handleChange} />
              </div>
              <div>
                <label htmlFor="firstName">First Name</label>
                <input type="text" placeholder="First name" id="firstName" value={formData.firstName || ""} onChange={handleChange} />
              </div>
              <div>
                <label htmlFor="lastName">Last Name</label>
                <input type="text" placeholder="Last name" id="lastName" value={formData.lastName || ""} onChange={handleChange} />
              </div>
            </div>

            <div className="form-row">
              <div>
                <label htmlFor="username">Username</label>
                <input type="text" placeholder="Username" id="username" value={formData.username || ""} onChange={handleChange} />
              </div>
              <div>
                <label htmlFor="email">Institutional Email</label>
                <input type="email" placeholder="example@cit.edu" id="email" value={formData.email || ""} onChange={handleChange} />
              </div>
              <div>
                <label htmlFor="role">Role</label>
                <select id="role" value={formData.role || ""} onChange={handleChange}>
                  <option value="">Select Role</option>
                  <option value="student">Student</option>
                  <option value="teacher">Teacher</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="password-container">
                <label htmlFor="password">Password</label>
                <input id="password" type={showPassword ? "text" : "password"} placeholder="Password" value={formData.password || ""} onChange={handleChange} />
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} className="password-toggles" onClick={togglePasswordVisibility} />
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
