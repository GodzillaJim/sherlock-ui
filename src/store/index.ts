import {configureStore} from "@reduxjs/toolkit";
import {filterReducer} from "./filters";

const store = configureStore({
    reducer: {
        filters: filterReducer
    }
})

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;