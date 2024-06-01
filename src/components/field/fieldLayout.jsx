import styles from './fieldLayout.module.css';
import PropTypes from 'prop-types';

export const Field = ({ fields, handleClick, ...props }) => {
	return (
		<div className={styles.container}>
			{fields.map((item, index) => (
				<div
					key={index}
					className={styles.col}
					onClick={() => handleClick(index)}
				>
					{item}
				</div>
			))}
		</div>
	);
};

Field.propTypes ={
	fields: PropTypes.array,
	handleClick: PropTypes.func,
}
