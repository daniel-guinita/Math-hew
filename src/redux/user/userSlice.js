import { createSlice } from "@reduxjs/toolkit";

// Load initial state from localStorage
const savedProfile = localStorage.getItem("userProfile")
  ? JSON.parse(localStorage.getItem("userProfile"))
  : null;

const initialState = {
  currentUser: savedProfile || null, // Use localStorage data if available
  users: [],
  error: null,
  loading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;

      // Save signed-in user to localStorage
      localStorage.setItem("userProfile", JSON.stringify(action.payload));
    },
    signInFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    
      console.log("Saving updated profile to localStorage:", action.payload);
      localStorage.setItem("userProfile", JSON.stringify(action.payload));
    },
    updateFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    signoutSuccess: (state) => {
      state.currentUser = null;
      state.error = null;
      state.loading = false;

      // Remove user data from localStorage
      localStorage.removeItem("userProfile");
    },
    fetchUsersSuccess: (state, action) => {
      state.users = action.payload;
    },
    addUserStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    addUserSuccess: (state, action) => {
      state.users.push(action.payload);
      state.loading = false;
      state.error = null;
    },
    addUserFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteUserStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    deleteUserSuccess: (state, action) => {
      state.users = state.users.filter((user) => user._id !== action.payload);
      state.loading = false;
      state.error = null;
    },
    deleteUserFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  signInStart,
  signInSuccess,
  signInFailure,
  updateStart,
  updateSuccess,
  updateFailure,
  signoutSuccess,
  fetchUsersSuccess,
  addUserStart,
  addUserSuccess,
  addUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
} = userSlice.actions;

export default userSlice.reducer;
