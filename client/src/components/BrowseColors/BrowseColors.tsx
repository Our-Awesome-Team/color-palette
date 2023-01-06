import { FC, useEffect, useState } from 'react';
import styles from './BrowseColors.module.scss';
import { Color } from '../../store/favorites/favoritesTypes';
import axios from 'axios';
import { IconHeart } from '../../assets/icons/Heart';
import { IconWiRefresh } from '../../assets/icons/Refresh';
import ColorCard from '../ColorCard/ColorCard';
import SkeletonLoader from '../UI/SkeletonLoader';

const BrowseColors: FC<{ title: string }> = ({ title }) => {
	const [colors, setColors] = useState<Color[]>([]);
	const [error, setError] = useState();
	const [loading, setLoading] = useState(true);

	function fetchColors() {
		axios
			.get('https://www.colr.org/json/colors/random/100', {
				params: {
					t: new Date().getTime(),
				},
			})
			.then(res => setColors(res.data.colors))
			.catch(err => setError(err))
			.finally(() => setLoading(false));
	}

	useEffect(() => {
		fetchColors();
	}, []);

	return (
		<div className={styles.browseColors}>
			{
				<>
					<div className={styles.titleBar}>
						<h2>{title}</h2>
						<IconWiRefresh className={styles.icon} onClick={fetchColors} />
					</div>
					<div className={styles.allColors}>
						{loading ? (
							<SkeletonLoader
								count={45}
								width={110}
								height={130}
								containerClassName={styles.allColors}
							/>
						) : (
							<>
								{colors.map(
									color =>
										color.hex && (
											<ColorCard
												color={color}
												Icon={IconHeart}
												add
												key={color.id}
											/>
										)
								)}
							</>
						)}
					</div>
				</>
			}
		</div>
	);
};

export default BrowseColors;
