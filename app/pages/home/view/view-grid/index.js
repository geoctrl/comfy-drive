import React, { PropTypes } from 'react';
import Icon from '../../../../components/icons';
import _find from 'lodash/find';

import ViewGridName from './view-grid-name';


class ViewGrid extends React.Component {
	constructor() {
		super();
		this.state = {
			fileIdDragged: null,
			elHovered: null,
			fileIdHovered: null,
			fileHoverCount: 0
		}
	}

	isFileSelected(fileId) {
		return !!this.props.files.selection.filter(child => {
			return child.id == fileId;
		}).length;
	}

	getFileParentNode(node) {
		if ((' '+node.className+' ').indexOf(' '+this.props.parentState.fileClassName+' ') > -1) {
			return node.getAttribute('data');
		} else if (node.parentNode) {
			return this.getFileParentNode(node.parentNode);
		} else {
			return false;
		}
	}


	dragStartHandler(e) {
		// custom image
		var img = new Image();
		img.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyppVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTMyIDc5LjE1OTI4NCwgMjAxNi8wNC8xOS0xMzoxMzo0MCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUuNSAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo3QzJGRTlGOTY3RTcxMUU2QUUzM0MyNDc3NzA3OTIxNSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo3QzJGRTlGQTY3RTcxMUU2QUUzM0MyNDc3NzA3OTIxNSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjdDMkZFOUY3NjdFNzExRTZBRTMzQzI0Nzc3MDc5MjE1IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjdDMkZFOUY4NjdFNzExRTZBRTMzQzI0Nzc3MDc5MjE1Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+HvXmSwAAAA9JREFUeNpi+P//P0CAAQAF/gL+Lc6J7gAAAABJRU5ErkJggg==';
		e.dataTransfer.setDragImage(img, 1, 1);
		this.setState({
			fileIdDragged: e.target.getAttribute('data')
		});
	}

	dragEndHandler(e) {
		// console.log(this.getFileParentNode(e.target));
		this.setState({
			itemMoving: null,
			itemOverId: null,
			itemOverCount: 0
		});
	}

	dragOverHandler(e) {

	}

	dragLeaveHandler(e) {
		let newState = { fileHoverCount: this.state.fileHoverCount - 1 };
		if (newState.fileHoverCount == 0) {
			newState.elHovered = null;
			newState.fileIdHovered = null;
		}
		this.setState(newState);
	}

	dragEnter(e) {
		this.setState({
			elHovered: e.target,
			fileIdHovered: this.getFileParentNode(e.target),
			fileHoverCount: this.state.fileHoverCount + 1
		});
	}


	dropHandler(e) {
		console.log(e);
		console.log(this.getFileParentNode(e.target))
	}



	render() {


		let GridAttributes = file => {
			let attr = {
				className: `view-grid__file-contain ${this.isFileSelected(file.id) ? 'active': ''}`,
				data: file.id,
				onDragStart: this.dragStartHandler.bind(this),
				onDragEnd: this.dragEndHandler.bind(this),
				onDragLeave: this.dragLeaveHandler.bind(this),
				onDragEnter: this.dragEnter.bind(this),
			};
			// todo: change dragging selection (this.state.fileIdDragged) to an array of files
			// todo: grey out the files that are being dragged (and not allow a drop)

			if (true) {
				attr.onDragOver = this.dragOverHandler.bind(this);
				attr.onDrop = this.dropHandler.bind(this);
			}
			return attr;
		};

		return (
				<div className="view-grid">
					{ this.props.files.children.map(file => (
							<div className="view-grid__file" key={file.id}>
								<div {...GridAttributes(file)}>
									<div className="view-grid__file-icon">
										{ this.state.fileIdHovered == file.id && this.state.fileIdDragged != file.id
												? <Icon icon="folder-open" size="48" />
												: <Icon icon="folder" size="48" />
										}
									</div>
									<ViewGridName file={ file } />
								</div>
							</div>
					))}
					{this.state.fileHoverCount}
				</div>
		);
	}
}

ViewGrid.PropTypes = {

};

export default ViewGrid;