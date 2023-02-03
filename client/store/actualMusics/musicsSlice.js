import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    actualMusics: [],
    error: false,
    loading: false,
    music: null,
    currentTimeDublicate: 0,
    allCount: 0
}

// переделать на получение всей музыки с бека и фильтрации е селекторк

const musicsSlice = createSlice({
    name: 'actualMusics',
    initialState,
    reducers: {
        selectMusics: (state, action) => {
            state.actualMusics = action.payload.rows?.map(item => ({...item, progress: 0, play: false}));
            state.allCount = action.payload.count;
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
                    // return {...item, progress: 0, play: false}
                    return {...item, play: false}
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
            state.actualMusics = state.actualMusics.map(item => ({...item, play: false}))
        },
        cahngeCurrentTimeDublicate: (state, action) => {
            state.currentTimeDublicate = action.payload
        }
    }
})

const { actions, reducer } = musicsSlice;
export const { selectMusics, togglePlay, allStop, selectMusic, changeProgress, resetProgress, cahngeCurrentTimeDublicate } = actions;
export default reducer;
