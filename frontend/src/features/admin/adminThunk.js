import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../service/axios";

export const fetchUsers = createAsyncThunk(
  "admin/fetchUsers",
  async (data, thunkAPI) => {
    try {
      const res = await api.get("/admin/users");
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const fetchAllAppointments = createAsyncThunk(
  "admin/fetchAllAppointments",
  async (data, thunkAPI) => {
    try {
      const res = await api.get("/admin/appointments");
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);