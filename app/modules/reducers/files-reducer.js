import _merge from 'lodash/merge';
import stateHistory from '../../core/state-history';

const initialState = {
	id: null,
	type: null,
	name: null,
	activeFile: {},
	children: [],
	dirPath: [],
	status: 'pending'
};

const mergeState = (...states) => _merge({}, ...states);

export default function (state=initialState, action) {

	switch (action.type) {

		// ---------------------
		// LOAD_FOLDER
		// ---------------------

		case 'LOAD_FOLDER_PENDING':
			return mergeState(state, {
				status: 'pending'
			});

		case 'LOAD_FOLDER_FULFILLED':
			return mergeState(state, action.payload, {
				status: 'fulfilled'
			});

		case 'LOAD_FOLDER_REJECTED':
			return mergeState(state, {
				status: 'rejected'
			});



		// ---------------------
		// SELECT_ACTIVE_FILE
		// ---------------------

		case 'SET_ACTIVE_FILE':
			return mergeState(state, {
				activeFile: action.data,
				status: 'fulfilled'
			});




			// ---------------------
		// CREATE FOLDER
		// ---------------------

		case 'CREATE_FOLDER_PENDING':
			return mergeState(state, {
				status: 'pending'
			});

		case 'CREATE_FOLDER_FULFILLED':
			return mergeState(state, {
				status: 'pending'
			});

		case 'CREATE_FOLDER_REJECTED':
			return mergeState(state, {
				status: 'pending'
			});



		// ---------------------
		// DEFAULT
		// ---------------------

		default:
			return state;
	}

};