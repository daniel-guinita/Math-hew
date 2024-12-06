import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import Features from "./pages/Features";
import ContactUs from "./pages/ContactUs";
import SignIn from "./pages/SignIn";
import MainPage from "./pages/MainPage";
import LessonsPage from "./pages/LessonsPage";
import MathMemoryGame from "./pages/MathMemoryGame";
import MathSpeedyQuiz from "./pages/MathSpeedyQuiz";
import LearningBuddy from "./pages/LearningBuddy";
import Leaderboard from "./pages/Leaderboard";
import Registration from "./pages/Registration";
import ProgressTracking from "./pages/ProgressTracking";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import Admin from "./pages/Admin";
import AdminUsers from "./pages/AdminUsers";
import AdminQuiz from "./pages/AdminQuiz";
import AdminLessons from "./pages/AdminLessons";
import AdminLeaderboard from "./pages/AdminLeaderboard";


function App() {
  // Simulate user role (fetch from login/authentication system)
  const [userRole, setUserRole] = useState("student"); // Can be "student", "teacher", or "admin"

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/features" element={<Features />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/main-page" element={<MainPage />} />
        <Route path="/math-memory-game" element={<MathMemoryGame />} />
        <Route path="/math-speedy-quiz" element={<MathSpeedyQuiz />} />

        {/* Pass userRole prop to LessonsPage */}
        <Route path="/lessons-page" element={<LessonsPage userRole={userRole} />} />

        <Route path="/learning-buddy" element={<LearningBuddy />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/progress-tracking" element={<ProgressTracking />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/admin-users" element={<AdminUsers />} />
        <Route path="/admin/admin-quiz" element={<AdminQuiz />} />
        <Route path="/admin/admin-lessons" element={<AdminLessons />} />
        <Route path="/admin/admin-leaderboard" element={<AdminLeaderboard />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
