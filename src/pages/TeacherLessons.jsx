import React, { useState } from "react";
import "../styles/TeacherAdminPage.css";
import Header from "../components/HeaderTeacher";

export default function LessonsPage() {
  // Initial lessons and videos
  const [lessons, setLessons] = useState([
    { id: 1, title: "Lesson 1: Introduction to Fractions", description: "Learn the basics of fractions." },
    { id: 2, title: "Lesson 2: Multiplication", description: "Understand the fundamentals of multiplication." },
  ]);

  const [videos, setVideos] = useState([
    { id: 1, title: "Video 1: Fractions Overview", description: "A video introduction to fractions.", url: "https://www.youtube.com/embed/N3__8MmaiLE" },
    { id: 2, title: "Video 2: Multiplication Tips", description: "Tips for quick multiplication." },
  ]);

  // Add Lesson state
  const [newLesson, setNewLesson] = useState({ title: "", description: "" });
  const [newVideo, setNewVideo] = useState({ title: "", description: "", url: "" });

  // Add Lesson Handler
  const handleAddLesson = () => {
    setLessons([...lessons, { id: lessons.length + 1, ...newLesson }]);
    setNewLesson({ title: "", description: "" }); // Reset the form
  };

  // Add Video Handler
  const handleAddVideo = () => {
    setVideos([...videos, { id: videos.length + 1, ...newVideo }]);
    setNewVideo({ title: "", description: "", url: "" }); // Reset the form
  };

  return (
    <div className="admin-page-container">
      <Header />
      <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-6 text-center">
        Lessons & Video Tutorials
      </h1>

      {/* Lessons Section */}
      <div className="w-full max-w-6xl mx-auto mb-10">
        <h2 className="text-3xl font-semibold text-orange-600 dark:text-orange-400 mb-4">Lessons</h2>
        <div className="space-y-4">
          {lessons.map((lesson) => (
            <div key={lesson.id} className="p-8 bg-orange-50 dark:bg-orange-700 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">{lesson.title}</h3>
              <p className="text-gray-700 dark:text-gray-300">{lesson.description}</p>
            </div>
          ))}
        </div>
        {/* Add Lesson Form */}
        <div className="mt-6 p-4 bg-gray-200 dark:bg-gray-800 rounded-lg">
          <h3 className="text-xl font-bold mb-2">Add a New Lesson</h3>
          <input
            type="text"
            placeholder="Lesson Title"
            value={newLesson.title}
            onChange={(e) => setNewLesson({ ...newLesson, title: e.target.value })}
            className="p-2 border rounded mr-2"
          />
          <input
            type="text"
            placeholder="Lesson Description"
            value={newLesson.description}
            onChange={(e) => setNewLesson({ ...newLesson, description: e.target.value })}
            className="p-2 border rounded mr-2"
          />
          <button onClick={handleAddLesson} className="p-2 bg-blue-500 text-white rounded">
            Add Lesson
          </button>
        </div>
      </div>

      {/* Video Tutorials Section */}
      <div className="w-full max-w-6xl mx-auto">
        <h2 className="text-3xl font-semibold text-orange-600 dark:text-orange-400 mb-4">Video Tutorials</h2>
        <div className="space-y-4">
          {videos.map((video) => (
            <div key={video.id} className="p-8 bg-orange-50 dark:bg-orange-700 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">{video.title}</h3>
              <p className="text-gray-700 dark:text-gray-300">{video.description}</p>
              {video.url && (
                <div className="video-responsive">
                  <iframe
                    width="100%"
                    height="315"
                    src={video.url}
                    title={video.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              )}
            </div>
          ))}
        </div>
        {/* Add Video Form */}
        <div className="mt-6 p-4 bg-gray-200 dark:bg-gray-800 rounded-lg">
          <h3 className="text-xl font-bold mb-2">Add a New Video</h3>
          <input
            type="text"
            placeholder="Video Title"
            value={newVideo.title}
            onChange={(e) => setNewVideo({ ...newVideo, title: e.target.value })}
            className="p-2 border rounded mr-2"
          />
          <input
            type="text"
            placeholder="Video Description"
            value={newVideo.description}
            onChange={(e) => setNewVideo({ ...newVideo, description: e.target.value })}
            className="p-2 border rounded mr-2"
          />
          <input
            type="text"
            placeholder="Video URL"
            value={newVideo.url}
            onChange={(e) => setNewVideo({ ...newVideo, url: e.target.value })}
            className="p-2 border rounded mr-2"
          />
          <button onClick={handleAddVideo} className="p-2 bg-blue-500 text-white rounded">
            Add Video
          </button>
        </div>
      </div>
    </div>
  );
}
