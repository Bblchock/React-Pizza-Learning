import { RootState } from './../store';
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export type SortType = {
	name: string,
	sortProperty: string,
	order: string,
}

export interface FilterSliceState {
	categoryId: number,
	currentPage: number,
	searchValue: string,
	sort: SortType,
}

const initialState: FilterSliceState = {
	categoryId: 0,
	currentPage: 1,
	searchValue: '',
	sort: {
		name: 'популярности ↑',
		sortProperty: 'rating',
		order: 'desc',
	}
}

const filterSlice = createSlice({
	name: 'filter',
	initialState,
	reducers: {
		setCategoryId(state, action: PayloadAction<number>) {
			state.categoryId = action.payload
		},
		setSort(state, action: PayloadAction<SortType>) {
			state.sort = action.payload;
		},
		setCurrentPage(state, action: PayloadAction<number>) {
			state.currentPage = action.payload;
		},
		setSearchValue(state, action: PayloadAction<string>) {
			state.searchValue = action.payload;
		},
		setFilters(state, action: PayloadAction<FilterSliceState>) {
			state.sort = action.payload.sort;
			state.currentPage = Number(action.payload.currentPage);
			state.categoryId = Number(action.payload.categoryId);
		},
	},
})

export const selectFilter = (state: RootState) => state.filter
export const { setCategoryId, setSort, setCurrentPage, setFilters, setSearchValue } = filterSlice.actions;
export default filterSlice.reducer;