import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { signInSuccess, signInFailure } from "../redux/user/userSlice";
import '../styles/SignIn.css';

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
    if (!formData.email || !formData.password) {
      setErrorMessage("Please fill all the fields!");
      return;
    }
    setLoading(true);
    setErrorMessage("");

    const user = users.find(
      (u) => u.email === formData.email && u.password === formData.password
    );

    setTimeout(() => {
      setLoading(false);
      if (user) {
        dispatch(signInSuccess(user));
        navigate("/main-page");
      } else {
        dispatch(signInFailure("Invalid email or password"));
        setErrorMessage("Oops! Check your details again.");
      }
    }, 1000);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="signin-container" style={{ backgroundImage: 'url(/images/bg-stars.png)' }}>
      <div className="signin-card signin-card-row">
        <div className="signin-header">
          <Link to="/" className="font-bold dark:text-white text-4xl" style={{ color: '#FFA500' }}>
            🚀 Math-hew
          </Link>
          <p className="signin-subtext mt-5" style={{ fontSize: '1.2rem', color: '#ff6347' }}>
            Welcome back, future math genius!
          </p>
        </div>
        <div className="signin-form">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <Label htmlFor="email" value="Enter your email:" />
              <TextInput
                type="email"
                placeholder="name@mathworld.com"
                id="email"
                onChange={handleChange}
              />
            </div>
            <div className="flex-1">
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
                  style={{ color: '#FFA500' }}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>
            <Button
              className="signin-button"
              type="submit"
              disabled={loading}
              style={{ background: 'linear-gradient(to right, #ff7f50, #ff6347)', color: '#fff' }}
            >
              {loading ? (
                <>
                  <Spinner size="sm" />
                  <span className="pl-3">Logging in...</span>
                </>
              ) : (
                "Start Learning 🚀"
              )}
            </Button>
          </form>
          {errorMessage && (
            <Alert className="signin-alert" color="failure">
              {errorMessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}
