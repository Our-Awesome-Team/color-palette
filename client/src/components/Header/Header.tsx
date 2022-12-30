import { Link, useLocation, useNavigate } from 'react-router-dom';
import styles from './Header.module.scss';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { logout, reset } from '../../store/auth/authSlice';
import Search from '../UI/Searcher/Searcher';
import Button from '../UI/Button/Button';
import Select from '../UI/Select/Select';
import { useEffect, useState } from 'react';

const Header = () => {
	const { pathname } = useLocation();

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

	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const { user } = useAppSelector(state => state.auth);

	const onLogout = () => {
		dispatch(logout());
		dispatch(reset());
		navigate('/');
	};

	return (
		<header
			className={`${styles.header} ${
				scrollPosition > 0 ? styles.scrolled : ''
			}`}
		>
			<div className={styles._container}>
				<div className={styles.logo}>
					<a href="/">Color Palette</a>
				</div>
				{pathname === '/' && <Search />}
				{true ? (
					<div className={styles.btns}>
						<Link to="favorites">
							<svg
								width="37"
								height="33"
								viewBox="0 0 37 33"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M33.1266 2.64668C28.9496 -0.865433 22.4963 -0.337894 18.5 3.73066C14.5037 -0.337894 8.0504 -0.87266 3.87345 2.64668C-1.56093 7.22109 -0.766007 14.6789 3.10743 18.6318L15.7828 31.5457C16.5055 32.2828 17.4738 32.6947 18.5 32.6947C19.5334 32.6947 20.4945 32.29 21.2172 31.5529L33.8926 18.6391C37.7588 14.6861 38.5682 7.22832 33.1266 2.64668ZM31.4211 16.1965L18.7457 29.1103C18.5723 29.2838 18.4277 29.2838 18.2543 29.1103L5.57892 16.1965C2.94122 13.5082 2.40645 8.4207 6.10645 5.30605C8.91759 2.94296 13.2535 3.29707 15.9707 6.06484L18.5 8.64472L21.0293 6.06484C23.761 3.28261 28.0969 2.94297 30.8936 5.29882C34.5863 8.41347 34.0371 13.5299 31.4211 16.1965Z"
									fill="black"
								/>
							</svg>
						</Link>
						<Link to="user">
							<svg
								width="34"
								height="35"
								viewBox="0 0 34 35"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M16.9531 7.10938C13.3301 7.10938 10.3906 10.0488 10.3906 13.6719C10.3906 17.2949 13.3301 20.2344 16.9531 20.2344C20.5762 20.2344 23.5156 17.2949 23.5156 13.6719C23.5156 10.0488 20.5762 7.10938 16.9531 7.10938ZM16.9531 16.9531C15.1416 16.9531 13.6719 15.4834 13.6719 13.6719C13.6719 11.8604 15.1416 10.3906 16.9531 10.3906C18.7646 10.3906 20.2344 11.8604 20.2344 13.6719C20.2344 15.4834 18.7646 16.9531 16.9531 16.9531ZM16.9531 0.546875C7.58789 0.546875 0 8.13477 0 17.5C0 26.8652 7.58789 34.4531 16.9531 34.4531C26.3184 34.4531 33.9062 26.8652 33.9062 17.5C33.9062 8.13477 26.3184 0.546875 16.9531 0.546875ZM16.9531 31.1719C13.5557 31.1719 10.4521 29.9209 8.05957 27.8633C9.07812 26.291 10.8213 25.2246 12.8174 25.1631C14.2393 25.6006 15.5928 25.8193 16.9531 25.8193C18.3135 25.8193 19.667 25.6074 21.0889 25.1631C23.085 25.2314 24.8281 26.291 25.8467 27.8633C23.4541 29.9209 20.3506 31.1719 16.9531 31.1719ZM28.0752 25.4229C26.4072 23.2764 23.8301 21.875 20.8906 21.875C20.1934 21.875 19.1133 22.5312 16.9531 22.5312C14.7998 22.5312 13.7129 21.875 13.0156 21.875C10.083 21.875 7.50586 23.2764 5.83105 25.4229C4.23145 23.1875 3.28125 20.4531 3.28125 17.5C3.28125 9.95996 9.41309 3.82812 16.9531 3.82812C24.4932 3.82812 30.625 9.95996 30.625 17.5C30.625 20.4531 29.6748 23.1875 28.0752 25.4229Z"
									fill="black"
								/>
							</svg>
						</Link>
						<span onClick={onLogout}>
							<Button logged name="Logout" />
						</span>
					</div>
				) : (
					<div className={styles.btns}>
						{pathname === '/signin' && <Button name="Sign Up" />}
						{pathname === '/signup' && <Button name="Sign In" />}

						{(pathname === '/search' ||
							pathname === '/' ||
							pathname === '/favorites' ||
							pathname === '/history') && (
							<>
								<Link to="/signin">
									<Button name="Sign In" />
								</Link>
								<Link to="/signup">
									<Button name="Sign Up" />
								</Link>
							</>
						)}
					</div>
				)}
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
