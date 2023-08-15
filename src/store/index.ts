import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import organizationListReducer from "./slices/organizationListSlice";
const rootReducer = combineReducers({
  user: userReducer,
  organizationList: organizationListReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
