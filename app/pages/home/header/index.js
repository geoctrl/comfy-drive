import React from 'react';
import Toolbar from './toolbar';

class Header extends React.Component {

	render() {
		return (
				<div className="home-header">
					<div className="home-header__path">
						{ this.props.files.dirPath.map((folder, index) =>
										<span key={ folder.id }>
							<a href="d">{ folder.name }</a>
											{ index != this.props.files.dirPath.length-1 && <span>/</span> }
						</span>
						)}

					</div>
					<Toolbar { ...this.props } />
				</div>
		);
	}
}

export default Header;