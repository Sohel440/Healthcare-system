import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      
      {/* Added min-h-[80vh] to ensure the section takes up a good amount of screen space */}
      <main className="bg-gradient-to-r from-blue-50 to-blue-100 py-24 min-h-[80vh] flex items-center">
        <div className="max-w-4xl mx-auto px-6 flex flex-col items-center text-center">
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 leading-tight mb-6">
            Book Doctor Appointments <br />
            <span className="text-blue-600">Quickly & Securely</span>
          </h1>

          <p className="text-gray-600 text-lg md:text-xl mb-10 max-w-2xl">
            A modern healthcare appointment system where patients can easily
            book appointments, doctors manage availability, and admins monitor
            the platform efficiently.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center w-full sm:w-auto">
            <button 
              onClick={() => navigate("/patient/appointments")}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition font-medium" 
            >
              Book Appointment
            </button>

            <button 
              onClick={() => navigate("/patient")}
              className="border border-blue-600 text-blue-600 px-8 py-3 rounded-lg hover:bg-blue-600 hover:text-white transition font-medium" 
            >
              Explore Doctors
            </button>
          </div>

        </div>
      </main>
    </>
  );
};

export default Home;