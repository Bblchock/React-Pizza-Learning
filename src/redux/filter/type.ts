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