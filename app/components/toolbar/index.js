import React, { PropTypes } from 'react';
import Icon from '../icons';

class Toolbar extends React.Component {

	render() {
		return (
				<div className="view-toolbar">
					<div className="view-toolbar__left">
						<button className="btn btn-grey-transparent btn-square">
							<Icon icon="content-copy" size="24" />
						</button>
						<button className="btn btn-grey-transparent btn-square">
							<Icon icon="content-duplicate" size="24" />
						</button>
						<button className="btn btn-grey-transparent btn-square">
							<Icon icon="content-cut" size="24" />
						</button>
						<button className="btn btn-grey-transparent btn-square">
							<Icon icon="rename-box" size="24" />
						</button>
						<button className="btn btn-grey-transparent btn-square">
							<Icon icon="delete" size="24" />
						</button>
					</div>
					<div className="view-toolbar__right">
						<button className="btn btn-grey-transparent btn-square">
							<Icon icon="content-paste" size="24" />
						</button>
						<button className="btn btn-grey-transparent btn-square">
							<Icon icon="plus" size="24" />
						</button>
					</div>
				</div>
		);
	}
}

Toolbar.PropTypes = {

};

export default Toolbar;