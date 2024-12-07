import React from "react";
import '../styles/video.css';

export default function LessonsPage() {
  const lessons = [
    { id: 1, title: "Lesson 1: Introduction to Fractions", description: "Learn the basics of fractions." },
    { id: 2, title: "Lesson 2: Multiplication", description: "Understand the fundamentals of multiplication." },
  ];

  const videos = [
    { id: 1, title: "Video 1: Fractions Overview", description: "A video introduction to fractions.",  url:"https://www.youtube.com/embed/N3__8MmaiLE" },
    { id: 2, title: "Video 2: Multiplication Tips", description: "Tips for quick multiplication." },
  ];

import React, { useState } from "react";
import "../styles/LessonsPage.css";

const LessonsPage = ({ userRole }) => {
  const [lessons, setLessons] = useState([
    { id: 1, title: "Lesson 1: Introduction to Fractions", description: "Learn the basics of fractions." },
    { id: 2, title: "Lesson 2: Multiplication", description: "Understand the fundamentals of multiplication." },
  ]);

  const [videos, setVideos] = useState([
    { id: 1, title: "Video 1: Fractions Overview", description: "A video introduction to fractions." },
    { id: 2, title: "Video 2: Multiplication Tips", description: "Tips for quick multiplication." },
  ]);

  const [newLesson, setNewLesson] = useState({ title: "", description: "" });
  const [newVideo, setNewVideo] = useState({ title: "", description: "" });

  const handleAddLesson = () => {
    if (newLesson.title && newLesson.description) {
      setLessons([...lessons, { id: lessons.length + 1, ...newLesson }]);
      setNewLesson({ title: "", description: "" });
    }
  };

  const handleAddVideo = () => {
    if (newVideo.title && newVideo.description) {
      setVideos([...videos, { id: videos.length + 1, ...newVideo }]);
      setNewVideo({ title: "", description: "" });
    }
  };

  return (
    <div className="lessons-page-container">
      <h1 className="page-title">📚 Lessons & Video Tutorials 🎥</h1>

      {userRole === "teacher" || userRole === "admin" ? (
        <div className="admin-section">
          <h2 className="section-title">Add New Lesson</h2>
          <input
            type="text"
            placeholder="Lesson Title"
            value={newLesson.title}
            onChange={(e) => setNewLesson({ ...newLesson, title: e.target.value })}
            className="input-field"
          />
          <textarea
            placeholder="Lesson Description"
            value={newLesson.description}
            onChange={(e) => setNewLesson({ ...newLesson, description: e.target.value })}
            className="input-field"
          ></textarea>
          <button onClick={handleAddLesson} className="add-button">
            ➕ Add Lesson
          </button>

          <h2 className="section-title">Add New Video</h2>
          <input
            type="text"
            placeholder="Video Title"
            value={newVideo.title}
            onChange={(e) => setNewVideo({ ...newVideo, title: e.target.value })}
            className="input-field"
          />
          <textarea
            placeholder="Video Description"
            value={newVideo.description}
            onChange={(e) => setNewVideo({ ...newVideo, description: e.target.value })}
            className="input-field"
          ></textarea>
          <button onClick={handleAddVideo} className="add-button">
            ➕ Add Video
          </button>
        </div>
      ) : null}

      <div className="lessons-section">
        <h2 className="section-title">📖 Lessons</h2>
        {lessons.map((lesson) => (
          <div key={lesson.id} className="content-card">
            <h3 className="content-title">{lesson.title}</h3>
            <p className="content-description">{lesson.description}</p>
          </div>
        ))}
      </div>

      {/* Video Tutorials Placeholder */}
      <div className="w-full max-w-4xl mx-auto p-10 bg-orange-500 rounded-lg text-white text-2xl font-semibold text-center">
        Video Tutorials Placeholder

      {/* Video Tutorials Section */}
      <div className="w-full max-w-6xl mx-auto">
        <h2 className="text-3xl font-semibold text-orange-600 dark:text-orange-400 mb-4">Video Tutorials</h2>
        <div className="space-y-4">
          {videos.map((video) => (
            <div key={video.id} className="p-8 bg-orange-50 dark:bg-orange-700 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">{video.title}</h3>
              <p className="text-gray-700 dark:text-gray-300">{video.description}</p>
              <div className="video-responsive">
          <iframe 
            width="100%" 
            height="515" 
            src={video.url} 
            title={video.title} 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen
          ></iframe>
        </div>
            </div>
          ))}
        </div>
      <div className="videos-section">
        <h2 className="section-title">🎬 Video Tutorials</h2>
        {videos.map((video) => (
          <div key={video.id} className="content-card">
            <h3 className="content-title">{video.title}</h3>
            <p className="content-description">{video.description}</p>
          </div>
        ))}

      </div>
    </div>
  );
};

export default LessonsPage;
