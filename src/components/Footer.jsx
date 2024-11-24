import { Footer as FlowbiteFooter } from "flowbite-react";
import { Link } from "react-router-dom";
import {
  BsFacebook,
  BsInstagram,
  BsTwitter,
  BsGithub,
  BsDribbble,
} from "react-icons/bs";
import "../styles/Footer.css";

export default function FooterComponent() {
  return (
    <FlowbiteFooter container className="footer-container">
      <div className="footer-wrapper">
        {/* Logo and Slogan */}
        <div className="footer-top">
          <div className="footer-logo-container">
            <Link to="/" className="flex items-center">
              <img
                src="/images/icon.png"
                className="footer-logo-img"
                alt="Math-hew Logo"
              />
              <span className="footer-logo-text">Math-hew</span>
            </Link>
            <p className="footer-slogan">
              🎉 Empowering Young Minds with Fun Math Adventures! 🚀
            </p>
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-grid">
          <div className="footer-link-column">
            <FlowbiteFooter.Title
              title="Resources"
              className="footer-link-title"
            />
            <FlowbiteFooter.LinkGroup col>
              <Link to="/faq" className="footer-link">
                FAQ
              </Link>
              <Link to="/tutorials" className="footer-link">
                Tutorials
              </Link>
              <Link to="/leaderboard" className="footer-link">
                Leaderboard
              </Link>
              <Link to="/games" className="footer-link">
                Math Games
              </Link>
            </FlowbiteFooter.LinkGroup>
          </div>
          <div className="footer-link-column">
            <FlowbiteFooter.Title
              title="Support"
              className="footer-link-title"
            />
            <FlowbiteFooter.LinkGroup col>
              <Link to="/help" className="footer-link">
                Help Center
              </Link>
              <Link to="/privacy-policy" className="footer-link">
                Privacy Policy
              </Link>
              <Link to="/terms" className="footer-link">
                Terms & Conditions
              </Link>
            </FlowbiteFooter.LinkGroup>
          </div>
        </div>

        {/* Social Icons */}
        <div className="footer-social-icons">
          <a href="#" className="social-icon">
            <BsFacebook />
          </a>
          <a href="#" className="social-icon">
            <BsInstagram />
          </a>
          <a href="#" className="social-icon">
            <BsTwitter />
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon"
          >
            <BsGithub />
          </a>
          <a href="#" className="social-icon">
            <BsDribbble />
          </a>
        </div>

        {/* Divider */}
        <FlowbiteFooter.Divider className="footer-divider" />

        {/* Bottom Section */}
        <div className="footer-bottom">
          <FlowbiteFooter.Copyright
            href="#"
            by="Math-hew"
            year={new Date().getFullYear()}
          />
          <p className="footer-credits">✨ Designed with Love for 4th Graders! ✨</p>
        </div>
      </div>
    </FlowbiteFooter>
  );
}
