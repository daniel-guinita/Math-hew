import React from "react";
import "../styles/Features.css";

const FeatureCard = ({ title, description, gif }) => {
  return (
    <div className="feature-card">
      <div className="feature-card-content">
        <h5 className="feature-card-title">{title}</h5>
        <p className="feature-card-description">{description}</p>
      </div>

      {/* Hover Window for GIF */}
      <div className="hover-window">
        <img src={gif} alt={`${title} animation`} />
      </div>
    </div>
  );
};

export default function Features() {
  const features = [
    {
      title: "Lesson Viewing",
      description:
        "Explore math problems, topics, and trusted sources to help 4th graders master new skills.",
      gif: "/gifs/example.gif", // Add your GIF here
    },
    {
      title: "Video Tutorials",
      description:
        "Watch engaging videos that simplify math concepts and make learning fun and interactive.",
      gif: "/gifs/example 2.gif", // Add your GIF here
    },
    {
      title: "Leaderboard",
      description:
        "Compete with friends and classmates for top spots while celebrating your achievements.",
      gif: "path_to_leaderboard.gif", // Add your GIF here
    },
    {
      title: "Quiz Games",
      description:
        "Play exciting math games like 'Memory Match' to earn points and reinforce your skills.",
      gif: "path_to_quiz_games.gif", // Add your GIF here
    },
    {
      title: "Learning Buddy",
      description:
        "Get hints and guidance from your friendly Math-hew Learning Buddy whenever you need help.",
      gif: "path_to_learning_buddy.gif", // Add your GIF here
    },
    {
      title: "Progress Tracking",
      description:
        "See your progress over time with charts and graphs that show how far you've come!",
      gif: "path_to_progress_tracking.gif", // Add your GIF here
    },
  ];

  return (
    <div className="features-container">
      <div className="features-content">
        <h2 className="features-title">Explore Math-hew's Amazing Features!</h2>
        <p className="features-subtitle">
          Designed to make learning math a fun-filled adventure for every 4th grader.
        </p>
        <div className="features-grid">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </div>
  );
}
