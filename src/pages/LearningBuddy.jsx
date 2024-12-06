import React, { useState } from "react";
import "../styles/LearningBuddy.css";

export default function LearningBuddy() {
  const [messages, setMessages] = useState([
    { type: "bot", text: "Hi! I'm your Learning Buddy 🤖. How can I help you with math today?" },
    { type: "bot", text: "Here are some things I can help with:\n✔️ Fractions\n✔️ Multiplication tips\n✔️ Word problems" },
  ]);

  const exampleQuestions = [
    "How do I solve fractions?",
    "Can you explain multiplication?",
    "What are word problems?",
  ];

  const handleExampleClick = (question) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { type: "user", text: question },
      { type: "bot", text: "Here’s a helpful response for your question! 🎉" },
    ]);
  };

  return (
    <div className="learning-buddy-container">
      <h1 className="learning-buddy-title">🧠 Learning Buddy 🐾</h1>

      {/* Chat Container */}
      <div className="chat-container">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message-row ${msg.type === "bot" ? "bot-message" : "user-message"}`}
          >
            <div className={`message-bubble ${msg.type === "bot" ? "bot-bubble" : "user-bubble"}`}>
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      {/* Example Questions */}
      <div className="example-questions">
        <h2 className="example-title">Try asking:</h2>
        <div className="example-buttons">
          {exampleQuestions.map((question, index) => (
            <button
              key={index}
              onClick={() => handleExampleClick(question)}
              className="example-button"
            >
              {question}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
