import React, { useState } from "react";
import "../styles/TeacherQuiz.css";
import Header from "../components/HeaderTeacher";

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
  const [newQuestion, setNewQuestion] = useState({
    question: "",
    options: ["", "", "", ""],
    correctAnswer: "",
  });

  // Add question handler
  const handleAddQuestion = () => {
    setQuestions([...questions, newQuestion]);
    setNewQuestion({ question: "", options: ["", "", "", ""], correctAnswer: "" });
  };

  // Delete question handler
  const handleDeleteQuestion = (index) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  return (
    <div className="admin-page-container">
      <Header />
      <h1 className="text-4xl font-bold text-yellow-300 mb-4">
        Teacher Quiz Dashboard 📚
      </h1>

      {/* Table Section */}
      <div className="w-full max-w-6xl bg-white shadow-lg rounded-lg p-6 text-center text-gray-800">
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-yellow-400 text-white">
              <th className="border border-gray-300 px-4 py-2">#</th>
              <th className="border border-gray-300 px-4 py-2">Question</th>
              <th className="border border-gray-300 px-4 py-2">Options</th>
              <th className="border border-gray-300 px-4 py-2">Correct Answer</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {questions.map((q, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
                <td className="border border-gray-300 px-4 py-2">{q.question}</td>
                <td className="border border-gray-300 px-4 py-2">
                  <ul className="list-disc list-inside">
                    {q.options.map((option, optIndex) => (
                      <li key={optIndex}>{option}</li>
                    ))}
                  </ul>
                </td>
                <td className="border border-gray-300 px-4 py-2 text-green-500 font-bold">
                  {q.correctAnswer}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <button
                    onClick={() => handleDeleteQuestion(index)}
                    className="p-2 bg-red-500 text-white rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Question Form */}
      <div className="mt-6 p-4 bg-gray-200 dark:bg-gray-800 rounded-lg">
        <h3 className="text-xl font-bold mb-2">Add a New Question</h3>
        <input
          type="text"
          placeholder="Question"
          value={newQuestion.question}
          onChange={(e) => setNewQuestion({ ...newQuestion, question: e.target.value })}
          className="p-2 border rounded mb-2 w-full text-black"
        />
        {newQuestion.options.map((option, index) => (
          <input
            key={index}
            type="text"
            placeholder={`Option ${index + 1}`}
            value={newQuestion.options[index]}
            onChange={(e) =>
              setNewQuestion({
                ...newQuestion,
                options: newQuestion.options.map((opt, i) => (i === index ? e.target.value : opt)),
              })
            }
            className="p-2 border rounded mb-2 w-full text-black"
          />
        ))}
        <input
          type="text"
          placeholder="Correct Answer"
          value={newQuestion.correctAnswer}
          onChange={(e) => setNewQuestion({ ...newQuestion, correctAnswer: e.target.value })}
          className="p-2 border rounded mb-2 w-full text-black"
        />
        <button onClick={handleAddQuestion} className="p-2 bg-blue-500 text-white rounded">
          Add Question
        </button>
      </div>
    </div>
  );
};

export default TeacherQuiz;


