import React, { useState } from "react";
import "../styles/TeacherQuiz.css";
import Header from "../components/Header";

const TeacherQuiz = () => {
  // State to manage questions
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

  // State to handle new question input
  const [showModal, setShowModal] = useState(false);
  const [newQuestion, setNewQuestion] = useState({
    question: "",
    options: ["", "", "", ""],
    correctAnswer: "",
  });

  // Add question handler
  const handleAddQuestion = () => {
    setQuestions([...questions, newQuestion]);
    setNewQuestion({ question: "", options: ["", "", "", ""], correctAnswer: "" });
    setShowModal(false);
  };

  // Delete question handler
  const handleDeleteQuestion = (index) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  return (
    <div className="admin-page-container">
      <Header />
      <h1 className="teacher-dashboard-title">Teacher Quiz Dashboard</h1>

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

      {/* Modal for Adding Questions */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2 className="modal-title">➕ Add a New Question</h2>
            <input
              type="text"
              placeholder="Enter Question"
              value={newQuestion.question}
              onChange={(e) => setNewQuestion({ ...newQuestion, question: e.target.value })}
              className="modal-input"
            />
            {newQuestion.options.map((option, index) => (
              <input
                key={index}
                type="text"
                placeholder={`Option ${index + 1}`}
                value={option}
                onChange={(e) =>
                  setNewQuestion({
                    ...newQuestion,
                    options: newQuestion.options.map((opt, i) =>
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
              value={newQuestion.correctAnswer}
              onChange={(e) => setNewQuestion({ ...newQuestion, correctAnswer: e.target.value })}
              className="modal-input"
            />
            <div className="modal-buttons">
              <button className="modal-button add" onClick={handleAddQuestion}>
                Add Question
              </button>
              <button className="modal-button close" onClick={() => setShowModal(false)}>
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

