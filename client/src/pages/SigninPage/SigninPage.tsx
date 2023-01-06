import { useNavigate } from 'react-router-dom';
import styles from './SigninPage.module.scss';
import { useEffect } from 'react';
import Spinner from '../../components/UI/Spinner/Spinner';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { reset, signin } from '../../store/auth/authSlice';
import Seo from '../../utils/Seo/Seo';
import { useForm, SubmitHandler } from "react-hook-form";

interface IFormInput {
	email: string;
	password: string;
}

const Signin = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const { user, loading, error, success } = useAppSelector(state => state.auth);

	useEffect(() => {
		if (success || user) {
			navigate('/');
		}
		dispatch(reset());
	}, [user, success]);

	console.log(error)

	const { register, handleSubmit } = useForm<IFormInput>();
	const onSubmit: SubmitHandler<IFormInput> = ({ email, password }) => {
		const userData = {
			email,
			password,
		};
		dispatch(signin(userData));
	};

	return (
		<>
			<Seo
				title="Sign in"
				description="Enter the colors palette site!"
			/>
			{loading ? (
				<Spinner />
			) : (
				<section className={styles.signIn}>
					<div className="container">
						<div className={styles.signWrapper}>
							<div className={styles.heading}>
								<h1>Login</h1>
								<p>Login and start searching colors</p>
							</div>

							<div className={styles.form}>
								<form onSubmit={handleSubmit(onSubmit)}>
									<div className={styles['form-group']}>
										<input
											{...register("email")}
											className={styles['form-control']}
											id="email"
											name="email"
											placeholder="Enter your email"
										/>
									</div>
									<div className={styles['form-group']}>
										<input
											{...register("password")}
											type="password"
											className={styles['form-control']}
											id="password"
											name="password"
											placeholder="Enter password"
										/>
									</div>
									{error && <p className={styles['server-error']}>You have entered an invalid email or password</p>}
									<div className={styles['form-group']}>
										<button
											type="submit"
											className={styles.btn}
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
