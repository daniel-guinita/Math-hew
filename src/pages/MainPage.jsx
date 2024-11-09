import React from "react";
import { Link } from "react-router-dom";

const MainPage = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-gray-100 to-orange-50 dark:from-gray-700 dark:to-gray-900 flex flex-col items-center px-4 py-8">
      <h1 className="text-3xl sm:text-5xl font-bold text-gray-800 dark:text-white mb-8">
        Welcome to Math-hew!
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">
        Select an activity to begin your learning journey.
      </p>

      {/* Games Section */}
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <Link
          to="/math-memory-game"
          className="bg-white dark:bg-gray-700 shadow-lg rounded-lg p-6 text-center hover:bg-gray-100 dark:hover:bg-gray-600 transition"
        >
          <h2 className="text-xl font-bold text-orange-500 dark:text-orange-300 mb-4">
            Math Memory Game
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Test your memory with this fun math matching game!
          </p>
        </Link>

        <Link
          to="/math-speedy-quiz"
          className="bg-white dark:bg-gray-700 shadow-lg rounded-lg p-6 text-center hover:bg-gray-100 dark:hover:bg-gray-600 transition"
        >
          <h2 className="text-xl font-bold text-orange-500 dark:text-orange-300 mb-4">
            Math Speedy Quiz
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Challenge yourself with quick math questions!
          </p>
        </Link>
      </div>

      {/* Lessons and Video Tutorials Section */}
      <Link
        to="/lessons-page"
        className="w-full max-w-5xl bg-white dark:bg-gray-700 shadow-lg rounded-lg p-8 text-center mb-16 hover:bg-gray-100 dark:hover:bg-gray-600 transition"
      >
        <h2 className="text-xl font-bold text-orange-500 dark:text-orange-300 mb-4">
          Lessons & Video Tutorials
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Dive into interactive lessons and watch helpful video tutorials.
        </p>
      </Link>

      {/* Chatbot Section */}
      <Link
        to="/learning-buddy"
        className="w-full max-w-5xl bg-white dark:bg-gray-700 shadow-lg rounded-lg p-8 text-center mb-8 hover:bg-gray-100 dark:hover:bg-gray-600 transition"
      >
        <h2 className="text-xl font-bold text-orange-500 dark:text-orange-300 mb-4">
          Learning Buddy (Chatbot)
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Get help and ask questions about your lessons with our friendly chatbot.
        </p>
      </Link>

      {/* Leaderboard Section */}
      <Link
        to="/leaderboard"
        className="w-full max-w-5xl bg-white dark:bg-gray-700 shadow-lg rounded-lg p-8 text-center mb-8 hover:bg-gray-100 dark:hover:bg-gray-600 transition"
      >
        <h2 className="text-xl font-bold text-orange-500 dark:text-orange-300 mb-4">
          Leaderboard
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          See where you stand compared to others on the leaderboard!
        </p>
      </Link>

      {/* Progress Tracking Section */}
      <Link
        to="/progress-tracking"
        className="w-full max-w-5xl bg-white dark:bg-gray-700 shadow-lg rounded-lg p-8 text-center hover:bg-gray-100 dark:hover:bg-gray-600 transition"
      >
        <h2 className="text-xl font-bold text-orange-500 dark:text-orange-300 mb-4">
          Progress Tracking
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Track your progress and see how you're improving over time!
        </p>
      </Link>

      {/* Math-hew Image on Bottom Right */}
      <img
        src="/images/mathhew.png"
        alt="Math-hew"
        className="absolute bottom-5 right-5 w-40 h-auto"
      />
    </div>
  );
};

export default MainPage;
