import { useRef, ChangeEvent, useEffect, useState, Fragment } from 'react';
import axios from "axios";
import styles from './Search.module.scss';
import { Color, Scheme } from '../../../store/favorites/favoritesTypes';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import useDebounce from '../../../hooks/useDebounce';
import { colourIsLight, hexToRgb } from '../../../utils/colorUtils';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { v4 as uuid } from 'uuid';
import useLocalStorage from '../../../hooks/useLocalStorage';
import { addHistoryItem, getHistory } from '../../../store/history/historySlice';
import { Query } from '../../../store/history/historyTypes.js';

type SearchProps = {
	fullSize?: boolean
}

const Search = ({ fullSize }: SearchProps) => {
	const [inputValue, setInputValue] = useState('');
	const debouncedInput = useDebounce(inputValue, 400);
	const [showResults, setShowResults] = useState(false)
	const [colorsData, setColorsData] = useState<Color[]>([]);
	const [schemesData, setSchemesData] = useState<Scheme[]>([])
	const [searchParams, setSearchParams] = useSearchParams({});
	const dispatch = useAppDispatch()

	const { user } = useAppSelector(state => state.auth)

	useEffect(() => {
		setSearchParams(inputValue && { query: inputValue })
	}, [inputValue])

	useEffect(() => {
		const fetchColor = async (query: string) => {
			const response = await axios.get(`https://www.colr.org/json/tag/${query}`);
			setColorsData(response.data.colors);
			setSchemesData(response.data.schemes);

		};
		fetchColor(inputValue)
	}, [debouncedInput])


	const changeInput = (e: ChangeEvent<HTMLInputElement>) => {
		setInputValue(e.target.value);
	};

	const navigate = useNavigate()

	const [storedValue, setValue] = useLocalStorage('history', [])

	function goSearch(title: string | null) {
		navigate(`/search/?query=${title}`)
		const query = {
			id: uuid(),
			title: title ? title : '',
			date: `${Date.now()}`
		}
		if (user) {
			dispatch(addHistoryItem(query))
		} else {
			setValue([...storedValue, query])
		}
	}

	// History
	const { queries } = useAppSelector(
		state => state.history
	);

	useEffect(() => {
		dispatch(getHistory())
	}, [])

	return (
		<div className={`${styles.search} ${fullSize ? styles.fullsize : ''}`}>
			<input
				type="text"
				placeholder="Search..."
				value={inputValue}
				onChange={changeInput}
				onFocus={() => setShowResults(true)}
				onBlur={() => { setTimeout(() => setShowResults(false), 200) }}
				onKeyDown={(e) => e.key === 'Enter' && goSearch(searchParams.get('query'))}
			/>
			{showResults &&
				(inputValue ? <div className={styles.results}>
					<div className={styles.items}>
						{colorsData &&
							colorsData.slice(0, 5).map((color) => (
								<div
									style={{ backgroundColor: `#${color.hex}`, color: `${colourIsLight(hexToRgb(`#${color.hex}`)) ? '#000' : '#fff'}` }}
									className={styles.color}
									key={color.id}
									onClick={e => e.stopPropagation()}
								>
									<span>
										#{color.hex}
									</span>
								</div>
							)
							)}
					</div>
					<div className={styles.items}>
						{schemesData &&
							schemesData.filter(scheme => scheme.colors.length >= 5).slice(0, 5).map((scheme) => <div key={scheme.id} className={styles.scheme}>
								{scheme.colors.map(color => (color &&
									<div
										style={{ backgroundColor: `#${color}`, color: `${colourIsLight(hexToRgb(`#${color}`)) ? '#000' : '#fff'}` }}
										className={styles.color}
										key={color}
										onClickCapture={e => e.stopPropagation()}
									>
										<span>
											#{color}
										</span>
									</div>
								)
								)}
							</div>
							)}
					</div>
					<div onClick={() => goSearch(searchParams.get('query'))} className={styles['show-more']}>
						Show more...
					</div>
				</div>
					: <div className={styles.history}>
						{user
							? queries.slice().reverse().slice(0, 10).map(query => (
								<div className={styles['history-item']} onClick={() => goSearch(query.title)} key={query.id}>{query.title} – {new Date(Number(query.date) - 1000).toLocaleString()}</div>
							))
							: storedValue.slice(0, 10).map((query: Query) => (
								<div className={styles['history-item']} onClick={() => goSearch(query.title)} key={query.id}>{query.title} – {new Date(Number(query.date) - 1000).toLocaleString()}</div>
							))}
						<Link to='/history' onClick={() => setShowResults(false)} className={styles['show-more']}>
							Show more...
						</Link>
					</div>
				)}
		</div>
	);
};

export default Search;
