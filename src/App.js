import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { getUserRole } from "./utils/auth";
import { useDispatch } from "react-redux";
import { signInSuccess } from "./redux/user/userSlice";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import SignIn from "./pages/SignIn";
import MainPage from "./pages/MainPage";
import LessonsPage from "./pages/LessonsPage";
import MathMemoryGame from "./pages/MathMemoryGame";
import MathSpeedyQuiz from "./pages/MathSpeedyQuiz";
import Leaderboard from "./pages/Leaderboard";
import Registration from "./pages/Registration";
import ProgressTracking from "./pages/ProgressTracking";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import TeacherAdminPage from "./pages/TeacherAdminPage";
import Admin from "./pages/Admin";
import AdminUsers from "./pages/AdminUsers";
import ProtectedRoute from "./components/ProtectedRoute";
import ChatBuddy from "./components/ChatBuddy"; 
import RecentScore from "./pages/RecentScore";


function App() {
  const userRole = getUserRole();
  const dispatch = useDispatch();

  useEffect(() => {
    const savedUser = localStorage.getItem("userProfile");
    if (savedUser) {
      dispatch(signInSuccess(JSON.parse(savedUser)));
    }
  }, [dispatch]);

  // Force scroll to top on page load
  useEffect(() => {
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 5); // Delays execution to ensure it runs after page load
  }, []);

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/main-page" element={<MainPage />} />
        <Route path="/math-memory-game" element={<MathMemoryGame />} />
        <Route path="/math-speedy-quiz" element={<MathSpeedyQuiz />} />
        <Route path="/lessons-page" element={<LessonsPage userRole={userRole} />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/progress-tracking" element={<ProgressTracking />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/recent-scores" element={<RecentScore />} />

        <Route
          path="/TeacherAdminPage"
          element={
            <ProtectedRoute allowedRoles={["teacher", "admin"]}>
              <TeacherAdminPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <Admin />
            </ProtectedRoute>
          }
        />
        <Route path="/admin/admin-users" element={<AdminUsers />} />
      </Routes>
      <Footer />
      <ChatBuddy />
    </Router>
  );
}

export default App;
