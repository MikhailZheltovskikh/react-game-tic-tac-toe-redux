const initialState = {
	fields: ['', '', '', '', '', '', '', '', ''],
	currentPlayer: 'X',
	isGameEnded: false,
	isDraw: false,
};

export const reducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case 'SET_CURRENT_PLAYER':
			return {
				...state,
				currentPlayer: state.currentPlayer === 'X' ? '0' : 'X',
			};
		case 'SET_IS_GAME_END':
			return {
				...state,
				isGameEnded: payload,
			};
		case 'SET_IS_DRAW':
			return {
				...state,
				isDraw: payload,
			};
		case 'SET_FIELDS':
			return {
				...state,
				fields: payload,
			};
		case 'RESET_GAME':
			return initialState;

		default:
			return state;
	}
};
