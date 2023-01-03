import styles from './Spinner.module.scss'
const Spinner = () => {
    return (
        <div className={styles.loadingSpinnerContainer}>
            <div className={styles.loadingSpinner}></div>
        </div>
    )
}

export default Spinner
