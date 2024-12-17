import React from "react";
import "../styles/Leaderboard.css";

export default function Leaderboard() {
  const memoryGameData = [
    { rank: 1, name: "Alice Johnson", score: 98 },
    { rank: 2, name: "Bob Smith", score: 92 },
    { rank: 3, name: "Charlie Brown", score: 88 },
    { rank: 4, name: "Diana Prince", score: 85 },
    { rank: 5, name: "Ethan Hunt", score: 82 },
  ];

  const speedyQuizData = [
    { rank: 1, name: "Alice Johnson", score: 96 },
    { rank: 2, name: "Charlie Brown", score: 89 },
    { rank: 3, name: "Diana Prince", score: 86 },
    { rank: 4, name: "Bob Smith", score: 84 },
    { rank: 5, name: "Ethan Hunt", score: 80 },
  ];

  return (
    <div className="leaderboard-container">
      <h1 className="leaderboard-title">🏆 Leaderboards 🏆</h1>
      <div className="leaderboard-sections">
        {/* Math Memory Game */}
        <div className="leaderboard-section">
          <h2 className="section-title">🎮 Math Memory Game</h2>
          <table className="leaderboard-table">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Name</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              {memoryGameData.map((entry, index) => (
                <tr key={index}>
                  <td>{entry.rank}</td>
                  <td>{entry.name}</td>
                  <td>{entry.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Math Speedy Quiz */}
        <div className="leaderboard-section">
          <h2 className="section-title">⚡ Math Speedy Quiz</h2>
          <table className="leaderboard-table">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Name</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              {speedyQuizData.map((entry, index) => (
                <tr key={index}>
                  <td>{entry.rank}</td>
                  <td>{entry.name}</td>
                  <td>{entry.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
