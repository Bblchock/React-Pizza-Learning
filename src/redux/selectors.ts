import { RootState } from "./store";

//cart
export const selectCart = (state: RootState) => state.cart;
//filter
export const selectFilter = (state: RootState) => state.filter
//pizza
export const selectPizzaData = (state: RootState) => state.pizza