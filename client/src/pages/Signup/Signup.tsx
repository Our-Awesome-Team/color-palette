import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import styles from './Signup.module.scss';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { signup, reset } from '../../store/auth/authSlice';
import Spinner from '../../components/UI/Spinner/Spinner';

const Signup = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const { user, loading, error, success } = useAppSelector(state => state.auth);
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
		confirmPassword: '',
	});

	const { name, email, password, confirmPassword } = formData;

	useEffect(() => {
		if (success || user) {
			navigate('/')
		}
		dispatch(reset())
	}, [user, error, success, navigate, dispatch])

	const onChange = (e: ChangeEvent<HTMLInputElement>): void => {
		setFormData(prevState => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	};

	const onSubmit = (e: FormEvent<HTMLFormElement>): void => {
		e.preventDefault();
		if (password !== confirmPassword) {
			// Заглушка для ошибки
			return;
		} else {
			const userData = {
				name,
				email,
				password,
			};
			dispatch(signup(userData));
		}
	};

	return (
		<>
			{loading ? (
				<Spinner />
			) : (
				<section className={styles.signUp}>
					<div className="__container">
						<div className={styles.signWrapper}>
							<div className={styles.heading}>
								<h1>Register</h1>
								<p>Please create an account</p>
							</div>
							<div className={styles.form}>
								<form onSubmit={onSubmit}>
									<div className={styles['form-group']}>
										<input
											type="text"
											className={styles['form-control']}
											id="name"
											name="name"
											value={name}
											placeholder="Enter your name"
											onChange={onChange}
										/>
									</div>
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
										<input
											type="password"
											className={styles['form-control']}
											id="confirmPassword"
											name="confirmPassword"
											value={confirmPassword}
											placeholder="Confirm password"
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

export default Signup;
