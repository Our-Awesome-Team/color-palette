import { FC } from 'react';

import styles from './Button.module.scss';

const Button: FC<{ name: string }> = ({ name }) => {
	return <button className={styles.btn}>{name}</button>;
};

export default Button;
