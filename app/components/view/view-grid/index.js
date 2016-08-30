import React, { PropTypes } from 'react';
import Icon from '../../icons/index';

import ViewGridName from './view-grid-name';


class ViewGrid extends React.Component {

	render() {
		return (
				<div className="view-grid">
					{ this.props.files.children.map(file => (
							<div className="view-grid__file" key={file.id}>
								<div className={`view-grid__file-contain ${file.id == this.props.files.activeFile.id ? 'active': ''}`}
								     onClick={this.props.clickFile.bind(this, file)}>
									<div className="view-grid__file-icon">
										<Icon icon="folder" size="48"/>
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