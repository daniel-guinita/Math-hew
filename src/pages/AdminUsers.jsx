import React from "react";
import "../styles/AdminUsers.css";

const AdminUsers = () => {
  // Example data for users
  const users = [
    { id: 1, name: "Alice Smith", role: "Student" },
    { id: 2, name: "Bob Johnson", role: "Student" },
    { id: 3, name: "Mr. David Brown", role: "Teacher" },
    { id: 4, name: "Ms. Emma Green", role: "Teacher" },
  ];

  return (
    <div className="admin-users-container">
      <h1 className="admin-users-title">👥 Users Management</h1>
      <table className="admin-users-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.role}</td>
              <td>
                <button className="edit-button">Edit</button>
                <button className="delete-button">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUsers;
