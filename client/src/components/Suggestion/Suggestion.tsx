import { FC } from 'react';
import Select from '../UI/Select/Select';

import styles from './Suggestion.module.scss';

const Suggestion: FC<{ title: string }> = ({ title }) => {
	return (
		<div className={styles.wrapper}>
			{[...Array(10)].map((item, index) => (
				<div className={styles.innerWrap}>
					<p>{title}</p>
					<Select name="Options" />
				</div>
			))}
		</div>
	);
};

export default Suggestion;
