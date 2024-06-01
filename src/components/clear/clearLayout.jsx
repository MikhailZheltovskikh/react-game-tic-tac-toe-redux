import styles from './clearLayout.module.css';
import PropTypes from 'prop-types';

export const Button = ({ handleClear }) => {
	return (
		<button className={styles.btn} onClick={handleClear}>
			Начать заново
		</button>
	);
};

Button.propTypes = {
	handleClick: PropTypes.func,
};
