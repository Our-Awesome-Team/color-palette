import Suggestion from '../../components/Suggestion/Suggestion';
import Select from '../../components/UI/Select/Select';
import styles from './Search.module.scss';

const Search = () => {
	return (
		<section className={styles.search}>
			<div className="__container">
				<div className={styles.container}>
					<div className={styles.inputContainer}>
						<Select name="Options" />
						<input type="text" placeholder="Typings Something..." />
					</div>
					<Suggestion title="Some Suggestion" />
				</div>
			</div>
		</section>
	);
};

export default Search;
