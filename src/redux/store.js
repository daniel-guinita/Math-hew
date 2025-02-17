import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./theme/themeSlice";
import userReducer from "./user/userSlice";

// Load user data from localStorage
const loadFromLocalStorage = () => {
  try {
    const savedUser = localStorage.getItem("userProfile");
    return savedUser ? JSON.parse(savedUser) : null; // Parse user data or set null
  } catch (error) {
    console.error("Error loading from localStorage:", error);
    return null;
  }
};

const preloadedState = {
  user: {
    currentUser: loadFromLocalStorage(), // Load from storage
    users: [],
    loading: false,
    error: null,
  },
};

const store = configureStore({
  reducer: {
    theme: themeReducer,
    user: userReducer,
  },
  preloadedState, // Load preloadedState
});

export default store;
