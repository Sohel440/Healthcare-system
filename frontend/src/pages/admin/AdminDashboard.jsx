import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../features/admin/adminSlice";
import { fetchAllAppointments } from "../../features/admin/adminSlice";
import Navbar from "../../components/Navbar";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { users, appointments, loading } = useSelector(
    (state) => state.admin
  );

  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchAllAppointments());
  }, [dispatch]);

  return (
    <>
    <Navbar/>
    <div className="flex min-h-screen bg-gray-100">

      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md hidden md:block">
        <div className="p-6 text-2xl font-bold text-blue-600 border-b">
          Admin Panel
        </div>
        <ul className="p-4 space-y-4">
          <li className="hover:text-blue-600 cursor-pointer">Dashboard</li>
          <li className="hover:text-blue-600 cursor-pointer">Users</li>
          <li className="hover:text-blue-600 cursor-pointer">Appointments</li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">

        {/* Top Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-semibold">Dashboard</h1>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-gray-500">Total Users</h2>
            <p className="text-3xl font-bold text-blue-600">
              {users?.length || 0}
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-gray-500">Total Appointments</h2>
            <p className="text-3xl font-bold text-green-600">
              {appointments?.length || 0}
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-gray-500">Doctors</h2>
            <p className="text-3xl font-bold text-purple-600">
              {users?.filter((u) => u.role === "doctor").length || 0}
            </p>
          </div>

        </div>

        {/* Users Table */}
        <div className="bg-white rounded-lg shadow mb-8 overflow-x-auto">
          <h2 className="p-4 font-semibold border-b">All Users</h2>

          <table className="min-w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
              <tr>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Email</th>
                <th className="px-6 py-3">Role</th>
              </tr>
            </thead>
            <tbody>
              {users?.map((user) => (
                <tr
                  key={user._id}
                  className="border-b hover:bg-gray-50"
                >
                  <td className="px-6 py-3">{user.name}</td>
                  <td className="px-6 py-3">{user.email}</td>
                  <td className="px-6 py-3 capitalize">
                    <span
                      className={`px-2 py-1 rounded text-white text-xs ${
                        user.role === "admin"
                          ? "bg-red-500"
                          : user.role === "doctor"
                          ? "bg-purple-500"
                          : "bg-blue-500"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Appointments Table */}
        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <h2 className="p-4 font-semibold border-b">All Appointments</h2>

          <table className="min-w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
              <tr>
                <th className="px-6 py-3">Patient</th>
                <th className="px-6 py-3">Doctor</th>
                <th className="px-6 py-3">Date</th>
                <th className="px-6 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {appointments?.map((appt) => (
                <tr
                  key={appt._id}
                  className="border-b hover:bg-gray-50"
                >
                  <td className="px-6 py-3">{appt.patient?.name}</td>
                  <td className="px-6 py-3">{appt.doctor?.name}</td>
                  <td className="px-6 py-3">
                    {new Date(appt.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-3 capitalize">
                    <span
                      className={`px-2 py-1 rounded text-white text-xs ${
                        appt.status === "approved"
                          ? "bg-green-500"
                          : appt.status === "cancelled"
                          ? "bg-red-500"
                          : "bg-yellow-500"
                      }`}
                    >
                      {appt.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
    </>
    
  );
};

export default AdminDashboard;
