import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {CartItem, StateOfCart, Ticket} from "shared/types";
import {getSaleAsyncAction} from "core/redux/async-actions/getSale";

const initialState: StateOfCart = {
    cart: [],
    preliminaryPrice: 0,
    sale: 0,
    totalPrice: 0,
};

const recalculatePricesWith = (
    state: StateOfCart,
    newSum: number
): StateOfCart => {
    return {
        ...state,
        preliminaryPrice: state.preliminaryPrice + newSum,
        totalPrice: (state.preliminaryPrice + newSum) / 100 * (100 - state.sale),
    };
};

const cartSlice = createSlice({
    initialState,
    name: "cartSlice",
    reducers: {
        addToCart(state, action: PayloadAction<CartItem>) {
            const foundIndex = state.cart.findIndex(
                (item) => action.payload.ticket.id === item.ticket.id
            );
            const newCart = [...state.cart];
            if (foundIndex === -1) {
                newCart.push(action.payload);
            } else {
                newCart[foundIndex] = {
                    ...newCart[foundIndex],
                    count: newCart[foundIndex].count + action.payload.count,
                };
            }
            const howMuchChange =
                action.payload.count * action.payload.ticket.price;
            return recalculatePricesWith({...state, cart: newCart}, howMuchChange);
        },
        removeFromCart(state, action: PayloadAction<{ ticket: Ticket }>) {
            const foundIndex = state.cart.findIndex(
                (item) => action.payload.ticket.id === item.ticket.id
            );
            const newCart = [...state.cart];
            if (foundIndex !== -1) {
                const howMuchChange =
                    -1 * state.cart[foundIndex].ticket.price * state.cart[foundIndex].count;
                newCart.splice(foundIndex, 1);
                return recalculatePricesWith({...state, cart: newCart}, howMuchChange);
            }
            return state;
        },
        changeCountOfItemTo(state, action: PayloadAction<CartItem>) {
            const foundIndex = state.cart.findIndex(
                (item) => action.payload.ticket.id === item.ticket.id
            );
            const newCart = [...state.cart];
            if (action.payload.count > 0) {
                if (foundIndex !== -1) {
                    const howMuchChange =
                        action.payload.ticket.price * action.payload.count -
                        state.cart[foundIndex].ticket.price *
                        state.cart[foundIndex].count;
                    newCart[foundIndex] = {
                        ...newCart[foundIndex],
                        count: action.payload.count,
                    };
                    return recalculatePricesWith({...state, cart: newCart}, howMuchChange);
                }
            }
            return state;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(
                getSaleAsyncAction.fulfilled,
                (state, action) => {
                    if (action.payload > 0){
                        const newState = { ...state, sale: action.payload };
                        return recalculatePricesWith(newState, 0);
                    }
                }
            );
    }
});

export const {addToCart, changeCountOfItemTo, removeFromCart} =
    cartSlice.actions;
export const cartReducer = cartSlice.reducer;
