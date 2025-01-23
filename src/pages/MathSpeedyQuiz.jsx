import React, { useState, useEffect } from "react";
import axios from "axios"; // Import Axios
import "../styles/MathSpeedyQuiz.css";

const MathSpeedyQuiz = () => {
  const questions = [
    { question: "What is 5 + 3?", options: ["6", "7", "8", "9"], correctAnswer: "8" },
    { question: "What is 9 - 4?", options: ["5", "6", "7", "8"], correctAnswer: "5" },
    { question: "What is 6 x 2?", options: ["10", "11", "12", "13"], correctAnswer: "12" },
    { question: "What is 12 ÷ 4?", options: ["1", "2", "3", "4"], correctAnswer: "3" },
    { question: "What is 15 - 6?", options: ["7", "8", "9", "10"], correctAnswer: "9" },
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showAnswerFeedback, setShowAnswerFeedback] = useState(false);
  const [timerWidth, setTimerWidth] = useState(100);
  const [showGameOver, setShowGameOver] = useState(false);
  const [showStartScreen, setShowStartScreen] = useState(true);

  const currentQuestion = questions[currentQuestionIndex];

  // Function to handle saving the score to the backend
  const saveScoreToBackend = async () => {
    const school_id = "19-2475-136"; // Replace this dynamically if needed
    const lesson_id = 1; // Replace with the correct lesson_id
    const scoreData = {
      school_id,
      lesson_id,
      score, // The current score value
    };
  
    // Validate input before sending the request
    if (!school_id || !lesson_id || score === undefined) {
      console.error("Missing required fields: school_id, lesson_id, or score");
      return;
    }
  
    try {
      const response = await axios.post("http://localhost:3000/scores", scoreData);
      console.log("Score saved successfully:", response.data);
    } catch (error) {
      console.error("Error saving score:", error.response?.data || error.message);
    }
  };
  

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
        setTimerWidth(100);
      } else {
        setShowGameOver(true);
        saveScoreToBackend(); // Save the score when the game is over
      }
    }, 1000);
  };

  const fetchScoresBySchoolId = async () => {
    const school_id = "19-2475-136"; // Replace this with dynamic school_id
  
    try {
      const response = await axios.get(
        `http://localhost:3000/scores/by-school?school_id=${school_id}`
      );
      console.log("Scores fetched:", response.data);
    } catch (error) {
      console.error("Error fetching scores:", error);
    }
  };
  
  useEffect(() => {
    fetchScoresBySchoolId();
  }, []);
  
  useEffect(() => {
    if (showStartScreen || showGameOver) return;

    const timer = setInterval(() => {
      setTimerWidth((prev) => {
        if (prev <= 0) {
          clearInterval(timer);
          setCurrentQuestionIndex((prevIndex) =>
            prevIndex < questions.length - 1 ? prevIndex + 1 : 0
          );
          setTimerWidth(100);
          return 100;
        }
        return prev - 1;
      });
    }, 100);

    return () => clearInterval(timer);
  }, [currentQuestionIndex, showStartScreen]);

  const handleRestart = () => {
    setShowGameOver(false);
    setCurrentQuestionIndex(0);
    setScore(0);
    setTimerWidth(100);
    setShowStartScreen(true);
  };

  const handleStartQuiz = () => {
    setShowStartScreen(false);
  };

  return (
    <div className="quiz-container">
      <h1 className="quiz-title">Math Speedy Quiz ⚡</h1>

      {showStartScreen ? (
        <div className="start-screen">
          <p className="start-instructions">
            Get ready to test your math skills with speed and accuracy! 
            Answer the questions before the timer runs out.
          </p>
          <button className="start-button" onClick={handleStartQuiz}>
            Start Quiz
          </button>
        </div>
      ) : !showGameOver ? (
        <>
          <div className="timer-bar">
            <div
              style={{ width: `${timerWidth}%` }}
              className={`timer-fill ${timerWidth <= 20 ? "timer-warning" : ""}`}
            ></div>
          </div>

          <div className="question-box">
            <h2 className="question">{currentQuestion.question}</h2>
            {showAnswerFeedback && (
              <p
                className={`feedback ${
                  selectedOption === currentQuestion.correctAnswer
                    ? "feedback-correct"
                    : "feedback-incorrect"
                }`}
              >
                {selectedOption === currentQuestion.correctAnswer
                  ? "Correct! 🎉"
                  : "Incorrect! 😞"}
              </p>
            )}
          </div>

          <div className="options-grid">
            {currentQuestion.options.map((option) => (
              <button
                key={option}
                onClick={() => handleOptionClick(option)}
                className={`option ${
                  selectedOption === option
                    ? option === currentQuestion.correctAnswer
                      ? "option-correct"
                      : "option-incorrect"
                    : ""
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </>
      ) : (
        <div className="game-over">
          <h2 className="game-over-title">Congratulations! 🎉</h2>
          <p className="game-over-text">
            Your final score is: <span>{score}</span> / {questions.length}
          </p>
          <button className="restart-button" onClick={handleRestart}>
            Restart Quiz
          </button>
        </div>
      )}

      {!showStartScreen && (
        <div className="score">
          Score: <span>{score}</span> / {questions.length}
        </div>
      )}
    </div>
  );
};

export default MathSpeedyQuiz;
