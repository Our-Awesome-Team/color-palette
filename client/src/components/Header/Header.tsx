import { Link, useLocation, useNavigate } from 'react-router-dom';
import styles from './Header.module.scss';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { logout, reset } from '../../store/auth/authSlice';
import Button from '../UI/Button/Button';
import { useEffect, useState } from 'react';
import Search from '../UI/Search/Search';
import { IconHeartOutline } from '../../assets/icons/Heart';
import { UserCircleOutline } from '../../assets/icons/User';
import { IconSearch } from '../../assets/icons/Search';
import { IconHistory } from '../../assets/icons/History';
import { favoritesApi } from '../../store/favorites/favoritesApi';
import { historyApi } from '../../store/history/historyApi';
import cn from 'classnames';

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

	const onLogout = async () => {
		dispatch(favoritesApi.util.resetApiState());
		dispatch(historyApi.util.resetApiState());
		dispatch(logout());
		dispatch(reset());
		navigate('/');
	};

	const [canShowSearch, setCanShowSearch] = useState(true);
	const [showSearch, setShowSearch] = useState(false);

	useEffect(() => {
		const show = () => {
			if (Number(window.innerWidth) <= 767.98) {
				setCanShowSearch(true);
			} else {
				setCanShowSearch(false);
			}
		};

		window.addEventListener('resize', show);

		return () => window.removeEventListener('resize', show);
	}, []);

	const show = () => {
		setShowSearch(p => !p);
	};

	return (
		<header
			className={`${styles.header} ${
				scrollPosition > 0 ? styles.scrolled : ''
			}`}
		>
			<div className={styles.container}>
				<span className={styles.logo}>
					<Link to="/">Color Palette</Link>
				</span>
				{(pathname === '/' ||
					pathname === '/user' ||
					pathname === '/favorites') &&
					(showSearch && canShowSearch ? <Search fullSize /> : <Search />)}
				<div className={styles.btns}>
					{(pathname === '/' ||
						pathname === '/user' ||
						pathname === '/favorites') && (
						<IconSearch className={styles.searchIcon} onClick={show} />
					)}
					<Link to="/history">
						<IconHistory
							className={cn(styles.history, {
								[styles.active]: pathname === '/history',
							})}
						/>
					</Link>
					{user && (
						<Link to="/favorites">
							<IconHeartOutline
								className={cn(styles.heart, {
									[styles.active]: pathname === '/favorites',
								})}
							/>
						</Link>
					)}
					{user && (
						<Link to="/user">
							<UserCircleOutline className={cn(styles.user, {
								[styles.active]: pathname === '/user'
							})} />
						</Link>
					)}
					{user && (
						<span onClick={onLogout}>
							<Button logged title="Logout" />
						</span>
					)}
					{pathname === '/signin' && !user && (
						<Link to="/signup">
							<Button title="Sign Up" />
						</Link>
					)}
					{pathname === '/signup' && !user && (
						<Link to="/signin">
							<Button title="Sign In" />
						</Link>
					)}

					{!user && pathname !== '/signin' && pathname !== '/signup' && (
						<>
							<Link to="/signin">
								<Button title="Sign In" />
							</Link>
							<Link to="/signup">
								<Button title="Sign Up" />
							</Link>
						</>
					)}
				</div>
			</div>
		</header>
	);
};

export default Header;
