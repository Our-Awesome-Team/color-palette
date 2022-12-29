import { FC } from 'react';

import styles from './Select.module.scss';

const Select: FC<{ name: string }> = ({ name }) => {
	return (
		<form id={styles['app-cover']}>
			<div id={styles['select-box']}>
				<input type="checkbox" id={styles['options-view-button']} />
				<div id={styles['select-button']} className={styles.brd}>
					<div id={styles['selected-value']}>
						<span>{name}</span>
					</div>
					<div id={styles.chevrons}>
						<span>
							<svg
								width="17"
								height="10"
								viewBox="0 0 17 10"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M8.02824 9.41128L1.19587 2.57887C0.866351 2.24935 0.866351 1.71512 1.19587 1.38563L1.99276 0.588746C2.32171 0.259788 2.85486 0.259155 3.18459 0.587339L8.62488 6.00214L14.0651 0.587339C14.3949 0.259155 14.928 0.259788 15.257 0.588746L16.0539 1.38563C16.3834 1.71515 16.3834 2.24939 16.0539 2.57887L9.22152 9.41128C8.892 9.74077 8.35776 9.74077 8.02824 9.41128Z"
									fill="black"
								/>
							</svg>
						</span>
					</div>
				</div>
				<div id={styles.options}>
					<div className={styles.option}>
						<input
							className={styles['s-c top']}
							type="radio"
							name="platform"
							value="Scheme"
						/>
						<input
							className={styles['s-c bottom']}
							type="radio"
							name="platform"
							value="Scheme"
						/>
						<span className={styles.label}>Scheme</span>
						<span className={styles['opt-val']}>Scheme</span>
					</div>
					<div className={styles.option}>
						<input
							className={styles['s-c top']}
							type="radio"
							name="platform"
							value="One Color"
						/>
						<input
							className={styles['s-c bottom']}
							type="radio"
							name="platform"
							value="One Color"
						/>
						<span className={styles.label}>One Color</span>
						<span className={styles['opt-val']}>One Color</span>
					</div>
					<div className={styles.option}>
						<input
							className={styles['s-c top']}
							type="radio"
							name="platform"
							value="Match"
						/>
						<input
							className={styles['s-c bottom']}
							type="radio"
							name="platform"
							value="Match"
						/>
						<span className={styles.label}>Match</span>
						<span className={styles['opt-val']}>Match</span>
					</div>
					<div id={styles['option-bg']}></div>
				</div>
			</div>
		</form>
	);
};

export default Select;
