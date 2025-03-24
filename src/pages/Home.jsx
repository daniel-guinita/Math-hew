import React from "react";
import { useInView } from "react-intersection-observer";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AboutUs from "./AboutUs";
import ContactUs from "./ContactUs";
import "../styles/Home.css";

const Home = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const navigate = useNavigate();

  const [homeRef, homeInView] = useInView({ triggerOnce: true, threshold: 0.3 });
  const [aboutRef, aboutInView] = useInView({ triggerOnce: true, threshold: 0.3 });
  const [contactRef, contactInView] = useInView({ triggerOnce: true, threshold: 0.3 });

  const handleStartLearningClick = () => {
    if (currentUser) {
      navigate("/main-page");
    } else {
      navigate("/sign-in");
    }
  };

  return (
    <div className="home-container">
      {/* Home Section */}
      <section ref={homeRef} className={`section home-section ${homeInView ? "fade-in" : ""}`}>
        <div className="home-content">
          <div className="home-logo">
            <img
              src="/images/mathhew.png"
              alt="Math-hew Mascot waving"
              className="mascot-img"
            />
          </div>
          <div className="home-text">
            <h1 className="home-title">Welcome to Math-hew!</h1>
            <p className="home-description">
              Ready to explore the amazing world of 4th Grade Mathematics?
            </p>
            <button
              className={`learn-button ${!currentUser ? "disabled" : ""}`}
              onClick={handleStartLearningClick}
            >
              Start Learning Now!
            </button>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section ref={aboutRef} className={`section about-section ${aboutInView ? "fade-in" : ""}`}>
        <AboutUs />
      </section>

      {/* Contact Us Section */}
      <section ref={contactRef} className={`section contact-section ${contactInView ? "fade-in" : ""}`}>
        <ContactUs />
      </section>
    </div>
  );
};

export default Home;