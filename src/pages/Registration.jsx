import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
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

    const newUser = {
      email: formData.email,
      password: formData.password,
      name: formData.name || "User",
    };

    setTimeout(() => {
      setLoading(false);
      dispatch(addUserSuccess(newUser));
      navigate("/sign-in");
    }, 1000);
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword(!showConfirmPassword);

  return (
    <div className="register-container" style={{ backgroundImage: 'url(/images/bg-clouds.png)' }}>
      <div className="register-card register-card-row">
        <div className="register-header register-header-dark">
          <Link to="/" className="dark:text-white" style={{ color: '#4CAF50' }}>
            🌈 Math-hew
          </Link>
          <p className="register-subtext" style={{ fontSize: '1.2rem', color: '#32CD32' }}>
            Join the fun and start your math adventure!
          </p>
        </div>
        <div className="register-form">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <Label htmlFor="email" value="Your email address:" />
              <TextInput
                type="email"
                placeholder="superkid@mathworld.com"
                id="email"
                onChange={handleChange}
              />
            </div>
            <div className="relative">
              <Label htmlFor="password" value="Create your password:" />
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
                style={{ color: '#4CAF50' }}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            <div className="relative">
              <Label htmlFor="confirmPassword" value="Confirm your password:" />
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
                style={{ color: '#4CAF50' }}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <Button
              type="submit"
              disabled={loading}
              style={{ background: 'linear-gradient(to right, #32CD32, #4CAF50)', color: '#fff' }}
            >
              {loading ? (
                <>
                  <Spinner size="sm" />
                  <span className="pl-3">Registering...</span>
                </>
              ) : (
                "Let's Go! 🌟"
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