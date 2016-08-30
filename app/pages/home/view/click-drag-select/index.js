import React, { PropTypes } from 'react';

class clickDragSelect extends React.Component {


	render() {
		let selectStyle = {
			display: this.props.clickSelect ? 'block' : 'none',
		};

		// handle drag-selection
		if (this.props.clickEnd.x > this.props.clickOrigin.x) {
			if (this.props.clickEnd.y > this.props.clickOrigin.y) {
				// mouse is bottom/right of origin
				selectStyle.top = this.props.clickOrigin.y;
				selectStyle.left = this.props.clickOrigin.x;
				selectStyle.width = this.props.clickEnd.x - this.props.clickOrigin.x;
				selectStyle.height = this.props.clickEnd.y - this.props.clickOrigin.y;
			} else {
				// mouse is top/right of origin
				selectStyle.top = this.props.clickOrigin.y - (this.props.clickOrigin.y - this.props.clickEnd.y);
				selectStyle.left = this.props.clickOrigin.x;
				selectStyle.width = this.props.clickEnd.x - this.props.clickOrigin.x;
				selectStyle.height = this.props.clickOrigin.y - this.props.clickEnd.y;
			}
		} else {
			if (this.props.clickEnd.y > this.props.clickOrigin.y) {
				// mouse is bottom/left of origin
				selectStyle.top = this.props.clickOrigin.y;
				selectStyle.left = this.props.clickEnd.x;
				selectStyle.width = this.props.clickOrigin.x - this.props.clickEnd.x;
				selectStyle.height = this.props.clickEnd.y - this.props.clickOrigin.y;
			} else {
				// mouse is bottom/right of origin
				selectStyle.top = this.props.clickEnd.y;
				selectStyle.left = this.props.clickEnd.x;
				selectStyle.width = this.props.clickOrigin.x - this.props.clickEnd.x;
				selectStyle.height = this.props.clickOrigin.y - this.props.clickEnd.y;
			}

		}
		return <div className="click-drag-select" style={selectStyle}></div>;
	}
}

clickDragSelect.PropTypes = {

};

export default clickDragSelect;