import React, { useCallback, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../redux/store";
import { fetchPizzas } from "../redux/pizza/fetch";
import { selectFilter, selectPizzaData } from "../redux/selectors";
import { setCategoryId, setCurrentPage } from "../redux/filter/slice";

import { Sort, Categories, PizzaBlock, Sceleton, Pagination } from '../components/imports'

const Home: React.FC = () => {
	const dispatch = useAppDispatch();
	const isSearch = useRef(false);

	const { categoryId, sort, currentPage, searchValue } = useSelector(selectFilter);
	const { items, status } = useSelector(selectPizzaData);

	const onChangeCategory = useCallback((id: number) => {
		dispatch(setCategoryId(id));
	}, []);

	const onChangePage = (page: number) => {
		dispatch(setCurrentPage(page));
	};
	const getPizzas = async () => {
		const search = searchValue ? `search${searchValue}` : ''
		const order = `&order=${sort.order}`
		const category = categoryId > 0 ? `&category=${categoryId}` : ''
		const sortby = `&sortby=${sort.sortProperty}`
		const page = `&page=${currentPage}`
		const limit = `&limit=${4}`

		dispatch(
			fetchPizzas({
				search,
				order,
				category,
				sortby,
				page,
				limit,
			}))
	}

	useEffect(() => {
		window.scrollTo(0, 0)
		if (!isSearch.current) {
			getPizzas();
		}
		isSearch.current = false;
	}, [categoryId, sort, currentPage, searchValue]);

	const sceletons = [...new Array(4)].map((_, index) => <Sceleton key={index} />)
	const pizzas = items
		.filter((obj: any) => {
			return obj.title.toLowerCase().includes(searchValue.toLowerCase())
		})
		.map((obj: any) => <PizzaBlock key={obj.id} {...obj} />)

	return (
		<div className="container">
			<div className="content__top">
				<Categories categoryId={categoryId} onChangeCategory={(i: any) => onChangeCategory(i)} />
				<Sort sortValue={sort} />
			</div>
			<h2 className="content__title">Все пиццы</h2>
			{status === 'error'
				? <div className="content__error-info">
					<h2>Произошла ошибка 😕</h2>
					<p>	Не удалось получить пиццы, попробуйте позже</p>
				</div>
				: <div className="content__items">
					{status === 'loading' ? sceletons : pizzas}
				</div>
			}

			<Pagination currentPage={currentPage} onChangePage={onChangePage} />
		</div>
	);
}

export default Home;
