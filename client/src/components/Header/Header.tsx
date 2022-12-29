import { Link, useNavigate } from 'react-router-dom';
import styles from './Header.module.scss';
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { logout, reset } from '../../store/auth/authSlice'
import Search from '../UI/Search/Search';
import Button from '../UI/Button/Button';
import Select from '../UI/Select/Select';
import { useEffect, useState } from 'react';

const Header = () => {
	const [scrollPosition, setScrollPosition] = useState(0);
	const handleScroll = () => {
		const position = window.pageYOffset;
		setScrollPosition(position);
	};

	useEffect(() => {
		window.addEventListener('scroll', handleScroll);

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);

	// const navigate = useNavigate();
	// const dispatch = useAppDispatch();
	// const { user } = useAppSelector(state => state.auth);

	// const onLogout = () => {
	// 	dispatch(logout());
	// 	dispatch(reset());
	// 	navigate('/');
	// };

	return (
		<header
			className={`${styles.header} ${
				scrollPosition > 0 ? styles.scrolled : ''
			}`}
		>
			<div className={styles._container}>
				<div className={styles.logo}>
					<a href="/">Color Pallete</a>
				</div>
				<Search />
				<div className={styles.btns}>
					<Button name="Sign In" />
					<Button name="Sign Up" />
				</div>
			</div>
		</header>

		/* <header className={styles.header}>
				<div className={styles.logo}>
					<Link to="/">Color Pallete</Link>
				</div>
				<ul>
					{user ? (
						<>
							<li>
								<Link to="favorites">Favorites</Link>
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
								<Link to="/signin">Signin</Link>
							</li>
							<li>
								<Link to="/signup">Signup</Link>
							</li>
						</>
					)}
				</ul>
			</header> */
	);
};

export default Header;
