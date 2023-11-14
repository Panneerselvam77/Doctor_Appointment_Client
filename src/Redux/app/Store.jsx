import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";
import { alertSlice } from "../feature/alertSlice.jsx";
import { userSlice } from "../feature/userSlice.jsx";

const rootReducer = combineReducers({
  alert: alertSlice.reducer,
  user: userSlice.reducer,
});

const store = configureStore({
  reducer: rootReducer,
});
export default store;
