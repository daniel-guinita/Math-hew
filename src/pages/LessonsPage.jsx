/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import "../styles/LessonsPage.css";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3000";

const LessonsPage = ({ userRole }) => {
  const [lessons, setLessons] = useState([]);
  const [newLesson, setNewLesson] = useState({ title: "", description: "", video_url: "" });
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [currentRole, setCurrentRole] = useState(userRole);
  const [expandedLesson, setExpandedLesson] = useState(null);
  
  useEffect(() => {
    setCurrentRole(userRole);
  }, [userRole]);

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const response = await fetch(`${API_URL}/lessons`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });
        const data = await response.json();
        setLessons(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching lessons:", error);
      }
    };
    fetchLessons();
  }, [currentRole]);

  const handleAddLesson = async () => {
    if (newLesson.title && newLesson.description) {
      try {
        const response = await fetch(`${API_URL}/lessons`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
          body: JSON.stringify(newLesson),
        });
        const data = await response.json();
        setLessons((prev) => [...prev, data]);
        setNewLesson({ title: "", description: "", video_url: "" });
      } catch (error) {
        console.error("Error adding lesson:", error);
      }
    }
  };

  const toggleLessonExpand = (lessonId) => {
    setExpandedLesson(expandedLesson === lessonId ? null : lessonId);
  };

  const handleViewLesson = (lesson) => {
    setSelectedLesson(lesson);
  };

  const renderLessonList = () => (
    <div className="lesson-list-container">
      <h1 className="page-title">Math Lessons</h1>
      <div className="lesson-grid">
        {lessons.map((lesson) => (
          <div key={lesson.id} className="lesson-card" onClick={() => toggleLessonExpand(lesson.id)}>
            <h3>{lesson.title}</h3>
            {expandedLesson === lesson.id && (
              <div className="lesson-summary">
                <p>{lesson.description}</p>
              </div>
            )}
          </div>
        ))}
      </div>
      {(currentRole === "teacher" || currentRole === "admin") && (
        <div className="admin-section">
          <h2>Add New Lesson</h2>
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
          />
          <input
            type="text"
            placeholder="Video URL (optional)"
            value={newLesson.video_url}
            onChange={(e) => setNewLesson({ ...newLesson, video_url: e.target.value })}
            className="input-field"
          />
          <button onClick={handleAddLesson} className="add-button">➕ Add Lesson</button>
        </div>
      )}
    </div>
  );

  const renderLessonDetail = () => (
    <div className="lesson-detail-container">
      <button className="back-button" onClick={() => setSelectedLesson(null)}>← Back</button>
      <h2 className="lesson-detail-title">{selectedLesson.title}</h2>
      <p className="lesson-detail-summary">{selectedLesson.description}</p>
      {selectedLesson.video_url && (
        <div className="lesson-video">
          <iframe
            width="100%"
            height="315"
            src={selectedLesson.video_url.replace("watch?v=", "embed/")}
            title="Lesson Video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      )}
      <h3>Key Points</h3>
      <ul>
        {selectedLesson.keyPoints?.map((point, index) => (
          <li key={index}>{point}</li>
        ))}
      </ul>
      <h3>Quick Questions</h3>
      <ul>
        {selectedLesson.questions?.map((q, index) => (
          <li key={index}>{q}</li>
        ))}
      </ul>
    </div>
  );

  return <div className="lessons-page-container">{selectedLesson ? renderLessonDetail() : renderLessonList()}</div>;
};

export default LessonsPage;
