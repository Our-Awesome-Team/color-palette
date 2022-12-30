import { FC } from 'react';
import cn from 'classnames';
import styles from './Button.module.scss';

const Button: FC<{ name: string; logged?: boolean }> = ({ name, logged }) => {
	return (
		<button
			className={cn(styles.btn, {
				[styles.btnLogged]: logged,
			})}
		>
			{name}
		</button>
	);
};

export default Button;
