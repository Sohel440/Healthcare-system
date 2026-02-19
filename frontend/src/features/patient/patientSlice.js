import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  bookAppointment,
  cancelAppointment,
  fetchAvailableDates,
  fetchAvailableSlots,
  fetchDoctors,
  fetchMyAppointments,
} from "./patientThunk";

const patientSlice = createSlice({
  name: "admin",
  initialState: {
    appointments: [],
    loading: false,
    error: null,
    success: false,
    message: "",
    doctors: [],
    availableDates: [],
    availableSlots: [],
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
      .addCase(fetchDoctors.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchDoctors.fulfilled, (state, action) => {
        state.loading = false;
        state.doctors = action.payload;
        console.log(action.payload);
      })
      .addCase(fetchDoctors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });

    builder
      .addCase(fetchMyAppointments.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchMyAppointments.fulfilled, (state, action) => {
        state.loading = false;
        state.appointments = action.payload;
        console.log(action.payload);
      })
      .addCase(fetchMyAppointments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });

    builder
      .addCase(fetchAvailableDates.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchAvailableDates.fulfilled, (state, action) => {
        state.loading = false;
        state.availableDates = action.payload;
        console.log(action.payload);
      })
      .addCase(fetchAvailableDates.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(fetchAvailableSlots.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchAvailableSlots.fulfilled, (state, action) => {
        state.loading = false;
        state.availableSlots = action.payload;
        console.log(action.payload);
      })
      .addCase(fetchAvailableSlots.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });

    builder
      .addCase(bookAppointment.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(bookAppointment.fulfilled, (state, action) => {
        state.appointments.push(action.payload);
      })
      .addCase(bookAppointment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });

    builder
      .addCase(cancelAppointment.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(cancelAppointment.fulfilled, (state, action) => {
        const index = state.appointments.findIndex(
          (appt) => appt._id === action.payload._id,
        );
        if (index !== -1) {
          state.appointments[index] = action.payload;
        }
      })
      .addCase(cancelAppointment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });
  },
});

export const { removeError, removeSuccess, removeMessage } =
  patientSlice.actions;
export default patientSlice.reducer;
