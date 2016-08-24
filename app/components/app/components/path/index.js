import React, { PropTypes } from 'react';

class Path extends React.Component {

	render() {
		return (
			<div className="app-path">
				<a href="d">Root</a>
				<span>/</span>
				<a href="d">New Folder</a>
			</div>
		);
	}
}

Path.PropTypes = {

};

export default Path;