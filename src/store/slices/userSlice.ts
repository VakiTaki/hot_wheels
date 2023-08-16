import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../index";
import { IUserData } from "../../ts/interfaces/data.interfaces";
import localStorageServise from "../../services/localStorage.service";

interface IUserStore {
  entities: IUserData[];
  isLoading: boolean;
  isDataLoaded: boolean;
  authId: string | null;
  isLoggedIn: boolean;
  isLoadingAuth: boolean;
}

const initialState: IUserStore = localStorageServise.getUserId()
  ? {
      entities: [],
      isLoading: true,
      isDataLoaded: false,
      authId: null,
      isLoggedIn: true,
      isLoadingAuth: true,
    }
  : {
      entities: [],
      isLoading: true,
      isDataLoaded: false,
      authId: null,
      isLoggedIn: false,
      isLoadingAuth: true,
    };

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    authRequested(state) {
      state.isLoadingAuth = true;
    },
    authRequestSuccess(state, action: PayloadAction<string>) {
      state.authId = action.payload;
      state.isLoadingAuth = false;
      state.isLoggedIn = true;
    },
    authRequestFiled(state) {
      state.isLoggedIn = false;
      state.isLoadingAuth = false;
    },
    getUsers(state, action: PayloadAction<IUserData[]>) {
      state.entities = action.payload;
    },
    removeUser(state) {},
  },
});

export const {
  getUsers,
  removeUser,
  authRequested,
  authRequestSuccess,
  authRequestFiled,
} = userSlice.actions;

export const getIsLoogedIn = () => (state: RootState) => state.user.isLoggedIn;

export default userSlice.reducer;
