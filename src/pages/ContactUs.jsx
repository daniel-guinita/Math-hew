import React from "react";
import {
  FaPhone,
  FaEnvelope,
  FaFacebook,
  FaLinkedin,
  FaInstagram,
  FaXTwitter,
} from "react-icons/fa6";
import "../styles/ContactUs.css";

const ContactUs = () => {
  return (
    <div className="contact-us-container">
      <div className="contact-us-content">
        {/* Left Section: Contact Us */}
        <div className="contact-us-card">
          <h1 className="contact-us-title">Get in Touch with Math-hew!</h1>
          <p className="contact-us-subtitle">
            We’re here to support you every step of the way. Reach out or connect
            with us on social media!
          </p>
          <div className="contact-info">
            <div className="contact-info-item">
              <FaEnvelope className="contact-icon" />
              <a href="mailto:mathhew.citu@gmail.com" className="contact-text">
                mathhew.citu@gmail.com
              </a>
            </div>
            <div className="contact-info-item">
              <FaPhone className="contact-icon" />
              <a href="tel:+1234567890" className="contact-text">
                09090909090
              </a>
            </div>
          </div>
          <div className="social-media">
            <h2>Follow Us on Social Media</h2>
            <div className="social-icons">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon facebook"
              >
                <FaFacebook />
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon twitter"
              >
                <FaXTwitter />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon linkedin"
              >
                <FaLinkedin />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon instagram"
              >
                <FaInstagram />
              </a>
            </div>
          </div>
        </div>

        {/* Right Section: FAQ */}
        <div className="faq-card">
          <h2 className="faq-title">Frequently Asked Questions</h2>
          <div className="faq-item">
            <h3 className="faq-question">
              How does Math-hew help students improve their math skills?
            </h3>
            <p className="faq-answer">
              By using challenges and guided tutorials, Math-hew makes learning
              fun and interactive.
            </p>
          </div>
          <div className="faq-item">
            <h3 className="faq-question">
              Can parents track student progress?
            </h3>
            <p className="faq-answer">
              Yes! Math-hew includes progress tracking with visual reports to
              celebrate achievements.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;