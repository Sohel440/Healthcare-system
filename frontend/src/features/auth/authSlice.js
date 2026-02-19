import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loadUser, loginUser, logoutUser, updateProfile } from './authThunk'





const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loading: false,
    error: null,
    success: false,
    isAuthenticated: false,
    message:"",
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

  extraReducers: (builder)=>{

    builder.addCase(loginUser.pending , (state , action)=>{
        state.loading = true;
    }).addCase(loginUser.fulfilled , (state , action)=>{
        state.loading = false;
        state.user = action.payload.data;
        state.message = action.payload.message;
        state.isAuthenticated = true
        console.log(action.payload)
    }).addCase(loginUser.rejected, (state , action)=>{
        state.loading = false;
        state.error = action.payload.message;
    })
    

    builder
      .addCase(loadUser.pending, (state) => {
        state.loading = true;
      })

      .addCase(loadUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data;
        state.isAuthenticated = true;
      })

      .addCase(loadUser.rejected, (state) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
      });



      builder.addCase(logoutUser.pending , (state , action)=>{
        state.loading = true;
    }).addCase(logoutUser.fulfilled , (state , action)=>{
        state.loading = false;
        state.user = null;
        state.message = action.payload.message;
        state.isAuthenticated = false
        console.log(action.payload)
    }).addCase(logoutUser.rejected, (state , action)=>{
        state.loading = false;
        state.error = action.payload.message;
    })

    builder
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });


  }
});

export const {removeError , removeSuccess, removeMessage} = authSlice.actions;
export default authSlice.reducer;