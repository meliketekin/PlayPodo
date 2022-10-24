import { createSlice } from "@reduxjs/toolkit";

const answerSlice = createSlice({
  name: "answer",
  initialState: {
    answers: [],
  },
  reducers: {
    setAnswers: (state, action) => {
      state.answers.push(action.payload);
    },
    clearAnswers: (state) => {
      state.answers = [];
    },
  },
});

export default answerSlice;

export const { setAnswers, clearAnswers } = answerSlice.actions;
