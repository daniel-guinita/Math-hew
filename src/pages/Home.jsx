import React from "react";
import { Link } from "react-router-dom";
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <div className="home-content">
        <div className="home-text">
          <h1 className="home-title">Welcome to Math-hew!</h1>
          <p className="home-description">Your fun guide to 4th grade Mathematics!</p>
          <Link to="/sign-in" > {/* No need for inline-block, Link is already inline */}
            <button className="learn-button">Learn Now</button>
          </Link>
        </div>

        <div className="home-image">
          <img
            src="/images/mathhew.png" 
            alt="Math-hew Mascot"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;