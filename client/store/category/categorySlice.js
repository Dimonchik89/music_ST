import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    allCategory: null,
    actualCategoryId: 0
}

const categorySlice = createSlice({
    name: "category",
    initialState,
    reducers: {
        addAllCategory: (state, action) => {
            state.allCategory = action.payload
        },
        selectActualCategoryId: (state, action) => {
            state.actualCategoryId = action.payload
        }
    }
})

const { actions, reducer } = categorySlice
export const { addAllCategory, selectActualCategoryId } = actions
export default reducer