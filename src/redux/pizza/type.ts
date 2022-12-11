export type Pizza = {
	id: string,
	title: string,
	price: number,
	imageUrl: string,
	types: number[],
	sizes: number[],
}

export enum Status {
	LOADING = 'loading',
	SUCCESS = 'success',
	ERROR = 'error',
}

export interface PizzaSliceState {
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