import styles from './Select.module.scss';

type SelectProps = {
	name: string
}

const Select = ({ name }: SelectProps) => {
	return (
		<>
			<div className={styles.select}>
				<select id={styles['standard-select']}>
					<option disabled selected>
						{name}
					</option>
					<option value="Option 1">Option 1</option>
					<option value="Option 2">Option 2</option>
					<option value="Option 3">Option 3</option>
					<option value="Option 4">Option 4</option>
					<option value="Option 5">Option 5</option>
				</select>
				<span className={styles.focus}></span>
			</div>
		</>
	);
};

export default Select;
