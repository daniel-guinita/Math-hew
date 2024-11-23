import React from "react";
import { Link } from "react-router-dom";
import '../styles/Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <div className="home-content">
        {/* Text Section */}
        <div className="home-text">
          <h1 className="home-title">🎉 Welcome to Math-hew! 🎉</h1>
          <p className="home-description">
            Ready to explore the amazing world of 4th Grade Mathematics? 🚀
          </p>
          <Link to="/main-page">
            <button className="learn-button">🌟 Start Learning Now!</button>
          </Link>
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
