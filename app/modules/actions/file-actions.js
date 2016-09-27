import * as fileApi from './file-api';

export function selectFolder(folderId) {
	return {
		type: 'LOAD_FOLDER',
		payload: {
			promise: fileApi.loadFolder(folderId)
		}
	};
}

export function updateSelection(status) {
	return {
		type: 'UPDATE_SELECTION',
		data: status
	}
}

export function setSelection(files) {
	return {
		type: 'SET_SELECTION',
		data: files
	}
}