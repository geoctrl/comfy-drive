import * as api from '../core/api';

export function loadFolder(folderId) {
	return api.prod.get(`/folder/${folderId}`)
}