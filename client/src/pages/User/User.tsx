import { useNavigate } from 'react-router-dom';
import Button from '../../components/UI/Button/Button';
import { logout, reset } from '../../store/auth/authSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import styles from './User.module.scss';
import { Fragment } from 'react';

const User = () => {
	const dispatch = useAppDispatch()
	const { user, loading, error } = useAppSelector(state => state.auth);
	const navigate = useNavigate()

	const onLogout = () => {
		dispatch(logout());
		dispatch(reset());
		navigate('/');
	};

	return (
		<section className={styles.user}>
			<div className="__container">
				<div className={styles.main}>
					<div></div>
					<div>{user?.name}</div>
					<div>{user?.email}</div>
					<div>Bio (in development)</div>
					<div onClick={onLogout}>
						<Button name="Log Out" logged />
					</div>
				</div>
			</div>
		</section>
	);
};

export default User;
