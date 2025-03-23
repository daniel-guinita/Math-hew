/* eslint-disable no-undef */
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
  const [newKeypoint, setNewKeypoint] = useState("");
  const [newQuestion, setNewQuestion] = useState({ question: "", choices: ["", "", ""], correctAnswer: "", });
  const [studentAnswers, setStudentAnswers] = useState({});
  const [editingQuestionId, setEditingQuestionId] = useState(null);
  const [editedQuestion, setEditedQuestion] = useState({ question: "", choices: ["", "", ""], correctAnswer: "" });
  const [editingKeypointId, setEditingKeypointId] = useState(null);
  const [editedKeypoint, setEditedKeypoint] = useState("");
  const [answerFeedback, setAnswerFeedback] = useState({});
  const [attemptCount, setAttemptCount] = useState(0);
  const [lessonCompleted, setLessonCompleted] = useState(false);

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

  const handleViewLesson = async (lesson) => {
    try {
      const school_id = JSON.parse(localStorage.getItem("userProfile"))?.school_id;
      const res = await fetch(`${API_URL}/lessons/${lesson.id}`);
      const fullLesson = await res.json();
      setSelectedLesson(fullLesson);

      // Fetch score + attempt from backend
      const scoreRes = await fetch(`${API_URL}/scores/${lesson.id}/${school_id}`);
      const scoreData = await scoreRes.json();
      setSelectedLesson(fullLesson);
      setAttemptCount(scoreData?.attempts || 0);
  
      // Lock answering if completed
      if (scoreData && (scoreData.attempts >= 3 || scoreData.score === fullLesson.questions.length)) {
        setLessonCompleted(true);
      } else {
        setLessonCompleted(false);
      }

      if (scoreData?.answers) {
        setStudentAnswers(scoreData.answers);
        setAttemptCount(scoreData.attempts);
        if (scoreData.attempts >= 3 || scoreData.score === fullLesson.questions.length) {
          setLessonCompleted(true);
        }
      }
  
      setSelectedLesson(fullLesson);
  
    } catch (error) {
      console.error("Failed to load lesson or score:", error);
    }
  };
  
  const handleAddKeypoint = async () => {
    if (!newKeypoint.trim()) return;
    try {
      const res = await fetch(`${API_URL}/lessons/${selectedLesson.id}/keypoints`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: newKeypoint }),
      });
      const added = await res.json();
      setSelectedLesson((prev) => ({
        ...prev,
        keypoints: [...(prev.keypoints || []), added],
      }));
      setNewKeypoint("");
    } catch (err) {
      console.error("Failed to add keypoint:", err);
    }
  };

  const handleEditKeypoint = async (id, updatedContent) => {
    try {
      await fetch(`${API_URL}/lessons/${selectedLesson.id}/keypoints/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: updatedContent }),
      });
      setSelectedLesson(prev => ({
        ...prev,
        keypoints: prev.keypoints.map(kp => kp.id === id ? { ...kp, content: updatedContent } : kp)
      }));
    } catch (err) {
      console.error('Edit failed:', err);
    }
  };
  
  
  const handleDeleteKeypoint = async (id) => {
    try {
      await fetch(`${API_URL}/lessons/${selectedLesson.id}/keypoints/${id}`, {
        method: "DELETE",
      });
      setSelectedLesson((prev) => ({
        ...prev,
        keypoints: prev.keypoints.filter((kp) => kp.id !== id),
      }));
    } catch (err) {
      console.error("Failed to delete keypoint:", err);
    }
  };

  const handleEditQuestion = async (id) => {
    try {
      const payload = {
        question: editedQuestion.question,
        choices: editedQuestion.choices, // now sending as array
        correctAnswer: editedQuestion.correctAnswer,
      };
      
      

      const response = await fetch(`${API_URL}/lessons/${selectedLesson.id}/questions/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to update question");
      }

      const updatedQuestion = await response.json();
      setSelectedLesson((prev) => ({
        ...prev,
        questions: prev.questions.map((q) => (q.id === id ? updatedQuestion : q)),
      }));
      setEditingQuestionId(null);
    } catch (error) {
      console.error("Edit failed:", error);
    }
  };
  
  const handleAddQuestion = async () => {
    const { question, choices, correctAnswer } = newQuestion;
    if (!question || choices.some((c) => !c) || !correctAnswer) return;
  
    try {
      const res = await fetch(`${API_URL}/lessons/${selectedLesson.id}/questions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question,
          choices,
          correctAnswer
        }),
      });
  
      const added = await res.json();
      setSelectedLesson((prev) => ({
        ...prev,
        questions: [...(prev.questions || []), added],
      }));
      setNewQuestion({ question: "", choices: ["", "", ""], correctAnswer: "" });
    } catch (err) {
      console.error("Failed to add question:", err);
    }
  };
  
  const handleDeleteQuestion = async (id) => {
    try {
      await fetch(`${API_URL}/lessons/${selectedLesson.id}/questions/${id}`, {
        method: "DELETE",
      });
      setSelectedLesson((prev) => ({
        ...prev,
        questions: prev.questions.filter((q) => q.id !== id),
      }));
    } catch (err) {
      console.error("Failed to delete question:", err);
    }
  };

  const handleAnswerChange = (questionId, answer) => {
    setStudentAnswers((prev) => ({ ...prev, [questionId]: answer }));
  };

  const handleSubmitAnswers = async () => {
    if (lessonCompleted) return;
  
    try {
      const school_id = JSON.parse(localStorage.getItem("userProfile"))?.school_id;
      const answers = studentAnswers;
  
      const feedback = {};
      let score = 0;
  
      selectedLesson.questions.forEach((q) => {
        const selected = answers[q.id];
        if (selected && selected.trim().toLowerCase() === q.correctAnswer?.trim().toLowerCase()) {
          feedback[q.id] = "✅ Correct!";
          score += 1;
        } else {
          feedback[q.id] = "❌ Incorrect";
        }
      });
  
      setAnswerFeedback(feedback);
      setAttemptCount((prev) => prev + 1);
  
      // If all correct OR 3 attempts reached → Submit and disable
      if (score === selectedLesson.questions.length || attemptCount + 1 >= 3) {
        setLessonCompleted(true);
  
        await fetch(`${API_URL}/lessons/${selectedLesson.id}/submit`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
          body: JSON.stringify({
          answers: studentAnswers,
          school_id: JSON.parse(localStorage.getItem("userProfile"))?.school_id,
          }),
        });
  
        alert(
          `Lesson completed! You scored ${score}/${selectedLesson.questions.length}${
            attemptCount + 1 >= 3 && score < selectedLesson.questions.length
              ? " (3 attempts used)"
              : ""
          }`
        );
      } else {
        alert(`Attempt ${attemptCount + 1}: You got ${score} correct. Try again.`);
      }
    } catch (error) {
      console.error("Failed to submit answers:", error);
    }
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
                <button className="view-button" onClick={(e) => { e.stopPropagation(); handleViewLesson(lesson); }}>
                  View Lesson
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
      {(currentRole === "teacher" || currentRole === "admin") && (
        <div className="admin-section">
          <input type="text" placeholder="Lesson Title" value={newLesson.title} onChange={(e) => setNewLesson({ ...newLesson, title: e.target.value })} className="input-field" />
          <textarea placeholder="Lesson Description" value={newLesson.description} onChange={(e) => setNewLesson({ ...newLesson, description: e.target.value })} className="input-field" />
          <input type="text" placeholder="Video URL (optional)" value={newLesson.video_url} onChange={(e) => setNewLesson({ ...newLesson, video_url: e.target.value })} className="input-field" />
          <button onClick={handleAddLesson} className="add-button">Add Lesson</button>
        </div>
      )}
    </div>
  );

  const renderLessonDetail = () => {
    const isTeacherOrAdmin = currentRole === "teacher" || currentRole === "admin";
    const isStudent = currentRole === "student";

    return (
      <div className="lesson-detail-container">
        <button className="back-button" onClick={() => setSelectedLesson(null)}>← Back</button>
        <h2 className="lesson-detail-title">{selectedLesson.title}</h2>
        <p className="lesson-detail-summary">{selectedLesson.description}</p>

        {selectedLesson.video_url && (
          <div className="lesson-video">
            <iframe
              src={selectedLesson.video_url.replace("watch?v=", "embed/")}
              title="Lesson Video"
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </div>
        )}

        <div className="lesson-content">
          <div className="keypoints-section">
            <h3>Key Points</h3>
            <ul>
              {(selectedLesson.keypoints || []).map((point, index) => (
                <li key={point.id || index} className="input-field">
                {editingKeypointId === point.id ? (
                <>
                  <input
                    type="text"
                    value={editedKeypoint}
                    onChange={(e) => setEditedKeypoint(e.target.value)}
                    className="input-field"
                  />
                  <div className="btn-inline">
                    <button
                      className="small-btn"
                      onClick={() => {
                        handleEditKeypoint(point.id, editedKeypoint);
                        setEditingKeypointId(null);
                      }}
                    >
                      Save
                    </button>
                    <button
                      className="small-btn"
                      onClick={() => setEditingKeypointId(null)}
                    >
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  {point.content}
                  {isTeacherOrAdmin && (
                    <div className="btn-inline">
                      <button
                        className="small-btn"
                        onClick={() => {
                          setEditingKeypointId(point.id);
                          setEditedKeypoint(point.content);
                        }}
                      >
                        Edit
                      </button>
                      <button className="small-btn" onClick={() => handleDeleteKeypoint(point.id)}>Delete</button>
                    </div>
                  )}
                </>
              )}
                </li>
              ))}
            </ul>
          </div>

          <div className="questions-section">
          <h3>Quick Questions</h3>
          <ul>
            {(selectedLesson.questions || []).map((q, index) => (
              <li key={q.id || index} className="input-field">
                {editingQuestionId === q.id ? (
                  <>
                    <input
                      type="text"
                      className="input-field"
                      value={editedQuestion.question}
                      onChange={(e) =>
                        setEditedQuestion({ ...editedQuestion, question: e.target.value })
                      }

                    />
                    {editedQuestion.choices.map((choice, i) => (
                      <input
                        key={i}
                        type="text"
                        className="input-field"
                        value={choice}
                        onChange={(e) => {
                          const updated = [...editedQuestion.choices];
                          updated[i] = e.target.value;
                          setEditedQuestion({ ...editedQuestion, choices: updated });
                        }}
                      />
                    ))}
                    
                      <label className="correct-answer-label">Correct Answer:</label>
                      <input
                        type="text"
                        className="input-field"
                        value={editedQuestion.correctAnswer}
                        onChange={(e) =>
                          setEditedQuestion({ ...editedQuestion, correctAnswer: e.target.value })
                        }
                      />

                    <div className="btn-inline">
                      <button
                        className="small-btn"
                        onClick={() => handleEditQuestion(q.id)}
                      >
                        Save
                      </button>
                      <button
                        className="small-btn"
                        onClick={() => setEditingQuestionId(null)}
                      >
                        Cancel
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <strong>{q.question}</strong>
                    <ul>
                      {(q.choices || []).map((choice, i) => (
                        <li key={i}>
                          {isStudent ? (
                            <label>
                            <input
                                type="radio"
                                name={`question-${q.id}`}
                                value={choice}
                                checked={studentAnswers[q.id] === choice}
                                onChange={() => handleAnswerChange(q.id, choice)}
                                disabled={lessonCompleted}
                              />
                              {" "}{choice}
                            </label>
                          ) : (
                            <span>{choice}</span>
                          )}
                        </li>
                      ))}
                    </ul>

                    {/* ✅ Moved here — now q is in scope */}
                    {isStudent && answerFeedback[q.id] && (
                      <div
                        style={{
                          marginTop: "5px",
                          color: answerFeedback[q.id].includes("Correct") ? "green" : "red",
                          fontWeight: "bold",
                        }}
                      >
                        {answerFeedback[q.id]}
                      </div>
                    )}

                    {isTeacherOrAdmin && (
                      <div className="btn-inline">
                        <button
                          className="small-btn"
                          onClick={() => {
                            setEditingQuestionId(q.id);
                            setEditedQuestion({
                              question: q.question || "",
                              choices: Array.isArray(q.choices)
                                ? q.choices
                                : typeof q.choices === "string"
                                ? q.choices.split(",")
                                : ["", "", ""],
                              correctAnswer: q.correctAnswer || "",
                            });
                          }}
                        >
                          Edit
                        </button>
                        <button
                          className="small-btn"
                          onClick={() => handleDeleteQuestion(q.id)}
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>

        {isTeacherOrAdmin && (
          <div className="form-separate-wrapper">
            <div className="form-half-wrapper">
              <div className="admin-section">
                <h3>Add Key Point</h3>
                <input
                  type="text"
                  placeholder="Add keypoint..."
                  className="input-field"
                  value={newKeypoint}
                  onChange={(e) => setNewKeypoint(e.target.value)}
                />
                <button className="add-button" onClick={handleAddKeypoint}> Add Key Point</button>
              </div>
            </div>
            <div className="form-half-wrapper">
            <div className="admin-section">
              <h3>Add Question</h3>
              <input
                type="text"
                placeholder="Question"
                className="input-field"
                value={newQuestion.question}
                onChange={(e) =>
                  setNewQuestion({ ...newQuestion, question: e.target.value })
                }
              />
              {newQuestion.choices.map((choice, i) => (
                <input
                  key={i}
                  type="text"
                  placeholder={`Choice ${i + 1}`}
                  className="input-field"
                  value={choice}
                  onChange={(e) => {
                    const updated = [...newQuestion.choices];
                    updated[i] = e.target.value;
                    setNewQuestion({ ...newQuestion, choices: updated });
                  }}
                />
              ))}
              <input
                type="text"
                placeholder="Correct Answer"
                className="input-field"
                value={newQuestion.correctAnswer}
                onChange={(e) =>
                  setNewQuestion({ ...newQuestion, correctAnswer: e.target.value })
                }
              />
              <button className="add-button" onClick={handleAddQuestion}>Add Question</button>
            </div>
            </div>
          </div>
        )}
        {isStudent && !lessonCompleted && (
          <button className="add-button" onClick={handleSubmitAnswers}>
            ✅ Submit Answers ({attemptCount}/3)
          </button>
        )}

        {isStudent && lessonCompleted && (
          <p style={{ color: "red", fontWeight: "bold", marginTop: "10px" }}>
            You have completed this lesson.
          </p>
        )}
      </div>
    );
  };

  return (
    <div className="lessons-page-container">
      {selectedLesson ? renderLessonDetail() : renderLessonList()}
    </div>
  );
};

export default LessonsPage;
