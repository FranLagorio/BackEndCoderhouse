import { createSlice } from "@reduxjs/toolkit";

export const loginSlice = createSlice({
  name: "login",
  initialState: {
    user: {},
    isAuth: false,
  },
  reducers: {
    setUser: (state, action) => {
      state.isAuth = true;
      state.user = action.payload;
    },
    setAuth: (state) => {
      state.isAuth = true;
    },
  },
});

export const { setUser, setAuth } = loginSlice.actions;
