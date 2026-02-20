import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import { useDispatch } from "react-redux";
import ProtectedRoute from "./routes/ProtectedRoute";
import AdminDashboard from "./pages/admin/AdminDashboard";
import { Toaster } from "react-hot-toast";
import DoctorDashboard from "./pages/doctor/DoctorDashboard";
import DoctorAvailability from "./pages/patient/DoctorAvailability";

import PatientDashboard from "./pages/patient/PatientDashboard";
import DoctorList from "./pages/patient/DoctorList";
import MyAppointments from "./pages/patient/Myappointments";
import Profile from "./pages/auth/Profile";
import { loadUser } from "./features/auth/authThunk";
import Home from "./pages/Home/Home";
const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Home />} />

          <Route
            path="/patient"
            element={
              <ProtectedRoute role="patient">
                <PatientDashboard />
              </ProtectedRoute>
            }
          >
            <Route index element={<DoctorList />} />
            <Route path="appointments" element={<MyAppointments />} />
            <Route path=":id" element={<DoctorAvailability />} />
          </Route>

          <Route
            path="/admin"
            element={
              <ProtectedRoute role="admin">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/doctor"
            element={
              <ProtectedRoute role="doctor">
                <DoctorDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute role="doctor">
                <Profile />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>

      <Toaster />
    </div>
  );
};

export default App;
