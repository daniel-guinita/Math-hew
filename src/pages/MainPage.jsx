import React from "react";
import { Link } from "react-router-dom";

const MainPage = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-blue-600 to-purple-700 flex flex-col items-center px-4 py-8 text-white">

      {/* Classroom Image Banner */}
      <div className="w-full relative mb-8">
        <img
          src="/images/classroom.jpg"
          alt="Classroom"
          className="w-full h-64 object-cover rounded-lg shadow-lg"
        />
        <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-blue-800 to-transparent rounded-lg"></div>
      </div>

      {/* Decorative Elements */}
      <div className="relative mb-8 w-full flex justify-center">
        <div className="w-12 h-12 bg-yellow-400 rounded-full shadow-lg animate-spin-slow mx-4"></div>
        <div className="w-10 h-10 bg-yellow-300 rounded-full shadow-lg animate-pulse mx-4"></div>
        <div className="w-8 h-8 bg-yellow-500 rounded-full shadow-lg animate-bounce mx-4"></div>
      </div>

      {/* Main Title */}
      <h1 className="text-4xl sm:text-6xl font-bold text-yellow-300 mb-4">
        Welcome to Math-hew! 🎉
      </h1>
      <p className="text-lg text-yellow-100 mb-10 text-center">
        Choose an activity below to begin your exciting math journey! 🚀
      </p>

      {/* Activity Sections */}
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {/* Math Memory Game */}
        <Link
          to="/math-memory-game"
          className="activity-link bg-white text-gray-800 shadow-xl rounded-lg p-6 text-center hover:bg-orange-200 hover:animate-shake transition-transform duration-300"
        >
          <h2 className="text-2xl font-bold text-orange-500 mb-4">Math Memory Game 🧠</h2>
          <p className="text-gray-600">Test your memory with this fun math matching game!</p>
        </Link>

        {/* Math Speedy Quiz */}
        <Link
          to="/math-speedy-quiz"
          className="activity-link bg-white text-gray-800 shadow-xl rounded-lg p-6 text-center hover:bg-orange-200 hover:animate-shake transition-transform duration-300"
        >
          <h2 className="text-2xl font-bold text-orange-500 mb-4">Math Speedy Quiz ⚡</h2>
          <p className="text-gray-600">Challenge yourself with quick math questions!</p>
        </Link>
      </div>

      {/* Lessons and Tutorials */}
      <Link
        to="/lessons-page"
        className="activity-link bg-white text-gray-800 shadow-xl rounded-lg p-8 text-center mb-16 hover:bg-orange-200 hover:animate-shake transition-transform duration-300 w-full max-w-6xl"
      >
        <h2 className="text-2xl font-bold text-orange-500 mb-4">Lessons & Video Tutorials 🎥</h2>
        <p className="text-gray-600">Dive into interactive lessons and watch helpful tutorials.</p>
      </Link>

      {/* Learning Buddy */}
      <Link
        to="/learning-buddy"
        className="activity-link bg-white text-gray-800 shadow-xl rounded-lg p-8 text-center mb-8 hover:bg-orange-200 hover:animate-shake transition-transform duration-300 w-full max-w-6xl"
      >
        <h2 className="text-2xl font-bold text-orange-500 mb-4">Learning Buddy 🤖</h2>
        <p className="text-gray-600">
          Get help and ask questions about your lessons with our friendly chatbot.
        </p>
      </Link>

      {/* Leaderboard */}
      <Link
        to="/leaderboard"
        className="activity-link bg-white text-gray-800 shadow-xl rounded-lg p-8 text-center mb-8 hover:bg-orange-200 hover:animate-shake transition-transform duration-300 w-full max-w-6xl"
      >
        <h2 className="text-2xl font-bold text-orange-500 mb-4">Leaderboard 🏆</h2>
        <p className="text-gray-600">
          See where you stand compared to others on the leaderboard!
        </p>
      </Link>

      {/* Progress Tracking */}
      <Link
        to="/progress-tracking"
        className="activity-link bg-white text-gray-800 shadow-xl rounded-lg p-8 text-center hover:bg-orange-200 hover:animate-shake transition-transform duration-300 w-full max-w-6xl"
      >
        <h2 className="text-2xl font-bold text-orange-500 mb-4">Progress Tracking 📊</h2>
        <p className="text-gray-600">
          Track your progress and see how you're improving over time!
        </p>
      </Link>

      {/* Math-hew Image */}
      <img
        src="/images/mathhew.png"
        alt="Math-hew"
        className="absolute bottom-5 right-5 w-32 h-auto animate-bounce"
      />
    </div>
  );
};

export default MainPage;
