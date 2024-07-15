import {createSlice} from "@reduxjs/toolkit";
import {Institution, TicketsOfInstitution} from "core/redux/types";
import {
    getInstitutionsAsyncAction,
    getTicketsByInstitutionAsyncAction
} from "core/redux/institutions/ticketsAsyncServerFunctions";

type MyState = {
    institutions: Array<Institution> | []
    ticketsOfInstitution: Array<TicketsOfInstitution> | []
    status: string
}

const initialState: MyState = {
    institutions: [],
    ticketsOfInstitution: [],
    status: "Модуль билетов был создан и ничего не делал с того момента"
};

const ticketsSlice = createSlice({
    initialState,
    name: 'ticketsSlice',
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(
                getInstitutionsAsyncAction.pending,
                (state) => {
                    state.status = 'Загрузка институтов';
                })
            .addCase(
                getInstitutionsAsyncAction.rejected, (state, action) => {
                    state.status = action.error.message as string;
                })
            .addCase(
                getInstitutionsAsyncAction.fulfilled,
                (state, action) => {
                    state.institutions = action.payload;
                    state.status = 'Модуль билетов загрузил институты с сервера'
                }
            )
            .addCase(
                getTicketsByInstitutionAsyncAction.pending,
                (state) => {
                    state.status = 'Загрузка билетов';
                }
            )
            .addCase(
                getTicketsByInstitutionAsyncAction.rejected,
                (state, action) => {
                    state.status = action.error.message as string;
                }
            )
            .addCase(
                getTicketsByInstitutionAsyncAction.fulfilled,
                (state, action) => {
                    const index = state.ticketsOfInstitution.findIndex(item => item.institutionId === action.payload.institutionId);
                    if (index === -1) {
                        state.ticketsOfInstitution.push(action.payload as never);
                        state.status = 'Модуль билетов загрузил билеты с сервера'
                    } else {
                        state.ticketsOfInstitution[index].tickets = action.payload.tickets;
                        state.status = 'Модуль билетов обновил билеты с сервера'
                    }
                }
            )
    }
})

export const {} = ticketsSlice.actions;
export default ticketsSlice.reducer;
