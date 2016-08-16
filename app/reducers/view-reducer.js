import _merge from 'lodash/merge';

const initialState = {
	selectedFolder: []
};

export default function (state=initialState, action) {

	switch (action.type) {

		case 'add':
			return _merge({}, state, {

			})

	}

};