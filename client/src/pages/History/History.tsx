import Suggestion from '../../components/Suggestion/Suggestion';
import styles from './History.module.scss';

const History = () => {
	return (
		<section className={styles.history}>
			<div className="__container">
				<Suggestion title="Some History Tag" />
			</div>
		</section>
	);
};

export default History;
