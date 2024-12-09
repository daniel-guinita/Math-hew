import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
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
  
    // Check for empty fields
    if (!formData.identifier || !formData.password) {
      setErrorMessage("Please fill in both email/School ID and password.");
      return;
    }
  
    setLoading(true);
    setErrorMessage("");
  
    const loginData = {
      email: formData.identifier,
      password: formData.password,
    };
  
    try {
      const response = await axios.post(`${API_URL}/auth/login`, loginData);
      const { access_token, user } = response.data;
  
      // Store token and user details in local storage
      localStorage.setItem("authToken", access_token);
      localStorage.setItem("role", user.role);
      localStorage.setItem("user", JSON.stringify(user));
      
      // Dispatch user info to Redux
      dispatch(signInSuccess(user));
      
      // Show a success alert
      alert(`Welcome back, ${user.username}!`);
  
      // Redirect based on role
      if (user.role === "student") {
        navigate("/main-page");
      } else if (user.role === "teacher") {
        navigate("/teacher-home");
      } else if (user.role === "admin") {
        navigate("/admin-home");
      }
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || "Invalid email/School ID or password"
      );
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
        <div className="signin-header">
          <Link to="/" className="signin-logo">Math-hew</Link>
          <p className="signin-subtext">
            Welcome back, future math genius!
          </p>
        </div>
        <div className="signin-form">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <Label htmlFor="identifier" value="Enter your email or School ID:" />
              <TextInput
                type="text"
                id="identifier"
                placeholder="Email or School ID"
                onChange={handleChange}
                className="input-field"
              />
            </div>
            <div className="form-group relative">
              <Label htmlFor="password" value="Password:" />
              <TextInput
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
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
              <Button type="submit" disabled={loading} className="signin-button">
                {loading ? <Spinner size="sm" /> : "Start Learning"}
              </Button>
            </div>
          </form>
          {errorMessage && (
            <Alert color="failure" className="error-message">
              {errorMessage}
            </Alert>
          )}
          <p className="register-prompt">
            Not registered yet?{" "}
            <Link to="/register" className="register-link">
              Click here to sign up!
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
