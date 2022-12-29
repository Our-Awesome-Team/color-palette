import { useEffect, useState } from 'react';
import axios from 'axios';
import { saveFavoriteColor } from '../../services/favoriteColor/favoriteColorSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { FavoriteColor } from '../../services/favoriteColor/favoriteColorTypes';
import Spinner from '../../components/UI/Spinner/Spinner';
import Generated from '../../components/Generated/Generated';
import BrowseColors from '../../components/BrowseColors/BrowseColors';

import styles from './Home.module.scss';

const Home = () => {
	// const dispatch = useAppDispatch();
	// const { user } = useAppSelector(state => state.auth);

	// const [colors, setColors] = useState<FavoriteColor[]>([]);
	// const [loading, setLoading] = useState<boolean>(true);

	// useEffect(() => {
	//     const fetchColors = async () => {
	//         try {
	//             const response = await axios.get("https://www.colr.org/json/colors/random/100")
	//             setColors(response.data.colors)
	//             setLoading(false)
	//         } catch (error) {
	//             console.log(error)
	//         }
	//     }
	//     fetchColors()
	// }, [])

	// const saveColor = (color: FavoriteColor) => {
	// 	dispatch(saveFavoriteColor(color));
	// };

	return (
		<section className={styles.home}>
			<div className="__container">
				<Generated />
				<BrowseColors />
			</div>
		</section>
	);
};

export default Home;
