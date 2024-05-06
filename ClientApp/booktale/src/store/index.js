import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices.js";

export const store = configureStore(
    {
        reducer: {
            user: userReducer,
        }
    }
)