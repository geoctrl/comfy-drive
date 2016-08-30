import React from 'react';

class Path extends React.Component {

	render() {
		return (
				<div className="home-path">
					{ this.props.files.dirPath.map((folder, index) =>
							<span key={ folder.id }>
							<a href="d">{ folder.name }</a>
								{ index != this.props.files.dirPath.length-1 && <span>/</span> }
						</span>
					)
					}
				</div>
		);
	}
}

export default Path;