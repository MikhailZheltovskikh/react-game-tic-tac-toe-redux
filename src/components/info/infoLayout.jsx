import styles from './infoLayout.module.css';
import PropTypes from 'prop-types';

export const Info = ({isResult}) => {
	return (
		<div className={styles.info}>
			Info: <span>{isResult}</span>
		</div>
	);
};

Info.propTypes ={
	isResult: PropTypes.string,
}
