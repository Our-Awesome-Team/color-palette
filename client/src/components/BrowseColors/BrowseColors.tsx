import styles from './BrowseColors.module.scss';
import { IconHeart } from '../../assets/icons/Heart';
import { IconWiRefresh } from '../../assets/icons/Refresh';
import ColorCard from '../ColorCard/ColorCard';
import SkeletonLoader from '../UI/SkeletonLoader';
import useColorsApi from '../../hooks/useColorsApi';
import { v4 as uuid } from 'uuid'
import useScroll from '../../hooks/useScroll';

const BrowseColors = ({ title }: { title: string }) => {
	const { colors, loading, setLoadingExtra, fetchColors } = useColorsApi()

	useScroll(() => setLoadingExtra(true))

	return (
		<div className={styles.browseColors}>
			{
				<>
					<div className={styles.titleBar}>
						<h2>{title}</h2>
						<IconWiRefresh className={styles.icon} onClick={fetchColors} data-test-id='refresh' />
					</div>
					<ul className={styles.allColors}>
						{loading ? (
							<SkeletonLoader
								count={100}
								width={109.5}
								height={130.5}
								containerClassName={styles.skeleton}
								data-testid='skeleton'
							/>
						) : (
							<>
								{colors?.map(
									color =>
										color.hex && (
											<ColorCard
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
