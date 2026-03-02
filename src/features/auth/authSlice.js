import { createSlice } from "@reduxjs/toolkit";

// ✅ Restore user from localStorage on page refresh
const storedUser = localStorage.getItem("user");

const initialState = {
  user:        storedUser ? JSON.parse(storedUser) : null,
  accessToken: localStorage.getItem("access_token") || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.accessToken = action.payload.access_token;
      localStorage.setItem("access_token", action.payload.access_token);
    },
    setUser: (state, action) => {
      state.user = action.payload;
      // ✅ Persist user so it survives page refresh
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.user        = null;
      state.accessToken = null;
      localStorage.removeItem("access_token");
      localStorage.removeItem("user");         // ✅ clear user on logout
    },
  },
});

export const { setCredentials, setUser, logout } = authSlice.actions;
export default authSlice.reducer;