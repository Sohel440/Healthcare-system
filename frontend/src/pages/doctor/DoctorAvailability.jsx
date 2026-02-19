import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { markAvailability } from "../../features/doctor/doctorSlice";
import toast from "react-hot-toast";

const DoctorAvailability = () => {
  const dispatch = useDispatch();

  const [date, setDate] = useState("");
  const [isAvailable, setIsAvailable] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!date) {
      toast.error("Please select a date");
      return;
    }

    try {
      // Add await and .unwrap() so the try/catch actually catches backend errors
      await dispatch(markAvailability({ date, isAvailable })).unwrap();
      
      toast.success(`Availability for ${date} successfully updated`);
      
      // Clear the form after a successful save
      setDate("");
      setIsAvailable(true);
      
    } catch (error) {
      // Safely grab the error message, or show a fallback
      toast.error(error?.message || "Failed to save availability");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex flex-col justify-center items-center">
      
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Manage Availability</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 w-full max-w-md flex flex-col gap-6"
      >
        {/* Date Input */}
        <div className="flex flex-col gap-2">
          <label className="font-medium text-gray-700">Select Date</label>
          <input
            type="date"
            required
            className="border border-gray-300 p-2 rounded focus:outline-blue-500"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            min={new Date().toISOString().split("T")[0]} // Prevents picking past dates
          />
        </div>

        {/* Availability Toggle */}
        <div className="flex items-center justify-between">
          <span className="font-medium text-gray-700">Status</span>
          
          <button
            type="button"
            onClick={() => setIsAvailable(!isAvailable)}
            className={`px-4 py-2 rounded font-medium transition-colors ${
              isAvailable 
                ? "bg-green-100 text-green-700 hover:bg-green-200" 
                : "bg-red-100 text-red-700 hover:bg-red-200"
            }`}
          >
            {isAvailable ? "Available" : "Not Available"}
          </button>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-medium py-2 rounded hover:bg-blue-700 mt-2"
        >
          Save Availability
        </button>
        
      </form>
    </div>
  );
};

export default DoctorAvailability;