import { useEffect } from 'react';
import styles from './FavoritesPage.module.scss';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { useNavigate } from 'react-router';
import { getFavoriteColors, getFavoriteSchemes } from '../../store/favorites/favoritesSlice';
import { reset } from '../../store/auth/authSlice';
import { IconHeartCircleMinus } from '../../assets/icons/Heart';
import ColorCard from '../../components/ColorCard/ColorCard';
import SchemeCard from '../../components/SchemeCard/SchemeCard';
import Spinner from '../../components/UI/Spinner/Spinner';

const Favorites = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const { user } = useAppSelector(state => state.auth);
	useEffect(() => {
		if (!user) {
			navigate('/signin');
		}
	}, [user])

	const { favoriteColors, favoriteSchemes, error, loading } = useAppSelector(
		state => state.favorites
	);

	useEffect(() => {
		if (error) {
			console.log(error);
		}

		dispatch(getFavoriteColors());
		dispatch(getFavoriteSchemes())

		return () => {
			dispatch(reset());
		};
	}, [user, navigate, error, dispatch]);

	return (
		<div className={styles.favorites}>
			{loading ? <Spinner /> :
				<>
					<h2>Schemes</h2>
					<section className={styles.schemes}>
						{favoriteSchemes.slice().reverse().map((scheme) =>
							<SchemeCard key={scheme.id} scheme={scheme} Icon={IconHeartCircleMinus} />
						)}
					</section>
					<h2>Colors</h2>
					<section className={styles.colors}>
						{favoriteColors.slice().reverse().map((color) =>
							<ColorCard color={color} Icon={IconHeartCircleMinus} key={color.id} />
						)}
					</section>
				</>
			}
		</div>
	);
};

export default Favorites;
