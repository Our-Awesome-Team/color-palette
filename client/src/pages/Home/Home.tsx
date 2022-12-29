import { useEffect, useState } from 'react';
import axios from 'axios';
import { addFavoriteColor } from '../../store/favorites/favoritesSlice'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { Color } from '../../store/favorites/favoritesTypes'
import Spinner from '../../components/UI/Spinner/Spinner';
import Generated from '../../components/Generated/Generated';
import BrowseColors from '../../components/BrowseColors/BrowseColors';

import styles from './Home.module.scss';

const Home = () => {
	// const dispatch = useAppDispatch();
	// const { user } = useAppSelector(state => state.auth);

    const [colors, setColors] = useState<Color[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    useEffect(() => {
        const fetchColors = async () => {
            try {
                const response = await axios.get("https://www.colr.org/json/colors/random/100")
                setColors(response.data.colors)
                setLoading(false)
            } catch (error) {
                console.log(error)
            }
        }
        fetchColors()
    }, [])

    const saveColor = (color: Color) => {
        dispatch(addFavoriteColor(color))
    }

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
