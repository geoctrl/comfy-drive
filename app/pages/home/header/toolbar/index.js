import React, { PropTypes } from 'react';
import Icon from '../../../../components/icons';
import Classnames from 'classnames';

class Toolbar extends React.Component {

	render() {
		let viewToolbarLeftClasses = Classnames({
			active: this.props.files.selection.length,
			'view-toolbar__left': true
		});

		let viewToolbarButtonSingleClasses = Classnames({
			hidden: this.props.files.selection.length != 1,
			btn: true, 'btn-grey-transparent': true, 'btn-square': true
		});
		return (
				<div className="view-toolbar">
					<div className="view-toolbar__right">
						<button className="btn btn-grey-transparent btn-square" data-tip="Paste">
							<Icon icon="content-paste" size="24" />
						</button>
						<button className="btn btn-grey-transparent btn-square" data-tip="Add">
							<Icon icon="plus" size="24" />
						</button>
					</div>
					<div className={viewToolbarLeftClasses}>
						<span className="view-toolbar__count">
							{this.props.files.selection.length} File{this.props.files.selection.length>1?'s':''}
						</span>
						<button className="btn btn-grey-transparent btn-square" data-tip="Copy">
							<Icon icon="content-copy" size="24" />
						</button>
						<button className="btn btn-grey-transparent btn-square" data-tip="Cut">
							<Icon icon="content-cut" size="24" />
						</button>
						<button className="btn btn-grey-transparent btn-square" data-tip="Duplicate">
							<Icon icon="content-duplicate" size="24" />
						</button>
						<button className={viewToolbarButtonSingleClasses} data-tip="Rename">
							<Icon icon="rename-box" size="24" />
						</button>
						<button className="btn btn-grey-transparent btn-square" data-tip="Delete">
							<Icon icon="delete" size="24" />
						</button>
					</div>
				</div>
		);
	}
}

Toolbar.PropTypes = {

};

export default Toolbar;