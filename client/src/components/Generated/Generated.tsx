import { FC, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { saveFavoriteColor } from '../../services/favoriteColor/favoriteColorSlice';
import { FavoriteColor } from '../../services/favoriteColor/favoriteColorTypes';
import Select from '../UI/Select/Select';
import Spinner from '../UI/Spinner/Spinner';

import styles from './Generated.module.scss';

const Generated: FC = () => {
	const dispatch = useAppDispatch();
	const { user } = useAppSelector(state => state.auth);

	// const [colors, setColors] = useState<FavoriteColor[]>([]);
	const [loading, setLoading] = useState<boolean>(false);

	const saveColor = (color: FavoriteColor) => {
		dispatch(saveFavoriteColor(color));
	};

	return (
		<div className={styles.generated}>
			<div className={styles.options}>
				<button className={styles.btn}>
					<span>Generate</span>
					<span>
						<svg
							width="18"
							height="18"
							viewBox="0 0 18 18"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M7.875 3.375L8.4375 2.25L9.5625 1.6875L8.4375 1.125L7.875 0L7.3125 1.125L6.1875 1.6875L7.3125 2.25L7.875 3.375ZM2.8125 5.625L3.74977 3.75012L5.625 2.8125L3.74977 1.87488L2.8125 0L1.87523 1.87488L0 2.8125L1.87523 3.75012L2.8125 5.625ZM15.1875 10.125L14.2502 11.9999L12.375 12.9375L14.2502 13.8751L15.1875 15.75L16.1248 13.8751L18 12.9375L16.1248 11.9999L15.1875 10.125ZM17.6702 3.31277L14.6872 0.329766C14.4679 0.109688 14.1799 0 13.892 0C13.6041 0 13.3161 0.109688 13.0964 0.329766L0.329766 13.0964C-0.109688 13.5359 -0.109688 14.2481 0.329766 14.6872L3.31277 17.6702C3.5325 17.89 3.82043 17.9996 4.10801 17.9996C4.39594 17.9996 4.68387 17.89 4.90359 17.6702L17.6702 4.90324C18.1097 4.46449 18.1097 3.75188 17.6702 3.31277ZM12.6369 7.15289L10.8471 5.36309L13.8916 2.31855L15.6814 4.10836L12.6369 7.15289Z"
								fill="black"
							/>
						</svg>
					</span>
				</button>
				<Select name='More' />
			</div>
			<div className={styles.colors}>
				{loading ? (
					<Spinner />
				) : (
					[...Array(5)].map((color, index) => (
						<div key={index} className={styles.color}></div>
					))
				)}
			</div>
		</div>
	);
};

export default Generated;
