import React from "react";
import { Link } from "react-router-dom";
import '../styles/Admin.css';

const Admin = () => {
  return (
    <div className="admin-container">
      <div className="admin-content">
        {/* Admin Header Section */}
        <div className="admin-header">
          <h1 className="admin-title">🔧 Admin Dashboard</h1>
          <p className="admin-description">
            Manage your app, users, and content efficiently! ⚙️
          </p>
        </div>

        {/* Admin Actions Section */}
        <div className="admin-actions">
            <div className="action-card">
                <h3>👤 Manage Users</h3>
                <p>Add, update, or remove user accounts.</p>
                <Link to="/admin/admin-users">
                <button className="admin-button">Manage Users</button>
                </Link>
            </div>
            <div className="action-card">
                <h3>📝 Quiz Management</h3>
                <p>Create or manage quizzes created by teachers.</p>
                <Link to="/admin/admin-quiz">
                <button className="admin-button">Manage Quizzes</button>
                </Link>
            </div>
            <div className="action-card">
                <h3>📖 Lessons Management</h3>
                <p>Create, update, or delete lessons created by teachers.</p>
                <Link to="/admin/admin-lessons">
                <button className="admin-button">Manage Lessons</button>
                </Link>
            </div>
            <div className="action-card">
                <h3>🏆 Leaderboard Management</h3>
                <p>View and manage the leaderboards for the Math Memory Game and Math Speedy Quiz.</p>
                <Link to="/admin/admin-leaderboard">
                <button className="admin-button">Manage Leaderboards</button>
                </Link>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;