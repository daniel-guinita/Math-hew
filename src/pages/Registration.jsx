import { Alert, Button, Label, Spinner, TextInput, Select } from "flowbite-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addUserSuccess } from "../redux/user/userSlice";
import "../styles/Registration.css";

export default function Register() {
  const [formData, setFormData] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleRoleChange = (e) => {
    setFormData({ ...formData, role: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

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

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    setLoading(true);
    setErrorMessage("");

    const { email, password, role, schoolId } = formData;

    const newUser = {
      email,
      password,
      schoolId,
      name: formData.name || "User",
      role,
    };

    setTimeout(() => {
      dispatch(addUserSuccess(newUser));
      alert("Registration successful! 🎉");
      navigate("/sign-in");
    }, 1000);
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword(!showConfirmPassword);

  return (
    <div className="register-container">
      <div className="register-card">
        <div className="register-header">
          <Link to="/" className="register-logo">🐉 Math-hew</Link>
          <p className="register-subtext">Join the math adventure!</p>
        </div>
        <div className="register-form">
          <form className="form" onSubmit={handleSubmit}>
            <div>
              <Label htmlFor="schoolId" value="Your School ID:" />
              <TextInput
                type="text"
                placeholder="Enter your School ID"
                id="schoolId"
                onChange={handleChange}
              />
            </div>
            <div>
              <Label htmlFor="email" value="Your Email Address:" />
              <TextInput
                type="email"
                placeholder="superkid@mathworld.com"
                id="email"
                onChange={handleChange}
              />
            </div>
            <div className="relative">
              <Label htmlFor="password" value="Create Your Password:" />
              <TextInput
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                onChange={handleChange}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="password-toggle"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            <div className="relative">
              <Label htmlFor="confirmPassword" value="Confirm Your Password:" />
              <TextInput
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="••••••••"
                onChange={handleChange}
              />
              <button
                type="button"
                onClick={toggleConfirmPasswordVisibility}
                className="password-toggle"
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            <div>
              <Label htmlFor="role" value="Select Your Role:" />
              <Select id="role" onChange={handleRoleChange}>
                <option value="">Select Role</option>
                <option value="student">Student</option>
                <option value="teacher">Teacher</option>
                <option value="admin">Admin</option>
              </Select>
            </div>
        <div className="button-container">
            <Button type="submit" disabled={loading} className="register-button">
                {loading ? (
              <>
                <Spinner size="sm" />
                  <span className="pl-3">Registering...</span>
              </>
              ) : (
                  "Register Now 🎓"
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
