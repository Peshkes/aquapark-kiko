import {createAsyncThunk} from "@reduxjs/toolkit";
import {Server} from "core/api/Server";
import {CreateOrderRequest, SaleRequest} from "core/redux/types";
import {AxiosResponse} from "axios";

export const getSaleAsyncAction = createAsyncThunk<number, SaleRequest>(
    'cart/getSale',
    async (saleRequest: SaleRequest, {rejectWithValue}) => {
        try {
            const response: AxiosResponse = await Server.getSale(saleRequest);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

export const createNewOrderAsyncAction = createAsyncThunk<AxiosResponse, CreateOrderRequest>(
    'cart/createNewOrder',
    async (request: CreateOrderRequest, {rejectWithValue}) => {
        try {
            return await Server.createNewOrder(request);
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
)
