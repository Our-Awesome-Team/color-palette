import { useNavigate } from 'react-router-dom';
import { logout, reset } from '../../store/auth/authSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import styles from './UserPage.module.scss';
import { useEffect } from 'react';
import Spinner from '../../components/UI/Spinner/Spinner';
import Seo from '../../utils/Seo/Seo';

const User = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const { user, loading, error } = useAppSelector(state => state.auth);
	useEffect(() => {
		if (!user) {
			navigate('/signin');
		}
	}, [user]);

	const onLogout = () => {
		dispatch(logout());
		dispatch(reset());
		navigate('/');
	};

	return (
		<>
			<Seo
				title="Profile"
				description="Profile page you can add avatar or logout of your profile!"
			/>
			<section className={styles.user}>
				{loading ? <Spinner /> :
					<section className={styles.user}>
						<div className={styles.main}>
							<div className={styles.avatar}></div>
							<div className={styles.name}>{user?.name}</div>
							<div className={styles.email}>{user?.email}</div>
							<div onClick={onLogout}>
								<button>Log Out</button>
							</div>
						</div>
					</section>
				}
			</section>
		</>

	)
};

export default User;
