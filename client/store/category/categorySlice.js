import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import useHttp from "../../hooks/useHttp";

const initialState = {
    allCategory: null,
    actualCategoryId: 0,
    loading: false,
    error: false
}

export const fetchCategory = createAsyncThunk(
    "category/fetchCategory",
    (url) => {
        const { getData } = useHttp(url)
        return getData()
    }
)

const categorySlice = createSlice({
    name: "category",
    initialState,
    reducers: {
        addAllCategory: (state, action) => {
            state.allCategory = action.payload
        },
        selectActualCategoryId: (state, action) => {
            state.actualCategoryId = action.payload
        },
        removeCategory: (state, action) => {
            state.allCategory = state.allCategory.filter(item => item.id !== action.payload)
        }
    },
    extraReducers: builder => {
        builder
            .addCase(fetchCategory.pending, state => {
                state.loading = true;
                state.error = false;
            })
            .addCase(fetchCategory.fulfilled, (state, action) => {
                state.loading = false;
                state.allCategory = action.payload;
            })
            .addCase(fetchCategory.rejected, state => {
                state.loading = false;
                state.error = true;
            })
    }
})

const { actions, reducer } = categorySlice
export const { addAllCategory, selectActualCategoryId, removeCategory } = actions
export default reducer