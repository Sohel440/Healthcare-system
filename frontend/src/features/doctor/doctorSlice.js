import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchDoctorAppointments,
  markAvailability,
  updateAppointmentStatus,
} from "./doctorThunk";

const doctorSlice = createSlice({
  name: "admin",
  initialState: {
    appointments: [],
    loading: false,
    error: null,
    success: false,
    message: "",
  },
  reducers: {
    removeError: (state) => {
      state.error = null;
    },
    removeSuccess: (state) => {
      state.success = false;
    },
    removeMessage: (state) => {
      state.message = "";
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchDoctorAppointments.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchDoctorAppointments.fulfilled, (state, action) => {
        state.loading = false;
        state.appointments = action.payload;
        console.log(action.payload);
      })
      .addCase(fetchDoctorAppointments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });

    builder
      .addCase(updateAppointmentStatus.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(updateAppointmentStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.message = "Update successful";
        state.success = true;
        console.log(action.payload);
      })
      .addCase(updateAppointmentStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });

    builder
      .addCase(markAvailability.pending, (state) => {
        state.loading = true;
      })
      .addCase(markAvailability.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        console.log(action.payload);
      })
      .addCase(markAvailability.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { removeError, removeSuccess, removeMessage } =
  doctorSlice.actions;
export default doctorSlice.reducer;
