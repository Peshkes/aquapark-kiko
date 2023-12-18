import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    cart: [],
    preliminaryPrice: 0,
    sale: 0,
    totalPrice: 0
};

const cartSlice = createSlice({
    initialState,
    name: 'cartSlice',
    reducers: {
        recalculateMoneyWith(state, action) {
            state.preliminaryPrice += action.payload;
            if (state.sale === 0)
                state.totalPrice = state.preliminaryPrice;
            else
                state.totalPrice = state.preliminaryPrice / 100 * (100 - state.sale);
        },
        addToCart(state, action) {
            
        }
    }
})

// const addToCart = (obj) => {
//     const index = cart.findIndex(item => item.id === obj.id);
//     const price = productsArr.find(item => item.id === obj.id).price;
//     if (index === -1) {
//         setCart([...cart, obj]);
//     } else {
//         const tmpCart = [...cart];
//         tmpCart[index].count += obj.count;
//         setCart(tmpCart);
//     }
//     calculateMoney(price * obj.count);
// }

export const {recalculateMoneyWith, addToCart} = cartSlice.actions;
export const cartReducer = cartSlice.reducer;