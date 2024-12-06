import React, { useState } from "react";
<<<<<<< Updated upstream
import "../styles/TeacherAdminPage.css";
import Header from "../components/HeaderTeacher";

const TeacherDashboard = () => {
=======
import Header from "../components/HeaderTeacher";
import "../styles/TeacherAdminPage.css";

const TeacherAdminPage = () => {
>>>>>>> Stashed changes
  const [students, setStudents] = useState([
    { id: 1, name: "John Doe", grade: "A" },
    { id: 2, name: "Jane Smith", grade: "B" },
    { id: 3, name: "Michael Brown", grade: "A" },
  ]);
  const [editingStudent, setEditingStudent] = useState(null);
  const [editedName, setEditedName] = useState("");
  const [editedGrade, setEditedGrade] = useState("");

  const handleDelete = (id) => {
    setStudents(students.filter((student) => student.id !== id));
  };

  const handleEdit = (student) => {
    setEditingStudent(student.id);
    setEditedName(student.name);
    setEditedGrade(student.grade);
  };

  const handleSave = () => {
    setStudents((prev) =>
      prev.map((student) =>
        student.id === editingStudent
          ? { ...student, name: editedName, grade: editedGrade }
          : student
      )
    );
    setEditingStudent(null);
  };

  return (
    <div className="admin-page-container">
      <Header />
      <h1 className="text-4xl font-bold text-yellow-300 mb-4">Teacher/Admin Dashboard</h1>

      {/* Student List Section */}
      <div className="student-list">
<<<<<<< Updated upstream
        <h2 className="section-title">Student List</h2>
=======
        <h2 className="text-4xl font-bold text-yellow-300 mb-4">Student List</h2>
>>>>>>> Stashed changes
        <table className="student-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Grade</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id}>
                <td>{student.id}</td>
                <td>
                  {editingStudent === student.id ? (
                    <input
                      type="text"
                      value={editedName}
                      onChange={(e) => setEditedName(e.target.value)}
                      className="edit-input"
                    />
                  ) : (
                    student.name
                  )}
                </td>
                <td>
                  {editingStudent === student.id ? (
                    <input
                      type="text"
                      value={editedGrade}
                      onChange={(e) => setEditedGrade(e.target.value)}
                      className="edit-input"
                    />
                  ) : (
                    student.grade
                  )}
                </td>
                <td>
                  {editingStudent === student.id ? (
                    <button
                      onClick={handleSave}
                      className="action-button save-button"
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      onClick={() => handleEdit(student)}
                      className="action-button edit-button"
                    >
                      Edit
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(student.id)}
                    className="action-button delete-button"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

<<<<<<< Updated upstream
export default TeacherDashboard;
=======
export default TeacherAdminPage;
>>>>>>> Stashed changes
