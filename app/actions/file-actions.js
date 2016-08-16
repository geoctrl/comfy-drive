import * as fileApi from './file-api';

export function loadFolder(folderId) {
	return {
		type: 'LOAD_FOLDER',
		payload: {
			promise: fileApi.loadFolder(folderId)
		}
	};
}