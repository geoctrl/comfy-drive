import React, { PropTypes } from 'react';
import ViewGrid from './view-grid';
import DragSelectBox from './drag-select-box';
import viewUtils from './view-utils';

import _find from 'lodash/find';

let doubleClickDuration = 300,
		clickDuration = 100,
		doubleClick = 0,

		originId = null,
		shiftOriginId = null,
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

		// meta + C = COPY

		// meta + V = PASTE

		// meta + X = CUT

		// meta + shift + D = DUPLICATE

		// delete = DELETE

	}



	/**
	 * click file
	 * handle single and double clicks
	 * @param fileId
	 * @param e {event}
	 */
	clickFile(fileId, e) {

		let newSelection = [_find(this.props.files.children, {id: fileId})];
		if (metaKey) {
			newSelection = newSelection.concat(this.props.files.selection);
		} else if (shiftKey) {

		}
		this.props.actions.setSelection(newSelection);

		if (doubleClick === 0) {
			// single click
			setTimeout(() => {
				doubleClick--;
			}, doubleClickDuration);
			doubleClick++;
		} else {
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
			metaKey = e.ctrlKey || e.metaKey;
			shiftKey = e.shift;

			// target file id
			originId = this.isFile(e.target);

			// if meta/shift isn't being pressed, and the origin id is not selected, set selection
			if (originId && (!metaKey || !shiftKey) && !_find(this.props.files.selection, {id: originId})) {
				this.clickFile(originId);
			} else if (!originId && this.props.files.selection.length) {
				this.props.actions.setSelection([]);
			}

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



			// dragging requires 1 of 2 things:
			// 1: nothing is selected, and you just grab one file and start moving it around
			// 2: if 1 or more files are selected, you have to click on one of those to drag them

			// check if this is file is selected

			// did you click a file?
			// if (singleFileId) {
			// 	// no dragging
			// 	this.clickFile(singleFileId, e);
			//
			// 	// set shift origin id if nothing is selected
			// 	if (!this.props.files.selection.length) {
			// 		shiftOriginId = singleFileId;
			// 	}
			// } else {
			// 	// dragging is possible
			//
			// }
		}
	}

	mouseMoveHandler(e) {
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

		// drag
		if (this.state.dragSelect) {
			// console.log('dragging')
		}

		// make sure we don't clear this before the mousedown timeout finishes
		setTimeout(() => {
			dragReady = metaKey = shiftKey = false;
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