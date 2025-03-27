import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/RecentScore.css";
import { getUserRole } from "../utils/auth";

export default function RecentScores() {
  const [lessonScores, setLessonScores] = useState([]);
  const [gameScores, setGameScores] = useState([]);
  const userRole = getUserRole();
  const schoolId = JSON.parse(localStorage.getItem("userProfile"))?.school_id;

  useEffect(() => {
    const fetchScores = async () => {
      try {
        if (userRole === "student") {
          const res = await axios.get(`${process.env.REACT_APP_API_URL}/scores/by-student/${schoolId}`);
          setLessonScores(res.data || []);
          // TODO: add endpoint for game scores
          setGameScores([]); // placeholder
        } else {
          const resLesson = await axios.get(`${process.env.REACT_APP_API_URL}/scores/all-lessons`);
const resGames = await axios.get(`${process.env.REACT_APP_API_URL}/scores/all-games`);
          setLessonScores(resLesson.data || []);
          setGameScores(resGames.data || []);
        }
      } catch (err) {
        console.error("Failed to fetch scores:", err);
      }
    };

    fetchScores();
  }, [userRole, schoolId]);

  const renderTable = (scores, type) => (
    <div className="recent-scores-section">
      <h2>{type} Scores</h2>
      <table className="recent-scores-table">
        <thead>
          <tr>
            {userRole !== "student" && <th>Student</th>}
            <th>Title</th>
            <th>Score</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {scores.length === 0 ? (
            <tr>
              <td colSpan={userRole !== "student" ? 4 : 3} className="no-scores">No recent scores found.</td>
            </tr>
          ) : (
            scores.map((s, index) => (
              <tr key={index}>
                {userRole !== "student" && <td>{s.school_id}</td>}
                <td>{s.lesson?.title || s.game_name || "Untitled"}</td>
                <td>{s.score}</td>
                <td>{new Date(s.created_at).toLocaleString()}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="recent-scores-container">
      <h1 className="recent-scores-title">Your Recent Scores</h1>
      <div className="score-columns">
        {renderTable(lessonScores, "Lesson")}
        {renderTable(gameScores, "Game")}
      </div>
    </div>
  );
}
