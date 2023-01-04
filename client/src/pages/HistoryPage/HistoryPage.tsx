import { useNavigate } from 'react-router-dom';
import useLocalStorage from '../../hooks/useLocalStorage';
import { Query } from '../../store/history/historyTypes';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import styles from './HistoryPage.module.scss';
import { v4 as uuid } from 'uuid';
import {
	addHistoryItem,
	deleteHistory,
	getHistory,
} from '../../store/history/historySlice';
import { useEffect } from 'react';
import Seo from '../../utils/Seo/Seo';

const History = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const { user } = useAppSelector(state => state.auth);

	const { queries } = useAppSelector(state => state.history);

	useEffect(() => {
		dispatch(getHistory());
	}, []);

	const [storedValue, setValue] = useLocalStorage('history', []);

	function goSearch(title: string) {
		navigate(`/search/?query=${title}`);
		const query = {
			id: uuid(),
			title,
			date: `${Date.now()}`,
		};
		if (user) {
			dispatch(addHistoryItem(query));
		} else {
			setValue([...storedValue, query]);
		}
	}

	// Удаление истории поиска для авторизованного пользователя нужно починить на сервере
	// (для неавторизованного пользователя (через localStorage) всё хорошо работает)
	function clearHistory() {
		user ? dispatch(deleteHistory()) : setValue([]);
	}

	return (
		<>
			<Seo title="History" description="Look at colors you search recently!" />
			<section className={styles.history}>
				<button onClick={clearHistory}>Clear</button>
				{user
					? queries.map(query => (
							<div
								className={styles['history-item']}
								onClick={() => goSearch(query.title)}
								key={query.id}
							>
								{query.title} –{' '}
								{new Date(Number(query.date) - 1000).toLocaleString()}
							</div>
					  ))
					: storedValue.map((query: Query) => (
							<div
								className={styles['history-item']}
								onClick={() => goSearch(query.title)}
								key={query.id}
							>
								{query.title} –{' '}
								{new Date(Number(query.date) - 1000).toLocaleString()}
							</div>
					  ))}
			</section>
		</>
	);
};

export default History;
