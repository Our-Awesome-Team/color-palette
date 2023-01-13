import { useSearchParams } from 'react-router-dom';
import styles from './SearchPage.module.scss';
import { ChangeEvent, useEffect, useLayoutEffect, useRef, useState } from 'react';
import ColorCard from '../../components/ColorCard/ColorCard';
import { IconHeart } from '../../assets/icons/Heart';
import SchemeCard from '../../components/SchemeCard/SchemeCard';
import Seo from '../../utils/Seo/Seo';
import useSearch from '../../hooks/useSearch';
import { useRandomColorsAndSchemes } from '../../hooks/useRandomColorsAndSchemes';

const SearchPage = () => {
	const [inputValue, setInputValue] = useState('');

	const [searchParams, setSearchParams] = useSearchParams();
	const { colorsData, schemesData } = useRandomColorsAndSchemes(inputValue);
	const search = useSearch();

	const inputRef = useRef<HTMLInputElement>(null);
	useLayoutEffect(() => {
		setInputValue(searchParams.get('query') ? searchParams.get('query')! : '');
		inputRef?.current?.focus();
	}, []);

	useEffect(() => {
		setSearchParams(inputValue && { query: inputValue });
	}, [inputValue]);

	const changeInput = (e: ChangeEvent<HTMLInputElement>) => {
		setInputValue(e.target.value);
	};

	useEffect(() => {
		document.addEventListener('scroll', scrollHandler);

		return () => {
			document.removeEventListener('scroll', scrollHandler);
		};
	}, []);

	const [outputSize, setOutputSize] = useState(50)
	const scrollHandler = (): void => {
		if (
			document.documentElement.scrollHeight -
			(document.documentElement.scrollTop + window.innerHeight) <
			100
		) {
			setOutputSize(prev => prev + 50)
		}
	};

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
