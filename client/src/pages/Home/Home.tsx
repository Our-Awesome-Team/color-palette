import { useEffect, useState } from 'react'
import styles from './Home.module.css'
import axios from 'axios'
import Spinner from '../../components/Spinner/Spinner'
import { Color } from '../../store/favorites/favoritesTypes'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { addFavoriteColor } from '../../store/favorites/favoritesSlice'


const Home = () => {
    const dispatch = useAppDispatch()
    const { user } = useAppSelector((state) => state.auth)

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