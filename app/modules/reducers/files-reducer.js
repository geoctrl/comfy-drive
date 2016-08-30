import _merge from 'lodash/merge';
import stateHistory from '../../core/state-history';

const initialState = {
	id: null,               // current file id
	type: null,             // type of file (extension or 'dir')
	name: null,             // name of file
	selectionAction: null,  // current action taken on selection (only one at a time)
	selection: [],          // current files selected
	children: [],           // all files within current directory
	dirPath: [],            // path to root
	status: 'pending'       // show loading
};

const mergeState = (...states) => _merge({}, ...states);

export default function (state=initialState, action) {

	switch (action.type) {

		// ---------------------å
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
		// SET_SELECTION
		// ---------------------

		case 'SET_SELECTION':
			return mergeState(state, {
				selection: action.data,
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