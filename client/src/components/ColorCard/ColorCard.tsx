import { addFavoriteColor, deleteFavoriteColor } from '../../store/favorites/favoritesSlice'
import { Color } from '../../store/favorites/favoritesTypes'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import styles from './ColorCard.module.scss'

type Props = {
    color: Color
    Icon: React.ElementType
    add?: boolean
}

const ColorCard = ({ color, Icon, add = false }: Props) => {
    const dispatch = useAppDispatch()
    const { user } = useAppSelector(state => state.auth)

    const addColor = () => {
        dispatch(addFavoriteColor(color))
    }

    const removeColor = () => {
        dispatch(deleteFavoriteColor(Number(color.id)))
    }

    return (
        <div className={styles['color-card']} onClick={user ? (add ? addColor : removeColor) : undefined}>
            <div
                style={{ backgroundColor: `#${color.hex}` }}
                className={styles.color}
            >
                {user && <Icon className={styles.icon} />}
            </div>
            <span>
                #{color.hex}
            </span>
        </div>
    )
}

export default ColorCard