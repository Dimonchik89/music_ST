import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    showModal: false
}

const modalSlice = createSlice({
    name: "modal",
    initialState,
    reducers: {
        handleOpenModal: state => {
            state.showModal = true
        },
        handleCloseModal: state => {
            state.showModal = false
        }
    }
})

const { actions, reducer } = modalSlice;
export const { handleCloseModal, handleOpenModal } = actions;
export default reducer;