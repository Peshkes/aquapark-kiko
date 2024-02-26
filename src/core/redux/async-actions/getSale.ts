import {createAsyncThunk} from "@reduxjs/toolkit";
import {Server} from "services/Server";

export const getSaleAsyncAction = createAsyncThunk<number, string>(
    'cart/getSale',
    async (code: string) => {
        try {
            return await Server.getSale(code);
        } catch (error) {
            console.log(error);
        }
    }
);