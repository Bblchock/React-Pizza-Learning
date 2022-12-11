export type CartModel = {
	id: string,
	title: string,
	price: number,
	count: number,
	imageUrl: string,
	type: string,
	size: number,
};

export interface CartSliceState {
	totalPrice: number,
	items: CartModel[],
}