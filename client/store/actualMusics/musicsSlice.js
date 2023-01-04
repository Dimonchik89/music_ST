import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    actualMusics: [],
    error: false,
    loading: false,
    music: null
}

const musicsSlice = createSlice({
    name: 'actualMusics',
    initialState,
    reducers: {
        selectMusics: (state, action) => {
            state.actualMusics = action.payload.map(item => ({...item, progress: 0}))
        },
        togglePlay: (state, action) => {
            state.actualMusics = state.actualMusics.map(item => {
                if(item.id === action.payload) {
                    return {...item, play: !item.play}
                }
                return item
            })
            state.music = {...state.music, play: !state.music.play}
        },
        selectMusic: (state, action) => {
            state.music = state.actualMusics?.find((item) => {
                if(item.id == action.payload) {
                    return {...item, progress: 0}
                }
            });
        },
        changeProgress: (state, action) => {
            state.music = {...state.music, progress: action.payload}
            state.actualMusics = state.actualMusics.map(item => {
                if(item.id === state.music.id) {
                    return {...item, progress: action.payload}
                } else {
                    return item
                }
            })
        },
        resetProgress: (state) => {
            state.music = {...state.music, progress: 0};
            state.actualMusics = state.actualMusics.map(item => ({...item, progress: 0}))
        },
        allStop: (state) => {
            state.actualMusics = state.actualMusics.map(item => ({...item, play: false, progress: 0}))
        }
    }
})

const { actions, reducer } = musicsSlice;
export const { selectMusics, togglePlay, allStop, selectMusic, changeProgress, resetProgress } = actions;
export default reducer;
