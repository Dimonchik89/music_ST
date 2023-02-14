import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import useHttp from '../../hooks/useHttp';

const initialState = {
    actualMusics: [],
    error: false,
    loading: false,
    music: null,
    currentTimeDublicate: 0,
    allCount: 0,
    currentPage: 1,
    limit: +process.env.NEXT_PUBLIC_SOUND_LIMIT,
    songIsDownloading: null
}

export const fetchMusic = createAsyncThunk(
    "music/fetchMusic",
    (url) => {
        const {getData} = useHttp(url)
        return getData()
    }
)

export const fetchPaginationMusic = createAsyncThunk(
    "music/fetchPaginationMusic",
    (url) => {
        const {getData} = useHttp(url)
        return getData()
    }
)

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
            state.music = {...state.music, play: !state.music?.play}
        },
        stopMusic: (state, action) => {
            state.actualMusics = state.actualMusics.map(item => {
                if(item.id === action.payload) {
                    return {...item, play: false}
                }
                return item
            })
            state.music = {...state.music, play: false}
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
        },
        deleteMusic: (state, action) => {
            state.actualMusics = state.actualMusics.filter(item => item.id !== action.payload)
        },
        setSongIsDownloading: (state, action) => {
            state.songIsDownloading = action.payload
        },
        addMusic: (state, action) => {
            const downloadMusic = action.payload.rows?.map(item => ({...item, progress: 0, play: false}));
            state.actualMusics = [...state.actualMusics, ...downloadMusic]
        },
        changeCurrentPage: (state, action) => {
            state.currentPage = action.payload
        },
        incrementPage: (state) => {
            if(Math.ceil(state.allCount / process.env.NEXT_PUBLIC_SOUND_LIMIT)) {
                state.currentPage = state.currentPage + 1
            }
        },
        changeLimit: (state, actions) => {
            state.limit = actions.payload
        }
    },
    extraReducers: builder => {
        builder
            .addCase(fetchMusic.pending, state => {
                state.loading = true;
                state.error = false;
            })
            .addCase(fetchMusic.fulfilled, (state, action) => {
                state.loading = false;
                state.actualMusics = action.payload?.rows;
                state.allCount = action.payload?.count;
            })
            .addCase(fetchMusic.rejected, state => {
                state.loading = false;
                state.error = true;
            })
            // .addCase(fetchPaginationMusic.pending, state => {
            //     state.loading = true;
            //     state.error = false;
            // })
            // .addCase(fetchPaginationMusic.fulfilled, (state, action) => {
            //     state.loading = false;
            //     const downloadMusic = action.payload.rows?.map(item => ({...item, progress: 0, play: false}));
            //     console.log('downloadMusic', action.payload);
            //     console.log('state.actualMusics', state.actualMusics);
            //     state.actualMusics = [...state.actualMusics, ...downloadMusic];
            // })
            // .addCase(fetchPaginationMusic.rejected, state => {
            //     state.loading = false;
            //     state.error = true;
            // })
    }
})

const { actions, reducer } = musicsSlice;
export const { selectMusics, togglePlay, stopMusic, allStop, selectMusic, changeProgress, resetProgress, cahngeCurrentTimeDublicate, deleteMusic, setSongIsDownloading, addMusic, incrementPage, changeCurrentPage, changeLimit } = actions;
export default reducer;
