import * as fileApi from './file-api';

export function selectFolder(folderId) {
	return {
		type: 'LOAD_FOLDER',
		payload: {
			promise: fileApi.loadFolder(folderId)
		}
	};
}

export function setActiveFile(file) {
	return {
		type: 'SET_ACTIVE_FILE',
		data: file
	}
}