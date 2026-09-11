import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: null,
  isInitialized: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
    },

    logout: (state) => {
      state.userInfo = null;
    },

    setInitialized: (state) => {
      state.isInitialized = true;
    },
  },
});

export const { setCredentials, logout, setInitialized } = authSlice.actions;

export default authSlice.reducer;