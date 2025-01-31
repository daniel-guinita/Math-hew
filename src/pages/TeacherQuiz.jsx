import React, { useState } from "react";
import "../styles/TeacherQuiz.css";
import Header from "../components/Header";

const TeacherQuiz = () => {
  const [questions, setQuestions] = useState([
    {
      question: "What is 5 + 3?",
      options: ["6", "7", "8", "9"],
      correctAnswer: "8",
    },
    {
      question: "What is 9 - 4?",
      options: ["5", "6", "7", "8"],
      correctAnswer: "5",
    },
    {
      question: "What is 6 x 2?",
      options: ["10", "11", "12", "13"],
      correctAnswer: "12",
    },
    {
      question: "What is 12 ÷ 4?",
      options: ["1", "2", "3", "4"],
      correctAnswer: "3",
    },
    {
      question: "What is 15 - 6?",
      options: ["7", "8", "9", "10"],
      correctAnswer: "9",
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState({
    question: "",
    options: ["", "", "", ""],
    correctAnswer: "",
  });

  // Add or update question handler
  const handleSaveQuestion = () => {
    if (isEditing) {
      const updatedQuestions = questions.map((q, index) =>
        index === editIndex ? currentQuestion : q
      );
      setQuestions(updatedQuestions);
    } else {
      setQuestions([...questions, currentQuestion]);
    }
    resetModal();
  };

  // Edit question handler
  const handleEditQuestion = (index) => {
    setIsEditing(true);
    setEditIndex(index);
    setCurrentQuestion(questions[index]);
    setShowModal(true);
  };

  // Delete question handler
  const handleDeleteQuestion = (index) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  // Reset modal state
  const resetModal = () => {
    setShowModal(false);
    setIsEditing(false);
    setEditIndex(null);
    setCurrentQuestion({ question: "", options: ["", "", "", ""], correctAnswer: "" });
  };

  return (
    <div className="admin-page-container">
      <Header />
      <h1 className="teacher-dashboard-title">Quiz Dashboard</h1>

      {/* Table Section */}
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Question</th>
              <th>Options</th>
              <th>Correct Answer</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {questions.map((q, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{q.question}</td>
                <td>
                  <ul>
                    {q.options.map((opt, i) => (
                      <li key={i}>{opt}</li>
                    ))}
                  </ul>
                </td>
                <td className="text-green-500 font-bold">{q.correctAnswer}</td>
                <td>
                  <button className="edit-button" onClick={() => handleEditQuestion(index)}>
                    Edit
                  </button>
                  <button className="delete-button" onClick={() => handleDeleteQuestion(index)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Question Button */}
      <div className="add-question-button-container">
        <button className="add-question-button" onClick={() => setShowModal(true)}>
          ➕ Add New Question
        </button>
      </div>

      {/* Modal for Adding/Editing Questions */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2 className="modal-title">{isEditing ? "✏️ Edit Question" : "➕ Add a New Question"}</h2>
            <input
              type="text"
              placeholder="Enter Question"
              value={currentQuestion.question}
              onChange={(e) => setCurrentQuestion({ ...currentQuestion, question: e.target.value })}
              className="modal-input"
            />
            {currentQuestion.options.map((option, index) => (
              <input
                key={index}
                type="text"
                placeholder={`Option ${index + 1}`}
                value={option}
                onChange={(e) =>
                  setCurrentQuestion({
                    ...currentQuestion,
                    options: currentQuestion.options.map((opt, i) =>
                      i === index ? e.target.value : opt
                    ),
                  })
                }
                className="modal-input"
              />
            ))}
            <input
              type="text"
              placeholder="Correct Answer"
              value={currentQuestion.correctAnswer}
              onChange={(e) =>
                setCurrentQuestion({ ...currentQuestion, correctAnswer: e.target.value })
              }
              className="modal-input"
            />
            <div className="modal-buttons">
              <button className="modal-button add" onClick={handleSaveQuestion}>
                {isEditing ? "Save Changes" : "Add Question"}
              </button>
              <button className="modal-button close" onClick={resetModal}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherQuiz;
