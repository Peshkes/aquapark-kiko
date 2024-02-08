import {createAsyncThunk} from "@reduxjs/toolkit";
import {TicketsSortedByTypeData} from "shared/types";
import {Server} from "services/Server";

export const getTicketsAsyncAction = createAsyncThunk<TicketsSortedByTypeData>(
    'tickets/getTickets',
    async () => {
        try {
            return await Server.getTickets();
        } catch (error) {
            throw error;
        }
    }
);