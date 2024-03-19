import { createSlice } from "@reduxjs/toolkit";
import { FilterOrders } from "../../../graphql/common";

const initialState: Partial<FilterOrders & { currentPage: number }> = {
  createdBefore: null,
  createdAfter: null,
  title: null,
  responseStatus: null,
  typeOfWork: null,
  writingStyle: null,
  currentPage: 1,
  status: null,
};

const filterSlice = createSlice({
  initialState,
  name: "Filter Slice",
  reducers: {
    setFilters: (state, action) => {
      state = { ...action.payload };
      return state;
    },
  },
});

export const { setFilters } = filterSlice.actions;
export const filterReducer = filterSlice.reducer;
