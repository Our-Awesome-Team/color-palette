import { useEffect } from 'react';
import styles from './Favorites.module.css';
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { useNavigate } from 'react-router';
import { getFavoriteColors } from '../../store/favorites/favoritesSlice'
import { reset } from '../../store/auth/authSlice'
import Spinner from '../../components/UI/Spinner/Spinner';

const Favorites = () => {
	const navigate = useNavigate()
	const dispatch = useAppDispatch()

	const { user } = useAppSelector((state) => state.auth)
	if (!user) {
		navigate('/signin')
	}

	const { favoriteColors, loading, error } = useAppSelector(
		(state) => state.favoriteColors
	)
	useEffect(() => {
		if (error) {
			console.log(error)
		}

		dispatch(getFavoriteColors())

		return () => {
			dispatch(reset())
		}
	}, [user, navigate, error, dispatch])

	return (
		<>
			{loading ? (
				<Spinner />
			) : (
				<div className={styles.container}>
					<section className={styles.heading}>
						<h1>Welcome {user && user.name}</h1>
						<p>Favorite Colors</p>
					</section>

					<section className={styles.content}>
						{favoriteColors.length > 0 ? (
							<div className={styles['favorite-colors']}>
								{favoriteColors.map(favoriteColor => (
									<div key={favoriteColor.id}>{favoriteColor.hex}</div>
								))}
							</div>
						) : (
							<h3>You have not save any favorite colors</h3>
						)}
					</section>
				</div>
			)}
		</>
	);
};

export default Favorites;
