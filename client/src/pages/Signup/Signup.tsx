import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import styles from './Signup.module.css'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { toast } from 'react-toastify'
import { register, reset } from '../../services/auth/authSlice'
import Spinner from '../../components/Spinner/Spinner'

const Signup = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    })

    const { name, email, password, confirmPassword } = formData

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

        if (password !== confirmPassword) {
            toast.error('Passwords do not match')
        } else {
            const userData = {
                name,
                email,
                password,
            }

            dispatch(register(userData))
        }
    }


    return (
        <>
            {isLoading ? <Spinner /> :
                <div className={styles.container}>
                    <section className={styles.heading}>
                        <h1>
                            Register
                        </h1>
                        <p>Please create an account</p>
                    </section>

                    <section className={styles.form}>
                        <form onSubmit={onSubmit}>
                            <div className={styles['form-group']}>
                                <input
                                    type='text'
                                    className={styles['form-control']}
                                    id='name'
                                    name='name'
                                    value={name}
                                    placeholder='Enter your name'
                                    onChange={onChange}
                                />
                            </div>
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
                                <input
                                    type='password'
                                    className={styles['form-control']}
                                    id='confirmPassword'
                                    name='confirmPassword'
                                    value={confirmPassword}
                                    placeholder='Confirm password'
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
            }
        </>

    )
}

export default Signup