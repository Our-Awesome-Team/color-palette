import { ChangeEvent, useEffect, useState } from 'react';
import axios from "axios";
import styles from './Search.module.scss';
import { Color, Scheme } from '../../../store/favorites/favoritesTypes';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import useDebounce from '../../../hooks/useDebounce';
import { colourIsLight, hexToRgb } from '../../../utils/colorUtils';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import useLocalStorage from '../../../hooks/useLocalStorage';
import { getHistory } from '../../../store/history/historySlice';
import { Query } from '../../../store/history/historyTypes';
import HistoryItem from '../../HistoryItem/HistoryItem';
import { useSearch } from '../../../hooks/useSearch';

type SearchProps = {
	fullSize?: boolean
}

const Search = ({ fullSize }: SearchProps) => {
	console.log('rerender');

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

	const { queries } = useAppSelector(
		state => state.history
	);

	useEffect(() => {
		dispatch(getHistory())
	}, [])

	const [localHistory, setLocalHistory] = useLocalStorage('history', [])

	const search = useSearch()

	function openSuggestion() {
		document.body.style.overflow = 'hidden'
		setShowResults(true)
	}

	function closeSuggestion() {
		document.body.style.overflow = 'auto'

		setTimeout(() => setShowResults(false), 200)
	}

	return (
		<div className={`${styles.search} ${fullSize ? styles.fullsize : ''}`}>
			<input
				type="text"
				placeholder="Search..."
				value={inputValue}
				onChange={changeInput}
				onFocus={openSuggestion}
				onBlur={closeSuggestion}
				onKeyDown={(e) => e.key === 'Enter' && search(searchParams.get('query'))}
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
					<div onClick={() => search(searchParams.get('query'))} className={styles['show-more']}>
						{(colorsData.length || schemesData.length) ? "Show more..." : 'Go to search page'}
					</div>
				</div>
					: <div className={styles.history}>
						{user
							? queries.slice().reverse().slice(0, 10).map(query => (
								<HistoryItem query={query} key={query.id} />
							))
							: localHistory.slice(0, 10).map((query: Query) => (
								<HistoryItem query={query} key={query.id} />
							))}
						<Link to='/history' onClick={() => setShowResults(false)} className={styles['show-more']}>
							Go to history page
						</Link>
					</div>
				)}
		</div>
	);
};

export default Search;