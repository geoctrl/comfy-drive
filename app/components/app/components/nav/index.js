import React, { PropTypes } from 'react';

class Nav extends React.Component {

	render() {
		return (
				<header className="app-nav">
					<button className="btn nav-button">File</button>
					<button className="btn nav-button">View</button>
					<button className="btn nav-button">Selection</button>
					<button className="btn nav-button">Window</button>
					<button className="btn nav-button">Help</button>
				</header>
		);
	}
}

Nav.PropTypes = {

};

export default Nav;