import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    mobileMenu: false,
    mobileSearch: false
}

const headerSlice = createSlice({
    name: "header",
    initialState,
    reducers: {
        toggleMobileMenu: (state) => {
            state.mobileMenu = !state.mobileMenu
        },
        toggleMobileSearch: (state) => {
            state.mobileSearch = !state.mobileSearch
        }
    }
})

const { actions, reducer } = headerSlice;
export const { toggleMobileMenu, toggleMobileSearch } = actions
export default reducer