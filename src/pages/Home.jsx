import React from "react";
import { useInView } from "react-intersection-observer";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import '../styles/Home.css';

const Home = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const navigate = useNavigate();

  // Intersection Observer hook for the home section
  const [homeRef, homeInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const handleStartLearningClick = () => {
    if (currentUser) {
      navigate("/main-page"); // Navigate to the main page for logged-in users
    } else {
      alert("Please log in to start learning!");
    }
  };

  return (
    <div className="home-container">
      {/* Home Section */}
      <section ref={homeRef} className={`section home-section ${homeInView}`}>
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
    </div>
  );
};

export default Home;
