import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../../features/auth/authSlice";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const Profile = () => {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    specialization: user?.specialization || "",
    fees: user?.fees || "",
    description: user?.description || "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(updateProfile(formData)).unwrap();
      toast.success("Profile updated!");
    } catch (error) {
      toast.error("Update failed.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-6">Update Profile</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        
        <input
          name="specialization"
          value={formData.specialization}
          onChange={handleChange}
          placeholder="Specialization (e.g. Cardiologist)"
          className="border p-2 rounded"
        />

        <input
          type="number"
          name="fees"
          value={formData.fees}
          onChange={handleChange}
          placeholder="Consultation Fees"
          className="border p-2 rounded"
        />

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description..."
          rows="3"
          className="border p-2 rounded"
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white p-2 rounded mt-2"
        >
          {loading ? "Updating..." : "Save Profile"}
        </button>

        <Link to="/doctor" className="text-center text-blue-600 mt-2">
          Back to Dashboard
        </Link>
        
      </form>
    </div>
  );
};

export default Profile;