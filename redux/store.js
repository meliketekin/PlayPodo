import { configureStore } from "@reduxjs/toolkit";
import answerSlice from "./slices/answerSlice";
import dashboardSlice from "./slices/dashboardSlice";
import stepSlice from "./slices/stepSlice";
import tokenSlice from "./slices/tokenSlice";

const store = configureStore({
  reducer: {
    step: stepSlice.reducer,
    userToken: tokenSlice.reducer,
    answer: answerSlice.reducer,
    dashboard: dashboardSlice.reducer,
  },
});

export default store;
