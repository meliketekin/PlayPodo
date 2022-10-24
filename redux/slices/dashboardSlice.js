import { createSlice } from "@reduxjs/toolkit";

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    forms: [],
    firstRender: false,
  },
  reducers: {
    setForms: (state, action) => {
      state.forms = action.payload;
    },
    deleteForm: (state, action) => {
      state.forms = state.forms.filter((form) => form.id !== action.payload);
    },
    addForm: (state, action) => {
      state.forms.push(action.payload);
    },
    clearForms: (state) => {
      state.forms = [];
    },
    setFirstRender: (state, action) => {
      state.firstRender = action.payload;
    },
  },
});

export default dashboardSlice;
export const { setForms, deleteForm, addForm, clearForms, setFirstRender } =
  dashboardSlice.actions;
