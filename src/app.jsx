import styles from './app.module.css';
import { FieldComponent } from './components/field/fieldContainer.js';
import { InfoComponent } from './components/info/infoContainer.js';
import { ButtonComponent } from './components/clear/clearContainer.js';
import { WIN_PATTERNS } from './constants';
import { useSelector, useDispatch } from 'react-redux';

export const App = () => {
	const dispatch = useDispatch();
	const fields = useSelector((state) => state.fields);
	const currentPlayer = useSelector((state) => state.currentPlayer);
	const isGameEnded = useSelector((state) => state.isGameEnded);
	const isDraw = useSelector((state) => state.isDraw);

	const isChecked = (fields, currentPlayer) => {
		return WIN_PATTERNS.some((el) =>
			el.every((item) => fields[item] === currentPlayer),
		);
	};

	if (fields.every((el) => el !== '') && !isDraw && !isGameEnded) {
		dispatch({ type: 'SET_IS_DRAW', payload: true });
	}

	const handleClick = (id) => {
		if (isDraw) {
			return null;
		}

		if (fields[id] === '' && !isGameEnded) {
			const newFilds = [...fields];
			newFilds[id] = currentPlayer;
			dispatch({ type: 'SET_FIELDS', payload: newFilds });

			if (isChecked(newFilds, currentPlayer)) {
				dispatch({ type: 'SET_IS_GAME_END', payload: true });

				return null;
			}
		} else {
			return null;
		}

		dispatch({ type: 'SET_CURRENT_PLAYER', payload: currentPlayer === 'X' ? '0' : 'X' });
	};

	let isResult;
	if (isDraw) {
		isResult = 'Ничья';
	}

	if (!isDraw && isGameEnded) {
		isResult = `Победа: ` + currentPlayer;
	}

	if (!isDraw && !isGameEnded) {
		isResult = `Ходит: ` + currentPlayer;
	}

	const handleClear = () => {
		dispatch({ type: 'RESET_GAME' });
	};

	return (
		<div className={styles.App}>
			<div className={styles.wrapper}>
				<InfoComponent isResult={isResult} />

				<FieldComponent fields={fields} handleClick={handleClick} />

				<ButtonComponent handleClear={handleClear} />
			</div>
		</div>
	);
};
