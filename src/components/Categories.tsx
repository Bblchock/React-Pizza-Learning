import React, { memo } from "react";

type CategoriesProps = {
	categoryId: number,
	onChangeCategory: (i: number) => void,
}

const categories = [
	'Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'
]

const Categories: React.FC<CategoriesProps> = memo(({ categoryId, onChangeCategory }) => {
	return (
		<div className="categories">
			<ul>
				{categories.map((value, i) => (
					<li key={i} onClick={() => onChangeCategory(i)} className={categoryId === i ? 'active' : ''}>{value}</li>
				))}
			</ul>
		</div>
	);
});

export default Categories;