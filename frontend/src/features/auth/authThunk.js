import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../service/axios";

export const loginUser = createAsyncThunk(
  "auth/login",
  async (data, thunkAPI) => {
    try {
      const res = await api.post("/user/login", data);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const loadUser = createAsyncThunk(
  "auth/loadUser",
  async (_, thunkAPI) => {
    try {
      const res = await api.get("/user/profile");
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(null);
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, thunkAPI) => {
    try {
      const res = await api.get("/user/logout");
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(null);
    }
  }
);

export const updateProfile = createAsyncThunk(
  "auth/updateProfile",
  async (formData, { rejectWithValue }) => {
    try {
      const {data } = await api.put(`/user/update` ,formData );
      return data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/register",
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await api.post('/user/register', formData);

      return data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);
