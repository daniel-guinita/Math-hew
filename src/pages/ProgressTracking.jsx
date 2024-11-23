import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

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
        fill: false,
        borderColor: "rgba(255, 255, 255, 0.8)",
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        pointBackgroundColor: "white",
        tension: 0.3,
      },
    ],
  });

  const options = {
    responsive: true,
    plugins: {
      legend: { labels: { color: "white" } },
      title: { display: true, text: "Performance Over Time", color: "white" },
    },
    scales: {
      x: {
        ticks: { color: "white" },
        grid: { color: "rgba(255, 255, 255, 0.2)" },
      },
      y: {
        beginAtZero: true,
        max: 100,
        ticks: { color: "white" },
        grid: { color: "rgba(255, 255, 255, 0.2)" },
      },
    },
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-8 bg-gray-100 dark:bg-gray-800">
      <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-8">Progress Tracking</h1>

      {/* Game Scores Section */}
      <div className="w-full max-w-4xl mb-10 p-6 bg-blue-100 dark:bg-blue-700 rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-blue-700 dark:text-blue-300 mb-4">Game Scores</h2>
        
        {/* Math Memory Game Performance Graph */}
        <div className="mb-8">
          <h3 className="text-2xl font-medium text-blue-800 dark:text-blue-200 mb-2">Math Memory Game</h3>
          <Line data={createChartData(gameScores[0].scores, gameScores[0].dates)} options={options} />
        </div>

        {/* Math Speedy Quiz Performance Graph */}
        <div>
          <h3 className="text-2xl font-medium text-blue-800 dark:text-blue-200 mb-2">Math Speedy Quiz</h3>
          <Line data={createChartData(gameScores[1].scores, gameScores[1].dates)} options={options} />
        </div>
      </div>

      {/* Viewed Lessons Section */}
      <div className="w-full max-w-4xl mb-10 p-6 bg-green-100 dark:bg-green-700 rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-green-700 dark:text-green-300 mb-4">Viewed Lessons</h2>
        <ul className="space-y-3 list-disc list-inside">
          <li className="text-lg font-medium text-green-900 dark:text-white">Lesson 1: Introduction to Fractions</li>
          <li className="text-lg font-medium text-green-900 dark:text-white">Lesson 2: Multiplication Basics</li>
          <li className="text-lg font-medium text-green-900 dark:text-white">Lesson 3: Word Problems</li>
        </ul>
      </div>

      {/* Viewed Video Tutorials Section */}
      <div className="w-full max-w-4xl p-6 bg-purple-100 dark:bg-purple-700 rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-purple-700 dark:text-purple-300 mb-4">Viewed Video Tutorials</h2>
        <ul className="space-y-3 list-disc list-inside">
          <li className="text-lg font-medium text-purple-900 dark:text-white">Video 1: Understanding Fractions</li>
          <li className="text-lg font-medium text-purple-900 dark:text-white">Video 2: Multiplication Tips</li>
        </ul>
      </div>
    </div>
  );
}
