import {FilterOrders} from "../../generated";
import {createSlice} from "@reduxjs/toolkit";

const initialState: FilterOrders & { hasResponse: boolean, typeOfWork: string, writingStyle: string }= {
    createdBefore: null,
    createdAfter: null,
    title: null,
    hasResponse: false,
    typeOfWork: "all",
    writingStyle: "all"
}

const filterSlice = createSlice({
    initialState,
    name: "Filter Slice",
    reducers: {
        setFilters: (state, action) => {
            state = { ...action.payload};
            return state;
        }
    }
});

export const { setFilters } = filterSlice.actions;
export const filterReducer = filterSlice.reducer;