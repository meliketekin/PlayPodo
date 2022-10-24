import { createSlice } from "@reduxjs/toolkit";

const stepSlice = createSlice({
  name: "step",
  initialState: {
    choices: [],
    formId: "",
  },
  reducers: {
    setChoices: (state, action) => {
      state.choices = action.payload;
    },
    addChoice: (state) => {
      state.choices.push("");
    },
    deleteChoice: (state, action) => {
      state.choices.splice(action.payload, 1);
    },
    setChoice: (state, action) => {
      state.choices[action.payload.index] = action.payload.text;
    },
    setFormId: (state, action) => {
      state.formId = action.payload;
    },
    clearStep: (state) => {
      state.choices = [];
      state.formId = "";
    },
  },
});

export const {
  addChoice,
  deleteChoice,
  setChoice,
  setFormId,
  clearStep,
  setChoices,
} = stepSlice.actions;
export default stepSlice;
