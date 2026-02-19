import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDoctors } from "../../features/patient/patientSlice";
import { useNavigate } from "react-router-dom";

const DoctorList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { doctors, loading } = useSelector((state) => state.patient);
  
  const capitalize = (text) =>
    text ? text.charAt(0).toUpperCase() + text.slice(1) : "";

  useEffect(() => {
    dispatch(fetchDoctors());
  }, [dispatch]);

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Available Doctors</h1>

      {loading ? (
        <div className="text-gray-500 py-4">Loading doctors...</div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {doctors?.map((doctor) => (
              <div
                key={doctor._id}
                className="bg-white border border-gray-200 rounded-xl p-5 flex flex-col hover:border-blue-400 transition-colors"
              >
                <div className="flex-grow">

                  <h2 className="text-lg font-semibold text-gray-800 tracking-wide">
                   
                    {doctor.name?.toUpperCase()}
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">
                    {capitalize(doctor.specialization)}
                  </p>
                </div>

                <button
                  onClick={() => navigate(`/patient/${doctor._id}`)}
                  className="mt-6 w-full py-2 px-4 rounded-lg text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 transition-colors"
                >
                  View Availability
                </button>
              </div>
            ))}
          </div>

          {/* Minimal Empty State */}
          {(!doctors || doctors.length === 0) && (
            <div className="p-8 text-center text-gray-500 border border-gray-200 rounded-xl bg-white">
              No doctors available at the moment.
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default DoctorList;