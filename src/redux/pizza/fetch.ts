import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Pizza, SearchPizzaParams } from "./type";

export const fetchPizzas = createAsyncThunk<Pizza[], SearchPizzaParams>('pizza/fetchPizzasStatus', async (params) => {
	const { search, order, category, sortby, page, limit } = params
	const { data } = await axios.get<Pizza[]>(
		`https://62e90ee0249bb1284eb96781.mockapi.io/items?${search}${page}${limit}${category}${sortby}${order}`
	);
	return data;
})