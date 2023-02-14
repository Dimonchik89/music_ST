import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    searchValue: "",
}

const searchSlice = createSlice({
    name: "search",
    initialState,
    reducers: {
        changeSearchValue: (state, action) => {
            state.searchValue = action.payload
        },
        clearSearchValue: (state) => {
            state.searchValue = ""
        }
    }
})

const { actions, reducer } = searchSlice
export const { changeSearchValue, clearSearchValue } = actions
export default reducer;