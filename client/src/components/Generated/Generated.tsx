import { useEffect, useState } from 'react';
import styles from './Generated.module.scss';
import { useAppSelector } from '../../store/hooks';
import { Scheme } from '../../store/favorites/favoritesTypes';
import { IconSparkles } from '../../assets/icons/Sparks';
import axios from 'axios';
import { IconHeart } from '../../assets/icons/Heart';
import { colourIsLight, hexToRgb } from '../../utils/colorUtils';
import SkeletonLoader from '../UI/SkeletonLoader';
import { useAddFavoriteSchemeMutation } from '../../store/favorites/favoritesApi';

const Generated = () => {
	const { user } = useAppSelector(state => state.auth);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState('');
	const [generatedScheme, setGeneratedScheme] = useState<Scheme>();

	const generate = async () => {
		try {
			const response = await axios.get(
				'https://www.colr.org/json/schemes/random/7?scheme_size_limit=>5',
				{
					params: {
						t: new Date().getTime(),
					},
				}
			);
			const schemes = response.data.schemes as Scheme[];
			setGeneratedScheme(schemes.find(scheme => scheme.colors.length >= 5));
		} catch (error) {
			let message;
			if (error instanceof Error) message = error.message;
			else message = String(error);
			setError(message);
		} finally {
			setLoading(false);
		}
	}

	useEffect(() => {
		generate();
	}, []);


	const [addFavoriteScheme] = useAddFavoriteSchemeMutation()

	const addScheme = (scheme?: Scheme) => {
		if (scheme) {
			addFavoriteScheme(scheme)
		}
	};

	return (
		<div className={styles.generated}>
			<>
				{loading ? (
					<SkeletonLoader
						count={5}
						style={{ paddingBottom: '18.5%' }}
						containerClassName={styles.colors}
					/>
				) : (
					<div className={styles.colors}>
						{generatedScheme?.colors.slice(0, 5).map(color => (
							<div
								key={color}
								className={styles.color}
								style={{ backgroundColor: `#${color}` }}
							>
								<h2
									style={{
										color: `${colourIsLight(hexToRgb(color)) ? '#000' : '#fff'
											}`,
									}}
								>
									#{color}
								</h2>
							</div>
						))}
					</div>
				)}
				<div className={styles.buttons}>
					<button className={styles.button} onClick={generate}>
						<span>Generate</span>
						<span>
							<IconSparkles className={styles.sparkles} />
						</span>
					</button>
					{user && (
						<button
							className={styles.button}
							onClick={() => addScheme(generatedScheme)}
						>
							<span>
								<IconHeart className={styles.heart} />
							</span>
						</button>
					)}
				</div>
			</>
		</div>
	);
};

export default Generated;
