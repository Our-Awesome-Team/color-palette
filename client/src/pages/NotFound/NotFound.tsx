import { FC } from 'react';
import { Link } from 'react-router-dom';

import styles from './NotFound.module.scss';

const NotFound: FC = () => {
	return (
		<>
			<section className={styles.notFound}>
				<h1>
					Page not found. <br /> Please visit our home page
				</h1>
				<Link to={'/'}>Home page</Link>
			</section>
		</>
	);
};

export default NotFound;
