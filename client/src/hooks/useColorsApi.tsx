import axios from 'axios';
import { useEffect, useState } from 'react'
import { Color } from '../store/favorites/favoritesTypes.js';

const useColorsApi = () => {
    const [colors, setColors] = useState<Color[]>([]);
    const [error, setError] = useState();
    const [loading, setLoading] = useState(true);
    const [loadingExtra, setLoadingExtra] = useState(false);

    const fetchColors = () => {
        axios
            .get('https://www.colr.org/json/colors/random/100', {
                params: {
                    t: new Date().getTime(),
                },
            })
            .then(res => setColors(res.data.colors))
            .catch(err => setError(err))
            .finally(() => setLoading(false));
    }

    const fetchExtraColors = () => {
        axios
            .get(`https://www.colr.org/json/colors/random/100`, {
                params: {
                    t: new Date().getTime(),
                },
            })
            .then(res => setColors([...colors, ...res.data.colors]))
            .catch(err => setError(err))
            .finally(() => {
                setLoadingExtra(false)

            });
    }

    useEffect(() => {
        fetchColors();
    }, []);

    useEffect(() => {
        if (loadingExtra) fetchExtraColors();
    }, [loadingExtra]);

    return { colors, loading, setLoading, loadingExtra, setLoadingExtra, fetchColors, fetchExtraColors }
}

export default useColorsApi