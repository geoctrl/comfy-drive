import React, { PropTypes } from 'react';
import ViewGrid from './view-grid';

const doubleClickDuration = 300; // in milliseconds
let doubleClick = 0;

class View extends React.Component {

	clickFile(file) {
		this.props.actions.setActiveFile(file);

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

	render() {
		return (
				<div>
					<ViewGrid { ...this.props } clickFile={ this.clickFile.bind(this) } />
				</div>
		);
	}
}

View.PropTypes = {

};

export default View;

/**
 0 = possibility of a second click

 1 = double clicked

 if you click more after this, keep resetting the double click

 **/