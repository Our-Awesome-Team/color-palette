import { useEffect } from 'react';
import styles from './BrowseColors.module.scss';
import { IconHeart } from '../../assets/icons/Heart';
import { IconWiRefresh } from '../../assets/icons/Refresh';
import ColorCard from '../ColorCard/ColorCard';
import SkeletonLoader from '../UI/SkeletonLoader';
import { v4 as uuid } from 'uuid'
import useColorsApi from '../../hooks/useColorsApi';

const BrowseColors = ({ title }: { title: string }) => {
	const { colors, loading, setLoadingExtra, fetchColors } = useColorsApi()

	useEffect(() => {
		document.addEventListener('scroll', scrollHandler);

		return () => {
			document.removeEventListener('scroll', scrollHandler);
		};
	}, []);

	const scrollHandler = (): void => {
		if (
			document.documentElement.scrollHeight -
			(document.documentElement.scrollTop + window.innerHeight) <
			100
		) {
			setLoadingExtra(true)
		}
	};

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
												key={uuid()}
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
