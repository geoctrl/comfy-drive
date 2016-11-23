
export let fileClassName = 'view-grid__file-contain';

export function getFileParentNode(node) {
	if ((' '+node.className+' ').indexOf(' '+this.fileClassName+' ') > -1) {
		return node.getAttribute('data');
	} else if (node.parentNode) {
		return this.getFileParentNode(node.parentNode);
	} else {
		return false;
	}
}