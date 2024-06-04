import { createSlice } from "@reduxjs/toolkit";

const MAX_ITEMS = 2;

const searchSlice = createSlice({
    name: "search",
    initialState: {
        results: [],
    },
    reducers: {
        cacheResults: (state, action) => {
            const newResults = action.payload;
            // Concatenate the new results with the existing ones
            state.results = state.results.concat(newResults);
            // If the number of items exceeds the maximum limit, remove items from the top
            if (state.results.length > MAX_ITEMS) {
                state.results = state.results.slice(state.results.length - MAX_ITEMS);
            }
        }
    }
});

export const { cacheResults } = searchSlice.actions;
export default searchSlice.reducer;