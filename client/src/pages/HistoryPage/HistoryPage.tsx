import useLocalStorage from '../../hooks/useLocalStorage';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import styles from './HistoryPage.module.scss';

import { useEffect } from 'react';
import Spinner from '../../components/UI/Spinner/Spinner';
import HistoryItem from '../../components/HistoryItem/HistoryItem';
import Seo from '../../utils/Seo/Seo';
import { useGetHisotoryQuery, useRemoveHistoryMutation } from '../../store/history/historyApi';
import { IHistoryItem } from '../../store/history/historyTypes.js';


const History = () => {
	const { user } = useAppSelector(state => state.auth)
	const { data: history, isLoading } = useGetHisotoryQuery()
	const [removeHistory] = useRemoveHistoryMutation()

	const [localHistory, setLocalHistory] = useLocalStorage('history', [])

	async function clearHistory() {
		user ? await removeHistory() : setLocalHistory([])
	}

	return (
		<>
			<Seo title="History" description="Look at colors you search recently!" />
			<section className={styles.history}>
				{isLoading ? <Spinner /> :
					<>
						<button onClick={clearHistory}>Clear</button>
						{user
							? history?.slice().reverse().map(query => (
								<HistoryItem query={query} key={query.id} />
							))
							: localHistory.map((query: IHistoryItem) => (
								<HistoryItem query={query} key={query.id} />
							))}
					</>
				}
			</section >
		</>
	);
};

export default History;



