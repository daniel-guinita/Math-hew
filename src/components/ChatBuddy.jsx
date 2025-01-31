import React, { useState } from "react";
import "../styles/ChatBuddy.css";

const ChatBuddy = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { type: "bot", text: "👋 Hi there! I'm Mathhew, your Math Buddy. How can I help you with math today?" },
    { type: "bot", text: "Here are some topics I can help with:\n✔️ Fractions\n✔️ Multiplication tips\n✔️ Word problems\n✔️ Measurement & Geometry\n✔️ Data & Probability" },
  ]);
  const [currentTopic, setCurrentTopic] = useState(null);
  const [subTopic, setSubTopic] = useState(null);

  const toggleChat = () => setIsOpen(!isOpen);

  const handleTopicClick = (topic) => {
    setMessages((prev) => [
      ...prev,
      { type: "user", text: `I want to learn about ${topic}.` },
      { type: "bot", text: `Great! Here's what I can teach you about ${topic}.` },
    ]);
    setCurrentTopic(topic);
  };

  const handleSubTopicClick = (sub) => {
    setMessages((prev) => [
      ...prev,
      { type: "user", text: sub.text },
      { type: "bot", text: sub.answer },
    ]);
    setSubTopic(sub);
  };

  const handleReset = () => {
    setCurrentTopic(null);
    setSubTopic(null);
    setMessages([
      { type: "bot", text: "👋 Hi there! I'm Mathhew, your Math Buddy. How can I help you today?" },
      { type: "bot", text: "Here are some topics I can help with:\n✔️ Fractions\n✔️ Multiplication tips\n✔️ Word problems\n✔️ Measurement & Geometry\n✔️ Data & Probability" },
    ]);
  };

  const getSubTopics = () => {
    switch (currentTopic) {
      case "Fractions":
        return [
          { text: "How do I add fractions?", answer: "To add fractions, they need to have the same denominator. Find the least common denominator (LCD) to make them the same." },
          { text: "What are similar and dissimilar fractions?", answer: "Similar fractions have the same denominator, while dissimilar fractions have different denominators." },
          { text: "What are equivalent fractions?", answer: "Equivalent fractions represent the same amount, like 1/2 and 2/4." },
        ];
      case "Multiplication tips":
        return [
          { text: "How do I multiply big numbers?", answer: "Break numbers into smaller parts using distributive property: 34 × 5 = (30 × 5) + (4 × 5)." },
          { text: "What is the MDAS rule?", answer: "MDAS stands for Multiplication, Division, Addition, and Subtraction, the order of operations in math." },
        ];
      case "Word problems":
        return [
          { text: "Addition word problems", answer: "Look for keywords like 'total' or 'altogether' to identify addition operations." },
          { text: "Multiplication word problems", answer: "For repeated items or groups, multiplication is used." },
        ];
      default:
        return [];
    }
  };

  return (
    <div className="chatbuddy-container">
      {/* Chat Icon */}
      {!isOpen && (
        <div className="chatbuddy-icon" onClick={toggleChat}>
          💬
        </div>
      )}

      {/* Chat Box */}
      {isOpen && (
        <div className="chatbuddy-box">
          {/* Header */}
          <div className="chatbuddy-header">
            {/* Logo and Title */}
            <div className="chatbuddy-header-logo">
              <img
                src="/images/mathhew.png" /* Replace with your logo path */
                alt="Matthew Logo"
                className="chatbuddy-logo"
              />
              <span className="chatbuddy-title">Mathhew</span>
            </div>

            {/* Close Button */}
            <button className="chatbuddy-close-btn" onClick={toggleChat}>
              ✖
            </button>
          </div>

          {/* Messages */}
          <div className="chatbuddy-body">
            {messages.map((msg, index) => (
              <div key={index} className={`chatbuddy-message ${msg.type}`}>
                {msg.text.split("\n").map((line, i) => (
                  <React.Fragment key={i}>
                    {line}
                    <br />
                  </React.Fragment>
                ))}
              </div>
            ))}

            {/* Topic Selection */}
            {!currentTopic && (
              <div className="chatbuddy-options">
                <p>What would you like to learn about?</p>
                {["Fractions", "Multiplication tips", "Word problems"].map((topic, index) => (
                  <button
                    key={index}
                    className="chatbuddy-option-btn"
                    onClick={() => handleTopicClick(topic)}
                  >
                    {topic}
                  </button>
                ))}
              </div>
            )}

            {/* Subtopic Selection */}
            {currentTopic && !subTopic && (
              <div className="chatbuddy-options">
                <p>Choose a subtopic for {currentTopic}:</p>
                {getSubTopics().map((sub, index) => (
                  <button
                    key={index}
                    className="chatbuddy-option-btn"
                    onClick={() => handleSubTopicClick(sub)}
                  >
                    {sub.text}
                  </button>
                ))}
                <button onClick={handleReset} className="chatbuddy-option-btn">
                  Choose another topic
                </button>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="chatbuddy-footer">
            <button className="chatbuddy-reset-btn" onClick={handleReset}>
              🔄 Restart
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBuddy;
