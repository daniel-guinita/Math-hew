// import React, { useState } from "react";
// import "../styles/AdminQuiz.css";

// const AdminQuiz = () => {
//   const [questions, setQuestions] = useState([
//     {
//       id: 1,
//       question: "What is 5 + 3?",
//       options: ["6", "7", "8", "9"],
//       correctAnswer: "8",
//     },
//     {
//       id: 2,
//       question: "What is 9 - 4?",
//       options: ["5", "6", "7", "8"],
//       correctAnswer: "5",
//     },
//     {
//       id: 3,
//       question: "What is 6 x 2?",
//       options: ["10", "11", "12", "13"],
//       correctAnswer: "12",
//     },
//     {
//       id: 4,
//       question: "What is 12 ÷ 4?",
//       options: ["1", "2", "3", "4"],
//       correctAnswer: "3",
//     },
//     {
//       id: 5,
//       question: "What is 15 - 6?",
//       options: ["7", "8", "9", "10"],
//       correctAnswer: "9",
//     },
//   ]);

//   const [newQuestion, setNewQuestion] = useState("");
//   const [newOptions, setNewOptions] = useState(["", "", "", ""]);
//   const [newCorrectAnswer, setNewCorrectAnswer] = useState("");

//   const handleDelete = (id) => {
//     setQuestions(questions.filter((q) => q.id !== id));
//   };

//   const handleEdit = (id) => {
//     const questionToEdit = questions.find((q) => q.id === id);
//     if (questionToEdit) {
//       alert(`Editing Question: ${questionToEdit.question}`);
//       // Example: You can implement a modal or form for editing here.
//       console.log("Edit Question:", questionToEdit);
//     }
//   };

//   const handleAddQuestion = () => {
//     if (!newQuestion || newOptions.includes("") || !newCorrectAnswer) {
//       alert("Please fill in all fields.");
//       return;
//     }

//     const newQuestionObj = {
//       id: questions.length + 1,
//       question: newQuestion,
//       options: newOptions,
//       correctAnswer: newCorrectAnswer,
//     };

//     setQuestions([...questions, newQuestionObj]);
//     setNewQuestion("");
//     setNewOptions(["", "", "", ""]);
//     setNewCorrectAnswer("");
//   };

//   return (
//     <div className="admin-quiz-container">
//       <h1 className="admin-quiz-title">🛠️ Admin Quiz Management</h1>
//       <div className="admin-quiz-table-wrapper">
//         <table className="admin-quiz-table">
//           <thead>
//             <tr>
//               <th>Question</th>
//               <th>Options</th>
//               <th>Correct Answer</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {questions.map((q) => (
//               <tr key={q.id}>
//                 <td>{q.question}</td>
//                 <td>{q.options.join(", ")}</td>
//                 <td>
//                   <span className="correct-answer">{q.correctAnswer}</span>
//                 </td>
//                 <td className="actions-cell">
//                   <button
//                     onClick={() => handleEdit(q.id)}
//                     className="edit-button"
//                   >
//                     Edit
//                   </button>
//                   <button
//                     onClick={() => handleDelete(q.id)}
//                     className="delete-button"
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Add Question Section */}
//       <div className="add-question-form">
//         <h2>Add New Question</h2>
//         <input
//           type="text"
//           placeholder="Enter question"
//           value={newQuestion}
//           onChange={(e) => setNewQuestion(e.target.value)}
//           className="question-input"
//         />
//         <div className="options-inputs">
//           {newOptions.map((option, index) => (
//             <input
//               key={index}
//               type="text"
//               placeholder={`Option ${index + 1}`}
//               value={option}
//               onChange={(e) => {
//                 const updatedOptions = [...newOptions];
//                 updatedOptions[index] = e.target.value;
//                 setNewOptions(updatedOptions);
//               }}
//               className="option-input"
//             />
//           ))}
//         </div>
//         <input
//           type="text"
//           placeholder="Enter correct answer"
//           value={newCorrectAnswer}
//           onChange={(e) => setNewCorrectAnswer(e.target.value)}
//           className="correct-answer-input"
//         />
//         <button onClick={handleAddQuestion} className="add-question-button">
//           Add Question
//         </button>
//       </div>
//     </div>
//   );
// };

// export default AdminQuiz;
