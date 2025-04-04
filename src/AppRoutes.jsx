import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signInSuccess } from "./redux/user/userSlice";
import { getUserRole } from "./utils/auth";

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
import RecentScore from "./pages/RecentScore";
import GamePage from "./pages/GamePage"; 

const AppRoutes = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const userRole = getUserRole();

  const hideFooter = location.pathname === "/game";

  useEffect(() => {
    const savedUser = localStorage.getItem("userProfile");
    if (savedUser) {
      dispatch(signInSuccess(JSON.parse(savedUser)));
    }
  }, [dispatch]);

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 5);
  }, []);

  return (
    <>
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
        <Route path="/game" element={<GamePage />} />


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
      {!hideFooter && <Footer />}
    </>
  );
};

export default AppRoutes;
