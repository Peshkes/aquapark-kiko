import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem, StateOfCart, InstitutionTicket as Ticket, AddToCartRequest } from "../types";
import { getSaleAsyncAction } from "core/redux/cart/cartAsyncServerFunctions";

const initialState: StateOfCart = {
    institutionId: null,
    cart: [],
    preliminaryPrice: 0,
    sale: 0,
    totalPrice: 0,
};

const recalculatePricesWith = (state: StateOfCart, newSum: number): StateOfCart => {
    return {
        ...state,
        preliminaryPrice: state.preliminaryPrice + newSum,
        totalPrice: +((state.preliminaryPrice + newSum) / 100 * (100 - state.sale)).toFixed(2),
    };
};

const updateCartAndRecalculate = (state: StateOfCart, payload: AddToCartRequest): StateOfCart => {
    const foundIndex = state.cart.findIndex(
        (item: CartItem) => payload.cartItem.ticket.institutionTicketId === item.ticket.institutionTicketId
    );
    const newCart = [...state.cart];
    if (foundIndex === -1) {
        newCart.push(payload.cartItem);
    } else {
        newCart[foundIndex] = {
            ...newCart[foundIndex],
            count: newCart[foundIndex].count + payload.cartItem.count,
        };
    }
    const howMuchChange = payload.cartItem.count * payload.cartItem.ticket.price;
    return recalculatePricesWith({ ...state, cart: newCart }, howMuchChange);
};

const clearCart = (sale?: number, institutionId?: string): StateOfCart => {
    return {
        institutionId: institutionId || null,
        cart: [],
        preliminaryPrice: 0,
        sale: sale || 0,
        totalPrice: 0,
    };
};

const cartSlice = createSlice({
    initialState,
    name: "cartSlice",
    reducers: {
        addToCart(state, action: PayloadAction<AddToCartRequest>) {
            let newState;
            if (state.institutionId === null || state.institutionId === action.payload.institutionId) {
                newState = {
                    ...state,
                    institutionId: state.institutionId ?? action.payload.institutionId,
                };
            } else {
                newState = clearCart(state.sale, action.payload.institutionId);
            }
            return updateCartAndRecalculate(newState, action.payload);
        },
        removeFromCart(state, action: PayloadAction<{ ticket: Ticket }>) {
            const foundIndex = state.cart.findIndex(
                (item) => action.payload.ticket.institutionTicketId === item.ticket.institutionTicketId
            );
            if (foundIndex !== -1) {
                const howMuchChange = -1 * state.cart[foundIndex].ticket.price * state.cart[foundIndex].count;
                const newCart = [...state.cart];
                newCart.splice(foundIndex, 1);
                return recalculatePricesWith({ ...state, cart: newCart }, howMuchChange);
            }
            return state;
        },
        changeCountOfItemTo(state, action: PayloadAction<{ ticket: Ticket; count: number }>) {
            const foundIndex = state.cart.findIndex(
                (item) => action.payload.ticket.institutionTicketId === item.ticket.institutionTicketId
            );
            if (foundIndex !== -1) {
                const howMuchChange = action.payload.ticket.price * action.payload.count - state.cart[foundIndex].ticket.price * state.cart[foundIndex].count;
                const newCart = [...state.cart];
                newCart[foundIndex] = {
                    ...newCart[foundIndex],
                    count: action.payload.count,
                };
                return recalculatePricesWith({ ...state, cart: newCart }, howMuchChange);
            }
            return state;
        },
        cleanCart() {
            return clearCart();
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getSaleAsyncAction.fulfilled, (state, action) => {
            if (action.payload > 0) {
                state.sale = action.payload;
                const newState = recalculatePricesWith(state, 0);
                state.preliminaryPrice = newState.preliminaryPrice;
                state.totalPrice = newState.totalPrice;
            }
        });
    }
});

export const { addToCart, changeCountOfItemTo, removeFromCart, cleanCart } = cartSlice.actions;
export default cartSlice.reducer;
