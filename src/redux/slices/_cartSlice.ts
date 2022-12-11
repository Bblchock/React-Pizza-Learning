import { RootState } from './../store';
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { getCartFromLS } from '../../utils/getCartFromLS';
import { calcTotalPrice } from '../../utils/calcTotalPrice';

export type CartModel = {
	id: string,
	title: string,
	price: number,
	count: number,
	imageUrl: string,
	type: string,
	size: number,
};

interface CartSliceState {
	totalPrice: number,
	items: CartModel[],
}

const initialState: CartSliceState = getCartFromLS();

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addItem(state, action: PayloadAction<CartModel>) {
			const findItem = state.items.find(obj => obj.id === action.payload.id);
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
		minusItems(state, action: PayloadAction<string>) {
			const findItem = state.items.find(obj => obj.id === action.payload);
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

export const selectCart = (state: RootState) => state.cart;
export const selectCartItemById = (id: string) => (state: RootState) => state.cart.items.find(obj => obj.id === id);
export const { addItem, removeItem, clearItems, minusItems } = cartSlice.actions;
export default cartSlice.reducer;