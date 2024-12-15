import React, { useState, useEffect } from "react";
import "../styles/TeacherAdminPage.css";
import HeaderTeacher from "../components/Header";

const TeacherAdminPage = () => {
  const [students, setStudents] = useState([]);
  const [roleFilter, setRoleFilter] = useState("student"); // Default role filter
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch students based on role filter
  const fetchStudents = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(
        `http://localhost:3000/users/filter?role=${roleFilter}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch students");
      }
      const data = await response.json();
      setStudents(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, [roleFilter]);

  return (
    <div className="admin-page-container">
      <HeaderTeacher />
      <h1 className="page-title">Teacher/Admin Dashboard</h1>

      {/* Filter Section */}
      <div className="filter-section">
        <label htmlFor="role" className="filter-label">
          Filter by Role:
        </label>
        <select
          id="role"
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="filter-select"
        >
          <option value="student">Student</option>
          <option value="admin">Admin</option>
          <option value="teacher">Teacher</option>
        </select>
      </div>

      {/* Loading & Error State */}
      {loading && <p className="loading-text">Loading...</p>}
      {error && <p className="error-text">Error: {error}</p>}

      {/* Student List Table */}
      <div className="student-list">
        <h2 className="section-title">Student List</h2>
        <table className="student-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {students.length > 0 ? (
              students.map((student) => (
                <tr key={student.id}>
                  <td>{student.school_id}</td>
                  <td>{student.username}</td>
                  <td>{student.role}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="no-data-text">
                  No students found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TeacherAdminPage;
