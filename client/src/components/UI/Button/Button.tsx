import styles from './Button.module.scss';

type ButtonProps = {
	title?: string
	logged?: boolean
}

const Button = ({ title, logged }: ButtonProps) => {
	return (
		<button
			className={`${styles.btn} ${logged && styles.btnLogged}`}
		>
			{title}
		</button>
	);
};

export default Button;
