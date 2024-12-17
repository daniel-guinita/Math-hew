import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "../styles/MainPage.css";

const MainPage = () => {
  // Retrieve the current user's information from Redux
  const currentUser = useSelector((state) => state.user.currentUser);

  return (
    <div className="main-page-container">
      {/* Classroom Image */}
      <div className="classroom-banner">
        <img
          src="/images/classroom.jpg"
          alt="Classroom"
          className="classroom-image"
        />
      </div>

      {/* Welcome Section */}
      <div className="welcome-section">
        <h1 className="welcome-title">
          Welcome to Math-hew{currentUser?.username ? `, ${currentUser.username}` : ""}!
        </h1>
        <p className="welcome-description">
          Explore fun and interactive activities to enhance your math skills!
        </p>
      </div>

      {/* Top Activities */}
      <div className="top-activities-container">
        <Link to="/math-memory-game" className="activity-card highlight-card">
          <h2 className="activity-title">Math Memory Game</h2>
          <p className="activity-description">Test your memory with fun challenges!</p>
        </Link>

        <Link to="/math-speedy-quiz" className="activity-card highlight-card">
          <h2 className="activity-title">Math Speedy Quiz</h2>
          <p className="activity-description">
            Solve quick math problems and beat the clock!
          </p>
        </Link>
      </div>

      {/* Bottom Activities */}
      <div className="bottom-activities-container">
        <Link to="/lessons-page" className="activity-card">
          <h2 className="activity-title">Lessons & Tutorials</h2>
          <p className="activity-description">
            Learn math concepts with engaging lessons and videos!
          </p>
        </Link>

        <Link to="/leaderboard" className="activity-card">
          <h2 className="activity-title">Leaderboard</h2>
          <p className="activity-description">
            Compete with others and climb the leaderboard!
          </p>
        </Link>

        <Link to="/progress-tracking" className="activity-card">
          <h2 className="activity-title">Progress Tracking</h2>
          <p className="activity-description">
            Track your learning journey and celebrate your achievements!
          </p>
        </Link>
      </div>
    </div>
  );
};

export default MainPage;
