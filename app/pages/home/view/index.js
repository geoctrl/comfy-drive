import React, { PropTypes } from 'react';
import ViewGrid from './view-grid';
import ClickDragSelect from './click-drag-select';

import _findIndex from 'lodash/findIndex';

let doubleClickDuration = 300, // in milliseconds
		clickDuration = 100,
		doubleClick = 0,
		shiftOriginId = null,
		shiftKey = false,
		metaKey = false;

class View extends React.Component {
	constructor(...props) {
		super(...props);

		this.state = {
			dragging: false,
			fileClassName: 'view-grid__file-contain',
			clickSelect: false,
			clickOrigin: {
				x: 0,
				y: 0
			},
			clickEnd: {
				x: 0,
				y: 0
			}
		};
	}

	/**
	 * get file by id
	 * helper function to get file
	 * @param fileId
	 * @return {*}
	 */
	getFileById(fileId) {
		return this.props.files.children.filter(child => {
			return child.id == fileId;
		})[0];
	}

	/**
	 * click file
	 * handle single and double clicks
	 * @param fileId
	 * @param e {event}
	 */
	clickFile(fileId, e) {


		// wait for 2 milliseconds - is the mouse still down?
		let newSelection = [this.getFileById(fileId)];
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
		if ((' '+node.className+' ').indexOf(' '+this.state.fileClassName+' ') > -1) {
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

			// keyboard bindings
			metaKey = e.ctrlKey || e.metaKey;
			shiftKey = e.shift;

			// target file id
			let singleFileId = this.isFile(e.target);

			// did you click a file?
			if (singleFileId) {
				// no dragging
				this.clickFile(singleFileId, e);

				// set shift origin id if nothing is selected
				if (!this.props.files.selection.length) {
					shiftOriginId = singleFileId;
				}
			} else {
				// dragging is possible
				// clear current selection
				if (this.props.files.selection.length && !metaKey && !shiftKey) {
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

				// timeout to make sure we're dragging
				setTimeout(() => {
					this.setState({
						clickSelect: true
					})
				}, clickDuration);
			}
		}
	}

	mouseUpHandler() {
		metaKey = false;
		shiftKey = false;

		// make sure we don't clear this before the first timeout finishes
		setTimeout(() => {
			this.setState({
				clickSelect: false
			})
		}, clickDuration);
	}

	mouseMoveHandler(e) {
		if (this.state.clickSelect) {
			this.setState({
				clickEnd: {
					x: e.clientX,
					y: e.clientY
				}
			});
		}
	}

	render() {
		return (
				<div className="home-view"
				     onMouseMove={this.mouseMoveHandler.bind(this)}
				     onMouseDown={this.mouseDownHandler.bind(this)}
						 onMouseUp={this.mouseUpHandler.bind(this)}>
					<ClickDragSelect { ...this.state } />
					<ViewGrid { ...this.props } parentState={ this.state } />
				</div>
		);
	}
}

View.PropTypes = {

};

export default View;