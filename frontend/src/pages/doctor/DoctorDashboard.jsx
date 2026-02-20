import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  removeError,
  removeMessage
} from "../../features/doctor/doctorSlice";
import toast from "react-hot-toast";
import Navbar from "../../components/Navbar";
import { Outlet } from "react-router-dom";
import DoctorAvailability from "./DoctorAvailability";
import { fetchDoctorAppointments, updateAppointmentStatus } from "../../features/doctor/doctorThunk";

const DoctorDashboard = () => {
  const dispatch = useDispatch();
  const { appointments, message, error } = useSelector((state) => state.doctor);

  useEffect(() => {
    dispatch(fetchDoctorAppointments());
  }, [dispatch]);

  useEffect(() => {
    if (message) {
      toast.success(message, {
        position: "top-center",
        autoClose: 3000,
      });
      dispatch(removeMessage());
      dispatch(fetchDoctorAppointments());
    }
    if (error) {
      toast.error(error, { position: "top-center", autoClose: 3000 });
      dispatch(removeError());
    }
  }, [dispatch, message, error]);

  const handleStatusChange = (id, status) => {
    dispatch(updateAppointmentStatus({ id, status }));
  };

  const getStatusColor = (status) => {
    const s = status?.toLowerCase();
    if (s === "approved") return "bg-green-500";
    if (s === "cancelled") return "bg-red-500";
    if (s === "rejected") return "bg-gray-500";
    if (s === "completed") return "bg-blue-500";
    return "bg-yellow-500"; 
  };

  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <h1 className="text-3xl font-bold mb-8">Doctor Dashboard</h1>

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-gray-500">Total Appointments</p>
          <p className="text-3xl font-bold text-blue-600">
            {appointments?.length || 0}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-gray-500">Approved</p>
          <p className="text-3xl font-bold text-green-600">
            {
              appointments?.filter(
                (a) => a.status?.toLowerCase() === "approved",
              ).length
            }
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-gray-500">Pending</p>
          <p className="text-3xl font-bold text-yellow-600">
            {
              appointments?.filter((a) => a.status?.toLowerCase() === "pending")
                .length
            }
          </p>
        </div>
      </div>

      {/* Appointment Cards */}
      <div className="grid md:grid-cols-2 gap-6">
        {appointments?.map((appt) => (
          <div key={appt._id} className="bg-white rounded-xl shadow p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">{appt.patient?.name}</h2>

              <span
                className={`text-white text-xs px-3 py-1 rounded-full ${getStatusColor(
                  appt.status,
                )}`}
              >
                {appt.status}
              </span>
            </div>

            <p className="text-gray-600 mb-2">
              📅 {new Date(appt.date).toLocaleDateString()}
            </p>

            <p className="text-gray-600 mb-4">⏰ {appt.timeSlot}</p>

            {/* Actions */}
            <div className="flex gap-3">
              {appt.status?.toLowerCase() === "pending" && (
                <>
                  <button
                    onClick={() => handleStatusChange(appt._id, "Approved")}
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded text-sm"
                  >
                    Approve
                  </button>

                  <button
                    onClick={() => handleStatusChange(appt._id, "Rejected")}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded text-sm"
                  >
                    Reject
                  </button>
                </>
              )}

              {appt.status?.toLowerCase() === "approved" && (
                <button
                  onClick={() => handleStatusChange(appt._id, "Completed")}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded text-sm"
                >
                  Mark Completed
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {appointments?.length === 0 && (
        <p className="text-center mt-10 text-gray-500">No appointments found</p>
      )}
    </div>
      
     <DoctorAvailability/>
     
    </>
    
  );
};

export default DoctorDashboard;
