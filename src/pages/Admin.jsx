import React from "react";
import { Link } from "react-router-dom";
import '../styles/Admin.css';

const Admin = () => {
  return (
    <div className="admin-container">
      <header className="admin-header">
        <h1 className="admin-title">Admin Dashboard</h1>
        <p className="admin-description">
          Oversee and manage all aspects of <strong>Math-hew</strong> efficiently!
        </p>
      </header>

      <main className="admin-actions">
        <div className="action-card">
          <h3>👤 Manage Users</h3>
          <p>Oversee student and teacher accounts.</p>
          <Link to="/admin/admin-users">
            <button className="admin-button">Go to Users</button>
          </Link>
        </div>

        <div className="action-card">
          <h3>📖 Lessons Management</h3>
          <p>Organize lessons that make math exciting.</p>
          <Link to="/admin/admin-lessons">
            <button className="admin-button">Go to Lessons</button>
          </Link>
        </div>

        <div className="action-card">
          <h3>🏆 Leaderboard</h3>
          <p>Track student performance and top scores.</p>
          <Link to="/admin/admin-leaderboard">
            <button className="admin-button">View Leaderboard</button>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Admin;
