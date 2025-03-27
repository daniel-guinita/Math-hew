/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../redux/user/userSlice";
import axios from "axios";
import "../styles/SignIn.css";

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3000";

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!formData.identifier || !formData.password) {
      setErrorMessage("Please enter your Email or School ID and password.");
      return;
    }
  
    setLoading(true);
    setErrorMessage("");
  
    // Determine whether the identifier is an email or school ID
    const isEmail = formData.identifier.includes("@");
    const loginData = isEmail
      ? { email: formData.identifier, password: formData.password }
      : { school_id: formData.identifier, password: formData.password };
  
    try {
      const response = await axios.post(`${API_URL}/auth/login`, loginData);
      const { access_token, user } = response.data;
  
      localStorage.setItem("authToken", access_token);
      localStorage.setItem("role", user.role);
      localStorage.setItem("user", JSON.stringify(user));
  
      dispatch(signInSuccess(user));
  
      alert(`Welcome back, ${user.username}!`);
  
      if (user.role === "student") {
        navigate("/main-page");
      } else if (user.role === "teacher") {
        navigate("/TeacherAdminPage");
      } else if (user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/main-page");
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Invalid Email/School ID or password.");
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="signin-container">
      <div className="signin-card">
        <div className="signin-content">
          {/* Left Side - Image */}
          <div className="signin-image">
            <img src="/images/mathhew.png" alt="Mathhew" />
          </div>

          {/* Right Side - Form */}
          <div className="signin-form-container">
            <div className="signin-header">
              <div className="signin-logo">
                Welcome Back!
              </div>
              <p className="signin-subtext">Welcome back, future math genius!</p>
            </div>
            <form className="signin-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  id="identifier"
                  placeholder="Enter Email or School ID"
                  onChange={handleChange}
                  className="input-field"
                />
              </div>
              <div className="form-group relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  onChange={handleChange}
                  className="input-field"
                />
                <FontAwesomeIcon
                  icon={showPassword ? faEyeSlash : faEye}
                  className="password-toggles"
                  onClick={togglePasswordVisibility}
                />
              </div>
              <div className="button-container">
                <button type="submit" disabled={loading} className="signin-button">
                  {loading ? "Loading..." : "Start Learning"}
                </button>
              </div>
            </form>
            {errorMessage && <div className="error-message">{errorMessage}</div>}
            <p className="register-prompt">
              Not registered yet?&nbsp;
              <Link to="/register" className="register-link">
               {" "}Sign up!
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
