import { createSlice } from '@reduxjs/toolkit';
import jwt_decode from "jwt-decode";

const initialState = {
    token: null,
    id: null,
    email: null,
    role: null
}

const userSlice = createSlice({
    name: "User",
    initialState,
    reducers: {
        addUser: (state, action) => {
            state.token = action.payload
            state.id = jwt_decode(action.payload).id
            state.email = jwt_decode(action.payload).email
            state.role = jwt_decode(action.payload).role
        },
        resetUser: state => {
            state.token = null
            state.id = null
            state.email = null
            state.role = null
        }
    }
})

const { actions, reducer } = userSlice
export const { addUser, resetUser } = actions
export default reducer