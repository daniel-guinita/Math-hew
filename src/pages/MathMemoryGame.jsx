import React, { useState, useEffect } from "react";
import '../styles/MathMemoryGame.css';

const MathMemoryGame = () => {
  const [tiles, setTiles] = useState([]);
  const [flippedTiles, setFlippedTiles] = useState([]);
  const [matchedTiles, setMatchedTiles] = useState([]);
  const [disableAllTiles, setDisableAllTiles] = useState(false);

  const initializeTiles = () => {
    const numbers = [...Array(8).keys(), ...Array(8).keys()]; // 8 pairs
    return numbers.sort(() => Math.random() - 0.5); // Shuffle
  };

  useEffect(() => {
    setTiles(initializeTiles());
  }, []);

  const handleFlip = (index) => {
    if (disableAllTiles || flippedTiles.includes(index) || matchedTiles.includes(index)) return;

    const newFlippedTiles = [...flippedTiles, index];
    setFlippedTiles(newFlippedTiles);

    if (newFlippedTiles.length === 2) {
      const [firstIndex, secondIndex] = newFlippedTiles;
      if (tiles[firstIndex] === tiles[secondIndex]) {
        // Match found
        setMatchedTiles([...matchedTiles, firstIndex, secondIndex]);
        setTimeout(() => {
          setFlippedTiles([]);
        }, 1000);
      } else {
        // No match
        setDisableAllTiles(true);
        setTimeout(() => {
          setFlippedTiles([]);
          setDisableAllTiles(false);
        }, 1000);
      }
    }
  };

  return (
    <div className="memory-game-container">
      <h1 className="memory-game-title">Math Memory Game 🧠</h1>
      <p className="memory-game-instructions">
        Flip the cards to find matching pairs!
      </p>
      <div className="memory-game-grid">
        {tiles.map((tile, index) => (
          <div
            key={index}
            className={`memory-game-tile ${
              flippedTiles.includes(index) || matchedTiles.includes(index)
                ? "flipped"
                : ""
            } ${matchedTiles.includes(index) ? "matched" : ""}`}
            onClick={() => handleFlip(index)}
          >
            <div className="memory-game-tile-inner">
              <div className="memory-game-tile-front">
                <img
                  src="/images/mathhew.png"
                  alt="Tile Front"
                  className="tile-image"
                />
              </div>
              <div className="memory-game-tile-back">
                <span className="tile-number">{tile}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Math-hew mascot */}
      <img
        src="/images/mathhew.png"
        alt="Math-hew Mascot"
        className="memory-game-mascot"
      />
    </div>
  );
};

export default MathMemoryGame;
