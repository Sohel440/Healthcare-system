import React from "react";
import { Outlet, Link } from "react-router-dom";
import Navbar from "../../components/Navbar";

const PatientDashboard = () => {
  return (
    <>
    <Navbar/>
    <div className="flex min-h-screen bg-gray-100">

      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md hidden md:block">
        <div className="p-6 text-2xl font-bold text-blue-600 border-b">
          Patient Panel
        </div>

        <ul className="p-4 space-y-4">
          <li>
            <Link to="/patient" className="hover:text-blue-600">
              Doctors
            </Link>
          </li>
          <li>
            <Link to="/patient/appointments" className="hover:text-blue-600">
              My Appointments
            </Link>
          </li>
        </ul>
      </div>

      {/* Content */}
      <div className="flex-1 p-6">
        <Outlet />
      </div>
    </div>
    </>
    
  );
};

export default PatientDashboard;
