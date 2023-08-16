import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IOrganizationListItem } from "../../ts/interfaces/data.interfaces";
import { RootState } from "..";

interface IOrganizationStore {
  entities: IOrganizationListItem[];
  isLoading: boolean;
  isDataLoaded: boolean;
}

const initialState: IOrganizationStore = {
  entities: [],
  isLoading: true,
  isDataLoaded: false,
};

const organizationListSlice = createSlice({
  name: "organizationList",
  initialState,
  reducers: {
    organizationListRequested(state) {
      state.isLoading = true;
    },
    organizationListReceved(
      state,
      action: PayloadAction<IOrganizationListItem[]>
    ) {
      state.entities = action.payload;
      state.isLoading = false;
      state.isDataLoaded = true;
    },
    organizationListFiled(state) {
      state.isLoading = false;
    },
  },
});

export const {
  organizationListRequested,
  organizationListReceved,
  organizationListFiled,
} = organizationListSlice.actions;

export const getOrganizationList = () => (state: RootState) =>
  state.organizationList.entities;

export default organizationListSlice.reducer;
