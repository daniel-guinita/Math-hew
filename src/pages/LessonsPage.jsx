import React from "react";

export default function LessonsPage() {
  return (
    <div className="min-h-screen p-6 bg-gray-100 dark:bg-gray-800">
      <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-6 text-center">Lessons & Video Tutorials</h1>

      {/* Lessons Placeholder */}
      <div className="w-full max-w-4xl mx-auto p-10 bg-orange-500 rounded-lg text-white text-2xl font-semibold text-center mb-10">
        Lessons Placeholder
      </div>

      {/* Video Tutorials Placeholder */}
      <div className="w-full max-w-4xl mx-auto p-10 bg-orange-500 rounded-lg text-white text-2xl font-semibold text-center">
        Video Tutorials Placeholder
      </div>
    </div>
  );
}