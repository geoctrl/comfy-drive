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

	getFileById(fileId) {
		return this.props.files.children.filter(child => {
			return child.id == fileId;
		})[0];
	}

	clickFile(fileId, e) {
		this.props.actions.setSelection([this.getFileById(fileId)]);

		if (doubleClick === 0) {
			// single click
			setTimeout(() => {
				doubleClick--;
			}, doubleClickDuration);
			doubleClick++;
		} else {
			// double click

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

		let singleFileId = this.isFile(e.target);

		if (singleFileId) {
			this.clickFile(singleFileId, e);
		} else {
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