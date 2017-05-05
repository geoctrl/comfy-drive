import React, { PropTypes } from 'react';
import ViewGrid from './view-grid';
import DragSelectBox from './drag-select-box';
import * as viewUtils from './view-utils';

import _find from 'lodash/find';
import _findIndex from 'lodash/findIndex';
import _throttle from 'lodash/throttle';
import _forIn from 'lodash/forIn';
import _isEqual from 'lodash/isEqual';


const doubleClickDuration = 200,	// max time allowed between clicks
		clickDuration = 200,		// allowed time between mouse down and up
		minimumMovement = 5;		// movement required before dragSelect works

let viewAttrs = {},
		doubleClick = 0,

		originId = null,
		shiftOriginIndex = null,
		dragReady = false,

		shiftKey = false,
		metaKey = false,

		fileRefs = [];

class View extends React.Component {
	constructor(...props) {
		super(...props);

		this.state = {
			dragSelect: false,
			clickOrigin: {
				x: 0,
				y: 0
			},
			clickEnd: {
				x: 0,
				y: 0
			}
		};

		this.mouseDownHandler = this.mouseDownHandler.bind(this);
		this.mouseMoveHandler = this.mouseMoveHandler.bind(this);
		this.mouseUpHandler = this.mouseUpHandler.bind(this);
		this.updateFileRefs = this.updateFileRefs.bind(this);
		document.addEventListener('keydown', this.keyPress.bind(this));
	}

	keyPress(e) {
		metaKey = e.metaKey || e.ctrlKey;
		shiftKey = e.shiftKey;

		// meta + A = SELECT ALL FILES
		if (e.which == 65 && metaKey && !shiftKey) {
			e.preventDefault();
			this.props.actions.setSelection(this.props.files.children);
		}
		// meta + shift + A = DESELECT ALL FILES
		else if (e.which == 65 && metaKey && shiftKey) {
			e.preventDefault();
			this.props.actions.setSelection([]);
		}
		// meta + C = COPY
		else if (e.which == 67 && metaKey) {
			e.preventDefault();
			console.log('copy')
		}
		// meta + V = PASTE
		else if (e.which == 86 && metaKey) {
			e.preventDefault();
			console.log('paste')
		}
		// meta + X = CUT
		else if (e.which == 88 && metaKey) {
			e.preventDefault();
			console.log('cut')
		}
		// meta + S = SAVE
		else if (e.which == 83 && metaKey) {
			e.preventDefault();
			console.log('save')
		}
		// meta + Z = UNDO
		else if (e.which == 90 && metaKey && !shiftKey) {
			e.preventDefault();
			console.log('undo')
		}
		// meta + shift + Z = REDO
		else if (e.which == 90 && metaKey && shiftKey) {
			e.preventDefault();
			console.log('redo')
		}
		// delete = DELETE
		else if (e.which == 46) {
			e.preventDefault();
			console.log('delete')
		}
	}



	/**
	 * click file
	 * handle single and double clicks
	 * @param fileId
	 * @param e {event}
	 */
	clickFile(fileId, e) {

		let fileIsSelected = !!_find(this.props.files.selection, {id: fileId});
		let file = _find(this.props.files.children, {id: fileId});
		let newSelection = [];

		// meta key only click
		if (metaKey && !shiftKey) {
			if (fileIsSelected) {
				newSelection = this.props.files.selection.filter(file => file.id != fileId);
			} else {
				newSelection = this.props.files.selection.concat([file]);
			}

			// shift key only click
		} else if (shiftKey && !metaKey) {
			let shiftCurrentIndex = _findIndex(this.props.files.children, {id: fileId});
			// select all files before or after index (including current and saved indexes)
			if (shiftCurrentIndex < shiftOriginIndex) {
				newSelection = this.props.files.children.filter((file, i) => {
					return i >= shiftCurrentIndex && i <= shiftOriginIndex;
				});
			} else if (shiftCurrentIndex > shiftOriginIndex) {
				newSelection = this.props.files.children.filter((file, i) => {
					return i <= shiftCurrentIndex && i >= shiftOriginIndex;
				});
			} else if (shiftCurrentIndex === shiftOriginIndex) {
				newSelection = [file];
			}

			// regular click
		} else {
			shiftOriginIndex = _findIndex(this.props.files.children, {id: fileId});
			newSelection = [file];
		}

		// update selection
		this.props.actions.setSelection(newSelection);

	}

