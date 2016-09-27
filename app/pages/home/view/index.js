import React, { PropTypes } from 'react';
import ViewGrid from './view-grid';
import ClickDragSelect from './click-drag-select';

const doubleClickDuration = 300; // in milliseconds
let doubleClick = 0;

class View extends React.Component {
	constructor(...props) {
		super(...props);

		this.state = {
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
		if (e.ctrlKey || e.metaKey) {
			newSelection = newSelection.concat(this.props.files.selection);
			console.log(newSelection, this.props.files.selection);
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
			let ctrlKey = e.ctrlKey || e.metaKey;
			let shiftKey = e.shift;

			if (ctrlKey && !shiftKey) {
				// select one-per

			}  else if (shiftKey && !ctrlKey) {
				// select in-row

			} else {
				// if drag, select

				// else wait for mouse up

			}
			let singleFileId = this.isFile(e.target);
			if (singleFileId) {
				this.clickFile(singleFileId, e);
			} else {
				if (this.props.files.selection.length) {
					this.props.actions.setSelection([]);
				}
				this.setState({
					clickSelect: true,
					clickOrigin: {
						x: e.clientX,
						y: e.clientY
					},
					clickEnd: {
						x: e.clientX,
						y: e.clientY
					}
				});
			}
		} else {
			// right mouse click
		}
	}

	mouseUpHandler() {
		this.setState({
			clickSelect: false
		});
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