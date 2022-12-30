import { useNavigate } from 'react-router-dom';
import styles from './Signin.module.scss';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Spinner from '../../components/UI/Spinner/Spinner';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { reset, signin } from '../../store/auth/authSlice';

const Signin = () => {
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});

	const { email, password } = formData;

	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const { user, loading, error, success } = useAppSelector(state => state.auth);

	// useEffect(() => {
	// 	if (success || user) {
	// 		navigate('/')
	// 	}

	// 	dispatch(reset())
	// }, [user, error, success, navigate, dispatch])

	const onChange = (e: ChangeEvent<HTMLInputElement>): void => {
		setFormData(prevState => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	};

	const onSubmit = (e: FormEvent<HTMLFormElement>): void => {
		e.preventDefault();
		const userData = {
			email,
			password,
		};
		dispatch(signin(userData));
	};

	return (
		<>
			{loading ? (
				<Spinner />
			) : (
				<section className={styles.signIn}>
					<div className="__container">
						<div className={styles.signWrapper}>
							<div className={styles.heading}>
								<h1>Login</h1>
								<p>Login and start searching colors</p>
							</div>

							<div className={styles.form}>
								<form onSubmit={onSubmit}>
									<div className={styles['form-group']}>
										<input
											type="email"
											className={styles['form-control']}
											id="email"
											name="email"
											value={email}
											placeholder="Enter your email"
											onChange={onChange}
										/>
									</div>
									<div className={styles['form-group']}>
										<input
											type="password"
											className={styles['form-control']}
											id="password"
											name="password"
											value={password}
											placeholder="Enter password"
											onChange={onChange}
										/>
									</div>

									<div className={styles['form-group']}>
										<button
											type="submit"
											className={`${styles.btn} ${styles['btn-block']}`}
										>
											Submit
										</button>
									</div>
								</form>
							</div>
						</div>
					</div>
				</section>
			)}
		</>
	);
};

export default Signin;
