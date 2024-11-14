import React, { useState } from "react";

export default function LearningBuddy() {
  const [messages, setMessages] = useState([
    { type: "bot", text: "Hello! I'm your Learning Buddy. How can I help you with math today?" },
    { type: "bot", text: "Here are some things I can help with:\n- Fractions\n- Multiplication tips\n- Word problems" },
  ]);

  const exampleQuestions = [
    "How do I solve fractions?",
    "Can you explain multiplication?",
    "What are word problems?",
  ];

  const handleExampleClick = (question) => {
    setMessages([
      ...messages,
      { type: "user", text: question },
      { type: "bot", text: "Here’s a helpful response for your question!" },
    ]);
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-8 bg-gray-100 dark:bg-gray-800">
      <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-8">Learning Buddy</h1>

      {/* Chat Container */}
      <div className="w-full max-w-3xl p-6 bg-white dark:bg-gray-700 rounded-lg shadow-lg mb-8 flex flex-col space-y-4 overflow-y-auto h-[32rem]">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.type === "bot" ? "justify-start" : "justify-end"}`}
          >
            <div
              className={`${
                msg.type === "bot" ? "bg-orange-200 text-gray-800" : "bg-orange-500 text-white"
              } p-4 rounded-lg max-w-xs`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      {/* Example Questions */}
      <div className="w-full max-w-3xl mb-4">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
          Try asking:
        </h2>
        <div className="flex flex-wrap gap-3">
          {exampleQuestions.map((question, index) => (
            <button
              key={index}
              onClick={() => handleExampleClick(question)}
              className="bg-orange-100 dark:bg-orange-600 text-gray-800 dark:text-white py-2 px-4 rounded-lg shadow-sm hover:bg-orange-200 dark:hover:bg-orange-500 transition"
            >
              {question}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
