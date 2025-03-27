import React, { useState, useEffect } from "react";
import "../styles/TeacherAdminPage.css";

const TeacherAdminPage = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch students only
  const fetchStudents = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("http://localhost:3000/users/filter?role=student");
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
  }, []); // No dependencies since roleFilter is fixed

  return (
    <div className="admin-page-container">
      <h1 className="page-title">Teacher Dashboard</h1>

      
      {loading && <p className="loading-text">Loading...</p>}
      {error && <p className="error-text">Error: {error}</p>}

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
