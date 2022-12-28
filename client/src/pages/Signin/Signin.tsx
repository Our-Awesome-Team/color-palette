import { useNavigate } from 'react-router-dom'
import styles from './Signin.module.css'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { login, reset } from '../../services/auth/authSlice'
import Spinner from '../../components/Spinner/Spinner'

const Signin = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })

    const { email, password } = formData

    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const { user, isLoading, isError, isSuccess, message } = useAppSelector(
        (state) => state.auth
    )

    useEffect(() => {
        if (isError) {
            toast.error(message)
        }

        if (isSuccess || user) {
            navigate('/')
        }

        dispatch(reset())
    }, [user, isError, isSuccess, message, navigate, dispatch])

    const onChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    const onSubmit = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault()
        const userData = {
            email,
            password,
        }

        dispatch(login(userData))
    }

    return (
        <>
            {isLoading ? <Spinner /> :
                <div className={styles.container}>
                    <section className={styles.heading}>
                        <h1>
                            Login
                        </h1>
                        <p>Login and start searching colors</p>
                    </section>

                    <section className={styles.form}>
                        <form onSubmit={onSubmit}>
                            <div className={styles['form-group']}>
                                <input
                                    type='email'
                                    className={styles['form-control']}
                                    id='email'
                                    name='email'
                                    value={email}
                                    placeholder='Enter your email'
                                    onChange={onChange}
                                />
                            </div>
                            <div className={styles['form-group']}>
                                <input
                                    type='password'
                                    className={styles['form-control']}
                                    id='password'
                                    name='password'
                                    value={password}
                                    placeholder='Enter password'
                                    onChange={onChange}
                                />
                            </div>

                            <div className={styles['form-group']}>
                                <button type='submit' className={`${styles.btn} ${styles['btn-block']}`}>
                                    Submit
                                </button>
                            </div>
                        </form>
                    </section>
                </div>
            }</>
    )
}

export default Signin