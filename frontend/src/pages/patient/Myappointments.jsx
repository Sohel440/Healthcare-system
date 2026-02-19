import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cancelAppointment, fetchMyAppointments } from "../../features/patient/patientThunk";


const MyAppointments = () => {
  const dispatch = useDispatch();
  const { appointments } = useSelector((state) => state.patient);

  useEffect(() => {
    dispatch(fetchMyAppointments());
  }, [dispatch]);

  const cancelAppointmentHandler = async (id)=>{
    await dispatch(cancelAppointment(id))
    dispatch(fetchMyAppointments());
  }

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">My Appointments</h1>

      <div className="bg-white border border-gray-200 rounded-lg overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50 border-b border-gray-200 text-sm text-gray-600">
            <tr>
              <th className="px-6 py-4 font-medium">Doctor</th>
              <th className="px-6 py-4 font-medium">Date</th>
              <th className="px-6 py-4 font-medium">Slot</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium">Action</th>
            </tr>
          </thead>

          <tbody className="text-sm text-gray-700">
            {appointments?.map((appt) => (
              <tr key={appt._id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="px-6 py-4 flex items-center gap-2 ">
                     <span className="h-10 w-10 flex-shrink-0 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold border border-blue-200">{(appt.doctor?.name?.charAt(0))} </span>
                   <span> {appt.doctor?.name}</span>
                </td>
                
                <td className="px-6 py-4">
                  {new Date(appt.date).toLocaleDateString()}
                </td>
                
                <td className="px-6 py-4">{appt.timeSlot}</td>
                
                <td className="px-6 py-4 capitalize">
                  <span className={`font-medium ${
                    appt.status?.toLowerCase() === "pending" ? "text-yellow-600" :
                    appt.status?.toLowerCase() === "confirmed" ? "text-green-600" :
                    appt.status?.toLowerCase() === "cancelled" ? "text-red-600" : "text-gray-600"
                  }`}>
                    {appt.status}
                  </span>
                </td>
                
                <td className="px-6 py-4">
                  {appt.status?.toLowerCase() === "pending" && (
                    <button
                      onClick={()=>cancelAppointmentHandler(appt._id)}
                      className="text-red-500 hover:text-red-700 font-medium transition-colors"
                    >
                      Cancel
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Minimal Empty State */}
        {(!appointments || appointments.length === 0) && (
          <div className="p-8 text-center text-gray-500">
            No appointments found.
          </div>
        )}
      </div>
    </div>
  );
};

export default MyAppointments;