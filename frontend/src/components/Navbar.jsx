import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import api from "../service/axios.js";
import {
  logoutUser,
  removeError,
  removeMessage,
  removeSuccess,
} from "../features/auth/authSlice.js";
import toast from "react-hot-toast";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, error, message } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (message) {
      toast.success(message, {
        position: "top-center",
        autoClose: 3000,
      });
      dispatch(removeMessage());
    }
    if (error) {
      toast.error(error, { position: "top-center", autoClose: 3000 });
      dispatch(removeError());
    }
  }, [dispatch, message, error]);

  const handleLogout = async () => {
    try {
      dispatch(logoutUser());
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold text-blue-600">
          HealthCare
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          {/* Patient Links */}
          {user?.role === "patient" && (
            <>
              <Link to="/patient" className="hover:text-blue-600">
                Doctors
              </Link>
              <Link to="/patient/appointments" className="hover:text-blue-600">
                My Appointments
              </Link>
            </>
          )}

          {/* Doctor Links */}
          {user?.role === "doctor" && (
            <>
              <Link to="/doctor" className="hover:text-blue-600">
                Dashboard
              </Link>
            </>
          )}

          {/* Admin Links */}
          {user?.role === "admin" && (
            <>
              <Link to="/admin" className="hover:text-blue-600">
                Admin Panel
              </Link>
            </>
          )}

          {/* Auth Buttons */}
          {user ? (
            <>
              <Link to={"/profile"}>
                <span className="text-gray-600">{user.name}</span>
              </Link>

              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 transition"
              >
                Login
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-gray-700"
        >
          ☰
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4 space-y-3 bg-gray-50">
          {user?.role === "patient" && (
            <>
              <Link to="/patient" className="block">
                Doctors
              </Link>
              <Link to="/patient/appointments" className="block">
                My Appointments
              </Link>
            </>
          )}

          {user?.role === "doctor" && (
            <>
              <Link to="/doctor" className="block">
                Dashboard
              </Link>
            </>
          )}

          {user?.role === "admin" && (
            <Link to="/admin" className="block">
              Admin Panel
            </Link>
          )}

          {user ? (
            <button onClick={handleLogout} className="block text-red-500">
              Logout
            </button>
          ) : (
            <Link to="/login" className="block">
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
