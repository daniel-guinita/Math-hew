import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import "../styles/ProgressTracking.css";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function ProgressTracker() {
  const gameScores = [
    { game: "Math Memory Game", scores: [85, 88, 90, 92, 95], dates: ["2023-10-01", "2023-10-05", "2023-10-10", "2023-10-15", "2023-10-20"] },
    { game: "Math Speedy Quiz", scores: [78, 82, 85, 87, 90], dates: ["2023-10-02", "2023-10-07", "2023-10-12", "2023-10-17", "2023-10-22"] },
  ];

  const createChartData = (scores, dates) => ({
    labels: dates,
    datasets: [
      {
        label: "Score",
        data: scores,
        fill: true,
        borderColor: "#4caf50",
        backgroundColor: "rgba(76, 175, 80, 0.2)",
        pointBackgroundColor: "#4caf50",
        pointBorderColor: "#fff",
        tension: 0.3,
      },
    ],
  });

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { labels: { color: "#333", font: { size: 12 } } },
      title: { display: true, text: "Performance Over Time", color: "#333", font: { size: 16 } },
    },
    scales: {
      x: {
        ticks: { color: "#555", font: { size: 10 } },
        grid: { color: "rgba(0, 0, 0, 0.1)" },
      },
      y: {
        beginAtZero: true,
        max: 100,
        ticks: { color: "#555", font: { size: 10 } },
        grid: { color: "rgba(0, 0, 0, 0.1)" },
      },
    },
  };

  return (
    <div className="progress-tracker-container">
      <h1 className="progress-title">📈 Progress Tracking</h1>

      <div className="progress-grid">
        {/* Math Memory Game Section */}
        <div className="card">
          <h2 className="section-title">Math Memory Game Scores</h2>
          <div style={{ height: "500px" }}>
            <Line data={createChartData(gameScores[0].scores, gameScores[0].dates)} options={options} />
          </div>
        </div>

        {/* Math Speedy Quiz Section */}
        <div className="card">
          <h2 className="section-title">Math Speedy Quiz Game Scores</h2>
          <div style={{ height: "500px"}}>
            <Line data={createChartData(gameScores[1].scores, gameScores[1].dates)} options={options} />
          </div>
        </div>

        {/* Viewed Lessons Section */}
        <div className="card">
          <h2 className="section-title">Viewed Lessons</h2>
          <ul className="list">
            <li>Lesson 1: Introduction to Fractions</li>
            <li>Lesson 2: Multiplication Basics</li>
            <li>Lesson 3: Word Problems</li>
          </ul>
        </div>

        {/* Viewed Video Tutorials Section */}
        <div className="card">
          <h2 className="section-title">Viewed Video Tutorials</h2>
          <ul className="list">
            <li>Video 1: Understanding Fractions</li>
            <li>Video 2: Multiplication Tips</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
