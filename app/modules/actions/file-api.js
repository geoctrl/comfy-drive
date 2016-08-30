import * as api from '../../core/api';

const unwrap = res => res.data;

export function loadFolder(folderId) {
	return api.prod.get(`/files/${folderId}`).then(unwrap);
}