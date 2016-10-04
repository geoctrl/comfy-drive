import React, { PropTypes } from 'react';
import Icon from '../../../../components/icons';
import ViewClass from '../view-class';
import ViewGridName from './view-grid-name';

import _find from 'lodash/find';
import _isEqual from 'lodash/isEqual';


class ViewGrid extends React.Component {
	constructor() {
		super();
		this.state = {
			fileIdHovered: null
		};

		this.view = new ViewClass(this);
		this.iconDisplay = this.iconDisplay.bind(this);
		this.preventDefault = this.preventDefault.bind(this);
	}

	iconDisplay(file) {
		let props = {};
		switch (file.type) {
			case 'dir':
				if (this.state.fileIdHovered == file.id && !_find(this.props.files.selection, {id: file.id})) {
					props.icon = 'folder-open';
				} else if (this.props.files.selectionAction == 'drag' && _find(this.props.files.selection, {id: file.id})) {
					props.icon = 'folder-disabled';
				} else {
					props.icon = 'folder';
				}
				break;

			default:
				props.icon = 'file';
				break;
		}
		return <Icon { ...props } size="48" />
	};

	preventDefault(e) {
		e.preventDefault();
	}

	componentDidUpdate() {
		this.props.updateFileRefs(this.refs);
	}

	render() {
		return (
				<div className="view-grid">
					{ this.props.files.children.map(file => (
							<div className="view-grid__file" key={file.id} ref={file.id}>
								<div className={`view-grid__file-contain ${_find(this.props.files.selection, {id: file.id}) ? 'active': ''}`}
								     draggable={true}
								     data={file.id}
								     onDragStart={this.view.dragStartHandler.bind(this)}
								     onDragEnd={this.view.dragEndHandler.bind(this)}
								     onDragLeave={this.view.dragLeaveHandler.bind(this)}
								     onDragEnter={this.view.dragEnterHandler.bind(this)}
										 onDragOver={ this.preventDefault }
										 onDrop={ () => {} }>
									<div className="view-grid__file-icon">
										{ this.iconDisplay(file) }
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