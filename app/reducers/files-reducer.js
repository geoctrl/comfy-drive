import _merge from 'lodash/merge';

const initialState = {
	children: [],
	folder: {},
	path: {},
	status: 'pending'
};

let _children;

function mergeState(state, newState) {
	return _merge({}, state, newState);
}

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
			return mergeState(state, {
				status: 'fulfilled'
			});

		case 'LOAD_FOLDER_REJECTED':
			return mergeState(state, {
				status: 'rejected'
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