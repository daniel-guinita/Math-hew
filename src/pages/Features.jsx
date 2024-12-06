import React from "react";
import "../styles/Features.css";

const FeatureCard = ({ title, description }) => {
  return (
    <div className="feature-card">
      <div className="feature-card-content">
        <h5 className="feature-card-title">{title}</h5>
        <p className="feature-card-description">{description}</p>
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
    },
    {
      title: "Video Tutorials",
      description:
        "Watch engaging videos that simplify math concepts and make learning fun and interactive.",
    },
    {
      title: "Leaderboard",
      description:
        "Compete with friends and classmates for top spots while celebrating your achievements.",
    },
    {
      title: "Quiz Games",
      description:
        "Play exciting math games like 'Memory Match' to earn points and reinforce your skills.",
    },
    {
      title: "Learning Buddy",
      description:
        "Get hints and guidance from your friendly Math-hew Learning Buddy whenever you need help.",
    },
    {
      title: "Progress Tracking",
      description:
        "See your progress over time with charts and graphs that show how far you've come!",
    },
  ];

  return (
    <div className="features-container">
      <div className="features-content">
        <h2 className="features-title">🌟Discover Math-hew's Amazing Features!🌟</h2>
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
