import React, { useState } from "react";

export default function AdminLessons() {
  const [lessons, setLessons] = useState([
    { id: 1, title: "Lesson 1: Introduction to Fractions", description: "Learn the basics of fractions." },
    { id: 2, title: "Lesson 2: Multiplication", description: "Understand the fundamentals of multiplication." },
  ]);

  const [videos, setVideos] = useState([
    { id: 1, title: "Video 1: Fractions Overview", description: "A video introduction to fractions." },
    { id: 2, title: "Video 2: Multiplication Tips", description: "Tips for quick multiplication." },
  ]);

  const handleDeleteLesson = (id) => {
    setLessons(lessons.filter((lesson) => lesson.id !== id));
  };

  const handleDeleteVideo = (id) => {
    setVideos(videos.filter((video) => video.id !== id));
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100 dark:bg-gray-800">
      <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-6 text-center">
        Admin: Manage Lessons & Video Tutorials 🛠️
      </h1>

      {/* Lessons Section */}
      <div className="w-full max-w-6xl mx-auto mb-10">
        <h2 className="text-3xl font-semibold text-orange-600 dark:text-orange-400 mb-4">Lessons</h2>
        <div className="space-y-4">
          {lessons.map((lesson) => (
            <div
              key={lesson.id}
              className="flex justify-between items-center p-8 bg-orange-50 dark:bg-orange-700 rounded-lg shadow-lg"
            >
              <div>
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">{lesson.title}</h3>
                <p className="text-gray-700 dark:text-gray-300">{lesson.description}</p>
              </div>
              <button
                onClick={() => handleDeleteLesson(lessons.id)}
                className="bg-red-500 text-white px-2 py-1 text-sm rounded hover:bg-red-600 w-20"
              >
                Delete
              </button>

            </div>
          ))}
        </div>
      </div>

      {/* Video Tutorials Section */}
      <div className="w-full max-w-6xl mx-auto">
        <h2 className="text-3xl font-semibold text-orange-600 dark:text-orange-400 mb-4">Video Tutorials</h2>
        <div className="space-y-4">
          {videos.map((video) => (
            <div
              key={video.id}
              className="flex justify-between items-center p-8 bg-orange-50 dark:bg-orange-700 rounded-lg shadow-lg"
            >
              <div>
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">{video.title}</h3>
                <p className="text-gray-700 dark:text-gray-300">{video.description}</p>
              </div>
              <button
                onClick={() => handleDeleteLesson(lessons.id)}
                className="bg-red-500 text-white px-2 py-1 text-sm rounded hover:bg-red-600 w-20"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
