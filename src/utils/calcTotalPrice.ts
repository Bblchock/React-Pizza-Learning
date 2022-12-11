import { CartModel } from "../redux/cart/type";

export const calcTotalPrice = (items: CartModel[]) => {
	return items.reduce((sum, obj) => {
		return obj.price * obj.count + sum;
	}, 0);
}
