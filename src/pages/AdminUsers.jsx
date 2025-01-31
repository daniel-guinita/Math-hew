import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/AdminUsers.css";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedRole, setSelectedRole] = useState("all"); 
  const [selectedUser, setSelectedUser] = useState(null);

  // Fetch all users on component load
  useEffect(() => {
    fetchUsers();
  }, []);

  // Function to fetch users from backend
  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:3000/users");
      setUsers(response.data);
      setFilteredUsers(response.data); // Initialize filtered users
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // Dropdown filter handler
  const handleRoleChange = (event) => {
    const role = event.target.value;
    setSelectedRole(role);

    if (role === "all") {
      setFilteredUsers(users); // Show all users
    } else {
      const filtered = users.filter((user) => user.role === role);
      setFilteredUsers(filtered); // Filter by role
    }
  };

  // Function to delete a user
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        const response = await axios.delete(`http://localhost:3000/users/${id}`);
        console.log(response.data); // Log response for debugging
        fetchUsers(); // Refresh user list
        alert("User deleted successfully!");
      } catch (error) {
        console.error("Error deleting user:", error.response?.data || error.message);
        alert("Failed to delete user.");
      }
    }
  };

  // Function to view user details
  const handleViewDetails = async (id) => {
    try {
      const response = await axios.get(`http://localhost:3000/users/${id}`);
      setSelectedUser(response.data);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  // Close user details modal
  const closeDetails = () => {
    setSelectedUser(null);
  };

  return (
    <div className="admin-users-container">
      <h1 className="admin-users-title"> Users Management</h1>

       {/* Dropdown Role Filter */}
       <div className="dropdown-filter">
        <label htmlFor="roleFilter">Filter by Role: </label>
        <select id="roleFilter" value={selectedRole} onChange={handleRoleChange}>
          <option value="all">All</option>
          <option value="student">Student</option>
          <option value="admin">Admin</option>
          <option value="teacher">Teacher</option>
        </select>
      </div>

      {/* Users Table */}
      <table className="admin-users-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <button
                  className="view-button"
                  onClick={() => handleViewDetails(user.id)}
                >
                  View Details
                </button>
                <button
                  className="delete-button"
                  onClick={() => handleDelete(user.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* User Details Modal */}
      {selectedUser && (
        <div className="user-details-modal">
          <div className="modal-content">
            <h2>User Details</h2>
            <p><strong>ID:</strong> {selectedUser.id}</p>
            <p><strong>Username:</strong> {selectedUser.username}</p>
            <p><strong>Email:</strong> {selectedUser.email}</p>
            <p><strong>Role:</strong> {selectedUser.role}</p>
            <p><strong>Birthday:</strong> {selectedUser.birthday || "N/A"}</p>
            <p><strong>School ID:</strong> {selectedUser.school_id || "N/A"}</p>
            <button onClick={closeDetails} className="close-button">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUsers;
