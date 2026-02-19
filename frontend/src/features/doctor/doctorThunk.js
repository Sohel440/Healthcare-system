import {  createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../service/axios";

export const fetchDoctorAppointments = createAsyncThunk(
  "doctor/fetchDoctorAppointments",
  async () => {
    const res = await api.get("/doctor/appointments");
    return res.data.data;
  }
);

export const updateAppointmentStatus = createAsyncThunk(
  "doctor/updateStatus",
  async ({ id, status }) => {
    const res = await api.patch(`/doctor/appointments/${id}`, {
      status,
    });
    return res.data.data;
  }
);

export const markAvailability = createAsyncThunk(
  "doctor/availability",
  async (data, thunkAPI) => {
    try {
      const res = await api.post("/doctor/available", data);
      return res.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Error"
      );
    }
  }
);