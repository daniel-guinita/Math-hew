import React, { useState } from "react";
import "../styles/AdminQuiz.css";

const AdminQuiz = () => {
  // Sample questions from MathSpeedyQuiz
  const [questions, setQuestions] = useState([
    {
      id: 1,
      question: "What is 5 + 3?",
      options: ["6", "7", "8", "9"],
      correctAnswer: "8",
    },
    {
      id: 2,
      question: "What is 9 - 4?",
      options: ["5", "6", "7", "8"],
      correctAnswer: "5",
    },
    {
      id: 3,
      question: "What is 6 x 2?",
      options: ["10", "11", "12", "13"],
      correctAnswer: "12",
    },
    {
      id: 4,
      question: "What is 12 ÷ 4?",
      options: ["1", "2", "3", "4"],
      correctAnswer: "3",
    },
    {
      id: 5,
      question: "What is 15 - 6?",
      options: ["7", "8", "9", "10"],
      correctAnswer: "9",
    },
  ]);

  // Function to handle question deletion
  const handleDelete = (id) => {
    setQuestions(questions.filter((q) => q.id !== id));
  };

  return (
    <div className="admin-quiz-container">
      <h1 className="admin-quiz-title">🛠️ Admin Quiz Management</h1>
      <div className="admin-quiz-table-wrapper">
        <table className="admin-quiz-table">
          <thead>
            <tr>
              <th>Question</th>
              <th>Options</th>
              <th>Correct Answer</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {questions.map((q) => (
              <tr key={q.id}>
                <td>{q.question}</td>
                <td>{q.options.join(", ")}</td>
                <td>
                  <span className="correct-answer">{q.correctAnswer}</span>
                </td>
                <td className="actions-cell">
                  <button
                    onClick={() => handleDelete(q.id)}
                    className="delete-button"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminQuiz;
