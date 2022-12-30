import { FC } from 'react';

import styles from './BrowseColors.module.scss';

const BrowseColors: FC<{ title: string }> = ({ title }) => {
	return (
		<div className={styles.browseColors}>
			<h2>{title}</h2>
			<div className={styles.allColors}>
				{[...Array(100)].map((item, index) => (
					<div>
						<div></div>
						<span>Skyway #ACC0D9</span>
					</div>
				))}
			</div>
		</div>
	);
};

export default BrowseColors;