	// return file id from data-key attribute
	isFile(node) {
		if ((' '+node.className+' ').indexOf(' '+viewUtils.fileClassName+' ') > -1) {
			return node.getAttribute('data');
		} else if (node.parentNode) {
			return this.isFile(node.parentNode);
		} else {
			return false;
		}
	}


	mouseDownHandler(e) {
		e.persist();
		// handle left mouse click
		if (e.nativeEvent.which != 3) {

			dragReady = true;

			// keyboard bindings
			metaKey = e.ctrlKey || e.metaKey;
			shiftKey = e.shiftKey;

			// target file id
			originId = this.isFile(e.target);
			console.log(originId);

			// set origins
			this.setState({
				clickOrigin: {
					x: e.clientX,
					y: e.clientY
				},
				clickEnd: {
					x: e.clientX,
					y: e.clientY
				}
			});

			// timeout before setting drag
			setTimeout(() => {
				if (dragReady && !originId) {
					this.setState({
						dragSelect: true
					});
				}
			}, clickDuration);
		}
	}

	dragCheck = _throttle(() => {
		let newSelection = [];

		_forIn(fileRefs, (file, fileId) => {
			let coords = file.firstElementChild.getBoundingClientRect();

			// South East
			if (this.state.clickOrigin.x < this.state.clickEnd.x && this.state.clickOrigin.y < this.state.clickEnd.y) {
				if (coords.top < this.state.clickEnd.y &&
						coords.left < this.state.clickEnd.x &&
						coords.right > this.state.clickOrigin.x &&
						coords.bottom > this.state.clickOrigin.y) {
					newSelection.push(_find(this.props.files.children, {id: fileId}));
				}

			// South West
			} else if (this.state.clickOrigin.x > this.state.clickEnd.x && this.state.clickOrigin.y < this.state.clickEnd.y) {
				if (coords.top < this.state.clickEnd.y &&
						coords.right > this.state.clickEnd.x &&
						coords.left < this.state.clickOrigin.x &&
						coords.bottom > this.state.clickOrigin.y) {
					newSelection.push(_find(this.props.files.children, {id: fileId}));
				}

			// North East
			} else if (this.state.clickOrigin.x < this.state.clickEnd.x && this.state.clickOrigin.y > this.state.clickEnd.y) {
				if (coords.bottom > this.state.clickEnd.y &&
						coords.left < this.state.clickEnd.x &&
						coords.right > this.state.clickOrigin.x &&
						coords.top < this.state.clickOrigin.y) {
					newSelection.push(_find(this.props.files.children, {id: fileId}));
				}

			// North East
			} else if (this.state.clickOrigin.x > this.state.clickEnd.x && this.state.clickOrigin.y > this.state.clickEnd.y) {
				if (coords.bottom > this.state.clickEnd.y &&
						coords.right > this.state.clickEnd.x &&
						coords.left < this.state.clickOrigin.x &&
						coords.top < this.state.clickOrigin.y) {
					newSelection.push(_find(this.props.files.children, {id: fileId}));
				}
			}
		});

		if (!_isEqual(newSelection, this.props.files.selection)) {
			this.props.actions.setSelection(newSelection);
		}

	}, 50);


	mouseMoveHandler(e) {
		// if drag selection, update end origins
		if (this.state.dragSelect) {
			this.dragCheck();
			this.setState({
				clickEnd: {
					x: e.clientX,
					y: e.clientY
				}
			});
		}
	}

	mouseUpHandler() {
		// handle drag select
		if (this.state.dragSelect && this.endEqualsOrigin()) {
			console.log('drag state')

		} else if (originId) {
			// handle click
			console.log('origin id')
			this.clickFile(originId);
		} else {
			// no file selected - clear out
			console.log('clear out')
			this.props.actions.setSelection([]);
		}

		dragReady = false;
		this.setState({
			dragSelect: false
		})
	}

	updateFileRefs(refs) {
		fileRefs = refs;
	}

	endEqualsOrigin() {
		return this.state.clickOrigin.x == this.state.clickEnd.x &&
			this.state.clickOrigin.y == this.state.clickEnd.y;
	}


	render() {
		viewAttrs = {
			onMouseDown: this.mouseDownHandler,
			onMouseUp: this.mouseUpHandler,
			className: 'home-view'
		};
		if (this.state.dragSelect) {
			viewAttrs.onMouseMove = this.mouseMoveHandler;
		}

		return (
				<div { ...viewAttrs }>
					<DragSelectBox { ...this.state } />
					<ViewGrid { ...this.props } updateFileRefs={this.updateFileRefs} />
				</div>
		);
	}
}

View.PropTypes = {

};

export default View;