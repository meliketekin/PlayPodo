import { createSlice } from "@reduxjs/toolkit";

const tokenSlice = createSlice({
  name: "userToken",
  initialState: {
    token: null,
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    removeToken: (state) => {
      state.token = null;
    },
  },
});

export const { setToken, removeToken } = tokenSlice.actions;

export default tokenSlice;
