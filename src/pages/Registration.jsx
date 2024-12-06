import { Alert, Button, Label, Spinner, TextInput, Select } from "flowbite-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from 'axios';
import "../styles/Registration.css";

export default function Register() {
  const [formData, setFormData] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleRoleChange = (e) => {
    setFormData({ ...formData, role: e.target.value });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const emailRegex = /^[a-zA-Z0-9._%+-]+@cit\.edu$/; // Only emails ending with @cit.edu
    const schoolIdRegex = /^\d{2}-\d{4}-\d{3}$/; // Format: XX-XXXX-XXX
  
    if (
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword ||
      !formData.role ||
      !formData.schoolId
    ) {
      setErrorMessage("Please fill all the fields, including School ID and role.");
      return;
    }
  
    if (!emailRegex.test(formData.email)) {
      setErrorMessage("Email must be in the format: example@cit.edu");
      return;
    }
  
    if (!schoolIdRegex.test(formData.schoolId)) {
      setErrorMessage("School ID must be in the format: XX-XXXX-XXX");
      return;
    }
  
    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }
  
    setLoading(true);
    setErrorMessage("");
  
    const userData = {
      username: formData.username,
      password: formData.password,
      email: formData.email,
      user_type: "student",
      first_name: formData.firstName,
      last_name: formData.lastName,
      school_id: formData.schoolId,
      role: formData.role,
    };
  
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/users/register`, userData);
      alert("Registration successful!");
      navigate('/sign-in');
    } catch (error) {
      setErrorMessage("Registration failed. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword(!showConfirmPassword);

  return (
    <div className="register-container">
    <div className="register-card">
      <div className="register-header">
        <Link to="/" className="register-logo">🐉 Math-hew</Link>
        <p className="register-subtext">Join the math adventure! 🚀</p>
      </div>
      <div className="register-form">
        <form className="form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div>
              <Label htmlFor="schoolId" value="School ID 📘:" />
              <TextInput
                type="text"
                placeholder="00-1234-567"
                id="schoolId"
                value={formData.schoolId || ""}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label htmlFor="firstName" value="First Name 🧒:" />
              <TextInput
                type="text"
                placeholder="Your first name"
                id="firstName"
                value={formData.firstName || ""}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label htmlFor="lastName" value="Last Name 👧:" />
              <TextInput
                type="text"
                placeholder="Your last name"
                id="lastName"
                value={formData.lastName || ""}
                onChange={handleChange}
              />
            </div>
          </div>
  
          <div className="form-row">
            <div>
              <Label htmlFor="username" value="Username 🎮:" />
              <TextInput
                type="text"
                placeholder="Pick a fun username!"
                id="username"
                value={formData.username || ""}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label htmlFor="email" value="Institutional Email ✉️:" />
              <TextInput
                type="email"
                placeholder="example@cit.edu"
                id="email"
                value={formData.email || ""}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label htmlFor="role" value="Role 📋:" />
              <Select id="role" onChange={handleRoleChange}>
                <option value="">Select Role</option>
                <option value="student">Student</option>
                <option value="teacher">Teacher</option>
                <option value="teacher">Admin</option>
              </Select>
            </div>
          </div>
  
          <div className="form-row">
            <div>
              <Label htmlFor="password" value="Password 🔒:" />
              <TextInput
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Create a secret password"
                onChange={handleChange}
              />
            </div>
            <div>
              <Label htmlFor="confirmPassword" value="Confirm Password 🔑:" />
              <TextInput
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Retype your password"
                onChange={handleChange}
              />
            </div>
          </div>
  
          <div className="button-container">
            <Button type="submit" disabled={loading} className="register-button">
              {loading ? (
                <>
                  <Spinner size="sm" />
                  <span className="pl-3">Registering...</span>
                </>
              ) : (
                "Join Now! 🌟"
              )}
            </Button>
          </div>
        </form>
        {errorMessage && (
          <div className="error-container">
            <Alert color="failure">{errorMessage}</Alert>
          </div>
        )}
      </div>
    </div>
  </div>
  
  );
}