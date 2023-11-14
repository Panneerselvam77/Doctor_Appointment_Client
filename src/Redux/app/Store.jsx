import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";
import { alertSlice } from "../feature/alertSlice.jsx";

const rootReducer = combineReducers({
  alert: alertSlice.reducer,
});

const store = configureStore({
  reducer: rootReducer,
});
export default store;
