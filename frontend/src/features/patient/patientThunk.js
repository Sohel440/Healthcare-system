import {  createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../service/axios";

export const fetchDoctors = createAsyncThunk(
  "doctor/fetchDoctors",

  async (_, thunkAPI) => {
    try {
       const res = await api.get("/patient/all");
    return res.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Error"
      );
    }
  }
);

export const fetchMyAppointments = createAsyncThunk(
  "patient/fetchMyAppointments",
  async (_, { rejectWithValue }) => {
    try {
      
      const res = await api.get("/patient/appointments");
      return res.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

export const fetchAvailableDates = createAsyncThunk(
  "patient/fetchAvailableDates",
  async (doctorId, { rejectWithValue }) => {
    try {
      
      const res = await api.get(`/patient/${doctorId}/available-dates`);
      console.log(res)
      return res.data.data;
      
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

export const fetchAvailableSlots = createAsyncThunk(
  "patient/fetchAvailableSlots",
  async ({doctorId, date}, { rejectWithValue }) => {
    try {
      
      const res = await api.get(`/patient/${doctorId}/available-slots?date=${date}`);
      return res.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

export const bookAppointment = createAsyncThunk(
  "patient/bookAppointment",
  async (appointmentData, { rejectWithValue }) => {
    try {
      
      const res = await api.post(`/patient/book` , appointmentData);
      return res.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

export const cancelAppointment = createAsyncThunk(
  "patient/cancelAppointment",
  async (id, { rejectWithValue }) => {
    try {
      
      const res = await api.patch(`/patient/appointments/${id}/cancel` , {});
      return res.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);