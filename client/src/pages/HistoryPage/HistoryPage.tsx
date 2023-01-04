import useLocalStorage from '../../hooks/useLocalStorage';
import { Query } from '../../store/history/historyTypes';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import styles from './HistoryPage.module.scss';
import { deleteHistory, getHistory } from '../../store/history/historySlice';
import { useEffect } from 'react';
import Spinner from '../../components/UI/Spinner/Spinner';
import HistoryItem from '../../components/HistoryItem/HistoryItem';


const History = () => {
	const dispatch = useAppDispatch()
	const { user } = useAppSelector(state => state.auth)
	const { queries, loading } = useAppSelector(
		state => state.history
	);

	useEffect(() => {
		dispatch(getHistory())
	}, [])

	const [localHistory, setLocalHistory] = useLocalStorage('history', [])

	function clearHistory() {
		user ? dispatch(deleteHistory()) : setLocalHistory([])
	}

	return (
		<section className={styles.history}>
			{loading ? <Spinner /> :
				<>
					<button onClick={clearHistory}>Clear</button>
					{user
						? queries.slice().reverse().map(query => (
							<HistoryItem query={query} key={query.id} />
						))
						: localHistory.map((query: Query) => (
							<HistoryItem query={query} key={query.id} />
						))}
				</>
			}
		</section >
	);
};

export default History;



