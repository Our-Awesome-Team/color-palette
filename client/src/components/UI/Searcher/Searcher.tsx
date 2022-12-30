import { FC } from 'react';
import Select from '../Select/Select';
import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";

import styles from './Searcher.module.scss';

const Search: FC = () => {
	const [inputValue, setInputValue] = useState("");
	const [colorsData, setColorsData] = useState<any>([]);

	useEffect(() => {
		const fetchColor = async (query: string) => {
			const response = await axios.get(`https://www.colr.org/json/tag/${query}`);
			setColorsData(response.data.colors);
		};
		fetchColor(inputValue)
	}, [inputValue])


	const changeInput = (e: ChangeEvent<HTMLInputElement>) => {
		setInputValue(e.target.value);
	};

	return (
		<div className={styles.finder}>
			<input
				type="text"
				className={styles.input}
				placeholder="Search..."
				value={inputValue}
				onChange={changeInput}
			/>
			<div className={styles.results}>
				{colorsData &&
					colorsData.map((color: any) => (
						<div
							style={{ borderBottom: `1px solid #${color.hex}` }}
							className={styles["result-item"]}
							key={color.id}
						>
							<h3>{color.hex}</h3>
						</div>
					)
					)}
			</div>
		</div>
	);
};

export default Search;
