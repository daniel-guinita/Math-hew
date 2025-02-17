import axios from 'axios';
import { signInSuccess } from '../redux/user/userSlice';
import store from '../redux/store'; // Import Redux store

// Set the base URL dynamically using environment variables
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/users/register`, userData);
    console.log('User registered:', response.data);

    // Dispatch signInSuccess to update Redux state
    store.dispatch(signInSuccess(response.data));

    // Save user to localStorage
    localStorage.setItem('userProfile', JSON.stringify(response.data));

    return response.data;
  } catch (error) {
    console.error('Error registering user:', error.response?.data || error.message);
    throw error;
  }
};

export const signInUser = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/users/signin`, credentials);
    console.log('User signed in:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error signing in user:', error.response?.data || error.message);
    throw error;
  }
};

// Example usage (optional, remove in production)
const userData = {
  username: 'testuser',
  password: 'testpassword',
  email: 'testuser@example.com',
  first_name: 'Test',
  last_name: 'User',
  user_type: 'student',
  role: 'student',
};

// Uncomment the following line to test (use cautiously in production)
registerUser(userData);
