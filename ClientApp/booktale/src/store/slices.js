import { createSlice } from "@reduxjs/toolkit";

const initialStateUser = {
    login: null,
    token: null,
    id: null,
};


const userSlice = createSlice(
    {
        name: "user",
        initialStateUser,
        reducers: {
            setUser(state, action) {
                state.email = action.payload.email;
                state.token = action.payload.token;
                state.id = action.payload.id;
            },
            removeUser(state) {
                state.email = null;
                state.token = null;
                state.id = null;
            }
        }
    }
)

export const {setUser, removeUser} = userSlice.actions;