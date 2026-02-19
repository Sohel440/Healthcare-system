import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchAllAppointments, fetchUsers } from "./adminThunk";

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    users: [],
    appointments: [],
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    removeError: (state) => {
      state.error = null;
    },
    removeSuccess: (state) => {
      state.success = false;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload.data;
        console.log(action.payload);
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });

    builder
      .addCase(fetchAllAppointments.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchAllAppointments.fulfilled, (state, action) => {
        state.loading = false;
        state.appointments = action.payload.data;

        console.log(action.payload);
      })
      .addCase(fetchAllAppointments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });
  },
});

export const { removeError, removeSuccess } = adminSlice.actions;
export default adminSlice.reducer;
