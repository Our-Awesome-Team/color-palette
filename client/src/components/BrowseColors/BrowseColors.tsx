import { Fragment, useEffect, useRef, useState } from 'react';
import styles from './BrowseColors.module.scss';
import { Color } from '../../store/favorites/favoritesTypes';
import axios from 'axios';
import { IconHeart } from '../../assets/icons/Heart';
import { IconWiRefresh } from '../../assets/icons/Refresh';
import ColorCard from '../ColorCard/ColorCard';
import SkeletonLoader from '../UI/SkeletonLoader';

const BrowseColors = ({ title }: { title: string }) => {
	const [colors, setColors] = useState<Color[]>([]);
	const [error, setError] = useState();
	const [loading, setLoading] = useState(true);
	const [currentColors, setCurrentColors] = useState(100);

	useEffect(() => {
		document.addEventListener('scroll', scrollHandler);

		return () => {
			document.removeEventListener('scroll', scrollHandler);
		};
	}, []);

	const scrollHandler = (e: any) => {
		if (
			e.target.documentElement.scrollHeight -
				(e.target.documentElement.scrollTop + window.innerHeight) <
			100
		) {
			setLoading(true);
		}
	};

	const fetchColors = () => {
		axios
			.get(`https://www.colr.org/json/colors/random/${currentColors}`, {
				params: {
					t: new Date().getTime(),
				},
			})
			.then(res => setColors(res.data.colors))
			.then(() => setCurrentColors(prev => prev + 100))
			.catch(err => setError(err))
			.finally(() => {
				setLoading(false);
			});
	};

	useEffect(() => {
		if (loading) {
			fetchColors();
		}
	}, [loading]);

	return (
		<div className={styles.browseColors}>
			{
				<>
					<div className={styles.titleBar}>
						<h2>{title}</h2>
						<IconWiRefresh className={styles.icon} onClick={fetchColors} />
					</div>
					<ul className={styles.allColors}>
						{loading ? (
							<SkeletonLoader
								count={100}
								width={109.5}
								height={130.5}
								containerClassName={styles.skeleton}
							/>
						) : (
							<Fragment data-testid="color-cards">
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
							</Fragment>
						)}
					</ul>
				</>
			}
		</div>
	);
};

export default BrowseColors;
