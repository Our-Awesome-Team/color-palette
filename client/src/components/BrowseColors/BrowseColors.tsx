import React, { Fragment, ReactNode, useEffect, useRef, useState } from 'react';
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
	const [loadingExtra, setLoadingExtra] = useState(false);
	// const [currentColors, setCurrentColors] = useState(100);

	useEffect(() => {
		document.body.addEventListener('scroll', scrollHandler);

		return () => {
			document.body.removeEventListener('scroll', scrollHandler);
		};
	}, []);

	const fetchExtraColors = () => {
		axios
			.get(`https://www.colr.org/json/colors/random/100`, {
				params: {
					t: new Date().getTime(),
				},
			})
			.then(res => setColors([...colors, ...res.data.colors]))
			.catch(err => setError(err))
			.finally(() => {
				setLoadingExtra(false)

			});
	}


	const scrollHandler = (e: any) => {
		if (
			e.target.document.scrollHeight -
			(e.target.document.scrollTop + window.innerHeight) <
			100
		) {
			setLoadingExtra(true)
		}
	};

	const fetchColors = () => {
		axios
			.get(`https://www.colr.org/json/colors/random/100`, {
				params: {
					t: new Date().getTime(),
				},
			})
			.then(res => setColors(res.data.colors))
			// .then(() => setCurrentColors(prev => prev + 100))
			.catch(err => setError(err))
			.finally(() => {
				setLoading(false);
			});
	};

	useEffect(() => {
		fetchColors();
	}, []);

	useEffect(() => {
		if (loadingExtra) fetchExtraColors();
	}, [loadingExtra]);

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
							<>
								{colors.map(
									color =>
										color.hex && (
											<ColorCard
												data-testid="color-card"
												color={color}
												Icon={IconHeart}
												add
												key={color.id}
											/>
										)
								)}
							</>
						)}
					</ul>
				</>
			}
		</div>
	);
};

export default BrowseColors;
