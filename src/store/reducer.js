const initialState = {
	fields: ['', '', '', '', '', '', '', '', ''],
	currentPlayer: 'X',
	isGameEnded: false,
	isDraw: false,
};

export const reducer = (state = initialState, { type }) => {
	switch (type) {
		case 'RESET_GAME':
			return initialState;
		default:
			return state;
	}
};
