import { useEffect, useState } from 'react';
import Spinner from '../UI/Spinner/Spinner';
import styles from './Generated.module.scss';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { Color, Scheme } from '../../store/favorites/favoritesTypes';
import { addFavoriteColor, addFavoriteScheme } from '../../store/favorites/favoritesSlice';
import { IconSparkles } from '../../assets/icons/Sparks';
import axios from 'axios';
import { IconHeart } from '../../assets/icons/Heart';
import { colourIsLight, hexToRgb } from '../../utils/colorUtils';


const Generated = () => {
	const dispatch = useAppDispatch();
	const { user } = useAppSelector(state => state.auth);
	const [loading, setLoading] = useState<boolean>(false);
	const [generatedScheme, setGeneratedScheme] = useState<Scheme>()

	async function generate() {
		const response = await axios.get('https://www.colr.org/json/schemes/random/7?scheme_size_limit=>5', {
			params: {
				t: new Date().getTime()
			}
		})
		const schemes = response.data.schemes as Scheme[]
		setGeneratedScheme(schemes.find(scheme => scheme.colors.length >= 5))
	}

	useEffect(() => {
		generate()
	}, [])

	const addScheme = (scheme?: Scheme) => {
		if (scheme) {
			dispatch(addFavoriteScheme(scheme))
		}
	}

	return (
		<div className={styles.generated}>
			<div className={styles.colors}>
				{generatedScheme?.colors.slice(0, 5).map(color =>
					<div key={color} className={styles.color} style={{ backgroundColor: `#${color}` }}>
						<h2 style={{ color: `${colourIsLight(hexToRgb(color)) ? '#000' : '#fff'}` }}>
							#{color}
						</h2>
					</div>
				)}
			</div>
			<div className={styles.buttons}>
				<button className={styles.button} onClick={generate}>
					<span>Generate</span>
					<span>
						<IconSparkles className={styles.sparkles} />
					</span>
				</button>
				{user && <button className={styles.button}>
					<span>
						<IconHeart className={styles.heart} onClick={() => addScheme(generatedScheme)} />
					</span>
				</button>}
			</div>
		</div>
	);
};

export default Generated;

