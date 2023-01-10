import { useEffect, useState } from 'react';
import styles from './Generated.module.scss';
import { useAppSelector } from '../../store/hooks';
import { IconSparkles } from '../../assets/icons/Sparks';
import axios from 'axios';
import { IconHeart } from '../../assets/icons/Heart';
import { colourIsLight, hexToRgb } from '../../utils/colorUtils';
import SkeletonLoader from '../UI/SkeletonLoader';
import { useAddFavoriteSchemeMutation } from '../../store/favorites/favoritesApi';
import { Locked } from "../../assets/icons/Locked";
import { Color, Scheme } from "../../store/favorites/favoritesTypes";
import { v4 as uuid } from 'uuid';

// Решить проблему дублирования цветов (Важно)

const Generated = () => {
	const { user } = useAppSelector(state => state.auth);

	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState('');
	const [generatedScheme, setGeneratedScheme] = useState<Scheme | undefined>();
	const [lockedColors, setLockedColors] = useState<{ color: string, index: number }[]>([]);

	const lockColor = ({ color, index }: { color: string, index: number }) => {
		if (lockedColors.map(el => el.color).includes(color)) {
			setLockedColors([...lockedColors].filter((c) => c.color !== color));
			return;
		}
		setLockedColors(prev => [...prev, { color, index }]);
	};

	const generate = async (colors: string[]) => {
		const url = colors.length
			? `https://www.colr.org/json/search_by_colors?colors=${colors.join(',')}`
			: "https://www.colr.org/json/schemes/random/21?scheme_size_limit=>5"
		try {
			const response = await axios.get(url,
				{
					params: {
						t: new Date().getTime(),
					},
				}
			);
			const schemes = response.data.schemes as Scheme[];
			const colors = response.data.colors as Color[]
			if (colors.length) {
				let draftColors = ["", "", "", "", ""]
				for (let el of lockedColors) {
					draftColors[el.index] = el.color
				}
				for (let i in draftColors) {
					if (draftColors[i] === '') {
						draftColors[i] = colors[Math.floor(Math.random() * colors.length)].hex
					}
				}
				setGeneratedScheme({ colors: draftColors, id: "000", tags: [] });
				return
			}
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
		generate(lockedColors.map(el => el.color));
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
					<div className={styles.colors} data-test-id='generated-colors'>
						{generatedScheme?.colors.slice(0, 5).map((color, index) => (
							<div
								key={uuid()}
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
								<button
									className={`${styles.lock} ${lockedColors.filter(el => el.index === index).map(el => el.color).includes(color) ? styles.locked : ""
										} `}
									onClick={() => lockColor({ color, index })}
								>
									{" "}
									<Locked />{" "}
								</button>
							</div>
						))}
					</div>
				)}
				<div className={styles.buttons}>
					<button className={styles.button} data-test-id='generate-btn' onClick={() => generate(lockedColors ? lockedColors.map(el => el.color) : [])}>
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