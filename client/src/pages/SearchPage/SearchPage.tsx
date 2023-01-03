import { useNavigate, useSearchParams } from 'react-router-dom';
import styles from './SearchPage.module.scss';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import useDebounce from '../../hooks/useDebounce';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { Color, Scheme } from '../../store/favorites/favoritesTypes';
import axios from 'axios';
import useLocalStorage from '../../hooks/useLocalStorage';
import { v4 as uuid } from 'uuid';
import { addHistoryItem } from '../../store/history/historySlice';
import ColorCard from '../../components/ColorCard/ColorCard';
import { IconHeart } from '../../assets/icons/Heart';
import SchemeCard from '../../components/SchemeCard/SchemeCard';

const SearchPage = () => {
	const inputRef = useRef<HTMLInputElement>(null)
	const [searchParams, setSearchParams] = useSearchParams()

	useEffect(() => {
		setInputValue(searchParams.get('query') ? searchParams.get('query')! : '')
		inputRef?.current?.focus()
	}, [])
	const [inputValue, setInputValue] = useState('');
	const debouncedInput = useDebounce(inputValue, 400);

	const [colorsData, setColorsData] = useState<Color[]>([]);
	const [schemesData, setSchemesData] = useState<Scheme[]>([])
	const dispatch = useAppDispatch()

	const { user } = useAppSelector(state => state.auth)

	useEffect(() => {
		setSearchParams(inputValue && { query: inputValue }, { replace: true })
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

	function goSearch(title: URLSearchParams) {
		navigate(`/search/?${title}`)
		const query = {
			id: uuid(),
			title: title.get('query') || 'untitled',
			date: `${Date.now()}`
		}
		if (user) {
			dispatch(addHistoryItem(query))
		} else {
			setValue([...storedValue, query])
		}
	}

	return (

		<div className={styles.search}>
			<input
				type="text"
				placeholder="Search..."
				value={inputValue}
				onChange={changeInput}
				ref={inputRef}
				onKeyDown={(e) => e.key === 'Enter' && goSearch(searchParams)}
			/>
			{!!colorsData.length &&
				<div className={styles.results}>
					<div className={styles['colors-column']}>
						<h2>Colors</h2>
						<div className={styles.colors}>
							{colorsData &&
								colorsData.map((color) =>
									<ColorCard color={color} key={color.id} Icon={IconHeart} add />
								)}
						</div>
					</div>
					<div className={styles['schemes-column']}>
						<h2>Schemes</h2>
						<div className={styles.schemes}>
							{schemesData &&
								schemesData.filter(scheme => scheme.colors.length >= 5).map((scheme) =>
									<SchemeCard scheme={scheme} key={scheme.id} Icon={IconHeart} add />
								)}
						</div>
					</div>
				</div>
			}
		</div>

	);
};

export default SearchPage;
