import { createSlice } from "@reduxjs/toolkit";
import {use} from "../hooks/use-auth";

const initialState = {
    login: null,
    token: null,
    refresh_token: null,
};


const userSlice = createSlice(
    {
        name: "user",
        initialState,
        reducers: {
            setUser(state, action) {
                state.login = action.payload.login;
                state.token = action.payload.token;
                state.refresh_token = action.payload.refresh_token;
            },
            removeUser(state) {
                state.login = null;
                state.token = null;
                state.refresh_token = null;
            }
        }
    }
)

export const {setUser, removeUser} = userSlice.actions;
export default userSlice.reducer;