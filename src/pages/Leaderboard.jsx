import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Leaderboard.css"; // Import the CSS file
import { getUserRole } from "../utils/auth"; // Import function to get the user role

export default function Leaderboard() {
  const [speedyQuizData, setSpeedyQuizData] = useState([]);
  const userRole = getUserRole(); // Get user role dynamically

  // Fetch Math Speedy Quiz scores from backend
  const fetchMathSpeedyScores = async () => {
    try {
      const response = await axios.get("http://localhost:3000/scores/math-speedy-scores");
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

  return (
    <div className="leaderboard-container">
      <h1 className="leaderboard-title">Math Speedy Quiz Leaderboard</h1>
      <table className="leaderboard-table">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Score</th>
            {userRole === "teacher" || userRole === "admin" ? <th>Actions</th> : null}
          </tr>
        </thead>
        <tbody>
          {speedyQuizData.map((entry, index) => (
            <tr key={index}>
              <td>{entry.rank}</td>
              <td>{entry.name} ({entry.schoolId})</td>
              <td>{entry.score}</td>
              {(userRole === "teacher" || userRole === "admin") && (
                <td className="leaderboard-actions">
                  <button onClick={() => handleEdit(entry)} className="edit-btn">Edit</button>
                  <button onClick={() => handleDelete(entry)} className="delete-btn">Delete</button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
