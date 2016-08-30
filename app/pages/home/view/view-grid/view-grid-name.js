import React, { PropTypes } from 'react';

class ViewGridName extends React.Component {

	render() {
		return (
				<div className="view-grid__file-name">
					{ this.props.file.name }
				</div>
		);
	}
}

ViewGridName.PropTypes = {

};

export default ViewGridName;