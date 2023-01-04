import Generated from '../../components/Generated/Generated';
import BrowseColors from '../../components/BrowseColors/BrowseColors';
import styles from './Home.module.scss';
import Seo from '../../utils/Seo/Seo';

const Home = () => {
	return (
		<>
			<Seo
				title="Browse colors"
				description="Find your favorite color and use it to create!"
			/>
			<section className={styles.home}>
				<div className="container">
					<Generated />
					<BrowseColors title="Browse colors" />
				</div>
			</section>
		</>
	);
};

export default Home;
