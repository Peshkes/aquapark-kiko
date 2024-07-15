import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {loginAsync} from "core/redux/auth/authAsyncServerFunctions";

export type AuthState = {
    isAuth: "error" | boolean ;
}

const initialState: AuthState = {
    isAuth: false,
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAuthStatus: (state, action: PayloadAction<"error" | boolean>) => {
            state.isAuth = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginAsync.fulfilled, (state, action) => {
                state.isAuth = action.payload;
            })
            .addCase(loginAsync.rejected, (state) => {
                state.isAuth = false;
            })
    }
});

export const {setAuthStatus} = authSlice.actions;

export default authSlice.reducer;
