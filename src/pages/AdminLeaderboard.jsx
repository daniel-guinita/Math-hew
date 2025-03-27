import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/AdminTeacherLeaderboard.css"; // Import the CSS file

export default function AdminLeaderboard() {
  const [memoryGameData] = useState([
    { rank: 1, name: "Alice Johnson", score: 98 },
    { rank: 2, name: "Bob Smith", score: 92 },
    { rank: 3, name: "Charlie Brown", score: 88 },
    { rank: 4, name: "Diana Prince", score: 85 },
    { rank: 5, name: "Ethan Hunt", score: 82 },
  ]);

  const [speedyQuizData, setSpeedyQuizData] = useState([]); // State for Math Speedy Quiz leaderboard

  // Fetch Math Speedy Quiz scores from backend
  const fetchMathSpeedyScores = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/scores/math-speedy-scores`);
      const scores = response.data;
  
      const rankedScores = scores.map((entry, index) => ({
        rank: index + 1,
        name: `${entry.first_name} ${entry.last_name}`, // Use first_name and last_name
        schoolId: entry.school_id,
        score: entry.score,
      }));
      
  
      setSpeedyQuizData(rankedScores);
    } catch (error) {
      console.error("Error fetching Math Speedy Quiz scores:", error);
    }
  };
  

  // Fetch scores when the component mounts
  useEffect(() => {
    fetchMathSpeedyScores();
  }, []);

  const handleEdit = (entry) => {
    alert(`Editing score for ${entry.name}`);
  };

  const handleDelete = (entry) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete ${entry.name}'s entry?`);
    if (confirmDelete) {
      alert(`Deleted entry for ${entry.name}`);
    }
  };

  const renderTableRows = (data) =>
    data.map((entry, index) => (
      <tr key={index}>
        <td>{entry.rank}</td>
        <td>{entry.name} ({entry.schoolId})</td>
        <td>{entry.score}</td>
        <td className="leaderboard-actions">
          <button onClick={() => handleEdit(entry)} className="edit-btn">
            Edit
          </button>
          <button onClick={() => handleDelete(entry)} className="delete-btn">
            Delete
          </button>
        </td>
      </tr>
    ));

  return (
    <div className="leaderboard-container">
      <h1 className="leaderboard-title">Leaderboard</h1>

      <div className="leaderboard-sections">
        {/* Math Memory Game Section */}
        <div className="leaderboard-section">
          <h2 className="section-title">Math Memory Game</h2>
          <table className="leaderboard-table">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Name</th>
                <th>Score</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>{renderTableRows(memoryGameData)}</tbody>
          </table>
        </div>

        {/* Math Speedy Quiz Section */}
        <div className="leaderboard-section">
          <h2 className="section-title">Math Speedy Quiz</h2>
          <table className="leaderboard-table">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Name</th>
                <th>Score</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>{renderTableRows(speedyQuizData)}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
