import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { signInSuccess, signInFailure } from "../redux/user/userSlice";
import "../styles/SignIn.css";

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const users = useSelector((state) => state.user.users);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.identifier || !formData.password) {
      setErrorMessage("Please fill all the fields!");
      return;
    }

    setLoading(true);
    setErrorMessage("");

    const user = users.find(
      (u) =>
        (u.email === formData.identifier || u.schoolId === formData.identifier) &&
        u.password === formData.password
    );

    setTimeout(() => {
      setLoading(false);
      if (user) {
        dispatch(signInSuccess(user));
        navigate("/main-page");
      } else {
        dispatch(signInFailure("Invalid email/School ID or password"));
        setErrorMessage("Oops! Check your details again.");
      }
    }, 1000);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
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
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="password-toggle"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
        <div className="button-container">
            <Button type="submit" disabled={loading} className="signin-button">
              {loading ? (
            <>
              <Spinner size="sm" />
                <span className="pl-3">Logging in...</span>
            </>
            ): (
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
