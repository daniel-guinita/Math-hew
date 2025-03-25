import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "../styles/Footer.css"; // Keep styles applied

export default function FooterComponent() {
  const currentUser = useSelector((state) => state.user.currentUser);
  const navigate = useNavigate();

  const handleProtectedLinkClick = (path) => {
    if (currentUser) {
      navigate(path);
    } else {
      alert("Please log in to access this feature!");
    }
  };

  return (
    <footer className="footer-container">
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

        {/* Quick Links */}
        <div className="footer-links-section">
          <h3 className="footer-title">Quick Links</h3>
          <ul className="footer-links">
            <li>
              <button
                className="footer-link-button"
                onClick={() => handleProtectedLinkClick("/math-memory-game")}
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
                onClick={() => handleProtectedLinkClick("/math-speedy-quiz")}
              >
                Quizzes
              </button>
            </li>
          </ul>
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
    </footer>
  );
}
