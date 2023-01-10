import useLocalStorage from '../../hooks/useLocalStorage';
import { useAppSelector } from '../../store/hooks';
import styles from './HistoryPage.module.scss';
import Spinner from '../../components/UI/Spinner/Spinner';
import HistoryItem from '../../components/HistoryItem/HistoryItem';
import Seo from '../../utils/Seo/Seo';
import { useGetHisotoryQuery, useRemoveHistoryMutation } from '../../store/history/historyApi';
import { IHistoryItem } from '../../store/history/historyTypes.js';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const History = () => {
	const navigate = useNavigate();
	const { user } = useAppSelector(state => state.auth)
	const { data: history, isLoading, refetch } = useGetHisotoryQuery()

	useEffect(() => {
		if (!history) refetch()
	}, [])

	const [removeHistory] = useRemoveHistoryMutation()

	const [localHistory, setLocalHistory] = useLocalStorage('history', []);

	const clearHistory = async () => {
		user ? await removeHistory() : setLocalHistory([])
	}

	return (
		<>
			<Seo title="History" description="Look at colors you search recently!" />
			<section className={styles.history}>
				{isLoading
					? <Spinner />
					: <>
						<button onClick={clearHistory}>Clear</button>
						{user
							? history?.length
								? <>
									{history.slice().reverse().map(query => (
										<HistoryItem query={query} key={query.id} />
									))}
								</>
								: <h3 className={styles['dont-have']}>History's empty</h3>
							: localHistory.length
								? <>
									{localHistory.map((query: IHistoryItem) => (
										<HistoryItem query={query} key={query.id} />
									))}
								</>
								: <h3 className={styles['dont-have']}>History's empty</h3>
						}
						<div className={styles.btn}>
							<button onClick={() => navigate(-1)}>Go back</button>
						</div>
					</>
				}
			</section>
		</>
	);
};

export default History;
