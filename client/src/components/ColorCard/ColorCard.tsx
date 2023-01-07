import { v4 as uuid } from 'uuid'
import { useAddFavoriteColorMutation, useRemoveFavoriteColorMutation } from '../../store/favorites/favoritesApi'
import { Color } from '../../store/favorites/favoritesTypes'
import { useAppSelector } from '../../store/hooks'
import styles from './ColorCard.module.scss'

type Props = {
    color: Color
    Icon?: React.ElementType
    add?: boolean
}

const ColorCard = ({ color, Icon, add = false }: Props) => {
    const { user } = useAppSelector(state => state.auth)

    const [addFavoriteColor] = useAddFavoriteColorMutation()
    const [removeFavoriteColor] = useRemoveFavoriteColorMutation()

    const addColor = async () => {
        await addFavoriteColor(color)
    }

    const removeColor = async () => {
        await removeFavoriteColor(color.id)
    }

    return (
        <li className={styles['color-card']} onClick={user ? (add ? addColor : removeColor) : undefined}>
            <div
                style={{ backgroundColor: `#${color.hex}` }}
                className={styles.color}
            >
                {user && Icon && <Icon className={styles.icon} />}
            </div>
            <span className={styles.hex}>
                #{color.hex}
                <div className={styles.tags}>{color.tags.map(tag => <span key={uuid()}>{tag.name}&nbsp;</span>)}</div>
            </span>
        </li>
    )
}

export default ColorCard