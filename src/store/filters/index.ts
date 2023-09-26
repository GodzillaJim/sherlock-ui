import { FilterOrders } from "../../generated";
import { createSlice } from "@reduxjs/toolkit";

const initialState: Partial<FilterOrders & { currentPage: number }> = {
  createdBefore: null,
  createdAfter: null,
  title: null,
  responseStatus: null,
  typeOfWork: null,
  writingStyle: null,
  currentPage: 1,
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
