import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import '../styles/Home.css';

const Home = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const navigate = useNavigate();

  const handleStartLearningClick = () => {
    if (currentUser) {
      navigate("/main-page"); // Navigate to the main page for logged-in users
    } else {
      alert("Please log in to start learning!");
    }
  };

  return (
    <div className="home-container">
      <div className="home-content">
        {/* Text Section */}
        <div className="home-text">
          <h1 className="home-title">🎉 Welcome to Math-hew! 🎉</h1>
          <p className="home-description">
            Ready to explore the amazing world of 4th Grade Mathematics? 🚀
          </p>
          <button
            className={`learn-button ${!currentUser ? "disabled" : ""}`}
            onClick={handleStartLearningClick}
          >
            🌟 Start Learning Now!
          </button>
        </div>

        {/* Image Section */}
        <div className="home-image">
          <img
            src="/images/mathhew.png" 
            alt="Math-hew Mascot waving"
            className="mascot-img"
          />
        </div>
      </div>

      {/* Animated Decorations */}
      <div className="decorations">
        <div className="star star-1">⭐</div>
        <div className="star star-2">✨</div>
        <div className="star star-3">🌟</div>
      </div>
    </div>
  );
};

export default Home;
