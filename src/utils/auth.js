import { jwtDecode } from "jwt-decode";

// Function to get the user role from the token
export const getUserRole = () => {
  const token = localStorage.getItem("authToken");
  if (!token) return null;

  try {
    const decoded = jwtDecode(token);
    return decoded.role; // Extract the 'role' from the token
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};

// Function to check if the user is logged in
export const isLoggedIn = () => {
    const token = localStorage.getItem("authToken");
    if (!token) return false;
  
    try {
      jwtDecode(token); // Decode the token to validate it
      return true;
    } catch (error) {
      console.error("Invalid token:", error);
      return false;
    }
  };
  

// Function to log the user out
export const logout = () => {
  localStorage.removeItem("authToken");
  localStorage.removeItem("role");
  localStorage.removeItem("user");
  window.location.href = "/"; // Redirect to login page
};
