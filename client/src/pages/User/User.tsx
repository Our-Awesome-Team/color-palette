import Button from '../../components/UI/Button/Button';
import styles from './User.module.scss';

const User = () => {
	return (
		<section className={styles.user}>
			<div className="__container">
				<div className={styles.main}>
					<div></div>
					<div>Random name</div>
					<div>email@email.com</div>
					<div>Bio</div>
					<Button name="Log Out" logged />
				</div>
			</div>
		</section>
	);
};

export default User;
