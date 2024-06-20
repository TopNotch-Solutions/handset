import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  user: {},
  role: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.role = action.payload.role;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = {};
      state.role = null;
    },
    updateProfileImage: (state, action) => {
      state.user.ProfileImage = action.payload.ProfileImage;
    },
  },
});

export const {login, logout, updateProfileImage} = authSlice.actions;
export default authSlice.reducer;
