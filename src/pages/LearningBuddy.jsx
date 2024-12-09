import React, { useState } from "react";
import "../styles/LearningBuddy.css";

export default function LearningBuddy() {
  const [messages, setMessages] = useState([
    { type: "bot", text: "Hi! I'm your Learning Buddy 🤖. How can I help you with math today?" },
    { type: "bot", text: "Here are some things I can help with:\n✔️ Fractions\n✔️ Multiplication tips\n✔️ Word problems\n✔️ Measurement & Geometry\n✔️ Data & Probability" },
  ]);

  const [currentTopic, setCurrentTopic] = useState(null);
  const [subTopic, setSubTopic] = useState(null);

  const handleTopicClick = (topic) => {
    setMessages([...messages,
      { type: "user", text: `I want to learn about ${topic}.` },
    ]);
    setCurrentTopic(topic);
  };

  const handleSubTopicClick = (subTopic) => {
    setSubTopic(subTopic);
    setMessages([...messages,
      { type: "user", text: subTopic.text },
      { type: "bot", text: subTopic.answer }
    ]);
  };

  const handleAskAnotherQuestion = () => {
    setMessages([...messages,
        { type: "user", text: "I want to ask another question." },
        { type: "bot", text: "I can help with more topics! What do you want to learn about?" },
        { type: "bot", text: "Here are some things I can help with:\n✔️ Fractions\n✔️ Multiplication tips\n✔️ Word problems\n✔️ Measurement & Geometry\n✔️ Data & Probability" }
      ]);
    setCurrentTopic(null);
    setSubTopic(null);
  };
  

  const handleChooseAnotherTopic = () => {
    setMessages([...messages,
      { type: "user", text: "I want to choose another topic." },
      { type: "bot", text: "What topic would you like to learn about next?" },
    ]);
    setCurrentTopic(null);
    setSubTopic(null);
  };

  const getSubTopics = () => {
    switch (currentTopic) {
      case "Fractions":
        return [
          { text: "How do I add fractions?", answer: "To add fractions, they need to have the same denominator. If they don't, we find the least common denominator (LCD) to make them the same." },
          { text: "What are similar and dissimilar fractions?", answer: "Similar fractions have the same denominator, while dissimilar fractions have different denominators." },
          { text: "What are equivalent fractions?", answer: "Equivalent fractions are fractions that represent the same amount, like 1/2 and 2/4." },
        ];
      case "Multiplication tips":
        return [
          { text: "How do I multiply big numbers?", answer: "To multiply big numbers, break them into smaller parts using distributive property, like 34 × 5 = (30 × 5) + (4 × 5)." },
          { text: "Can you explain the MDAS rule?", answer: "MDAS stands for Multiplication, Division, Addition, and Subtraction. It tells us the order of operations when solving math problems." },
          { text: "What are factors and multiples?", answer: "Factors are numbers that divide evenly into another number, and multiples are numbers that come from multiplying a number by whole numbers." },
        ];
      case "Word problems":
        return [
          { text: "Addition and subtraction word problems", answer: "For word problems, look for keywords like 'total' (for addition) or 'left' (for subtraction) to understand the operation." },
          { text: "Multiplication word problems", answer: "In multiplication word problems, look for groups or repeated items. For example, '3 groups of 5' means 3 × 5." },
          { text: "Division word problems", answer: "In division word problems, look for equal sharing or grouping. For example, '12 cookies divided among 4 friends' means 12 ÷ 4." },
        ];
      case "Measurement & Geometry":
        return [
          { text: "How do I calculate the perimeter of a figure?", answer: "To find the perimeter, add up all the sides of the shape. For a rectangle, it's length + width + length + width." },
          { text: "What are right, acute, and obtuse angles?", answer: "A right angle is 90°, an acute angle is less than 90°, and an obtuse angle is more than 90°." },
          { text: "How do I convert units?", answer: "To convert units, you can multiply or divide by the conversion factor. For example, 1 meter = 100 centimeters." },
        ];
      case "Data & Probability":
        return [
          { text: "How do I read a bar graph?", answer: "To read a bar graph, look at the height of the bars to see how much each category represents." },
          { text: "What are line graphs?", answer: "A line graph shows how something changes over time. The x-axis is usually time, and the y-axis shows the amount." },
          { text: "How do I interpret data in tables?", answer: "To read a table, find the row and column that show the information you want, then read across to see the details." },
        ];
      default:
        return [];
    }
  };

  return (
    <div className="learning-buddy-container">
      <h1 className="learning-buddy-title">🧠 Learning Buddy 🐾</h1>
  
      {/* Chat Container */}
      <div className="chat-container">
        {console.log("rendering", messages)}
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message-row ${msg.type === "bot" ? "bot-message" : "user-message"}`}
            data-actionable={msg.text}
          >
            <div className={`message-bubble ${msg.type === "bot" ? "bot-bubble" : "user-bubble"}`}>
              {msg.text}
            </div>
          </div>
        ))}
      </div>
  
      {/* Topic selection if no topic is selected */}
      {currentTopic === null && (
        <div className="example-questions">
          <h2 className="example-title">Try asking:</h2>
          <div className="example-buttons">
            {["Fractions", "Multiplication tips", "Word problems", "Measurement & Geometry", "Data & Probability"].map((topic, index) => (
              <button
                key={index}
                onClick={() => handleTopicClick(topic)}
                className="example-button"
              >
                {topic}
              </button>
            ))}
          </div>
        </div>
      )}
  
      {/* Subtopic selection if a topic is selected */}
      {currentTopic && subTopic === null && (
        <div className="example-questions">
          <h2 className="example-title">You chose: {currentTopic}</h2>
          <div className="example-buttons">
            {getSubTopics().map((sub, index) => (
              <button
                key={index}
                onClick={() => handleSubTopicClick(sub)}
                className="example-button"
              >
                {sub.text}
              </button>
            ))}
            {/* "I want to choose another topic" added as a subtopic */}
            <button
              onClick={handleChooseAnotherTopic}
              className="example-button"
            >
              I want to choose another topic.
            </button>
          </div>
        </div>
      )}
  
      {/* "I want to ask another question" button */}
      {currentTopic && subTopic && (
        <div className="example-questions">
          <div className="example-buttons">
            <button onClick={handleAskAnotherQuestion} className="example-button">
              I want to ask another question.
            </button>
          </div>
        </div>
      )}
    </div>
  );
  
}
