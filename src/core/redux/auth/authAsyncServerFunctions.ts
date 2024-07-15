import { createAsyncThunk } from '@reduxjs/toolkit';
import { Server } from 'core/api/Server';

export const loginAsync = createAsyncThunk(
    'auth/login',
    async (_, { rejectWithValue }) => {
        try {
            await Server.getToken();
            await Server.login();
            return true;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);
