import { useSearchParams } from 'react-router-dom';
import styles from './SearchPage.module.scss';
import { ChangeEvent, useEffect, useLayoutEffect, useRef, useState } from 'react';
import useDebounce from '../../hooks/useDebounce';
import { Color, Scheme } from '../../store/favorites/favoritesTypes';
import axios from 'axios';
import ColorCard from '../../components/ColorCard/ColorCard';
import { IconHeart } from '../../assets/icons/Heart';
import SchemeCard from '../../components/SchemeCard/SchemeCard';
import Seo from '../../utils/Seo/Seo';
import { useSearch } from '../../hooks/useSearch';

// Раскидать логику по хукам

const SearchPage = () => {
	const inputRef = useRef<HTMLInputElement>(null);
	const [searchParams, setSearchParams] = useSearchParams();

	useLayoutEffect(() => {
		setInputValue(searchParams.get('query') ? searchParams.get('query')! : '');
		inputRef?.current?.focus();
	}, []);

	const [inputValue, setInputValue] = useState('');
	const debouncedInput = useDebounce(inputValue, 400);

	useEffect(() => {
		setSearchParams(inputValue && { query: inputValue });
	}, [inputValue]);

	const [colorsData, setColorsData] = useState<Color[]>([]);
	const [schemesData, setSchemesData] = useState<Scheme[]>([]);

	useEffect(() => {
		const fetch = async (query: string) => {
			if (query.trim().split(' ').length === 1) {
				const response = await axios.get(`https://www.colr.org/json/tag/${query.trim().toLowerCase()}`);
				setColorsData(response.data.colors);
				setSchemesData(response.data.schemes);
			} else {
				const response = await axios.get(`https://www.colr.org/json/tags/${query.trim().toLowerCase().split(' ').join(',')}`);
				setColorsData(response.data.colors);
				setSchemesData(response.data.schemes);
			}
		}
		fetch(inputValue)
	}, [debouncedInput]);

	const changeInput = (e: ChangeEvent<HTMLInputElement>) => {
		setInputValue(e.target.value);
	};

	const search = useSearch()

	useEffect(() => {
		document.addEventListener('scroll', scrollHandler);

		return () => {
			document.removeEventListener('scroll', scrollHandler);
		};
	}, []);

	const scrollHandler = (): void => {
		if (
			document.documentElement.scrollHeight -
			(document.documentElement.scrollTop + window.innerHeight) <
			100
		) {
			setOutputSize(prev => prev + 500)
		}
	};

	const [outputSize, setOutputSize] = useState(50)


	return (
		<>
			<Seo
				title="Search colors"
				description="Search color you need most of all!"
			/>

			<div className={styles.search}>
				<input
					type="text"
					placeholder="Search..."
					value={inputValue}
					onChange={changeInput}
					ref={inputRef}
					onKeyDown={e => (e.key === 'Enter') && search(searchParams.get('query'))}
				/>
				{!!colorsData?.length && (
					<div className={styles.results}>
						<div className={styles['colors-column']}>
							<h2>Colors</h2>
							<div className={styles.colors}>
								{colorsData &&
									colorsData
										.slice(0, outputSize)
										.map(color => (
											<ColorCard
												color={color}
												key={color.id}
												Icon={IconHeart}
												add
											/>
										))}
							</div>
						</div>
						<div className={styles['schemes-column']}>
							<h2>Schemes</h2>
							<div className={styles.schemes}>
								{schemesData &&
									schemesData
										.slice(0, outputSize)
										.filter(scheme => scheme.colors?.length >= 5)
										.map(scheme => (
											<SchemeCard
												scheme={scheme}
												key={scheme.id}
												Icon={IconHeart}
												add
											/>
										))}
							</div>
						</div>
					</div>
				)}
			</div>
		</>
	);
};

export default SearchPage;
