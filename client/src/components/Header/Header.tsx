import { Link, useNavigate } from 'react-router-dom'
import styles from './Header.module.css'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { logout, reset } from '../../store/auth/authSlice'

const Header = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const { user } = useAppSelector((state) => state.auth)

    const onLogout = () => {
        dispatch(logout())
        dispatch(reset())
        navigate('/')
    }
    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div className={styles.logo}>
                    <Link to='/'>Color Pallete</Link>
                </div>
                <ul>
                    {user ? (
                        <>
                            <li>
                                <Link to='favorites'>
                                    Favorites
                                </Link>
                            </li>
                            <li>
                                <button className={styles.btn} onClick={onLogout}>
                                    Logout
                                </button>
                            </li>
                        </>
                    ) : (
                        <>
                            <li>
                                <Link to='/signin'>
                                    Signin
                                </Link>
                            </li>
                            <li>
                                <Link to='/signup'>
                                    Signup
                                </Link>
                            </li>

                        </>
                    )}
                </ul>
            </header>
        </div>
    )
}

export default Header