import styles from './Spinner.module.scss'
const Spinner = () => {
    return (
        <div className={styles["spin-loader"]} aria-hidden="true"></div>
    )
}

export default Spinner
