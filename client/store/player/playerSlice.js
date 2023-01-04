import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    showPlayer: false,
}

const playerSlice = createSlice({
    name: "headerSong",
    initialState,
    reducers: {
        showHeaderPlayer: state => {
            state.showPlayer = true
        },
        hideHeaderPlayer: state => {
            state.showPlayer = false
        }
    }
})

const { actions, reducer } = playerSlice;
export const { showHeaderPlayer, hideHeaderPlayer } = actions;
export default reducer