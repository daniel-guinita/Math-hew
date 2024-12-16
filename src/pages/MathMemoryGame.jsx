import React, { useState, useEffect } from "react";
import "../styles/MathMemoryGame.css";

const MathMemoryGame = () => {
  const [difficulty, setDifficulty] = useState(null);
  const [tiles, setTiles] = useState([]);
  const [flippedTiles, setFlippedTiles] = useState([]);
  const [matchedTiles, setMatchedTiles] = useState([]);
  const [disableAllTiles, setDisableAllTiles] = useState(false);
  const [customGridSize, setCustomGridSize] = useState(2); // Default 2x2

  const questionsAndAnswers = [
    { question: "2 + 2", answer: "4" },
    { question: "3 + 3", answer: "6" },
    { question: "5 - 3", answer: "2" },
    { question: "6 ÷ 2", answer: "3" },
    { question: "4 x 2", answer: "8" },
    { question: "7 - 5", answer: "2" },
    { question: "9 - 4", answer: "5" },
    { question: "8 ÷ 4", answer: "2" },
    { question: "3 x 3", answer: "9" },
  ];

  const initializeTiles = (gridSize) => {
    const numTiles = gridSize * gridSize;
    const pairs = questionsAndAnswers.slice(0, numTiles / 2);
    const tilePairs = pairs.flatMap((pair) => [pair.question, pair.answer]);
    return tilePairs.sort(() => Math.random() - 0.5);
  };

  const handleGridSelection = (gridSize) => {
    setCustomGridSize(gridSize);
    setTiles(initializeTiles(gridSize));
    setDifficulty("custom");
  };

  const handleFlip = (index) => {
    if (disableAllTiles || flippedTiles.includes(index) || matchedTiles.includes(index)) return;

    const newFlippedTiles = [...flippedTiles, index];
    setFlippedTiles(newFlippedTiles);

    if (newFlippedTiles.length === 2) {
      const [firstIndex, secondIndex] = newFlippedTiles;
      if (
        (tiles[firstIndex] === tiles[secondIndex]) ||
        questionsAndAnswers.some(
          (pair) =>
            (pair.question === tiles[firstIndex] && pair.answer === tiles[secondIndex]) ||
            (pair.answer === tiles[firstIndex] && pair.question === tiles[secondIndex])
        )
      ) {
        setMatchedTiles([...matchedTiles, firstIndex, secondIndex]);
        setTimeout(() => {
          setFlippedTiles([]);
        }, 1000);
      } else {
        setDisableAllTiles(true);
        setTimeout(() => {
          setFlippedTiles([]);
          setDisableAllTiles(false);
        }, 1000);
      }
    }
  };

  useEffect(() => {
    if (matchedTiles.length === tiles.length && tiles.length > 0) {
      alert("Congratulations! You matched all the tiles!");
    }
  }, [matchedTiles, tiles]);

  const resetGame = () => {
    setDifficulty(null);
    setTiles([]);
    setFlippedTiles([]);
    setMatchedTiles([]);
    setDisableAllTiles(false);
    setCustomGridSize(2);
  };

  if (!difficulty) {
    return (
      <div className="memory-game-container">
        <h1 className="memory-game-title">Math Memory Game 🧠</h1>
        <p className="memory-game-instructions">Choose your Level of Difficulty</p>
        <div className="difficulty-buttons">
          <button onClick={() => handleGridSelection(2)}>Easy (2x2)</button>
          <button onClick={() => handleGridSelection(4)}>Medium (4x4)</button>
          <button onClick={() => handleGridSelection(6)}>Hard (6x6)</button>
        </div>
      </div>
    );
  }

  return (
    <div className="memory-game-container">
      <h1 className="memory-game-title">Math Memory Game 🧠</h1>
      <p className="memory-game-instructions">Match the math questions with their answers!</p>
      <button onClick={resetGame} className="reset-button">Reset Game</button>
      <div
        className="memory-game-grid"
        style={{
          gridTemplateColumns: `repeat(${customGridSize}, 1fr)`,
          gap: "1rem",
        }}
      >
        {tiles.map((tile, index) => (
          <div
            key={index}
            className={`memory-game-tile ${
              flippedTiles.includes(index) || matchedTiles.includes(index) ? "flipped" : ""
            } ${matchedTiles.includes(index) ? "matched" : ""}`}
            onClick={() => handleFlip(index)}
          >
            <div className="memory-game-tile-inner">
              <div className="memory-game-tile-front">
                <img src="/images/mathhew.png" alt="Tile Front" className="tile-image" />
              </div>
              <div className="memory-game-tile-back">
                <span className="tile-number">{tile}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MathMemoryGame;
