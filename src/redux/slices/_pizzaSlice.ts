import { RootState } from './../store';
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import axios from 'axios'

type Pizza = {
	id: string,
	title: string,
	price: number,
	imageUrl: string,
	types: number[],
	sizes: number[],
}

enum Status {
	LOADING = 'loading',
	SUCCESS = 'success',
	ERROR = 'error',
}

interface PizzaSliceState {
	items: Pizza[],
	status: Status,
};

export type SearchPizzaParams = {
	search: string,
	order: string,
	category: string,
	sortby: string,
	page: string,
	limit: string,
}

export const fetchPizzas = createAsyncThunk<Pizza[], SearchPizzaParams>('pizza/fetchPizzasStatus', async (params) => {
	const { search, order, category, sortby, page, limit } = params
	const { data } = await axios.get<Pizza[]>(
		`https://62e90ee0249bb1284eb96781.mockapi.io/items?${search}${page}${limit}${category}${sortby}${order}`
	);
	return data;
})

const initialState: PizzaSliceState = {
	items: [],
	status: Status.LOADING,
};

const pizzaSlice = createSlice({
	name: 'pizza',
	initialState,
	reducers: {
		setItems(state, action: PayloadAction<Pizza[]>) {
			state.items = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchPizzas.pending, (state) => {
			state.status = Status.LOADING;
			state.items = [];
		});
		builder.addCase(fetchPizzas.fulfilled, (state, action) => {
			state.items = action.payload;
			state.status = Status.SUCCESS;
		});
		builder.addCase(fetchPizzas.rejected, (state) => {
			state.status = Status.ERROR;
			state.items = [];
		});
	}
})

export const selectPizzaData = (state: RootState) => state.pizza
export const { setItems } = pizzaSlice.actions;
export default pizzaSlice.reducer;