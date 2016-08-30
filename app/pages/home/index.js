import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as fileActions from '../../modules/actions/file-actions';
import ReactTooltip from 'react-tooltip';

import Header from './header';
import View from './view';

export default class App extends React.Component {
	constructor() {
		super();

		this.state = {

		};
	}


	// TODO: we need to authorize access before rendering

	componentDidMount() {
		this.props.actions.selectFolder(1); // todo: add admin feature to choose a default location vs last visited
	}

	render() {
		let { files } = this.props;
		return (
				<div className="app">
					<ReactTooltip effect="solid" class={'view-toolbar__tooltip'} place="top" />
					<Header { ...this.props } />
					<View { ...this.props } />
				</div>
		)
	}
}

function mapStateToProps(state) {
	return { files: state.filesReducer };
}

function mapDispatchToProps(dispatch) {
	return { actions: bindActionCreators(fileActions, dispatch) };
}

export default connect(
		mapStateToProps,
		mapDispatchToProps
)(App);
