import {createAsyncThunk} from "@reduxjs/toolkit";
import {Server} from "core/api/Server";
import {Institution, TicketsOfInstitution, TicketsTypeData} from "core/redux/types";
import {AxiosResponse} from "axios";

export const getTicketsByInstitutionAsyncAction = createAsyncThunk<TicketsOfInstitution, string>(
    'tickets/getTicketsByInstitution',
    async (institution: string, {rejectWithValue}) => {
        try {
            const response: AxiosResponse = await Server.getTicketsByInstitution(institution);
            const tickets = response.data;
            const newResponse: TicketsOfInstitution = {
                institutionId: institution,
                tickets: []
            }
            tickets.forEach((item: TicketsTypeData) => {
                newResponse.tickets.push(item)
            })
            return newResponse;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

export const getInstitutionsAsyncAction = createAsyncThunk<Array<Institution>>(
    'tickets/getInstitutions',
    async (_, {rejectWithValue}) => {
        try {
            const response = await Server.getInstitutions();
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);
