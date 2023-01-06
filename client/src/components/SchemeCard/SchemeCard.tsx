import { useAddFavoriteSchemeMutation, useRemoveFavoriteSchemeMutation } from "../../store/favorites/favoritesApi"
import { Scheme } from "../../store/favorites/favoritesTypes"
import { useAppSelector } from '../../store/hooks'
import { colourIsLight, hexToRgb } from "../../utils/colorUtils"
import styles from './SchemeCard.module.scss'

type Props = {
    scheme: Scheme
    Icon: React.ElementType
    add?: boolean
}

const SchemeCard = ({ scheme, Icon, add = false }: Props) => {
    const { user } = useAppSelector(state => state.auth)

    const [addFavoriteScheme] = useAddFavoriteSchemeMutation()
    const [removeFavoriteScheme] = useRemoveFavoriteSchemeMutation()

    const addScheme = async () => {
        await addFavoriteScheme(scheme)
    }

    const removeScheme = async () => {
        await removeFavoriteScheme(scheme.id)
    }

    return (
        <div className={styles.schemeCard}>
            <div className={styles['icon-box']} onClick={user ? (add ? addScheme : removeScheme) : undefined}>
                <Icon className={styles.icon} />
            </div>
            {scheme.colors.map(color => (
                <div key={color} className={styles.colorCard}>
                    <div className={styles.color} style={{ backgroundColor: `#${color}` }}>
                        <span className={styles.hex} style={{ color: `${colourIsLight(hexToRgb(color)) ? '#000' : '#fff'}` }}>#{color}</span>
                    </div>
                </div>
            ))}
        </div>
    )
}
export default SchemeCard
