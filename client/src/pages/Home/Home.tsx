import Generated from '../../components/Generated/Generated';
import BrowseColors from '../../components/BrowseColors/BrowseColors';
import styles from './Home.module.scss';

const Home = () => {
    return (
        <section className={styles.home}>
            <div className="container">
                <Generated />
                <BrowseColors title='Browse color' />
            </div>
        </section>
    );
};

export default Home;
