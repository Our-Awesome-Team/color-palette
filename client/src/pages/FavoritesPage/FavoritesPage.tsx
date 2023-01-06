import { useEffect } from 'react';
import styles from './FavoritesPage.module.scss';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { useNavigate } from 'react-router';
import { reset } from '../../store/auth/authSlice';
import { IconHeartCircleMinus } from '../../assets/icons/Heart';
import ColorCard from '../../components/ColorCard/ColorCard';
import SchemeCard from '../../components/SchemeCard/SchemeCard';
import Spinner from '../../components/UI/Spinner/Spinner';
import Seo from '../../utils/Seo/Seo';
import { useGetFavoriteColorsQuery, useGetFavoriteSchemesQuery } from '../../store/favorites/favoritesApi';

const Favorites = () => {
	const navigate = useNavigate();

	const { user } = useAppSelector(state => state.auth);
	useEffect(() => {
		if (!user) {
			navigate('/signin');
		}
	}, [user]);

	const { data: favoriteColors, isLoading: isColorsLoading, isError: isColorsError } = useGetFavoriteColorsQuery()
	const { data: favoriteSchemes, isLoading: isSchemesLoading, isError: isSchemesError } = useGetFavoriteSchemesQuery()

	return (
		<>
			<Seo title="Favorite" description="Look at your favorites colors!" />
			<div className={styles.favorites}>
				<h2>Schemes</h2>
				{isSchemesLoading
					? <Spinner />
					: isSchemesError ? "Can't get colors"
						: <section className={styles.schemes}>
							{favoriteSchemes?.slice().reverse().map((scheme) =>
								<SchemeCard key={scheme.id} scheme={scheme} Icon={IconHeartCircleMinus} />
							)}
						</section>
				}
				<h2>Colors</h2>
				{isColorsLoading
					? <Spinner />
					: isColorsError ? "Can't get colors"
						: <section className={styles.colors}>
							{favoriteColors?.slice().reverse().map((color) =>
								<ColorCard color={color} Icon={IconHeartCircleMinus} key={color.id} />
							)}
						</section>
				}
			</div>
		</>
	);
};

export default Favorites;
