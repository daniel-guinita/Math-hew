import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "../styles/Registration.css"; // Import separate CSS file

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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password || !formData.confirmPassword) {
      setErrorMessage("Please fill all the fields");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }


    setLoading(true);
    setErrorMessage("");

    // Simulate registration process
    setTimeout(() => {
      setLoading(false);
      navigate("/main-page"); // Redirect after successful registration
    }, 1000);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };


  return (
    <div className="register-container">
      <div className="register-card register-card-row">
        {/* Left */}
        <div className="register-header register-header-dark">
          <Link to="/" className="dark:text-white">
            Math-hew
          </Link>
          <p className="register-subtext">
            Create a new account!
          </p>
        </div>

        {/* Right */}
        <div className="register-form">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <Label htmlFor="email" value="Your email" />
              <TextInput
                type="email"
                placeholder="name@company.com"
                id="email"
                onChange={handleChange}
              />
            </div>
            <div className="relative">
              <Label htmlFor="password" value="Your password" />
              <TextInput
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="**********"
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
              <Label htmlFor="confirmPassword" value="Confirm Password" />
              <TextInput
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="**********"
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


            <Button
              gradientDuoTone="purpleToPink"
              type="submit"
              disabled={loading}
              className="register-button"
            >
              {loading ? (
                <>
                  <Spinner size="sm" />
                  <span className="pl-3">Loading...</span>
                </>
              ) : (
                "Register"
              )}
            </Button>
          </form>
          {errorMessage && (
            <Alert className="register-alert" color="failure">
              {errorMessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}