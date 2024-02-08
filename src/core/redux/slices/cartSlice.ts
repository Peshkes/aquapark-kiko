import {createSlice} from "@reduxjs/toolkit";
import {CartItem, StateOfCart} from "shared/types";

const initialState: StateOfCart = {
    cart: [],
    preliminaryPrice: 0,
    sale: 0,
    totalPrice: 0
};

const recalculatePricesWith = (state: StateOfCart, newSum: number): StateOfCart => {
    state.preliminaryPrice += newSum;
    state.totalPrice = state.preliminaryPrice;
    if (state.sale !== 0)
        state.totalPrice /= 100 * (100 - state.sale);
    return state;
}

const cartSlice = createSlice({
    initialState,
    name: 'cartSlice',
    reducers: {
        addToCart(state, action) {
            const tmpState: StateOfCart = {...state};
            const foundIndex = tmpState.cart.findIndex((item: CartItem) => action.payload.ticket.id === item.ticket.id);
            foundIndex === -1 ? tmpState.cart.push(action.payload.ticket) : tmpState.cart[foundIndex].count += action.payload.count;
            const howMuchChange = action.payload.count * action.payload.ticket.price;
            return recalculatePricesWith(tmpState, howMuchChange);
        },
        removeFromCart(state, action){
            const tmpState: StateOfCart = {...state};
            const foundIndex = tmpState.cart.findIndex((item: CartItem) => action.payload.ticket.id === item.ticket.id);
            if (foundIndex !== -1){
                const howMuchChange = -1 * tmpState.cart[foundIndex].ticket.price * tmpState.cart[foundIndex].count;
                tmpState.cart.splice(foundIndex, 1);
                return recalculatePricesWith(tmpState, howMuchChange);
            }
            return tmpState;
        },
        changeCountOfItemTo(state, action){
            const tmpState: StateOfCart = {...state};
            const foundIndex = tmpState.cart.findIndex((item: CartItem) => action.payload.ticket.id === item.ticket.id);
            if (action.payload.count > 0){
                if (foundIndex !== -1){
                    const howMuchChange = (tmpState.cart[foundIndex].ticket.price * tmpState.cart[foundIndex].count) - (action.payload.ticket.price * action.payload.count);
                    tmpState.cart[foundIndex].count = action.payload.count;
                    return recalculatePricesWith(tmpState, howMuchChange);
                }
            }
            return tmpState;
        }
    }
})

export const {addToCart, changeCountOfItemTo, removeFromCart} = cartSlice.actions;
export const cartReducer = cartSlice.reducer;