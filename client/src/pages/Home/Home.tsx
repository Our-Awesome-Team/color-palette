import { useEffect, useState } from 'react'
import styles from './Home.module.css'
import axios from 'axios'
import { saveFavoriteColor } from '../../services/favoriteColor/favoriteColorSlice'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { FavoriteColor } from '../../services/favoriteColor/favoriteColorTypes'
import Spinner from '../../components/Spinner/Spinner'


const Home = () => {
    const dispatch = useAppDispatch()
    const { user } = useAppSelector((state) => state.auth)

    const [colors, setColors] = useState<FavoriteColor[]>([])
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

    const saveColor = (color: FavoriteColor) => {
        dispatch(saveFavoriteColor(color))
    }

    return (
        <div className={styles.container}>
            {loading ? <Spinner /> :
                colors.map(color => <div key={color.id}>{color.hex}
                    {user && <button onClick={() => saveColor(color)}>+</button>}
                </div>)
            }
        </div>
    )
}

export default Home