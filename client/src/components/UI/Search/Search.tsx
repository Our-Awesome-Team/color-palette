import { ChangeEvent, useEffect, useState } from 'react';
import styles from './Search.module.scss';
import { Link, useSearchParams } from 'react-router-dom';
import { colourIsLight, hexToRgb } from '../../../utils/colorUtils';
import { useAppSelector } from '../../../store/hooks';
import useLocalStorage from '../../../hooks/useLocalStorage';
import HistoryItem from '../../HistoryItem/HistoryItem';
import useSearch from '../../../hooks/useSearch';
import { IHistoryItem } from '../../../store/history/historyTypes';
import { useGetHisotoryQuery } from '../../../store/history/historyApi';
import { useRandomColorsAndSchemes } from '../../../hooks/useRandomColorsAndSchemes';

type SearchProps = {
	fullSize?: boolean
}

const Search = ({ fullSize }: SearchProps) => {
	const { user } = useAppSelector(state => state.auth)

	const [inputValue, setInputValue] = useState('');
	const [showResults, setShowResults] = useState(false);

	const [searchParams, setSearchParams] = useSearchParams({});
	const [localHistory, setLocalHistory] = useLocalStorage('history', [])
	const { colorsData, schemesData } = useRandomColorsAndSchemes(inputValue)
	const { data: history } = useGetHisotoryQuery()
	const search = useSearch()

	useEffect(() => {
		setSearchParams(inputValue && { query: inputValue })
	}, [inputValue])


	const changeInput = (e: ChangeEvent<HTMLInputElement>) => {
		setInputValue(e.target.value);
	};

	const openSuggestion = () => {
		document.body.style.overflow = 'hidden'
		setShowResults(true)
	}

	const closeSuggestion = () => {
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
									onClick={() => search(searchParams.get('query'))}
								>
									<span>
										#{color.hex}
									</span>
								</div>
							)
							)}
						{schemesData &&
							schemesData.filter(scheme => scheme.colors?.length >= 5).slice(0, 5).map((scheme) => <div key={scheme.id} className={styles.scheme}>
								{scheme.colors.map(color => (color &&
									<div
										style={{ backgroundColor: `#${color}`, color: `${colourIsLight(hexToRgb(`#${color}`)) ? '#000' : '#fff'}` }}
										className={styles.color}
										key={color}
										onClick={() => search(searchParams.get('query'))}
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
						{(colorsData?.length || schemesData?.length) ? "Show more..." : 'Go to search page'}
					</div>
				</div>
					: <div className={styles.history}>
						{user
							? history?.slice().reverse().slice(0, 10).map(query => (
								<HistoryItem query={query} key={query.id} />
							))
							: localHistory.slice(0, 10).map((query: IHistoryItem) => (
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
