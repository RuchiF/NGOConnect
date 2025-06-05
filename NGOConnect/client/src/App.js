import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import DashboardNgo from "./pages/DashboardNgo";
import DashboardVolunteer from "./pages/DashboardVolunteer";
import DashboardAdmin from "./pages/DashboardAdmin";
import { getUser, isLoggedIn } from "./utils";
import Profile from "./pages/Profile";
import Leaderboard from "./components/Leaderboard";
function ProtectedRoute({ children, role }) {
  const user = getUser();
  if (!isLoggedIn()) return <Navigate to="/auth" />;
  if (role && user?.role !== role) return <Navigate to="/" />;
  return children;
}

function App() {
  const user = getUser();

  return (
    <div className="min-h-screen bg-bg font-inter">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route
          path="/ngo"
          element={
            <ProtectedRoute role="ngo">
              <DashboardNgo />
            </ProtectedRoute>
          }
        />
        <Route
          path="/volunteer"
          element={
            <ProtectedRoute role="volunteer">
              <DashboardVolunteer />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute role="admin">
              <DashboardAdmin />
            </ProtectedRoute>
          }
        />
        <Route
          path="/ngo/profile"
          element={
            <ProtectedRoute role="ngo">
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/ngo/leaderboard" element={<Leaderboard />} />
      </Routes>
    </div>
  );
}

export default App;
