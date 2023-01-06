import { useEffect } from 'react';
import styles from './FavoritesPage.module.scss';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { useNavigate } from 'react-router';
import {
	getFavoriteColors,
	getFavoriteSchemes,
} from '../../store/favorites/favoritesSlice';
import { reset } from '../../store/auth/authSlice';
import { IconHeartCircleMinus } from '../../assets/icons/Heart';
import ColorCard from '../../components/ColorCard/ColorCard';
import SchemeCard from '../../components/SchemeCard/SchemeCard';
import Spinner from '../../components/UI/Spinner/Spinner';
import Seo from '../../utils/Seo/Seo';

const Favorites = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const { user } = useAppSelector(state => state.auth);
	useEffect(() => {
		if (!user) {
			navigate('/signin');
		}
	}, [user]);

	const { favoriteColors, favoriteSchemes, error, loading } = useAppSelector(
		state => state.favorites
	);

	useEffect(() => {
		if (error) {
			console.log(error);
		}

		dispatch(getFavoriteColors());
		dispatch(getFavoriteSchemes());

		return () => {
			dispatch(reset());
		};
	}, [user, navigate, error, dispatch]);

	return (
		<>
			<Seo title="Favorite" description="Look at your favorites colors!" />
			<div className={styles.favorites}>
				{loading ? (
					<Spinner />
				) : (
					<>
						<h2>Schemes</h2>
						{favoriteSchemes.length ? (
							<>
								<section className={styles.schemes}>
									{favoriteSchemes
										.slice()
										.reverse()
										.map(scheme => (
											<SchemeCard
												key={scheme.id}
												scheme={scheme}
												Icon={IconHeartCircleMinus}
											/>
										))}
								</section>
							</>
						) : (
							<h3>You don't have favorites schemes yet</h3>
						)}
						<h2>Colors</h2>
						{favoriteColors.length ? (
							<>
								<section className={styles.colors}>
									{favoriteColors
										.slice()
										.reverse()
										.map(color => (
											<ColorCard
												color={color}
												Icon={IconHeartCircleMinus}
												key={color.id}
											/>
										))}
								</section>
							</>
						) : (
							<h3>You don't have favorites schemes yet</h3>
						)}
						<div className={styles.btn}>
							<button onClick={() => navigate(-1)}>Go back</button>
						</div>
					</>
				)}
			</div>
		</>
	);
};

export default Favorites;
