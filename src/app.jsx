import { useState } from 'react';
import styles from './app.module.css';
import { FieldComponent } from './components/field/fieldContainer.js';
import { InfoComponent } from './components/info/infoContainer.js';
import { ButtonComponent } from './components/clear/clearContainer.js';

const array = ['', '', '', '', '', '', '', '', ''];

const WIN_PATTERNS = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6],
];

export const App = () => {
	const [fields, setFields] = useState(array);
	const [currentPlayer, setCurrentPlayer] = useState('X');
	const [isGameEnded, setIsGameEnded] = useState(false);
	const [isDraw, setIsDraw] = useState(false);

	const isChecked = (fields, currentPlayer) => {
		return WIN_PATTERNS.some((el) =>
			el.every((item) => fields[item] === currentPlayer),
		);
	};

	if (fields.every((el) => el !== '') && !isDraw && !isGameEnded) {
		setIsDraw(true);
	}

	const handleClick = (id) => {
		if (isDraw) {
			return null;
		}

		if (fields[id] === '' && !isGameEnded) {
			const newFilds = [...fields];
			// const newFilds = fields.slice();
			newFilds[id] = currentPlayer;
			setFields(newFilds);

			if (isChecked(newFilds, currentPlayer)) {
				setIsGameEnded(true);
				return null;
			}
		} else {
			return null;
		}

		setCurrentPlayer((prevState) => (prevState === 'X' ? '0' : 'X'));
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
		setFields(array);
		setIsGameEnded(false);
		setIsDraw(false);
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
