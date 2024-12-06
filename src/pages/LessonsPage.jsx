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
