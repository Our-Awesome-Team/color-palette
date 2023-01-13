import { useState } from 'react';
import styles from './Generated.module.scss';
import { useAppSelector } from '../../store/hooks';
import { IconSparkles } from '../../assets/icons/Sparks';
import { IconHeart } from '../../assets/icons/Heart';
import { colourIsLight, hexToRgb } from '../../utils/colorUtils';
import SkeletonLoader from '../UI/SkeletonLoader';
import { useAddFavoriteSchemeMutation } from '../../store/favorites/favoritesApi';
import { Locked } from "../../assets/icons/Locked";
import { Scheme } from "../../store/favorites/favoritesTypes";
import { v4 as uuid } from 'uuid';
import useGenerate, { LockedColor } from '../../hooks/useGenerate';

const Generated = () => {
	const { user } = useAppSelector(state => state.auth);

	const [lockedColors, setLockedColors] = useState<LockedColor[]>([]);

	const { generatedScheme, loading, generate } = useGenerate(lockedColors)

	const lockColor = ({ color, index }: LockedColor) => {
		if (lockedColors.map(el => el.color).includes(color)) {
			setLockedColors([...lockedColors].filter((c) => c.color !== color));
			return;
		}
		setLockedColors(prev => [...prev, { color, index }]);
	};

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
						data-testid='skeleton'
						count={5}
						style={{ paddingBottom: '18.25%' }}
						containerClassName={styles.colors}
					/>
				) : (
					<div className={styles.colors} data-testid='generated-colors' data-test-id='generated-colors'>
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