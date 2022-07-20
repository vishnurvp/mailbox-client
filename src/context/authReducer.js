import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
  isAuthenticated: false,
  idToken: '',
  email: '',
  cleanEmail: '',
  isEmailVerified: false,
};

const authSlice = createSlice({
  name: "authentication",
  initialState: initialAuthState,
  reducers: {
    login(state, action) {
      state.isAuthenticated = true;
      state.idToken = action.payload;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.idToken = '';
      state.email = '';
      state.cleanEmail = '';
      state.isEmailVerified = '';
    },
    setEmail(state, action) {
      state.email = action.payload;
    },
    setCleanEmail(state, action) {
      state.cleanEmail = action.payload;
    },
    setIsEmailVerified(state, action) {
      state.isEmailVerified = action.payload;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;