import React, { useState, useEffect } from "react";

const MathSpeedyQuiz = () => {
  const questions = [
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
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showAnswerFeedback, setShowAnswerFeedback] = useState(false);
  const [timerWidth, setTimerWidth] = useState(100);

  const currentQuestion = questions[currentQuestionIndex];

  // Handle option selection
  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setShowAnswerFeedback(true);
    if (option === currentQuestion.correctAnswer) {
      setScore(score + 1);
    }

    setTimeout(() => {
      setShowAnswerFeedback(false);
      setSelectedOption(null);
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setTimerWidth(100); // Reset timer
      } else {
        alert(`Quiz Complete! Your score is ${score + 1}/${questions.length}`);
        setCurrentQuestionIndex(0);
        setScore(0);
      }
    }, 1000);
  };

  // Timer functionality
  useEffect(() => {
    const timer = setInterval(() => {
      setTimerWidth((prev) => {
        if (prev <= 0) {
          clearInterval(timer);
          setCurrentQuestionIndex((prevIndex) =>
            prevIndex < questions.length - 1 ? prevIndex + 1 : 0
          );
          setTimerWidth(100); // Reset timer
          return 100;
        }
        return prev - 1;
      });
    }, 100);

    return () => clearInterval(timer);
  }, [currentQuestionIndex]);

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 dark:bg-gray-800 p-4">
      <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
        Math Speedy Quiz
      </h1>

      {/* Timer Bar */}
      <div className="w-full max-w-4xl h-4 bg-gray-300 rounded-full overflow-hidden mb-6">
        <div
          style={{ width: `${timerWidth}%` }}
          className="h-full bg-blue-500 transition-all duration-100 linear"
        ></div>
      </div>

      {/* Question Section */}
      <div className="w-full max-w-4xl bg-white dark:bg-gray-700 shadow-xl rounded-lg p-8 mb-4 text-center">
        <h2 className="text-3xl font-semibold text-gray-800 dark:text-white mb-2">
          {currentQuestion.question}
        </h2>
        {showAnswerFeedback && (
          <p
            className={`text-2xl font-semibold ${
              selectedOption === currentQuestion.correctAnswer
                ? "text-green-500"
                : "text-red-500"
            }`}
          >
            {selectedOption === currentQuestion.correctAnswer
              ? "Correct!"
              : "Incorrect!"}
          </p>
        )}
      </div>

      {/* Answer Options Section */}
      <div className="relative w-full max-w-4xl grid grid-cols-2 gap-4 mt-6">
        {currentQuestion.options.map((option) => (
          <button
            key={option}
            onClick={() => handleOptionClick(option)}
            className={`p-12 text-2xl rounded-lg font-semibold text-white ${
              selectedOption === option
                ? option === currentQuestion.correctAnswer
                  ? "bg-green-500"
                  : "bg-red-500"
                : "bg-orange-500 hover:bg-orange-600"
            } transition duration-300`}
          >
            {option}
          </button>
        ))}
        
        {/* Math-hew Mascot Image */}
        <img
          src="/images/mathhew.png"
          alt="Math-hew Mascot"
          className="absolute -right-20 bottom-10 w-32 h-32"
        />
      </div>

      {/* Score Display */}
      <div className="text-2xl font-bold text-gray-700 dark:text-gray-300 mt-8">
        Score: {score}/{questions.length}
      </div>
    </div>
  );
};

export default MathSpeedyQuiz;
