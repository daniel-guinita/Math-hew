import React, { useState, useEffect } from "react";

const MathMemoryGame = () => {
  const [tiles, setTiles] = useState(Array(16).fill(null));
  const [flippedTiles, setFlippedTiles] = useState([]);

  const initializeTiles = () => {
    const numbers = [...Array(8).keys(), ...Array(8).keys()]; // 8 pairs
    return numbers.sort(() => Math.random() - 0.5); // Shuffle
  };

  useEffect(() => {
    setTiles(initializeTiles());
  }, []);

  const handleFlip = (index) => {
    if (flippedTiles.length === 2) return;
    setFlippedTiles([...flippedTiles, index]);

    if (flippedTiles.length === 1 && tiles[flippedTiles[0]] === tiles[index]) {
      setTimeout(() => setFlippedTiles([]), 500);
    } else if (flippedTiles.length === 1) {
      setTimeout(() => setFlippedTiles([]), 1000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-orange-50 dark:from-gray-700 dark:to-gray-900 flex flex-col items-center py-10 px-4">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">
        Math Memory Game
      </h1>
      <div className="relative">
        <div className="grid grid-cols-4 gap-4">
          {tiles.map((tile, index) => (
            <div
              key={index}
              onClick={() => handleFlip(index)}
              className={`h-36 w-36 flex items-center justify-center rounded-lg shadow-lg bg-white dark:bg-gray-700 cursor-pointer ${
                flippedTiles.includes(index) ? "bg-orange-300" : "bg-gray-300"
              }`}
            >
              {flippedTiles.includes(index) && (
                <span className="text-2xl font-bold">{tile}</span>
              )}
            </div>
          ))}
        </div>
        {/* Math-hew image positioned outside the grid */}
        <img
          src="/images/mathhew.png"
          alt="Math-hew"
          className="absolute -right-48 bottom-0 h-48 w-auto"
        />
      </div>
    </div>
  );
};

export default MathMemoryGame;
