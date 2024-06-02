import { useState, useEffect } from 'react';
import styles from './app.module.css';
import { FieldComponent } from './components/field/fieldContainer.js';
import { InfoComponent } from './components/info/infoContainer.js';
import { ButtonComponent } from './components/clear/clearContainer.js';
import { WIN_PATTERNS } from './constants';

import { store } from './store/index.js';

export const App = () => {
	const [fields, setFields] = useState(store.getState().fields);
	const [currentPlayer, setCurrentPlayer] = useState(store.getState().currentPlayer);
	const [isGameEnded, setIsGameEnded] = useState(store.getState().isGameEnded);
	const [isDraw, setIsDraw] = useState(store.getState().isDraw);

	const isChecked = (fields, currentPlayer) => {
		return WIN_PATTERNS.some((el) =>
			el.every((item) => fields[item] === currentPlayer),
		);
	};

	if (fields.every((el) => el !== '') && !isDraw && !isGameEnded) {
		store.dispatch({ type: 'SET_IS_DRAW', payload: true });
	}

	const handleClick = (id) => {
		if (isDraw) {
			return null;
		}

		if (fields[id] === '' && !isGameEnded) {
			const newFilds = [...fields];
			newFilds[id] = currentPlayer;
			store.dispatch({ type: 'SET_FIELDS', payload: newFilds });

			if (isChecked(newFilds, currentPlayer)) {
				store.dispatch({ type: 'SET_IS_GAME_END', payload: true });

				return null;
			}
		} else {
			return null;
		}

		store.dispatch({ type: 'SET_CURRENT_PLAYER', payload: currentPlayer === 'X' ? '0' : 'X' });
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
		store.dispatch({ type: 'RESET_GAME' });
	};

	useEffect(() => {
		const unsubscribe = store.subscribe(() => {
			const state = store.getState();
			setCurrentPlayer(state.currentPlayer);
			setIsGameEnded(state.isGameEnded);
			setIsDraw(state.isDraw);
			setFields(state.fields);
		});
		return () => unsubscribe();
	}, []);

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
