import React, { useState, useEffect } from "react";
import "../styles/LessonsPage.css";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3000";

const LessonsPage = ({ userRole }) => {
  const [lessons, setLessons] = useState([]);
  const [videos, setVideos] = useState([]);
  const [newLesson, setNewLesson] = useState({ title: "", description: "" });
  const [newVideo, setNewVideo] = useState({ title: "", url: "" });
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [editLesson, setEditLesson] = useState(null);

  // Fetch lessons and videos
  useEffect(() => {
    const fetchLessonsAndVideos = async () => {
      try {
        const lessonsResponse = await fetch(`${API_URL}/lessons`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });
        const lessonsData = await lessonsResponse.json();
        setLessons(Array.isArray(lessonsData) ? lessonsData : []);

        const videosResponse = await fetch(`${API_URL}/videos`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });
        const videosData = await videosResponse.json();
        console.log("Videos fetched:", videosData); // Debugging
        setVideos(Array.isArray(videosData) ? videosData : []);
      } catch (error) {
        console.error("Error fetching lessons or videos:", error);
      }
    };

    fetchLessonsAndVideos();
  }, []);

  // Helper to format YouTube URLs
  const formatYouTubeURL = (url) => {
    const regex = /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/))([^&?/]+)/;
    const match = url.match(regex);
    if (match) {
      return `https://www.youtube.com/embed/${match[1]}`;
    }
    return null;
  };

  // Delete a lesson
  const handleDeleteLesson = async (lessonId) => {
    try {
      const response = await fetch(`${API_URL}/lessons/${lessonId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });

      if (response.ok) {
        setLessons(lessons.filter((lesson) => lesson.id !== lessonId));
        setSelectedLesson(null);
      } else {
        console.error("Failed to delete lesson.");
      }
    } catch (error) {
      console.error("Error deleting lesson:", error);
    }
  };

  return (
    <div className="lessons-page-container">
      <h1 className="page-title">Lessons</h1>

      {!selectedLesson && (
        <div className="lesson-list-container">
          <div className="lesson-grid">
            {lessons.map((lesson) => (
              <div
                key={lesson.id}
                className="lesson-card"
                onClick={() => setSelectedLesson(lesson)}
              >
                <h2 className="lesson-title">{lesson.title}</h2>
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedLesson && (
        <div className="lesson-detail-container">
          <button
            className="back-button"
            onClick={() => setSelectedLesson(null)}
          >
            ←
          </button>
          <h2 className="lesson-detail-title">{selectedLesson.title}</h2>
          <p className="lesson-detail-description">
            {selectedLesson.description}
          </p>

          {videos
            .filter((video) => video.lessonId === selectedLesson.id)
            .map((video) => (
              <div key={video.id} className="video-card">
                <h4>{video.title}</h4>
                <iframe
                  src={formatYouTubeURL(video.url)}
                  title={video.title}
                  allowFullScreen
                ></iframe>
              </div>
            ))}

          {userRole === "admin" && (
            <div className="admin-actions">
              <button
                className="edit-button"
                onClick={() => setEditLesson(selectedLesson)}
              >
                Edit Lesson
              </button>
              <button
                className="delete-button"
                onClick={() => handleDeleteLesson(selectedLesson.id)}
              >
                Delete Lesson
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default LessonsPage;
