import React, { PropTypes } from 'react';
import Icon from '../../../../components/icons';

import ViewGridName from './view-grid-name';


class ViewGrid extends React.Component {
	constructor() {
		super();
		this.state = {
			dragOver: false
		}
	}

	isFileSelected(fileId) {
		return !!this.props.files.selection.filter(child => {
			return child.id == fileId;
		}).length;
	}

	dragStartHandler(e) {
		// todo: custom image (maybe show the amount of files being dragged
		e.target.classList.add('drag');
		e.dataTransfer.setData('fileId', e.target.getAttribute('data'));
	}

	dragEndHandler(e) {
		e.target.classList.remove('drag');
	}

	dragOverHandler(e) {
		this.setState({
			dragOver: true
		})
	}

	dragLeaveHandler(e) {
		this.setState({
			dragOver: false
		})
	}

	dropHandler(e) {

	}


	render() {
		return (
				<div className="view-grid">
					{ this.props.files.children.map(file => (
							<div className="view-grid__file" key={file.id}>
								<div className={`view-grid__file-contain ${this.isFileSelected(file.id) ? 'active': ''}`}
								     data={file.id}
										 draggable="true"
										 onDragStart={this.dragStartHandler.bind(this)}
										 onDragEnd={this.dragEndHandler.bind(this)}
										 onDragOver={this.dragOverHandler.bind(this)}
										 onDragLeave={this.dragLeaveHandler.bind(this)}
										 onDrop={this.dropHandler.bind(this)}
								>
									<div className="view-grid__file-icon">
										{ this.state.dragOver
												? <Icon icon="folder-open" size="48" />
												: <Icon icon="folder" size="48" />
										}
									</div>
									<ViewGridName file={ file } />
								</div>
							</div>
					))}
				</div>
		);
	}
}

ViewGrid.PropTypes = {

};

export default ViewGrid;