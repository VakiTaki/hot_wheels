import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../index";
import { ILocalStorage } from "../../ts/interfaces/localStorage.interfaces";

const initialState: ILocalStorage = {
  refreshToken: "",
  idToken: "",
  expiresIn: "",
  localId: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<ILocalStorage>) {
      state.refreshToken = action.payload.refreshToken;
      state.idToken = action.payload.idToken;
      state.expiresIn = action.payload.expiresIn;
      state.localId = action.payload.localId;
    },
    removeUser(state) {
      state.refreshToken = initialState.refreshToken;
      state.idToken = initialState.idToken;
      state.expiresIn = initialState.expiresIn;
      state.localId = initialState.localId;
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;

export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;
