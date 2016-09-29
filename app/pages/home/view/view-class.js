import viewUtils from './view-utils';

let fileHoverCount = 0;

/**
 * View Class
 * extends view-grid and view-list with identical functionality
 * @param props (eg: view-grid's "this")
 */
export default class ViewClass {
	constructor(...props) {
		this.props = props;
	}

	dragStartHandler(e) {
		e.dataTransfer.effectAllowed = 'move';
		var img = new Image();
		img.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyppVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTMyIDc5LjE1OTI4NCwgMjAxNi8wNC8xOS0xMzoxMzo0MCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUuNSAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo3QzJGRTlGOTY3RTcxMUU2QUUzM0MyNDc3NzA3OTIxNSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo3QzJGRTlGQTY3RTcxMUU2QUUzM0MyNDc3NzA3OTIxNSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjdDMkZFOUY3NjdFNzExRTZBRTMzQzI0Nzc3MDc5MjE1IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjdDMkZFOUY4NjdFNzExRTZBRTMzQzI0Nzc3MDc5MjE1Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+HvXmSwAAAA9JREFUeNpi+P//P0CAAQAF/gL+Lc6J7gAAAABJRU5ErkJggg==';
		e.dataTransfer.setDragImage(img, 1, 1);
		this.props.actions.updateSelection('drag');
	}

	dragEndHandler(e) {
		e.preventDefault();
		fileHoverCount = 0;
		// do something with this new data (e.target & fileIdHovered)
		this.setState({
			fileIdHovered: null
		});
		this.props.actions.updateSelection(null);
	}

	dragLeaveHandler(e) {
		e.preventDefault();
		fileHoverCount--;
		if (fileHoverCount == 0) {
			this.setState({
				fileIdHovered: null
			})
		}
	}

	dragEnterHandler(e) {
		e.preventDefault();
		fileHoverCount++;
		this.setState({
			fileIdHovered: viewUtils.getFileParentNode(e.target)
		});
	}

};