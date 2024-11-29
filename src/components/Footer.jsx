import { Footer as FlowbiteFooter } from "flowbite-react";
import { Link } from "react-router-dom";
import {
  BsFacebook,
  BsInstagram,
  BsTwitter,
  BsGithub,
  BsDribbble,
} from "react-icons/bs";
import '../styles/Footer.css';

export default function FooterComponent() {
  return (
    <FlowbiteFooter container className="footer-container">
      <div className="footer-wrapper">
        <div className="footer-grid">
          <div className="footer-logo-container">
            <Link to="/" className="flex items-center">
              <img
                src="/images/icon.png"
                className="footer-logo-img"
                alt="Math-hew Logo"
              />
              <span className="footer-logo-text">
                Math-hew
              </span>
            </Link>
          </div>
          <div className="footer-link-grid">
            <div className="footer-link-column">
              <FlowbiteFooter.Title title="About" className="footer-link-title" />
              <FlowbiteFooter.LinkGroup col>
                <FlowbiteFooter.Link
                  href="/about-us"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Capstone 1 Project
                </FlowbiteFooter.Link>
                <FlowbiteFooter.Link
                  href="https://github.com/daniel-guinita/Math-hew"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Group 06
                </FlowbiteFooter.Link>
              </FlowbiteFooter.LinkGroup>
            </div>
            <div className="footer-link-column">
              <FlowbiteFooter.Title title="Follow us" className="footer-link-title" />
              <FlowbiteFooter.LinkGroup col>
                <FlowbiteFooter.Link
                  href="https://github.com/daniel-guinita/Math-hew"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Github
                </FlowbiteFooter.Link>
                <FlowbiteFooter.Link href="#">Discord</FlowbiteFooter.Link>
              </FlowbiteFooter.LinkGroup>
            </div>
            <div className="footer-link-column">
              <FlowbiteFooter.Title title="Legal" className="footer-link-title" />
              <FlowbiteFooter.LinkGroup col>
                <FlowbiteFooter.Link href="#">Privacy Policy</FlowbiteFooter.Link>
                <FlowbiteFooter.Link href="#">Terms &amp; Conditions</FlowbiteFooter.Link>
              </FlowbiteFooter.LinkGroup>
            </div>
          </div>
        </div>
        <FlowbiteFooter.Divider className="footer-divider" />
        <div className="footer-bottom">
          <FlowbiteFooter.Copyright
            href="#"
            by=" Math-hew"
            year={new Date().getFullYear()}
          />
          <div className="footer-social-icons">
            <FlowbiteFooter.Icon href="#" icon={BsFacebook} />
            <FlowbiteFooter.Icon href="#" icon={BsInstagram} />
            <FlowbiteFooter.Icon href="#" icon={BsTwitter} />
            <FlowbiteFooter.Icon
              href="https://github.com"
              icon={BsGithub}
            />
            <FlowbiteFooter.Icon href="#" icon={BsDribbble} />
          </div>
        </div>
      </div>
    </FlowbiteFooter>
  );
}
