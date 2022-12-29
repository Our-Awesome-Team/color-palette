import { FC } from 'react';

import styles from './BrowseColors.module.scss';

const BrowseColors: FC = () => {
	return (
		<div className={styles.browseColors}>
			<h2>Browse Colors</h2>
			<div className={styles.allColors}>
				{[...Array(30)].map((item, index) => (
					<div></div>
				))}
			</div>
		</div>
	);
};

export default BrowseColors;
