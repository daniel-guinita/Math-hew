import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "../styles/Login.css";

export default function Login() {
  const [formData, setFormData] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setErrorMessage("Please fill all the fields");
      return;
    }
    setLoading(true);
    setErrorMessage("");

    setTimeout(() => {
      setLoading(false);
      setErrorMessage("");
      navigate("/main-page"); // Redirect to the desired page after login
    }, 1000);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-container">
      <div className="login-card login-card-row">
        {/* Left */}
        <div className="login-header login-header-dark">
          <Link to="/" className="dark:text-white">
            Math-hew
          </Link>
          <p className="login-subtext">
            Log in with your account credentials!
          </p>
        </div>

        {/* Right */}
        <div className="login-form">
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
            <div className="flex-1">
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
            </div>
            <Button
              gradientDuoTone="purpleToPink"
              type="submit"
              disabled={loading}
              className="login-button"
            >
              {loading ? (
                <>
                  <Spinner size="sm" />
                  <span className="pl-3">Loading...</span>
                </>
              ) : (
                "login"
              )}
            </Button>
          </form>
          {errorMessage && (
            <Alert className="login-alert" color="failure">
              {errorMessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}
