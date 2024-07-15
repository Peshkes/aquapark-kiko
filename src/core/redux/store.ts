import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import cart from './cart/cartSlice';
import tickets from './institutions/ticketsSlice';
import auth from './auth/authSlice';

export const store = configureStore({
  reducer: {
    cart,
    tickets,
    auth,
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
