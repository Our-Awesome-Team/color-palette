import { FC } from 'react';
import Select from '../Select/Select';

import styles from './Searcher.module.scss';

const Search: FC = () => {
	return (
		<>
			<input className={styles.input} type="text" placeholder="Search..." />
		</>
	);
};

export default Search;
