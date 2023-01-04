import { useEffect, useState } from 'react';
import styles from './SignupPage.module.scss';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { signup, reset } from '../../store/auth/authSlice';
import Spinner from '../../components/UI/Spinner/Spinner';
import Seo from '../../utils/Seo/Seo';
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { IconEye, IconEyeOff } from '../../assets/icons/Eye';

interface IFormInput {
	name: string
	email: string;
	password: string;
	cpassword: string;
}

const schema = yup.object({
	name: yup.string().required(),
	email: yup.string().email('Email must be a valid').required(),
	password: yup.string()
		.required("Password is required")
		.min(4, "Password length should be at least 4 characters")
		.max(12, "Password cannot exceed more than 12 characters"),
	cpassword: yup.string()
		.required("Confirm Password is required")
		.min(4, "Password length should be at least 4 characters")
		.max(12, "Password cannot exceed more than 12 characters")
		.oneOf([yup.ref("password")], "Passwords do not match")
}).required();

const Signup = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const { user, loading, error, success } = useAppSelector(state => state.auth);

	useEffect(() => {
		if (success || user) {
			navigate('/');
		}
		dispatch(reset());
	}, [user]);


	const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>({
		resolver: yupResolver(schema)
	});
	const onSubmit: SubmitHandler<IFormInput> = ({ name, email, password }) => {
		const userData = {
			name,
			email,
			password,
		};
		dispatch(signup(userData));
	};

	const [passwordVisible, setPasswordVisible] = useState(false)
	const [cpasswordVisible, setCpasswordVisible] = useState(false)

	return (
		<>
			<Seo
				title="Sign up"
				description="Authorization in the colors palette site!"
			/>
			{loading ? (
				<Spinner />
			) : (
				<section className={styles.signUp}>
					<div className="container">
						<div className={styles.signWrapper}>
							<div className={styles.heading}>
								<h1>Register</h1>
								<p>Please create an account</p>
							</div>
							<div className={styles.form}>
								<form onSubmit={handleSubmit(onSubmit)}>
									<div className={styles['form-group']}>
										<input
											{...register("name")}
											className={styles['form-control']}
											id="name"
											name="name"
											placeholder="Enter your name"

										/>
										<p>{errors.name?.message}</p>
									</div>
									<div className={styles['form-group']}>
										<input
											{...register("email")}
											className={styles['form-control']}
											id="email"
											name="email"
											placeholder="Enter your email"
										/>
										<p>{errors.email?.message}</p>
									</div>
									<div className={styles['form-group']}>
										<input
											{...register("password")}
											type={passwordVisible ? 'text' : 'password'}
											className={styles['form-control']}
											id="password"
											name="password"
											placeholder="Enter password"
										/>
										<span onClick={() => setPasswordVisible(p => !p)} className={styles.visibility}>
											{passwordVisible
												? <IconEyeOff className={styles.icon} />
												: <IconEye className={styles.icon} />}
										</span>
										<p>{errors.password?.message}</p>
									</div>
									<div className={styles['form-group']}>
										<input
											{...register("cpassword")}
											type={cpasswordVisible ? 'text' : 'password'}
											className={styles['form-control']}
											id="cpassword"
											name="cpassword"
											placeholder="Confirm password"
										/>
										<span onClick={() => setCpasswordVisible(p => !p)} className={styles.visibility}>
											{cpasswordVisible
												? <IconEyeOff className={styles.icon} />
												: <IconEye className={styles.icon} />}
										</span>
										<p>{errors.cpassword?.message}</p>
									</div>
									{error && <p className={styles['server-error']}>User already exists</p>}
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

export default Signup;
