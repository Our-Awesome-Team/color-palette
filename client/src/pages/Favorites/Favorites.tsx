import { useEffect } from 'react';
import styles from './Favorites.module.scss';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { useNavigate } from 'react-router';
import { getFavoriteColors } from '../../store/favorites/favoritesSlice';
import { reset } from '../../store/auth/authSlice';
import Spinner from '../../components/UI/Spinner/Spinner';
import BrowseColors from '../../components/BrowseColors/BrowseColors';

const Favorites = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const { user } = useAppSelector(state => state.auth);
	if (!user) {
		navigate('/signin');
	}

	const { favoriteColors, loading, error } = useAppSelector(
		state => state.favorites
	);
	useEffect(() => {
		if (error) {
			console.log(error);
		}

		dispatch(getFavoriteColors());

		return () => {
			dispatch(reset());
		};
	}, [user, navigate, error, dispatch]);

	return (
		<section className={styles.favorite}>
			<>{loading ? <Spinner /> : <BrowseColors title="Favorite Colors" />}</>;
		</section>
	);
};

export default Favorites;
