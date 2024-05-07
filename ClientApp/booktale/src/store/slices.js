import { createSlice } from "@reduxjs/toolkit";

const initialStateUser = {
    login: null,
    token: null,
};


const userSlice = createSlice(
    {
        name: "user",
        initialState: initialStateUser,
        reducers: {
            setUser(state, action) {
                state.login = action.payload.login;
                state.token = action.payload.token;
                state.id = action.payload.id;
            },
            removeUser(state) {
                state.login = null;
                state.token = null;
            }
        }
    }
)

export const {setUser, removeUser} = userSlice.actions;
export default userSlice.reducer;