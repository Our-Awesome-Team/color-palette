import useLocalStorage from '../../hooks/useLocalStorage';
import { Query } from '../../store/history/historyTypes';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import styles from './HistoryPage.module.scss';
import { deleteHistory, getHistory } from '../../store/history/historySlice';
import { useEffect } from 'react';
import Spinner from '../../components/UI/Spinner/Spinner';
import HistoryItem from '../../components/HistoryItem/HistoryItem';
import Seo from '../../utils/Seo/Seo';
import { useNavigate } from 'react-router-dom';

const History = () => {
	const navigate = useNavigate();

	const dispatch = useAppDispatch();
	const { user } = useAppSelector(state => state.auth);
	const { queries, loading } = useAppSelector(state => state.history);

	useEffect(() => {
		dispatch(getHistory());
	}, []);

	const [localHistory, setLocalHistory] = useLocalStorage('history', []);

	function clearHistory() {
		user ? dispatch(deleteHistory()) : setLocalHistory([]);
	}

	return (
		<>
			<Seo title="History" description="Look at colors you search recently!" />
			<section className={styles.history}>
				{loading ? (
					<Spinner />
				) : (
					<>
						<button onClick={clearHistory}>Clear</button>
						{user ? (
							queries.length ? (
								<>
									{queries
										.slice()
										.reverse()
										.map(query => (
											<HistoryItem query={query} key={query.id} />
										))}
								</>
							) : (
								<h3>History's empty</h3>
							)
						) : (
							localHistory.map((query: Query) => (
								<HistoryItem query={query} key={query.id} />
							))
						)}
						<div className={styles.btn}>
							<button onClick={() => navigate(-1)}>Go back</button>
						</div>
					</>
				)}
			</section>
		</>
	);
};

export default History;
