import axios from 'axios';
import React from 'react';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

const FullPizza: React.FC = () => {
	const [pizza, setPizza] = useState<{
		imageUrl: string,
		title: string,
		price: number,
	}>();
	const { id } = useParams();
	const navigate = useNavigate();

	useEffect(() => {
		async function noName() {
			try {
				const response = await axios.get(`https://62e90ee0249bb1284eb96781.mockapi.io/items/${id}`)
				setPizza(response.data);
			} catch (error) {
				console.log(error);
				alert('Пицца не найдена');
				navigate('/');
			};
		}

		noName();
	}, [id])

	if (!pizza) {
		return <div className='loading'>
			Загрузка...
		</div>
	}
	return (
		<div className='container'>
			<img className='pizza-img' src={pizza.imageUrl} alt="" />
			<h2>{pizza.title}</h2>
			<h4>От {pizza.price} ₽</h4>
			<Link to='/'>
				<button className="button button--outline button--add">
					<span>Назад</span>
				</button>
			</Link>
		</div>
	);
}

export default FullPizza;