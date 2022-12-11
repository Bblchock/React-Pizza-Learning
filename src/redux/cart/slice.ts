import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { calcTotalPrice } from "../../utils/calcTotalPrice";
import { findInCart } from "../../utils/findInCart";
import { getCartFromLS } from "../../utils/getCartFromLS";
import { CartModel, CartSliceState } from "./type";

const initialState: CartSliceState = getCartFromLS();

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addItem(state, action: PayloadAction<CartModel>) {
			const findItem = findInCart(state, action)
			if (findItem) {
				findItem.count++;
			} else {
				state.items.push({
					...action.payload,
					count: 1,
				})
			}
			state.totalPrice = calcTotalPrice(state.items);
		},
		plusItems(state, action: PayloadAction<CartModel>) {
			const findItem = findInCart(state, action)
			if (findItem) {
				findItem.count++;
			}
			state.totalPrice = calcTotalPrice(state.items);
		},
		minusItems(state, action: PayloadAction<CartModel>) {
			const findItem = findInCart(state, action)
			if (findItem) {
				findItem.count--;
			}
			state.totalPrice = calcTotalPrice(state.items);
		},
		removeItem(state, action: PayloadAction<string>) {
			state.items = state.items.filter(obj => obj.id != action.payload)
		},
		clearItems(state) {
			state.items = [];
			state.totalPrice = 0;
		},
	},
})

export const { addItem, removeItem, clearItems, minusItems } = cartSlice.actions;
export default cartSlice.reducer;