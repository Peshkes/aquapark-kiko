import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import {cartReducer} from "core/redux/slices/cartSlice";
import {ticketsReducer} from "core/redux/slices/ticketsSlice";

export const store = configureStore({
  reducer: {
    cartReducer,
    ticketsReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
