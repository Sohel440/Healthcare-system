import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAvailableDates,
  fetchAvailableSlots,
  bookAppointment,
} from "../../features/patient/patientSlice";
import toast from "react-hot-toast";

const DoctorAvailability = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { availableDates, availableSlots } = useSelector(
    (state) => state.patient
  );

  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    dispatch(fetchAvailableDates(id));
  }, [dispatch, id]);

  const handleDateClick = (date) => {
    setSelectedDate(date);
    dispatch(fetchAvailableSlots({ doctorId: id, date }));
  };

  const handleBook = async (timeSlot) => {
    try {
      // 1. Add "await" so the app waits for the booking to finish first
      await dispatch(
        bookAppointment({
          doctorId: id,
          date: selectedDate,
          timeSlot,
        })
      );

      toast.success("Booking successful, check history", {
        position: "top-center",
      });
      
      // 2. Use "selectedDate" instead of the undefined "date" variable
      dispatch(fetchAvailableSlots({ doctorId: id, date: selectedDate }));
      
    } catch (error) {
      toast.error("Booking failed");
      console.log(error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Select Date</h1>

      {/* Dates Container */}
      <div className="flex flex-wrap gap-3 mb-8">
        {availableDates?.map((d) => (
          <button
            key={d._id}
            onClick={() => handleDateClick(d.date)}
            className="px-4 py-2 bg-blue-100 text-blue-900 rounded hover:bg-blue-200"
          >
            {new Date(d.date).toLocaleDateString()}
          </button>
        ))}
      </div>

      {/* Slots Container (Only shows if a date is selected) */}
      {selectedDate && (
        <div>
          <h2 className="text-xl font-semibold mb-3">Available Slots</h2>

          <div className="flex flex-wrap gap-3">
            {availableSlots?.map((slot, index) => (
              <button
                key={index}
                onClick={() => handleBook(slot)}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                {slot}
              </button>
            ))}
          </div>

          {/* Simple message if no slots are left */}
          {availableSlots?.length === 0 && (
            <p className="text-gray-500 mt-2">No slots left for this date.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default DoctorAvailability;