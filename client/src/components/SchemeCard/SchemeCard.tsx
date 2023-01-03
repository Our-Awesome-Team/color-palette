import { addFavoriteScheme, deleteFavoriteScheme } from "../../store/favorites/favoritesSlice"
import { Scheme } from "../../store/favorites/favoritesTypes"
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { colourIsLight, hexToRgb } from "../../utils/colorUtils"
import styles from './SchemeCard.module.scss'

type Props = {
    scheme: Scheme
    Icon: React.ElementType
    add?: boolean
}

const SchemeCard = ({ scheme, Icon, add = false }: Props) => {
    const dispatch = useAppDispatch()
    const { user } = useAppSelector(state => state.auth)

    const removeScheme = () => {
        dispatch(deleteFavoriteScheme(Number(scheme.id)))
    }

    const addScheme = () => {
        if (scheme) {
            dispatch(addFavoriteScheme(scheme))
        }
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
