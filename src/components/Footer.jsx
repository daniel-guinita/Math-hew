import { Footer as FlowbiteFooter } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "../styles/Footer.css";

export default function FooterComponent() {
  const currentUser = useSelector((state) => state.user.currentUser);
  const navigate = useNavigate();

  const handleProtectedLinkClick = (path) => {
    if (currentUser) {
      navigate(path); // Navigate if logged in
    } else {
      alert("Please log in to access this feature!");
    }
  };

  const randomFact = "Did you know? A honeybee’s hive is built using hexagons because they’re the most efficient shape!";
  const randomJoke = "Why was the math book sad? It had too many problems!";

  return (
    <FlowbiteFooter container className="footer-container">
      <div className="footer-content">
        {/* Logo and Slogan */}
        <div className="footer-logo-section">
          <Link to="/" className="footer-logo-link">
            <img
              src="/images/icon.png"
              className="footer-logo-img"
              alt="Math-hew Logo"
            />
            <span className="footer-logo-text">Math-hew</span>
          </Link>
          <p className="footer-slogan">Learning Math is Fun with Math-hew!</p>
        </div>

        {/* Links */}
        <div className="footer-links-section">
          <h3 className="footer-title">Quick Links</h3>
          <ul className="footer-links">
            <li>
              <button
                className="footer-link-button"
                onClick={() => handleProtectedLinkClick("/games")}
              >
                Math Games
              </button>
            </li>
            <li>
              <button
                className="footer-link-button"
                onClick={() => handleProtectedLinkClick("/leaderboard")}
              >
                Leaderboard
              </button>
            </li>
            <li>
              <button
                className="footer-link-button"
                onClick={() => handleProtectedLinkClick("/quizzes")}
              >
                Quizzes
              </button>
            </li>
          </ul>
        </div>

        {/* Fun Section */}
        <div className="footer-fun-section">
          <h3 className="footer-title">Fun with Math</h3>
          <p className="footer-fact">{randomFact}</p>
          <p className="footer-joke">{randomJoke}</p>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="footer-bottom">
        <p className="footer-cta">
          Ready to explore more?{" "}
          <span
            className="footer-link-highlight"
            onClick={() => handleProtectedLinkClick("/games")}
          >
            Play a Game Now!
          </span>
        </p>
        <p className="footer-copyright">
          © {new Date().getFullYear()} Math-hew. All rights reserved.
        </p>
      </div>
    </FlowbiteFooter>
  );
}
