import React, { PropTypes } from 'react';
import ViewGrid from './view-grid';
import DragSelectBox from './drag-select-box';
import viewUtils from './view-utils';

import _find from 'lodash/find';
import _findIndex from 'lodash/findIndex';

let doubleClickDuration = 200,
		clickDuration = 100,
		doubleClick = 0,

		originId = null,
		shiftOriginIndex = null,
		dragReady = false,

		shiftKey = false,
		metaKey = false;

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

		document.addEventListener('keydown', this.keyPress.bind(this));
	}

	keyPress(e) {

		metaKey = e.metaKey || e.ctrlKey;
		shiftKey = e.shiftKey;

		// meta + A = SELECT ALL FILES
		if (e.which == 65 && metaKey) {
			e.preventDefault();
			this.props.actions.setSelection(this.props.files.children);
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
		else if (e.which == 46 && metaKey) {
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

		// single click
		if (doubleClick === 0) {
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

			// set timeout for double click possibility
			setTimeout(() => {
				doubleClick--;
			}, doubleClickDuration);
			doubleClick++;

		} else if (!metaKey && !shiftKey) {
			// double click
			console.log('double click')
		}
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
		// handle left mouse click
		if (e.nativeEvent.which != 3) {

			dragReady = true;

			// keyboard bindings
			metaKey = shiftKey = false; // reset from last click
			metaKey = e.ctrlKey || e.metaKey;
			shiftKey = e.shiftKey;

			// target file id
			originId = this.isFile(e.target);

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

	mouseMoveHandler(e) {
		// if drag selection, update end origins
		if (this.state.dragSelect) {
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
		if (this.state.dragSelect) {

		} else if (originId) {
			// handle click
			this.clickFile(originId);
		} else {
			// no file selected - clear out
			this.props.actions.setSelection([]);
		}

		// make sure we don't clear this before the mousedown timeout finishes
		setTimeout(() => {
			dragReady = false;
			this.setState({
				dragSelect: false
			})
		}, clickDuration);
	}


	render() {
		return (
				<div className="home-view"
				     onMouseMove={this.mouseMoveHandler.bind(this)}
				     onMouseDown={this.mouseDownHandler.bind(this)}
						 onMouseUp={this.mouseUpHandler.bind(this)}>
					<DragSelectBox { ...this.state } />
					<ViewGrid { ...this.props } parentState={ this.state } />
				</div>
		);
	}
}

View.PropTypes = {

};

export default View;