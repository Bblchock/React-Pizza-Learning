import { PayloadAction } from "@reduxjs/toolkit"
import { CartModel, CartSliceState } from "../redux/cart/type"

export const findInCart = (state: CartSliceState, action: PayloadAction<CartModel>) => {
	return state.items.find(obj => obj.id === action.payload.id && obj.type === action.payload.type && obj.size === action.payload.size
	);
}

