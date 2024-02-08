import {createSlice} from "@reduxjs/toolkit";
import {TicketsSortedByTypeData} from "shared/types";
import {getTicketsAsyncAction} from "core/redux/async-actions/getTickets";

type MyState = {
    data: TicketsSortedByTypeData
    status: string
}

const initialState: MyState = {
    data: [],
    status: "Модуль билетов был создан и ничего не делал с того момента"
};

const ticketsSlice = createSlice({
    initialState,
    name: 'ticketsSlice',
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(
                (getTicketsAsyncAction.pending),
                (state) => {
                    state.status = 'Загрузка билетов';
                }
            )
            .addCase(
                (getTicketsAsyncAction.rejected),
                (state, action) => {
                    state.status = action.error.message as string;
                }
            )
            .addCase(
                (getTicketsAsyncAction.fulfilled),
                (state, action) => {
                    state.data = action.payload;
                    state.status = 'Модуль билетов загрузил билеты с сервера'
                }
            )
    }
})

export const {} = ticketsSlice.actions;
export const ticketsReducer = ticketsSlice.reducer;