import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { signInSuccess, signInFailure } from "../redux/user/userSlice";
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

    const emailRegex = /^[a-zA-Z0-9._%+-]+@cit\.edu$/; // Only emails ending with @cit.edu
    const schoolIdRegex = /^\d{2}-\d{4}-\d{3}$/; // Format: XX-XXXX-XXX

    if (!formData.identifier || !formData.password) {
        setErrorMessage("Please fill all the fields!");
        return;
    }

    if (
        !emailRegex.test(formData.identifier) &&
        !schoolIdRegex.test(formData.identifier)
    ) {
        setErrorMessage(
            "Identifier must be a valid email (example@cit.edu) or School ID (XX-XXXX-XXX)"
        );
        return;
    }

    setLoading(true);
    setErrorMessage("");

    const loginData = {
        email: formData.identifier,
        password: formData.password,
    };

    try {
        // Ensure the URL is wrapped in backticks
        const response = await axios.post(`${API_URL}/users/signin`, loginData);
        const { token, ...user } = response.data;

        localStorage.setItem("authToken", token);
        dispatch(signInSuccess(user));

        alert("Login successful! Welcome back!");

        navigate("/main-page");
    } catch (error) {
        console.error("Sign-in error:", error.response?.data || error.message);
        setErrorMessage(
            error.response?.data?.message || "Invalid email/School ID or password"
        );
        dispatch(signInFailure("Invalid email/School ID or password"));
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
          <Link to="/" className="signin-logo">🚀 Math-hew</Link>
          <p className="signin-subtext">Welcome back, future math genius!</p>
        </div>
        <div className="signin-form">
          <form className="form" onSubmit={handleSubmit}>
            <div>
              <Label htmlFor="identifier" value="Enter your email or School ID:" />
              <TextInput
                type="text"
                placeholder="Email or School ID"
                id="identifier"
                onChange={handleChange}
              />
            </div>
            <div className="relative">
              <Label htmlFor="password" value="Your secret password:" />
              <TextInput
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                onChange={handleChange}
              />
            
            </div>
            <div className="button-container">
              <Button type="submit" disabled={loading} className="signin-button">
                {loading ? (
                  <>  
                    <Spinner size="sm" />
                    <span className="pl-3">Logging in...</span>
                  </>
                ) : (
                  "Start Learning 🚀"
                )}
              </Button>
            </div>
          </form>
          {errorMessage && (
            <div className="error-container">
              <Alert color="failure">
                {errorMessage}
              </Alert>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}